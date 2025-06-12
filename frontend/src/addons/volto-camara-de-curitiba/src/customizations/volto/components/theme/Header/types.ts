export interface HeaderProps {
  pathname?: string;
  content?: any;
  token?: string;
  settings?: any;
}

export interface MenuItemProps {
  id: string;
  title: string;
  url: string;
  items?: MenuItemProps[];
}

export interface MenuHeaderItem {
  mode: 'simpleLink' | 'linkExternal';
  title: string;
  linkUrl?: Array<{ '@id': string }>;
  link_external?: string;
}

export interface MenuItem {
  title: string;
  items: string[];
}
