/**
 * Navigation components.
 * @module components/theme/Navigation/Navigation
 */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { defineMessages, useIntl } from 'react-intl';
import { Menu, Button, Icon } from 'semantic-ui-react';
import cx from 'classnames';
import OutsideClickHandler from 'react-outside-click-handler';
import config from '@plone/volto/registry';

import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';

import { getDropdownMenuNavitems } from '../actions';
import { getItemsByPath } from '../utils';

const Destaques = (pathname, type) => {
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
  return menu;
};

export default Destaques;
