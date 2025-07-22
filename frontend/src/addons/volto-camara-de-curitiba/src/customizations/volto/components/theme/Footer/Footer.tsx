import React from 'react';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import {getMenuByPath} from "../../../../../components/DropdownMenu/utils";
import {flattenToAppURL} from "@plone/volto/helpers/Url/Url";

const Footer = () => {
const footerMenu = getMenuByPath("/", "") || [];
const termosPoliticas = getMenuByPath("/termos-e-politicas", "") || [];

console.log("termosPoliticas", termosPoliticas)

  return (
    <Stack className="footer-ind">
      <Stack className="pesquisa">
        <div className="container">
          <Stack
            direction="row"
            sx={{ gap: '48px' }}
            alignItems="center"
            justifyContent="center"
            className="mobile-flex-direction-col"
          >
            <div className="info">
              <h2>Foi fácil encontrar o que buscava?</h2>
              <p>Agradecemos sua participação.</p>
            </div>
            <div className="flex-buttons">
              <Button className="button-primary">Sim</Button>
              <Button className="button-secondary">Não</Button>
            </div>
          </Stack>
        </div>
      </Stack>
      <Stack className={'footer-stack'}>
        <div className="container">
          <div className="stack row flex-between gap-24 stack-footer flex-column-reverse-mb">
            <Stack className="column min-w-224 pr-32" sx={{ gap: '17px' }}>
              <img
                src="/logo-footer.svg"
                alt="Logo CMC"
                className="max-w-150"
              />
              <Typography>© 2025</Typography>
                <div>
                    {
                        termosPoliticas?.map((menu, index) => (
                            <div key={index}>
                                {
                                    menu?.mode === 'simpleLink' &&
                                    <Link to={flattenToAppURL(menu?.linkUrl?.[0]?.['@id'])}
                                          title={menu?.title}>{menu?.title}</Link>
                                }
                                {
                                    menu?.mode === 'external' &&
                                    <a href={menu?.link_external} target="_blank"
                                       title={menu?.title}>{menu?.title}</a>
                                }
                            </div>
                        ))
                    }
                </div>
              <Stack direction="row" sx={{ gap: '16px' }}>
                <a href="/link-destino">
                  <img
                    src="/icons/instagram.svg"
                    alt="Instagram da Câmara de Curitiba"
                  />
                </a>
                <a href="/link-destino">
                  <img
                    src="/icons/facebook.svg"
                    alt="Facebook da Câmara de Curitiba"
                  />
                </a>
                <a href="/link-destino">
                  <img
                    src="/icons/twitter.svg"
                    alt="Twitter da Câmara de Curitiba"
                  />
                </a>
                <a href="/link-destino">
                  <img
                    src="/icons/youtube.svg"
                    alt="Youtube da Câmara de Curitiba"
                  />
                </a>
                <a href="/link-destino">
                  <img
                    src="/icons/discord.svg"
                    alt="Discord da Câmara de Curitiba"
                  />
                </a>
                <a href="/link-destino">
                  <img
                    src="/icons/spotify.svg"
                    alt="Spotify da Câmara de Curitiba"
                  />
                </a>
              </Stack>
            </Stack>
            <div className="grid-col-4 gap-18 gap-y-24 flex-column-mb flex-mb">
                {
                    footerMenu?.map((menu, index) => (
                        <Stack className="column a-menus" sx={{ gap: '6px' }} key={index}>
                            <h3 className="fs-16 fw-700 text-white">{menu?.title}</h3>
                            {
                                   menu?.submenu.map((submenu, index) => (
                                       <>
                                           {
                                               submenu?.mode === 'simpleLink' &&
                                               <Link to={flattenToAppURL(submenu?.linkUrl?.[0]?.['@id'])}
                                                     title={submenu?.title}>{submenu?.title}</Link>
                                           }
                                           {
                                               submenu?.mode === 'external' &&
                                               <a href={submenu?.link_external} target="_blank"
                                                  title={submenu?.title}>{submenu?.title}</a>
                                           }
                                       </>
                                   ))
                            }
                        </Stack>
                    ))
                }
            </div>
          </div>
        </div>
      </Stack>
    </Stack>
  );
};

export default Footer;
