import React from 'react';
import { withBlockExtensions } from '@plone/volto/helpers';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import './style.less';

const View = () => {
  return (
    <div className="cardsBlockBackground py-32 w-100-w background-white max-w-100">
      <div className="container">
        <h2 className="fs-24 color-dark text-center">Histórias de Curitiba</h2>
        <p className="fs-18 color-gray mb-0 text-center ff-lato">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div className="max-w-mobile-100vw">
          <div className="stack row mt-40 gap-32 grid-cols-3 overflow-auto-mobile child-75vw">
            <div className="item-card back card card-default position-relative">
              <div className="thumbnail">
                <img
                  src="/images/memoria/nossa-memoria-1.png"
                  alt="Especial de Halloween: caça às bruxas em Curitiba"
                  className="aspect-ratio-358-537"
                />
              </div>
              <div className="content stack flex-between gap-24 flex-column ">
                <h3 className="color-white ff-lato fs-20 fw-400">
                  Especial de Halloween: caça às bruxas em Curitiba é tema do
                  CMC Podcasts
                </h3>
                <Button>
                  Veja mais
                  <img src="/icons/ver-mais-background.svg" alt="Ver mais" />
                </Button>
              </div>
            </div>
            <div className="item-card back card card-default position-relative">
              <div className="thumbnail">
                <img
                  src="/images/memoria/nossa-memoria-2.png"
                  alt="Participação popular na política I"
                  className="aspect-ratio-358-537"
                />
              </div>
              <div className="content stack flex-between gap-24 flex-column ">
                <h3 className="color-white ff-lato fs-20 fw-400">
                  Participação popular na política I: três marcos decisivos na
                  história de Curitiba
                </h3>
                <Button>
                  Veja mais
                  <img src="/icons/ver-mais-background.svg" alt="Ver mais" />
                </Button>
              </div>
            </div>
            <div className="item-card back card card-default position-relative">
              <div className="thumbnail">
                <img
                  src="/images/memoria/nossa-memoria-2.png"
                  alt="Participação popular na política II"
                  className="aspect-ratio-358-537"
                />
              </div>
              <div className="content stack flex-between gap-24 flex-column ">
                <h3 className="color-white ff-lato fs-20 fw-400">
                  Participação popular na política II: a luta pela Emancipação
                  do Paraná
                </h3>
                <Button>
                  Veja mais
                  <img src="/icons/ver-mais-background.svg" alt="Ver mais" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-center mt-40 mb-16">
          <Button
            href="/memorias"
            className="button button-secondary"
            component="a"
          >
            Visite nossas memórias
          </Button>
        </div>
      </div>
    </div>
  );
};

export default withBlockExtensions(View);
