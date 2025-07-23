import React from 'react';
import { withBlockExtensions } from '@plone/volto/helpers';
import { SidebarPortal } from '@plone/volto/components';

import Data from './Data';
import View from './View';

const GridBlockEdit = (props) => {
  const { data, onChangeBlock, block, selected } = props;
  return (
    <>
      <View {...props} isEditMode />
      <SidebarPortal selected={selected}>
        <Data data={data} block={block} onChangeBlock={onChangeBlock} />
      </SidebarPortal>
    </>
  );
};

export default withBlockExtensions(GridBlockEdit);
