import React from 'react';
import PropTypes from 'prop-types';
import iconSVG from './../../icons/logo-camara.svg';
import { Icon } from '@plone/volto/components';
import Stack from '@mui/material/Stack';
import { Grid } from '@mui/system';

import Container from '@mui/material/Container';
import { makeStyles } from '@mui/material';

const GridBlockWrapper = ({ ratio, html, size, columns, data }) => {
  const style = { aspectRatio: ratio };
  return html;
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  grid: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  span: {
    border: '1px solid pink',
    backgroundColor: 'lightpink`',
  },
  span2: {
    border: '1px solid green',
    backgroundColor: 'lightgreen',
  },
  span3: {
    border: '1px solid blue',
    backgroundColor: 'lightblue',
  },
}));

const GridBlockViewDefault = (props) => {
  const { isEditMode, columns, className } = props;

  return (
    <Container>
      <Stack
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        direction="row"
      >
        {columns?.map((column) => (
          <Stack sx={{ flex: column.offset }}>Teste</Stack>
        ))}
      </Stack>
    </Container>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
GridBlockViewDefault.propTypes = {
  columns: PropTypes.array,
};

/**
 * Default properties.
 * @property {Object} defaultProps Default properties.
 * @static
 */
GridBlockViewDefault.defaultProps = {
  columns: [],
  //align: 'center',
  //size: 'l',
};
export default GridBlockViewDefault;
