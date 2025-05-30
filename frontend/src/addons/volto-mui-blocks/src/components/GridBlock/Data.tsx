import React, { useEffect, useState } from 'react';
import { BlockDataForm } from '@plone/volto/components';
import { useIntl } from 'react-intl';
import { gridBlockSchema } from './schema';

const GridBlockData = (props) => {
  const {
    data,
    block,
    columns,
    onChangeBlock,
    blocksConfig,
    navRoot,
    contentType,
  } = props;

  const intl = useIntl();
  const schema = gridBlockSchema({ ...props, intl });
  const onChangeField = (id, value) => {
    onChangeBlock(block, {
      ...data,
      [id]: value,
    });
  };

  return (
    <BlockDataForm
      schema={schema}
      columns={columns}
      title={schema.title}
      onChangeField={onChangeField}
      onChangeBlock={onChangeBlock}
      formData={data}
      block={block}
      blocksConfig={blocksConfig}
      navRoot={navRoot}
      contentType={contentType}
    />
  );
};

export default GridBlockData;
