/**
 * Navigation components.
 * @module components/theme/Navigation/Navigation
 */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { defineMessages, useIntl } from 'react-intl';
import { Menu, Button } from 'semantic-ui-react';
import cx from 'classnames';
import OutsideClickHandler from 'react-outside-click-handler';
import config from '@plone/volto/registry';

import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';

import DropdownMenu from '../../../../components/DropdownMenu';
import { getDropdownMenuNavitems } from '../../../../actions';
import { getItemsByPath } from '../../../../utils';

const messages = defineMessages({
  closeMobileMenu: {
    id: 'Close menu',
    defaultMessage: 'Close menu',
  },
  openMobileMenu: {
    id: 'Open menu',
    defaultMessage: 'Open menu',
  },
  dropdownmenu_aria: {
    id: 'Main navigation',
    defaultMessage: 'Main navigation',
  },
});

// SVG para seta de dropdown
const DropdownArrowSVG = ({ open }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
  >
    <path d="M5 7l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const Navigation = ({ pathname, type }) => {
  const { settings } = config;
  const token = useSelector((state) => state.userSession?.token);
  const intl = useIntl();
  const { lang } = intl.locale;
  const dispatch = useDispatch();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdownIndex, setOpenDropodownIndex] = useState(-1);

  const dropdownMenuNavItems = useSelector(
    (state) => state.dropdownMenuNavItems?.result,
  );

  useEffect(() => {
    dispatch(getDropdownMenuNavitems());
  }, [dispatch, token]);

  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenDropodownIndex(-1);
  }, [pathname]);

  const getAnchorTarget = (nodeElement) => {
    if (nodeElement.nodeName === 'A') {
      return nodeElement;
    } else if (nodeElement.parentElement?.nodeName === 'A') {
      return nodeElement.parentElement;
    } else {
      return null;
    }
  };

  useEffect(() => {
    const clickListener = (e) => {
      const targetItem = getAnchorTarget(e.target);
      const dropdownmenuLinks = [
        ...(document?.querySelectorAll(
          '.navigation-dropdownmenu .dropdown-menu-wrapper ul li a, .navigation-dropdownmenu .dropdown-menu-wrapper h2 a, .navigation-dropdownmenu .dropdownmenu-blocks-column a, .dropdownmenu-footer a, .navigation-dropdownmenu .menu > a',
        ) ?? []),
      ];

      if (
        dropdownmenuLinks?.length > 0 &&
        dropdownmenuLinks?.indexOf(targetItem) >= 0
      ) {
        setOpenDropodownIndex(-1);
        setMobileMenuOpen(false); //close mobile menu
      }
    };

    document.body.addEventListener('click', clickListener);

    return () => document.body.removeEventListener('click', clickListener);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('mobile-menu-opened'); //to prevent scroll body
    } else {
      document.body.classList.remove('mobile-menu-opened'); //re-enable scroll body
    }
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdownMenu = (index) => {
    if (openDropdownIndex === index) setOpenDropodownIndex(-1);
    else setOpenDropodownIndex(index);
  };

  const isMenuActive = (item) => {
    const paths = [...(item.navigationRoot ?? [])];
    if (item.showMoreLink?.length > 0) {
      paths.push(item.showMoreLink[0]);
    }

    return paths.reduce(
      (acc, path) =>
        acc ||
        flattenToAppURL(pathname).indexOf(flattenToAppURL(path['@id'])) > -1,
      false,
    );
  };

  const menu = getItemsByPath(dropdownMenuNavItems, pathname);

  console.log('menu', menu);
  return (
    <nav
      className="navigation navigation-dropdownmenu"
      role="navigation"
      aria-label={intl.formatMessage(messages.dropdownmenu_aria)}
    >
      <OutsideClickHandler
        onOutsideClick={() => {
          setOpenDropodownIndex(-1);
          if (isMobileMenuOpen) {
            setMobileMenuOpen(false);
          }
        }}
      >
        <div className="hamburger-wrapper mobile tablet only">
          <button
            className={cx('hamburger hamburger--collapse', {
              'is-active': isMobileMenuOpen,
            })}
            aria-label={
              isMobileMenuOpen
                ? intl.formatMessage(messages.closeMobileMenu, {
                    type,
                  })
                : intl.formatMessage(messages.openMobileMenu, {
                    type,
                  })
            }
            title={
              isMobileMenuOpen
                ? intl.formatMessage(messages.closeMobileMenu, {
                    type,
                  })
                : intl.formatMessage(messages.openMobileMenu, {
                    type,
                  })
            }
            type="button"
            onClick={toggleMobileMenu}
          >
            <span className="hamburger-box">
              <span className="hamburger-inner" />
            </span>
          </button>
        </div>
        <Menu
          stackable
          pointing
          secondary
          className={
            isMobileMenuOpen ? 'open' : 'computer large screen widescreen only'
          }
        >
          {menu?.length > 0
            ? menu
                ?.filter((item) => item.visible)
                ?.filter(
                  (item) =>
                    item.mode === 'dropdown' || item.linkUrl?.[0]?.['@id'],
                )
                ?.map((item, index) =>
                  item.mode === 'simpleLink' ? (
                    <NavLink
                      to={flattenToAppURL(item.linkUrl?.[0]?.['@id'])}
                      key={'simplelink-' + index}
                      className={cx('item', {
                        [item.additionalClasses]:
                          item.additionalClasses?.length > 0,
                      })}
                      activeClassName="active"
                      exact={
                        settings.isMultilingual
                          ? item.linkUrl?.[0]?.['@id'] === `/${lang}`
                          : item.linkUrl?.[0]?.['@id'] === ''
                      }
                    >
                      <span>{item.title}</span>
                    </NavLink>
                  ) : (
                    <React.Fragment key={'dropdown-' + index}>
                      <Button
                        className={cx('item', 'dropdownmenu-item', {
                          open: openDropdownIndex === index,
                          active: isMenuActive(item),
                          [item.additionalClasses]:
                            item.additionalClasses?.length > 0,
                        })}
                        onClick={() => toggleDropdownMenu(index)}
                        aria-expanded={
                          openDropdownIndex === index ? true : false
                        }
                        aria-haspopup={true}
                      >
                        <span>{item.title}</span>
                        <DropdownArrowSVG open={openDropdownIndex === index} />
                      </Button>
                      <DropdownMenu
                        menu={item}
                        open={openDropdownIndex === index}
                        closeMenu={() => setOpenDropodownIndex(-1)}
                      />
                    </React.Fragment>
                  ),
                )
            : null}
        </Menu>
      </OutsideClickHandler>
    </nav>
  );
};

export default Navigation;
