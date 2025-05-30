import React, { useEffect, useState } from 'react';
import { withBlockExtensions } from '@plone/volto/helpers';
import Grid from '@mui/material/Grid2';
import Item from '@mui/material/Card';
import { RenderBlocks } from '@plone/volto/components';
import { useLocation } from 'react-router';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import './style.less';
import { Link } from 'react-router-dom';
import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';
const View = (props) => {
  const location = useLocation();
  const metadata = props.metadata || props.properties;

  const { data, isEditMode, className, block, classes } = props;
  console.log(data?.links);
  return (
    <div className="category-block stack row flex-start gap-16 py-26">
      {data?.links?.map(
        (z) =>
          z?.link &&
          z?.color && (
            <Link
              to={z?.link?.length > 0 ? flattenToAppURL(z?.link[0].getURL) : ''}
              className="tag"
              style={{
                backgroundColor: z?.color['background-color'],
                color: z?.color['color'],
                borderRadius: '8px',
                px: 1,
                py: 0.5,
              }}
            >
              {z?.link && z?.title}
            </Link>
          ),
      )}
    </div>
  );
};

export default withBlockExtensions(View);
