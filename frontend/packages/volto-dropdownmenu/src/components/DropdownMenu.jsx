import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { defineMessages, useIntl } from 'react-intl';
import { Segment, Container, Button } from 'semantic-ui-react';
import { map } from 'lodash';
import cx from 'classnames';
import ConditionalLink from '@plone/volto/components/manage/ConditionalLink/ConditionalLink';
import {
  getBlocksFieldname,
  getBlocksLayoutFieldname,
  hasBlocksData,
} from '@plone/volto/helpers/Blocks/Blocks';
import { flattenToAppURL, getBaseUrl } from '@plone/volto/helpers/Url/Url';
import config from '@plone/volto/registry';

import './dropdownmenu.css';

const messages = defineMessages({
  unknownBlock: {
    id: 'Unknown Block',
    defaultMessage: 'Unknown Block {block}',
  },
  closeMenu: {
    id: 'dropdownmenu-close-menu-button',
    defaultMessage: 'Close menu',
  },
});

// SVGs para ícones
const CloseSVG = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M6 6l8 8M6 14L14 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
);
const ChevronDownSVG = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
);
const ChevronUpSVG = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 10l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
);
const ArrowRightSVG = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 8h8M10 5l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
);

// Componente para renderizar itens de submenu
const SubmenuItem = ({ item, closeMenu }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const hasSubmenu = item.submenu && item.submenu.length > 0;
  
  return (
    <li className={cx('submenu-item', { 'has-submenu': hasSubmenu })}>
      <div className="submenu-item-content">
        <NavLink 
          to={flattenToAppURL(item['@id'])}
          onClick={closeMenu}
          className="submenu-link"
        >
          <span>{item.title}</span>
        </NavLink>
        {hasSubmenu && (
          <Button
            basic
            onClick={() => setIsOpen(!isOpen)}
            className="submenu-toggle"
            aria-label={isOpen ? 'Fechar submenu' : 'Abrir submenu'}
          >
            {isOpen ? <ChevronUpSVG /> : <ChevronDownSVG />}
          </Button>
        )}
      </div>
      {hasSubmenu && isOpen && (
        <ul className="submenu-level-2">
          {item.submenu.map((subItem, idx) => (
            <li key={`submenu-${item['@id']}-${idx}`}>
              <NavLink 
                to={flattenToAppURL(subItem['@id'])}
                onClick={closeMenu}
              >
                <span>{subItem.title}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

const DropdownMenu = ({ menu, open = false, closeMenu }) => {
  const intl = useIntl();
  const location = useLocation();
  const blocksFieldname = getBlocksFieldname(menu);
  const blocksLayoutFieldname = getBlocksLayoutFieldname(menu);
  const { clickableNavigationRoots = true } = menu;
  const navItemWidth = menu.navigationRoot?.length > 1 ? 3 : 4;
  const blocksWidth =
    menu.navigationRoot?.length === 1
      ? 8
      : menu.navigationRoot?.length > 2 || menu.navigationRoot?.length === 0
        ? 12
        : 6;
  let hasBlocks = hasBlocksData(menu);
  if (menu?.blocks && Object.keys(menu.blocks).length === 1) {
    let b = menu.blocks[Object.keys(menu.blocks)[0]];
    if (b['@type'] === 'text' && (!b.text || b.text?.length === 0)) {
      hasBlocks = false;
    }
  }

  const lastLinkEventListener = (e) => {
    if (e.code === 'Tab') {
      document
        .querySelector(
          '.dropdown-menu-wrapper.open button.dropdown-close-button',
        )
        .focus();
    }
  };

  useEffect(() => {
    const links = document.querySelectorAll('.dropdown-menu-wrapper.open a');
    const lastLink = links[links.length - 1];
    if (lastLink) {
      lastLink.addEventListener('keydown', lastLinkEventListener);
    }
  });

  return (
    <div
      className={cx('dropdown-menu-wrapper', {
        open,
        'multi-navigation-root': menu.navigationRoot?.length > 1,
      })}
      aria-hidden={!open}
      tabIndex={-1}
      role="menu"
    >
      <div className="dropdown-menu-inner">
        <Segment>
          <div className="dropdownmenu-close-button-wrapper">
            <Button
              className="dropdown-close-button"
              onClick={closeMenu}
              title={intl.formatMessage(messages.closeMenu)}
              basic
              size="mini"
            >
              <CloseSVG />
            </Button>
          </div>
          <Grid container>
            {menu.navigationRoot?.map((navRoot) => (
              <Grid.Column width={navItemWidth} key={navRoot['@id']}>
                <h2>
                  <ConditionalLink
                    to={flattenToAppURL(navRoot['@id'])}
                    condition={
                      menu.navigationRoot?.length > 1 &&
                      clickableNavigationRoots
                    }
                  >
                    <span>{navRoot.title}</span>
                  </ConditionalLink>
                </h2>
                {navRoot.items?.length > 0 && (
                  <ul>
                    {navRoot.items?.map((navItem, idx) => (
                      <SubmenuItem 
                        key={navRoot['@id'] + idx} 
                        item={navItem} 
                        closeMenu={closeMenu}
                      />
                    ))}
                  </ul>
                )}
              </Grid.Column>
            ))}
            {hasBlocks && (
              <Grid.Column
                width={blocksWidth}
                className="dropdownmenu-blocks-column"
              >
                {map(menu[blocksLayoutFieldname].items, (block) => {
                  const blockType = menu[blocksFieldname]?.[block]?.['@type'];
                  if (['title', 'pageDescription'].indexOf(blockType) > -1)
                    return null;

                  const Block =
                    config.blocks.blocksConfig[blockType]?.['view'] ?? null;
                  return Block !== null ? (
                    <Block
                      key={block}
                      id={block}
                      properties={menu}
                      data={menu[blocksFieldname][block]}
                      path={getBaseUrl(location?.pathname || '')}
                    />
                  ) : (
                    <div key={block}>
                      {intl.formatMessage(messages.unknownBlock, {
                        block: menu[blocksFieldname]?.[block]?.['@type'],
                      })}
                    </div>
                  );
                })}
              </Grid.Column>
            )}
          </Grid>
          {menu.showMoreLink?.length > 0 && menu.showMoreText?.length > 0 && (
            <Container className="dropdownmenu-footer">
              <NavLink
                to={flattenToAppURL(menu.showMoreLink[0]['@id']) ?? '#'}
                onClick={closeMenu}
              >
                <span>{menu.showMoreText}</span>
                <ArrowRightSVG />
              </NavLink>
            </Container>
          )}
        </Segment>
      </div>
    </div>
  );
};

export default DropdownMenu;
