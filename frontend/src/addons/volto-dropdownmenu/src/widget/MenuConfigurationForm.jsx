import React, { useEffect } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { v4 as uuid } from 'uuid';
import { isEmpty } from 'lodash';
import { Form as UIForm, Grid, Button, Header } from 'semantic-ui-react';
import Sidebar from '@plone/volto/components/manage/Sidebar/Sidebar';
import { Form } from '@plone/volto/components/manage/Form';
import {
  TextWidget,
  CheckboxWidget,
  ObjectBrowserWidget,
} from '@plone/volto/components/manage/Widgets';

import { RadioWidget } from 'volto-dropdownmenu/widget';
import { Portal } from 'react-portal';
import config from '@plone/volto/registry';

const messages = defineMessages({
  title: {
    id: 'dropdownmenu-title',
    defaultMessage: 'Título',
  },
  visible: {
    id: 'dropdownmenu-visible',
    defaultMessage: 'Visível',
  },
  mode: {
    id: 'dropdownmenu-mode',
    defaultMessage: 'Modo',
  },
  modeSimpleLink: {
    id: 'dropdownmenu-mode-simpleLink',
    defaultMessage: 'Link simples',
  },
  modeDropdown: {
    id: 'dropdownmenu-mode-dropdown',
    defaultMessage: 'Dropdown',
  },
  linkUrl: {
    id: 'dropdownmenu-linkUrl',
    defaultMessage: 'Link',
  },
  navigationRoot: {
    id: 'dropdownmenu-navigationRoot',
    defaultMessage: 'Raiz de navegação',
  },
  showMoreLink: {
    id: 'dropdownmenu-showMoreLink',
    defaultMessage: 'Link "Mostrar mais"',
  },
  showMoreText: {
    id: 'dropdownmenu-showMoreText',
    defaultMessage: 'Texto do link "Mostrar mais"',
  },
  additionalClasses: {
    id: 'dropdownmenu-additionalClasses',
    defaultMessage: 'Classes adicionais',
  },
  additionalClassesDescription: {
    id: 'dropdownmenu-additionalClassesDescription',
    defaultMessage:
      'Classes adicionais para o item a fim de aplicar estilos específicos, de acordo com o layout do site.',
  },
  blocks: {
    id: 'dropdownmenu-blocks',
    defaultMessage: 'Blocos',
  },
  blocks_description: {
    id: 'dropdownmenu-blocks-description',
    defaultMessage: 'Adicione alguns blocos para mostrar no menu dropdown.',
  },
  deleteMenuItem: {
    id: 'dropdownmenu-deletemenuitem',
    defaultMessage: 'Excluir item do menu',
  },
  deleteButton: {
    id: 'dropdownmenu-deletemenuitem-button',
    defaultMessage: 'Excluir item do menu',
  },
  clickableNavigationRoots: {
    id: 'dropdownmenu-clickableNavigationRoots',
    defaultMessage: 'Raízes de navegação clicáveis',
  },
  submenu: {
    id: 'dropdownmenu-submenu',
    defaultMessage: 'Submenu',
  },
  submenuDescription: {
    id: 'dropdownmenu-submenu-description',
    defaultMessage: 'Configurar itens de submenu de nível 2',
  },
  addSubmenuItem: {
    id: 'dropdownmenu-add-submenu-item',
    defaultMessage: 'Adicionar item de submenu',
  },
  deleteSubmenuItem: {
    id: 'dropdownmenu-delete-submenu-item',
    defaultMessage: 'Excluir item de submenu',
  },
  submenuItemTitle: {
    id: 'dropdownmenu-submenu-item-title',
    defaultMessage: 'Título do item de submenu',
  },
  submenuItemLink: {
    id: 'dropdownmenu-submenu-item-link',
    defaultMessage: 'Link do item de submenu',
  },
});

// SVGs para os botões

const PlusSVG = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
);

const MenuConfigurationForm = ({ id, menuItem, onChange, deleteMenuItem }) => {
  const intl = useIntl();
  const defaultBlockId = uuid();

  if (!menuItem.blocks_layout || isEmpty(menuItem.blocks_layout.items)) {
    menuItem.blocks_layout = {
      items: [defaultBlockId],
    };
  }
  if (!menuItem.blocks || isEmpty(menuItem.blocks)) {
    menuItem.blocks = {
      [defaultBlockId]: {
        '@type': config.settings.defaultBlockType,
      },
    };
  }

  // Inicializar submenu se não existir
  if (!menuItem.submenu) {
    menuItem.submenu = [];
  }

  const preventClick = (e) => {
    e.preventDefault();
  };

  const preventEnter = (e) => {
    if (e.code === 'Enter') {
      preventClick(e);
    }
  };

  useEffect(() => {
    document
      .querySelector('form.ui.form')
      .addEventListener('click', preventClick);

    document.querySelectorAll('form.ui.form input').forEach((item) => {
      item.addEventListener('keypress', preventEnter);
    });

    return () => {
      document
        .querySelector('form.ui.form')
        ?.removeEventListener('click', preventClick);
      document.querySelectorAll('form.ui.form input').forEach((item) => {
        item?.removeEventListener('keypress', preventEnter);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeFormData = (id, value) => {
    onChange({ ...menuItem, [id]: value });
  };

  const onChangeFormBlocks = (data) => {
    onChange({
      ...menuItem,
      blocks: data.blocks,
      blocks_layout: data.blocks_layout,
    });
  };

  const addSubmenuItem = () => {
    const newSubmenuItem = {
      title: `Submenu Item ${menuItem.submenu.length + 1}`,
      mode: 'simpleLink',
      '@id': '',
      link_external: '',
    };
    const updatedSubmenu = [...menuItem.submenu, newSubmenuItem];
    onChange({ ...menuItem, submenu: updatedSubmenu });
  };

  const deleteSubmenuItem = (index) => {
    const updatedSubmenu = menuItem.submenu.filter((_, idx) => idx !== index);
    onChange({ ...menuItem, submenu: updatedSubmenu });
  };

  const updateSubmenuItem = (index, field, value) => {
    const updatedSubmenu = [...menuItem.submenu];
    updatedSubmenu[index] = { ...updatedSubmenu[index], [field]: value };
    // Limpa o campo não usado
    if (field === 'mode') {
      if (value === 'simpleLink') {
        updatedSubmenu[index].link_external = '';
      } else {
        updatedSubmenu[index]['@id'] = '';
      }
    }
    onChange({ ...menuItem, submenu: updatedSubmenu });
  };

  const moveSubmenuItem = (index, direction) => {
    const updatedSubmenu = [...menuItem.submenu];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= updatedSubmenu.length) return;
    const temp = updatedSubmenu[newIndex];
    updatedSubmenu[newIndex] = updatedSubmenu[index];
    updatedSubmenu[index] = temp;
    onChange({ ...menuItem, submenu: updatedSubmenu });
  };

  return (
    <div className="wordpress-menu-form">
      {/* Basic Settings */}
      <div className="form-section">
        <h4>Configurações Básicas</h4>
        <div className="form-fields">
          <TextWidget
            id={`${id}-title`}
            title={intl.formatMessage(messages.title)}
            description=""
            required={true}
            value={menuItem.title}
            onChange={(id, value) => onChangeFormData('title', value)}
            className="menu-item-field-title"
          />
          <CheckboxWidget
            id={`${id}-visible`}
            title={intl.formatMessage(messages.visible)}
            description=""
            defaultValue={true}
            value={!!menuItem.visible}
            onChange={(id, value) => onChangeFormData('visible', value)}
            className="menu-item-field-visible"
          />
          <RadioWidget
            id={`${id}-mode`}
            title={intl.formatMessage(messages.mode)}
            description=""
            required={true}
            value={menuItem.mode}
            onChange={(id, value) => onChangeFormData('mode', value)}
            valueList={[
              {
                value: 'simpleLink',
                label: intl.formatMessage(messages.modeSimpleLink),
              },
              {
                value: 'linkExternal',
                label: 'Link externo',
              },
              {
                value: 'dropdown',
                label: intl.formatMessage(messages.modeDropdown),
              },
            ]}
            className="menu-item-field-mode"
          />
        </div>
      </div>

      {/* Link Settings */}
      {menuItem.mode === 'linkExternal' && (
        <div className="form-section">
          <h4>Link Externo</h4>
          <div className="form-fields">
            <TextWidget
              id={`${id}-link-external`}
              title={'URL'}
              description=""
              required={true}
              value={menuItem.link_external}
              onChange={(id, value) => onChangeFormData('link_external', value)}
              className="menu-item-field-title"
            />
          </div>
        </div>
      )}

      {menuItem.mode === 'simpleLink' && (
        <div className="form-section">
          <h4>Link Interno</h4>
          <div className="form-fields">
            <ObjectBrowserWidget
              id={`${id}-linkUrl`}
              title={intl.formatMessage(messages.linkUrl)}
              description=""
              required={true}
              mode="link"
              value={menuItem.linkUrl ?? []}
              onChange={(id, value) => onChangeFormData('linkUrl', value)}
              className="menu-item-field-linkUrl"
            />
          </div>
        </div>
      )}

      {/* Dropdown Settings */}
      {menuItem.mode === 'dropdown' && (
        <div className="form-section">
          <h4>Configurações do Dropdown</h4>
          <div className="form-fields">
            <div className="menu-item-field-navigationRoot">
              <ObjectBrowserWidget
                id={`${id}-navigationRoot`}
                title={intl.formatMessage(messages.navigationRoot)}
                description=""
                required={true}
                value={menuItem.navigationRoot ?? []}
                onChange={(id, value) =>
                  onChangeFormData('navigationRoot', value)
                }
              />
            </div>

            {config.settings?.['volto-dropdownmenu']?.options
              ?.clickableNavigationRoots && (
              <div className="menu-item-field-clickableNavigationRoots">
                <CheckboxWidget
                  id={`${id}-clickableNavigationRoots`}
                  title={intl.formatMessage(messages.clickableNavigationRoots)}
                  description=""
                  defaultValue={true}
                  value={!!menuItem.clickableNavigationRoots}
                  onChange={(id, value) =>
                    onChangeFormData('clickableNavigationRoots', value)
                  }
                />
              </div>
            )}
            <div className="menu-item-field-showMoreLink">
              <ObjectBrowserWidget
                id={`${id}-showMoreLink`}
                title={intl.formatMessage(messages.showMoreLink)}
                description=""
                mode="link"
                value={menuItem.showMoreLink ?? []}
                onChange={(id, value) => onChangeFormData('showMoreLink', value)}
              />
            </div>
            <div className="menu-item-field-showMoreText">
              <TextWidget
                id={`${id}-showMoreText`}
                title={intl.formatMessage(messages.showMoreText)}
                description=""
                value={menuItem.showMoreText}
                onChange={(id, value) => onChangeFormData('showMoreText', value)}
              />
            </div>
            <div className="menu-item-field-additionalClasses">
              <TextWidget
                id={`${id}-additionalClasses`}
                title={intl.formatMessage(messages.additionalClasses)}
                description={intl.formatMessage(
                  messages.additionalClassesDescription,
                )}
                value={menuItem.additionalClasses}
                onChange={(id, value) =>
                  onChangeFormData('additionalClasses', value)
                }
              />
            </div>
          </div>
        </div>
      )}

      {/* Blocks Section */}
      {menuItem.mode === 'dropdown' && (
        <div className="form-section">
          <h4>Conteúdo do Dropdown</h4>
          <div className="form-fields">
            <p className="help">
              {intl.formatMessage(messages.blocks_description)}
            </p>
            <div className="menu-blocks-container">
              <Form
                key={id}
                formData={menuItem}
                visual={true}
                hideActions
                onChangeFormData={onChangeFormBlocks}
              />
            </div>
          </div>
        </div>
      )}

      {/* Submenu Section */}
      <div className="form-section">
        <h4>{intl.formatMessage(messages.submenu)}</h4>
        <p className="help">
          {intl.formatMessage(messages.submenuDescription)}
        </p>
        <div className="submenu-items-container">
          {menuItem.submenu.map((subItem, index) => (
            <div key={`submenu-item-${index}`} className="submenu-item-form wordpress-style-submenu">
              <div className="submenu-item-header-row ui form">
                <div className="submenu-item-field">
                  <TextWidget
                    id={`${id}-submenu-title-${index}`}
                    title={intl.formatMessage(messages.submenuItemTitle)}
                    description=""
                    required={true}
                    value={subItem.title}
                    onChange={(id, value) => updateSubmenuItem(index, 'title', value)}
                  />
                </div>
              </div>
              <div className="submenu-item-field">
                <RadioWidget
                  id={`${id}-internal-mode-${index}`}
                  title={intl.formatMessage(messages.mode)}
                  description=""
                  required={true}
                  value={subItem.mode || 'simpleLink'}
                  onChange={(e, value) => updateSubmenuItem(index, 'mode', value)}
                  valueList={[
                    {
                      value: 'simpleLink',
                      label: intl.formatMessage(messages.modeSimpleLink),
                    },
                    {
                      value: 'external',
                      label: 'Link externo',
                    },
                  ]}
                  className="menu-item-field-mode"
                />
              </div>
              <div className="submenu-item-field">
                {subItem.mode === 'external' ? (
                  <TextWidget
                    id={`${id}-submenu-link-external-${index}`}
                    title={intl.formatMessage(messages.submenuItemLink) + ' (externo)'}
                    description="https://..."
                    required={true}
                    value={subItem.link_external}
                    onChange={(id, value) => updateSubmenuItem(index, 'link_external', value)}
                  />
                ) : (
                  <ObjectBrowserWidget
                    id={`${id}-submenu-link-${index}`}
                    title={intl.formatMessage(messages.submenuItemLink)}
                    description=""
                    required={true}
                    mode="link"
                    value={subItem['linkUrl'] ?? []}
                    onChange={(id, value) => updateSubmenuItem(index, 'linkUrl', value)}
                  />
                )}
              </div>
            </div>
          ))}
          <button
            className="ui primary button add-submenu-item-button"
            onClick={addSubmenuItem}
            type="button"
          >
            <PlusSVG />
            {intl.formatMessage(messages.addSubmenuItem)}
          </button>
        </div>
      </div>

      <Portal node={document.getElementById('sidebar')}>
        <Sidebar />
      </Portal>
    </div>
  );
};

export default React.memo(MenuConfigurationForm);
