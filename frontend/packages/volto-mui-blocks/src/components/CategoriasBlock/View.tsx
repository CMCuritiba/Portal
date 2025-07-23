import React, { useEffect, useState } from 'react';
import { withBlockExtensions } from '@plone/volto/helpers';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import './style.less';
import config from '@plone/volto/registry';
import { flattenToAppURL } from '@plone/volto/helpers';
import { Button, Card, Typography } from '@mui/material';

const Image = config.getComponent({ name: 'Image' }).component;

const View = (props) => {
  const { data, isEditMode, className, block, classes } = props;
  const Image = config.getComponent('Image').component;
  return (
    <div className="stack gap-24 categorias-block py-80">
      <div className="container w-100-w">
        <div className="categorias w-100">
          <h2 className="title-back">Categorias</h2>
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
                <Typography variant="h3">
                  Legislação e Projetos de Lei
                </Typography>
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
        </div>
      </div>
    </div>
  );
};

export default withBlockExtensions(View);
