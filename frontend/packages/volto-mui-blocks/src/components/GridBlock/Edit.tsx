import React from 'react';
import { withBlockExtensions } from '@plone/volto/helpers';
import { SidebarPortal } from '@plone/volto/components';

import GridBlockData from './Data';
import GridBlockView from './View';

const GridBlockEdit = (props) => {
  const { data, onChangeBlock, block, selected } = props;
  return (
    <>
      <GridBlockView {...props} isEditMode />
      <SidebarPortal selected={selected}>
        <GridBlockData
          data={data}
          block={block}
          onChangeBlock={onChangeBlock}
        />
      </SidebarPortal>
    </>
  );
};

export default withBlockExtensions(GridBlockEdit);
