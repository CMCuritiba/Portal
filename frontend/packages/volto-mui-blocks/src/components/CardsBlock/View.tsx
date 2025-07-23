import React, { useEffect, useState } from 'react';
import { withBlockExtensions } from '@plone/volto/helpers';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import './style.less';
import config from '@plone/volto/registry';
import Box from '@mui/material/Box';
import { Button, Card, Typography } from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      className="box"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: '40px' }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const View = (props) => {
  const { data, isEditMode, className, block, classes } = props;
  const Image = config.getComponent('Image').component;

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Stack sx={{ py: '32px' }} className="cardsBlock">
      <Typography variant="h2">Você deveria saber</Typography>
      <Typography>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Typography>
      <Stack
        sx={{ gap: '32px', mt: '40px' }}
        direction="row"
        className="cards-flex"
      >
        <Card className="item-card">
          <div className="thumbnail">
            <img src="/images/institucional/item-1.png" alt="" />
          </div>
          <Stack
            className="info"
            sx={{ gap: '24px' }}
            justifyContent="space-between"
          >
            <Typography variant="h3">Legislação e Projetos de Lei</Typography>
            <Button>
              Veja mais
              <img src="/icons/ver-mais.svg" alt="Ver mais" />
            </Button>
          </Stack>
        </Card>
        <Card className="item-card">
          <div className="thumbnail">
            <img src="/images/institucional/item-2.png" alt="" />
          </div>
          <Stack
            className="info"
            sx={{ gap: '24px' }}
            justifyContent="space-between"
          >
            <Typography variant="h3">Institucional</Typography>
            <Button>
              Veja mais
              <img src="/icons/ver-mais.svg" alt="Ver mais" />
            </Button>
          </Stack>
        </Card>
        <Card className="item-card">
          <div className="thumbnail">
            <img src="/images/institucional/item-3.png" alt="" />
          </div>
          <Stack
            className="info"
            sx={{ gap: '24px' }}
            justifyContent="space-between"
          >
            <Typography variant="h3">Ordem do dia</Typography>
            <Button>
              Veja mais
              <img src="/icons/ver-mais.svg" alt="Ver mais" />
            </Button>
          </Stack>
        </Card>
        <Card className="item-card">
          <div className="thumbnail">
            <img src="/images/institucional/item-4.png" alt="" />
          </div>
          <Stack
            className="info"
            sx={{ gap: '24px' }}
            justifyContent="space-between"
          >
            <Typography variant="h3">Comissões</Typography>
            <Button>
              Veja mais
              <img src="/icons/ver-mais.svg" alt="Ver mais" />
            </Button>
          </Stack>
        </Card>
      </Stack>
    </Stack>
  );
};

export default withBlockExtensions(View);
