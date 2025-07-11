import {useSelector} from "react-redux";

export function getItemsByPath(items, pathname) {
  let rootPathConfig = null;
  const itemsByPath = Array.isArray(items)
    ? items?.reduce((acc, val) => {
        if (val.rootPath === '/') {
          rootPathConfig = val;
          return acc;
        }
        return { ...acc, [val.rootPath]: val };
      }, {})
    : [];
  const matchingPaths = Object.keys(itemsByPath)
    .filter((path) => pathname === path || pathname.startsWith(`${path}/`))
    .sort((a, b) => {
      if (a.length > b.length) return -1;
      else if (a.length < b.length) return 1;
      else return 0;
    });

  if (matchingPaths.length > 0) return itemsByPath[matchingPaths[0]].items;
  else if (rootPathConfig) return rootPathConfig.items;
  else return [];
}

export function getMenuByPath(pathname, type) {
  const dropdownMenuNavItems = useSelector(
    (state) => state.dropdownMenuNavItems?.result,
  );
  const menu = getItemsByPath(dropdownMenuNavItems, pathname);
  return menu;
}
