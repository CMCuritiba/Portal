import React, { useEffect, useState } from 'react';
import { withBlockExtensions } from '@plone/volto/helpers';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import './style.less';
import config from '@plone/volto/registry';
import { flattenToAppURL } from '@plone/volto/helpers';
const Image = config.getComponent({ name: 'Image' }).component;

const View = (props) => {
  const { data, isEditMode, className, block, classes } = props;
  const Image = config.getComponent('Image').component;
  return (
    <Stack className="banners-sidebar" spacing={4}>
      {data?.links?.map((z) => (
        <Link
          to="/"
          onClick={(e) => {
            isEditMode ? e.preventDefault() : '';
          }}
        >
          {z?.image && (
            <img
              className={''}
              loading="lazy"
              src={
                flattenToAppURL(z?.image[0]?.getId) +
                '/' +
                flattenToAppURL(z?.image[0]?.image_scales?.image[0]?.download)
              }
            />
          )}
        </Link>
      ))}
    </Stack>
  );
};

export default withBlockExtensions(View);
