import React, { useEffect, useState } from 'react';
import { withBlockExtensions } from '@plone/volto/helpers';
import Grid from '@mui/material/Grid2';
import Item from '@mui/material/Card';
import { RenderBlocks } from '@plone/volto/components';
import { useLocation } from 'react-router';

const GridBlockView = (props) => {
  const location = useLocation();
  const metadata = props.metadata || props.properties;

  const { data, isEditMode, className, block, classes } = props;
  const [columns, setColumns] = useState(data.columns);
  const [columnsLength, setColumnsLength] = useState(data.columns);

  useEffect(() => {
    setTimeout(() => {
      setColumns(data.columns);
    }, 1000);
  }, [data]);

  return (
    <Grid container spacing={{ xs: 2, md: 3 }}>
      <Grid item size={8}>
        teste
      </Grid>
      <Grid item size={4}></Grid>
    </Grid>
  );
};

export default withBlockExtensions(GridBlockView);
