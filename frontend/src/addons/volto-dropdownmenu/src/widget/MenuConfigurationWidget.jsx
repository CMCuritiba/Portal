import React, { useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import {
  Icon,
  Grid,
  Menu,
  Form,
  Button,
  Segment,
  Header,
  Sidebar,
  Container,
  Divider,
} from 'semantic-ui-react';
import Component from '@plone/volto/components/theme/Component/Component';
import { TextWidget } from '@plone/volto/components/manage/Widgets';
import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import './menu_configuration.css';

const messages = defineMessages({
  menuItemsHeader: {
    id: 'dropdownmenu-menuitems-header',
    defaultMessage: 'Estrutura do Menu',
  },
  addMenuPath: {
    id: 'dropdownmenu-add-rootpath',
    defaultMessage: 'Adicionar Novo Menu',
  },
  deleteMenuPath: {
    id: 'dropdownmenu-delete-menupath',
    defaultMessage: 'Excluir Menu',
  },
  deleteButton: {
    id: 'dropdownmenu-delete-button',
    defaultMessage: 'Excluir',
  },
  root_path: {
    id: 'dropdownmenu-rootpath',
    defaultMessage: 'Caminho raiz',
  },
  addMenuItem: {
    id: 'dropdownmenu-addmenuitem',
    defaultMessage: 'Adicionar item',
  },
  addSubMenuItem: {
    id: 'dropdownmenu-add-submenu-item',
    defaultMessage: 'Adicionar submenu',
  },
  moveMenuItemUp: {
    id: 'dropdownmenu-move-menuitem-up',
    defaultMessage: 'Mover para cima',
  },
  moveMenuItemDown: {
    id: 'dropdownmenu-move-menuitem-down',
    defaultMessage: 'Mover para baixo',
  },
  emptyActiveMenuPath: {
    id: 'dropdownmenu-emptyActiveMenuPath',
    defaultMessage: 'Selecione um menu para configurar',
  },
  emptyActiveMenuItem: {
    id: 'dropdownmenu-emptyActiveMenuItem',
    defaultMessage: 'Selecione um item para configurar',
  },
  menuSettings: {
    id: 'dropdownmenu-menu-settings',
    defaultMessage: 'Configurações do Menu',
  },
  itemSettings: {
    id: 'dropdownmenu-item-settings',
    defaultMessage: 'Configurações do Item',
  },
  menuTitle: {
    id: 'dropdownmenu-menu-title',
    defaultMessage: 'Título do Menu',
  },
  menuLocation: {
    id: 'dropdownmenu-menu-location',
    defaultMessage: 'Localização',
  },
});

const defaultMenuItem = (title) => ({
  title,
  visible: true,
  mode: 'simpleLink',
  linkUrl: [],
  submenu: [],
});

const defaultSubMenuItem = (title) => ({
  title,
  visible: true,
  mode: 'simpleLink',
  linkUrl: [],
});

const defaultRootMenu = (title) => ({
  rootPath: '/',
  title: title,
  items: [defaultMenuItem(title)],
});

const defaultMenuConfiguration = [defaultRootMenu(`Menu Principal`)];

// SVGs para ícones
const BarsSVG = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect y="4" width="24" height="2" rx="1" fill="currentColor"/><rect y="11" width="24" height="2" rx="1" fill="currentColor"/><rect y="18" width="24" height="2" rx="1" fill="currentColor"/></svg>
);
const LinkSVG = () => (
  <svg width="16" style={{minWidth:16}} height="16" viewBox="0 0 24 24" fill="none"><path d="M17 7h2a5 5 0 010 10h-2m-10 0H5a5 5 0 010-10h2m1 5h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
);
const TrashSVG = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 6v4m4-4v4M2 4h12M3 4v9a1 1 0 001 1h8a1 1 0 001-1V4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
);
const PlusSVG = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
);

// Função utilitária para reordenar arrays
function reorder(list, startIndex, endIndex) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

const MenuConfigurationWidget = ({
  value,
  id,
  onChange,
  required,
  title,
  description,
}) => {
  const intl = useIntl();
  const [menuConfiguration, setMenuConfiguration] = useState(
    value ? JSON.parse(value) : defaultMenuConfiguration,
  );
  const [activeMenu, setActiveMenu] = useState(0);
  const [activeMenuItem, setActiveMenuItem] = useState(0);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const handleChangeConfiguration = (value) => {
    setMenuConfiguration(value);
    onChange(id, JSON.stringify(value));
  };

  const addMenuPath = (e) => {
    e.preventDefault();
    const menuItemsNumber = menuConfiguration.length;
    const menuItem = `/menu${menuItemsNumber}`;
    let newMenuConfiguration = [
      ...menuConfiguration,
      {
        ...defaultRootMenu(`Menu ${menuItemsNumber + 1}`),
        rootPath: menuItem,
      },
    ];

    handleChangeConfiguration(newMenuConfiguration);
    setActiveMenu(newMenuConfiguration.length - 1);
  };

  const deleteMenuPath = (e, index) => {
    e.preventDefault();
    let newMenuConfiguration = [...menuConfiguration];
    newMenuConfiguration.splice(index, 1);

    if (activeMenu === index) {
      setTimeout(() => setActiveMenu(index > 0 ? index - 1 : 0), 0);
    }

    handleChangeConfiguration(newMenuConfiguration);
  };

  const deleteMenuItem = (e, pathIndex, index) => {
    e.preventDefault();
    let newMenuConfiguration = [...menuConfiguration];
    newMenuConfiguration[pathIndex].items.splice(index, 1);

    if (activeMenuItem === index) {
      setTimeout(() => setActiveMenuItem(index > 0 ? index - 1 : 0), 0);
    }

    handleChangeConfiguration(newMenuConfiguration);
  };

  const addMenuItem = (e, pathIndex) => {
    e.preventDefault();
    let newMenuConfiguration = [...menuConfiguration];
    newMenuConfiguration[pathIndex].items = [
      ...newMenuConfiguration[pathIndex].items,
      defaultMenuItem(`Novo Item ${newMenuConfiguration[pathIndex].items.length + 1}`),
    ];

    setActiveMenuItem(newMenuConfiguration[pathIndex].items.length - 1);
    handleChangeConfiguration(newMenuConfiguration);
  };

  const addSubMenuItem = (e, pathIndex, itemIndex) => {
    e.preventDefault();
    e.stopPropagation();
    let newMenuConfiguration = [...menuConfiguration];
    const currentItem = newMenuConfiguration[pathIndex].items[itemIndex];

    if (!currentItem.submenu) {
      currentItem.submenu = [];
    }

    currentItem.submenu.push(
      defaultSubMenuItem(`Submenu ${currentItem.submenu.length + 1}`)
    );

    handleChangeConfiguration(newMenuConfiguration);
  };

  const deleteSubMenuItem = (e, pathIndex, itemIndex, subItemIndex) => {
    e.preventDefault();
    e.stopPropagation();
    let newMenuConfiguration = [...menuConfiguration];
    newMenuConfiguration[pathIndex].items[itemIndex].submenu.splice(subItemIndex, 1);

    handleChangeConfiguration(newMenuConfiguration);
  };

  const onChangeSubMenuItem = (pathIndex, itemIndex, subItemIndex, subItem) => {
    let newMenuConfiguration = [...menuConfiguration];
    newMenuConfiguration[pathIndex].items[itemIndex].submenu[subItemIndex] = subItem;

    handleChangeConfiguration(newMenuConfiguration);
  };

  const onChangeMenuPath = (index, menu) => {
    let newMenuConfiguration = [...menuConfiguration];
    newMenuConfiguration[index] = menu;

    handleChangeConfiguration(newMenuConfiguration);
  };

  const onChangeMenuItem = (pathIndex, menuItemIndex, menuItem) => {
    let newMenuConfiguration = [...menuConfiguration];
    newMenuConfiguration[pathIndex].items[menuItemIndex] = menuItem;

    handleChangeConfiguration(newMenuConfiguration);
  };

  const moveMenuItem = (e, pathIndex, menuItemIndex, direction) => {
    e.preventDefault();
    const up = direction === 'up';
    let newMenuConfiguration = [...menuConfiguration];

    let menuItem = newMenuConfiguration[pathIndex].items[menuItemIndex];
    newMenuConfiguration[pathIndex].items.splice(menuItemIndex, 1);
    newMenuConfiguration[pathIndex].items.splice(
      menuItemIndex + (up ? -1 : 1),
      0,
      menuItem,
    );

    handleChangeConfiguration(newMenuConfiguration);
  };

  // Handler para drag and drop dos itens de menu e submenus
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination, type } = result;
    let newMenuConfiguration = [...menuConfiguration];

    if (type === 'MENU_ITEM') {
      // Drag dos itens de menu
      newMenuConfiguration[activeMenu].items = reorder(
        newMenuConfiguration[activeMenu].items,
        source.index,
        destination.index
      );
      setActiveMenuItem(destination.index);
    } else if (type.startsWith('SUBMENU_ITEM-')) {
      // Drag dos submenus de um item
      const itemIndex = parseInt(type.split('-')[1], 10);
      newMenuConfiguration[activeMenu].items[itemIndex].submenu = reorder(
        newMenuConfiguration[activeMenu].items[itemIndex].submenu,
        source.index,
        destination.index
      );
    }
    handleChangeConfiguration(newMenuConfiguration);
  };

  const currentMenu = menuConfiguration[activeMenu];
  const currentMenuItem = currentMenu?.items?.[activeMenuItem];

  return (
    <div className="wordpress-menu-widget">
      <Form.Field inline id={id}>
        <div className="menu-widget-container">
          {/* Header */}
          <div className="menu-widget-header">
            <div className="menu-widget-title">
              <h2>{title}</h2>
              <p className="description">{description}</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="menu-widget-content">
            {/* Left Column - Menu Structure */}
            <div className="menu-structure-panel">
              <div className="panel-header">
                <h3>{intl.formatMessage(messages.menuItemsHeader)}</h3>
              </div>

              <div className="menu-list">
                {menuConfiguration.map((menu, menuIndex) => (
                  <div key={`menu-${menuIndex}`} className="menu-group">
                    <div
                      className={`menu-header ${activeMenu === menuIndex ? 'active' : ''}`}
                      onClick={() => {
                        setActiveMenu(menuIndex);
                        setActiveMenuItem(0);
                      }}
                    >
                      <div className="title-flex">
                        <BarsSVG />
                        <span className="menu-title">{menu.title || `Menu ${menuIndex + 1}`}</span>
                      </div>
                      <div className="menu-actions">
                        <button
                          type="button"
                          className="ui button mini negative"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteMenuPath(e, menuIndex);
                          }}>
                          <TrashSVG />
                        </button>
                      </div>
                    </div>

                    {activeMenu === menuIndex && (
                      <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="menu-items" type="MENU_ITEM">
                          {(provided) => (
                            <div className="menu-items" ref={provided.innerRef} {...provided.droppableProps}>
                              {menu.items?.map((item, itemIndex) => (
                                <Draggable key={`item-${itemIndex}`} draggableId={`item-${itemIndex}`} index={itemIndex}>
                                  {(provided, snapshot) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      className={`menu-item ${activeMenuItem === itemIndex ? 'active' : ''}`}
                                      onClick={() => setActiveMenuItem(itemIndex)}
                                      style={{
                                        ...provided.draggableProps.style,
                                        boxShadow: snapshot.isDragging ? '0 2px 8px rgba(0,0,0,0.08)' : undefined,
                                      }}
                                    >
                                      <div className="item-content" {...provided.dragHandleProps}>
                                        <div className="item-flex">
                                          <div className="title-flex">
                                            <LinkSVG />
                                            <span className="item-title">{item.title}</span>
                                          </div>
                                          <div className="item-actions">
                                            <button
                                              type="button"
                                              className="ui button mini"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                addSubMenuItem(e, menuIndex, itemIndex);
                                              }}
                                              title="Adicionar submenu"
                                            >
                                              <PlusSVG />
                                            </button>
                                            <button
                                              type="button"
                                              className="ui button mini negative"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                deleteMenuItem(e, menuIndex, itemIndex);
                                              }}
                                              title="Excluir"
                                            >
                                              <TrashSVG />
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                      {/* Submenu drag and drop DENTRO do item pai */}
                                      {item.submenu && item.submenu.length > 0 && (
                                        <Droppable droppableId={`submenu-items-${itemIndex}`} type={`SUBMENU_ITEM-${itemIndex}`}>
                                          {(provided) => (
                                            <div className="submenu-items" ref={provided.innerRef} {...provided.droppableProps}>
                                              {item.submenu.map((subItem, subItemIndex) => (
                                                <Draggable key={`subitem-${itemIndex}-${subItemIndex}`} draggableId={`subitem-${itemIndex}-${subItemIndex}`} index={subItemIndex}>
                                                  {(provided, snapshot) => (
                                                    <div
                                                      ref={provided.innerRef}
                                                      {...provided.draggableProps}
                                                      {...provided.dragHandleProps}
                                                      className="submenu-item"
                                                      style={{
                                                        ...provided.draggableProps.style,
                                                        boxShadow: snapshot.isDragging ? '0 2px 8px rgba(0,0,0,0.08)' : undefined,
                                                      }}
                                                    >
                                                      <div className="item-content">
                                                        <div className="submenu-indent"></div>
                                                        <LinkSVG />
                                                        <span className="item-title">{subItem.title}</span>
                                                      </div>
                                                      <div className="item-actions">
                                                        <button
                                                          type="button"
                                                          className="ui button mini negative"
                                                          onClick={(e) => {
                                                            e.stopPropagation();
                                                            deleteSubMenuItem(e, menuIndex, itemIndex, subItemIndex);
                                                          }}
                                                          title="Excluir submenu"
                                                        >
                                                          <TrashSVG />
                                                        </button>
                                                      </div>
                                                    </div>
                                                  )}
                                                </Draggable>
                                              ))}
                                              {provided.placeholder}
                                            </div>
                                          )}
                                        </Droppable>
                                      )}
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                              <Button
                                fluid
                                basic
                                onClick={(e) => addMenuItem(e, menuIndex)}
                                className="add-item-button"
                              >
                                <PlusSVG /> {intl.formatMessage(messages.addMenuItem)}
                              </Button>
                            </div>
                          )}
                        </Droppable>
                      </DragDropContext>
                    )}
                  </div>
                ))}
              </div>
              <div className="py-16 px-16 w-100 mt-48">
                <Button
                  primary
                  onClick={addMenuPath}
                  className="add-menu-path-button"
                >
                  <PlusSVG /> {intl.formatMessage(messages.addMenuPath)}
                </Button>
              </div>
            </div>

            {/* Right Column - Settings */}
            <div className="menu-settings-panel">
              {currentMenu ? (
                <div className="settings-content">
                  {/* Menu Settings */}
                  <div className="settings-section">
                    <h3>{intl.formatMessage(messages.menuSettings)}</h3>
                    <div className="settings-form">
                      <div className="form-field">
                        <label>{intl.formatMessage(messages.menuTitle)}</label>
                        <input
                          type="text"
                          value={currentMenu.title || ''}
                          onChange={(e) => {
                            onChangeMenuPath(activeMenu, {
                              ...currentMenu,
                              title: e.target.value,
                            });
                          }}
                          placeholder="Nome do menu"
                        />
                      </div>
                      <div className="form-field">
                        <label>{intl.formatMessage(messages.menuLocation)}</label>
                        <input
                          type="text"
                          value={flattenToAppURL(currentMenu.rootPath)}
                          onChange={(e) => {
                            onChangeMenuPath(activeMenu, {
                              ...currentMenu,
                              rootPath: e.target.value?.length ? e.target.value : '/',
                            });
                          }}
                          placeholder="/caminho/do/menu"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Item Settings */}
                  {currentMenuItem && (
                    <div className="settings-section">
                      <h3>{intl.formatMessage(messages.itemSettings)}</h3>
                      <div className="settings-form">
                        <Component
                          componentName="MenuConfigurationForm"
                          id={`${activeMenu}-${activeMenuItem}`}
                          menuItem={currentMenuItem}
                          onChange={(menu) =>
                            onChangeMenuItem(activeMenu, activeMenuItem, menu)
                          }
                          deleteMenuItem={(e) =>
                            deleteMenuItem(e, activeMenu, activeMenuItem)
                          }
                        />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="empty-state">
                  <Icon name="info circle" size="huge" />
                  <p>{intl.formatMessage(messages.emptyActiveMenuPath)}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Form.Field>
    </div>
  );
};

export default MenuConfigurationWidget;
