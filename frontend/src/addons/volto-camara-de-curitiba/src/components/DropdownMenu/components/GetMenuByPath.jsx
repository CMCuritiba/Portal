/**
 * Navigation components.
 * @module components/theme/Navigation/Navigation
 */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { defineMessages, useIntl } from 'react-intl';
import config from '@plone/volto/registry';

import { getItemsByPath } from '../utils';

const GetMenuByPath = (pathname, type) => {
  const dropdownMenuNavItems = useSelector(
    (state) => state.dropdownMenuNavItems?.result,
  );
  const menu = getItemsByPath(dropdownMenuNavItems, pathname);
  return menu;
};

export default GetMenuByPath;
