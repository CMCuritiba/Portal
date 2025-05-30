import React from 'react';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Footer = () => {
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
          <div className="stack row flex-between gap-24 stack-footer flex-column-mb">
            <Stack className="column min-w-224 pr-32" sx={{ gap: '17px' }}>
              <img
                src="/logo-footer.svg"
                alt="Logo CMC"
                className="max-w-150"
              />
              <Typography>© 2025</Typography>
              <Link to="/">Termos de privacidade</Link>
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
              <Stack className="column a-menus" sx={{ gap: '6px' }}>
                <h3 className="fs-16 fw-700 text-white">Atendimento</h3>
                <a href="/link-destino">Avaliação de Satisfação</a>
                <a href="/link-destino">Carta de Serviços</a>
                <a href="/link-destino">Fale com a Câmara</a>
                <a href="/link-destino">Ouvidoria</a>
                <a href="/link-destino">Procuradoria da Mulher</a>
                <a href="/link-destino">Sala da Defensoria</a>
                <a href="/link-destino">
                  Serviço de Informação ao Cidadão (SIC)
                </a>
                <a href="/link-destino">Visite a Câmara</a>
              </Stack>
              <Stack className="column a-menus" sx={{ gap: '6px' }}>
                <h3 className="fs-16 fw-700 text-white">
                  Atividade Parlamentar
                </h3>
                <a href="/link-destino">Agenda da Câmara</a>
                <a href="/link-destino">Agora é Lei</a>
                <a href="/link-destino">Audiências Públicas</a>
                <a href="/link-destino">Comissões</a>
                <a href="/link-destino">
                  Conselho de Ética e Decoro Parlamentar
                </a>
                <a href="/link-destino">Painel de Atividades Legislativas</a>
                <a href="/link-destino">Projetos de Lei e Requerimentos</a>
                <a href="/link-destino">Sessões da Câmara</a>
                <a href="/link-destino">Tribuna Livre</a>
              </Stack>
              <Stack className="column a-menus" sx={{ gap: '6px' }}>
                <h3 className="fs-16 fw-700 text-white">Comunicação</h3>
                <a href="/link-destino">CMC Podcasts</a>
                <a href="/link-destino">Fotos</a>
                <a href="/link-destino">Histórias de Curitiba</a>
                <a href="/link-destino">Notícias</a>
                <a href="/link-destino">Projetos Especiais</a>
                <a href="/link-destino">Redes Sociais</a>
                <a href="/link-destino">Sala de Imprensa</a>
                <a href="/link-destino">TV Câmara</a>
              </Stack>
              <Stack className="column a-menus" sx={{ gap: '6px' }}>
                <h3 className="fs-16 fw-700 text-white">Institucional</h3>
                <a href="/link-destino">Administração da Câmara</a>
                <a href="/link-destino">Concurso Público</a>
                <a href="/link-destino">Conheça a Câmara</a>
                <a href="/link-destino">Escola do Legislativo</a>
                <a href="/link-destino">Instruções Normativas</a>
                <a href="/link-destino">Programa de Estágio</a>
                <a href="/link-destino">Servidores da Câmara</a>
              </Stack>

              <Stack className="column a-menus" sx={{ gap: '6px' }}>
                <h3 className="fs-16 fw-700 text-white">Participe</h3>
                <a href="/link-destino">Banco de Ideias Legislativas</a>
                <a href="/link-destino">Consultas Públicas</a>
                <a href="/link-destino">Parlamento Jovem</a>
                <a href="/link-destino">WhatsApp da Câmara</a>
              </Stack>

              <Stack className="column a-menus" sx={{ gap: '6px' }}>
                <h3 className="fs-16 fw-700 text-white mt-32">
                  Serviços internos
                </h3>
                <a href="/link-destino">E-mail da Câmara</a>
                <a href="/link-destino">Portal Recursos Humanos</a>
                <a href="/link-destino">Ramais Administrativos</a>
                <a href="/link-destino">Registro de Frequência</a>
                <a href="/link-destino">Sistema de Almoxarifado</a>
                <a href="/link-destino">Sistema de Chamados</a>
                <a href="/link-destino">SPA - Processo Administrativo</a>
                <a href="/link-destino">SPAE - Processo Eletrônico</a>
                <a href="/link-destino">SPL - Vereadores</a>
              </Stack>

              <Stack className="column a-menus" sx={{ gap: '6px' }}>
                <h3 className="fs-16 fw-700 text-white">Transparência</h3>
                <a href="/link-destino">Controladoria do Legislativo</a>
                <a href="/link-destino">Julgamento das Contas da Prefeitura</a>
                <a href="/link-destino">Leis de Curitiba e Atos da Câmara</a>
                <a href="/link-destino">Orçamento de Curitiba</a>
                <a href="/link-destino">Perguntas Frequentes</a>
                <a href="/link-destino">Prestação de Contas da Câmara</a>
                <a href="/link-destino">Política de Proteção de Dados (LGPD)</a>
                <a href="/link-destino">Portal da Transparência</a>
                <a href="/link-destino">Radar da Transparência Pública</a>
              </Stack>

              <Stack className="column a-menus" sx={{ gap: '6px' }}>
                <h3 className="fs-16 fw-700 text-white">Vereadores</h3>
                <a href="/link-destino">Conheça os Vereadores</a>
                <a href="/link-destino">Corregedoria</a>
                <a href="/link-destino">Frentes Parlamentares</a>
                <a href="/link-destino">Lideranças e Blocos Parlamentares</a>
                <a href="/link-destino">Mesa Diretora</a>
                <a href="/link-destino">Participação em Conselhos</a>
              </Stack>
            </div>
          </div>
        </div>
      </Stack>
    </Stack>
  );
};

export default Footer;
