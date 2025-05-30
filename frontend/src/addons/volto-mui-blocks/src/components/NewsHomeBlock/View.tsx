import React from 'react';
import { withBlockExtensions } from '@plone/volto/helpers';
import { UniversalLink } from '@plone/volto/components';
import Stack from '@mui/material/Stack';
import './style.less';
import { Card, Typography } from '@mui/material';

interface ViewProps {
  isEditMode?: boolean;
  data?: any;
  className?: string;
  block?: any;
  classes?: any;
}

const View: React.FC<ViewProps> = ({ isEditMode }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isEditMode) {
      e.preventDefault();
    }
  };

  const linkProps = {
    href: '/',
    onClick: handleClick,
    openLinkInNewTab: false,
  };

  return (
    <div className="stack gap-24">
      <div className="card-default">
        <Stack sx={{ p: '24px', gap: '16px' }} direction="column">
          <Stack direction="row" justifyContent="flex-start">
            <Typography
              className="tag"
              sx={{
                backgroundColor: 'var(--Support-3, #102A4D)',
                color: 'white',
                borderRadius: '8px',
                px: 1,
                py: 0.5,
              }}
            >
              Legislação e Projetos de Lei
            </Typography>
          </Stack>
          <UniversalLink {...linkProps}>
            <Typography variant="h2">
              Flexibilização da publicidade em eventos esportivos entrará em
              vigor em 2025
            </Typography>
          </UniversalLink>
          <Typography className="excerpt">
            A regulamentação foi aprovada pela Câmara Municipal de Curitiba em
            outubro.
          </Typography>
          <Typography className="tags">
            Tags: #Saúde #Vereadores #AtuaçãoParlamentar
          </Typography>
        </Stack>
        <Stack className="thumbnail">
          <UniversalLink {...linkProps}>
            <img
              src="/images/mock/img.png"
              alt="Imagem da notícia"
              loading="lazy"
            />
          </UniversalLink>
        </Stack>
      </div>
      <Stack direction="row" sx={{ gap: '24px' }}>
        <Card className="card-default small">
          <Stack sx={{ p: '24px', gap: '16px' }} direction="column">
            <Stack direction="row" justifyContent="flex-start">
              <Typography
                className="tag"
                sx={{
                  backgroundColor: 'var(--Support-3, #B2C8D3)',
                  color: 'black',
                  borderRadius: '8px',
                  px: 1,
                  py: 0.5,
                }}
              >
                Audiências Públicas e Comissões
              </Typography>
            </Stack>
            <UniversalLink {...linkProps}>
              <Typography variant="h2">
                Dia da Parada da Diversidade LGBTI+ de Curitiba ganha
                substitutivo geral
              </Typography>
            </UniversalLink>
          </Stack>
          <Stack className="thumbnail">
            <UniversalLink {...linkProps}>
              <img
                src="/images/news/news-2.png"
                alt="Imagem da notícia"
                loading="lazy"
              />
            </UniversalLink>
          </Stack>
        </Card>
        <Card className="card-default small">
          <Stack sx={{ p: '24px', gap: '16px' }} direction="column">
            <Stack direction="row" justifyContent="flex-start">
              <Typography
                className="tag"
                sx={{
                  backgroundColor: '#FFAB00',
                  color: 'black',
                  borderRadius: '8px',
                  px: 1,
                  py: 0.5,
                }}
              >
                Conheça os Vereadores
              </Typography>
            </Stack>
            <UniversalLink {...linkProps}>
              <Typography variant="h2">
                Servidores de Curitiba: reajuste de 4,42% será votado em
                urgência
              </Typography>
            </UniversalLink>
          </Stack>
          <Stack className="thumbnail">
            <UniversalLink {...linkProps}>
              <img
                src="/images/news/news-3.png"
                alt="Imagem da notícia"
                loading="lazy"
              />
            </UniversalLink>
          </Stack>
        </Card>
      </Stack>
    </div>
  );
};

export default withBlockExtensions(View);
