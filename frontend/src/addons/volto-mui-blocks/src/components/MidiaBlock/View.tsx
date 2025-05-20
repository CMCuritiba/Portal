import React, { useEffect, useState } from 'react';
import { withBlockExtensions } from '@plone/volto/helpers';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import './style.less';
import config from '@plone/volto/registry';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, Typography } from '@mui/material';

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

const videos = [
  {
    title:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore...',
    date: 'Out 28, 2024 | 10:35',
    embed:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    excerpt: '',
  },
  {
    title:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididu...',
    date: 'Out 28, 2024 | 10:35',
    embed:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    excerpt: '',
  },
  {
    title:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididu...',
    date: 'Out 28, 2024 | 10:35',
    embed:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    excerpt: '',
  },
  {
    title:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididu...',
    date: 'Out 28, 2024 | 10:35',
    embed:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    excerpt: '',
  },
  {
    title:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididu...',
    date: 'Out 28, 2024 | 10:35',
    embed:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    excerpt: '',
  },
];

function createYouTubeEmbed(url, options = {}) {
  const { width = 560, height = 315, allowFullScreen = true } = options;

  // Extrair o ID do vídeo a partir do URL
  const videoId = url?.split('v=')[1]?.split('&')[0] || '';
  if (!videoId) {
    //throw new Error('URL inválida. Certifique-se de que seja um link do YouTube.');
  }

  // Montar o URL de embed
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;
  // Criar o iframe
  return embedUrl;
}

function getYouTubeThumbnail(url) {
  // Verifica se a URL é válida
  const regExp =
    /(?:https?:\/\/)?(?:www\.)?youtu(?:be\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|embed)\/|\S*?[?&]v=)|\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regExp);

  if (match && match[1]) {
    const videoId = match[1];
    // Retorna a URL da thumbnail padrão
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  } else {
    throw new Error('URL inválida do YouTube');
  }
}

const View = (props) => {
  const { data, isEditMode, className, block, classes } = props;
  const { podcasts, lives, institucional } = data;
  const Image = config.getComponent('Image').component;
  const [value, setValue] = React.useState(0);
  const [podcastSelect, setPodcastSelect] = useState(0);
  const [livesSelect, setLivesSelect] = useState(0);
  const [institucionalSelect, setInstitucionalSelect] = useState(0);
  const [autoPlayUseEffectP, setAutoPlayUseEffectP] = useState(false);
  console.log(podcasts, lives, institucional);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    setAutoPlayUseEffectP(false);
  }, [value]);

  return (
    <div className="w-100">
      <div className="midiaBlock">
        <div className="container-block container">
          <div className="stack flex-column-mb">
            <div className="stack row flex-between align-items-center flex-column-mb">
              <div className="options-midia stack row w-100 max-w-855">
                <Button
                  className={value === 0 ? 'tab-top act' : 'tab-top'}
                  onClick={() => setValue(0)}
                >
                  <img src="/icons/institucional.svg" alt="" />
                  CMC Podcast
                </Button>
                <Button
                  className={value === 1 ? 'tab-top act' : 'tab-top'}
                  onClick={() => setValue(1)}
                >
                  <img src="/icons/podcast.svg" alt="" />
                  Ao Vivo
                </Button>
                <Button
                  className={value === 2 ? 'tab-top act' : 'tab-top'}
                  onClick={() => setValue(2)}
                >
                  <img src="/icons/lives.svg" alt="" />
                  Institucionais
                </Button>
              </div>
            </div>
            <CustomTabPanel value={value} index={0}>
              <Stack
                sx={{ gap: '24px' }}
                direction="row"
                className="flex-midia"
              >
                {podcasts?.length > 0 && (
                  <Stack className="flex-2">
                    <Stack className="video-item" spacing={2}>
                      <div className="thumbnail">
                        <iframe
                          title="Video"
                          src={
                            createYouTubeEmbed(podcasts[podcastSelect]?.link) +
                            (autoPlayUseEffectP ? '?autoplay=1' : '')
                          }
                          frameBorder="0"
                          allowFullScreen="true"
                          allow="autoplay"
                        ></iframe>
                        {/*  <img src={podcasts[podcastSelect]?.image + "/@@images/image"} alt={podcasts[podcastSelect]?.title} loading="lazy"/>
                                                    <div className="play">
                                                        <img src="/icons/play.svg"/>
                                                    </div>*/}
                      </div>
                      <h3>{podcasts[podcastSelect]?.title}</h3>
                    </Stack>
                  </Stack>
                )}
                <Stack className="flex-1 small" sx={{ gap: '24px' }}>
                  <Typography
                    sx={{
                      fontSize: '24px',
                      fontFamily: 'Lato, sans-serif',
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  >
                    Assista a seguir
                  </Typography>
                  {podcasts?.slice(0, 3).map((z, i) =>
                    z?.link ? (
                      <Stack
                        className="video-item"
                        sx={{ gap: '10px' }}
                        direction="row"
                        alignItems="center"
                        onClick={() => {
                          setAutoPlayUseEffectP(true);
                          setPodcastSelect(i);
                        }}
                      >
                        <div className="thumbnail">
                          <img
                            src={
                              z?.image
                                ? z?.image + '/@@images/image'
                                : getYouTubeThumbnail(z?.link)
                            }
                            alt={z?.title}
                            loading="lazy"
                          />
                          <div className="play">
                            <img src="/icons/play.svg" alt="Play" />
                          </div>
                        </div>
                        <Stack>
                          <h3>{z?.title}</h3>
                        </Stack>
                      </Stack>
                    ) : (
                      <></>
                    ),
                  )}
                </Stack>
              </Stack>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <Stack
                sx={{ gap: '24px' }}
                direction="row"
                className="flex-midia"
              >
                {lives?.length > 0 && (
                  <Stack className="flex-2">
                    <Stack className="video-item" spacing={2}>
                      <div className="thumbnail">
                        <iframe
                          title={lives[livesSelect]?.title}
                          src={
                            createYouTubeEmbed(lives[livesSelect]?.link) +
                            (autoPlayUseEffectP ? '?autoplay=1' : '')
                          }
                          frameBorder="0"
                          allowFullScreen="true"
                          allow="autoplay"
                        ></iframe>
                        {/*  <img src={podcasts[podcastSelect]?.image + "/@@images/image"} alt={podcasts[podcastSelect]?.title} loading="lazy"/>
                                                    <div className="play">
                                                        <img src="/icons/play.svg"/>
                                                    </div>*/}
                      </div>
                      <h3>{lives[livesSelect]?.title}</h3>
                    </Stack>
                  </Stack>
                )}
                <Stack className="flex-1 small" sx={{ gap: '24px' }}>
                  <Typography
                    sx={{
                      fontSize: '24px',
                      fontFamily: 'Lato, sans-serif',
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  >
                    Assista a seguir
                  </Typography>
                  {lives?.slice(0, 3).map((z, i) =>
                    z?.link ? (
                      <Stack
                        className="video-item"
                        sx={{ gap: '10px' }}
                        direction="row"
                        alignItems="center"
                        onClick={() => {
                          setAutoPlayUseEffectP(true);
                          setLivesSelect(i);
                        }}
                      >
                        <div className="thumbnail">
                          <img
                            src={
                              z?.image
                                ? z?.image + '/@@images/image'
                                : getYouTubeThumbnail(z?.link)
                            }
                            alt={z?.title}
                            loading="lazy"
                          />
                          <div className="play">
                            <img src="/icons/play.svg" alt="Play" />
                          </div>
                        </div>
                        <Stack>
                          <h3>{z?.title}</h3>
                        </Stack>
                      </Stack>
                    ) : (
                      <></>
                    ),
                  )}
                </Stack>
              </Stack>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <Stack
                sx={{ gap: '24px' }}
                direction="row"
                className="flex-midia"
              >
                {institucional?.length > 0 && (
                  <Stack className="flex-2">
                    <Stack className="video-item" spacing={2}>
                      <div className="thumbnail">
                        <iframe
                          src={
                            createYouTubeEmbed(
                              institucional[institucionalSelect]?.link,
                            ) + (autoPlayUseEffectP ? '?autoplay=1' : '')
                          }
                          title={institucional[podcastSelect]?.title}
                          frameBorder="0"
                          allowFullScreen="true"
                          allow="autoplay"
                        ></iframe>
                        {/*  <img src={podcasts[podcastSelect]?.image + "/@@images/image"} alt={podcasts[podcastSelect]?.title} loading="lazy"/>
                                                    <div className="play">
                                                        <img src="/icons/play.svg"/>
                                                    </div>*/}
                      </div>
                      <h3>{institucional[podcastSelect]?.title}</h3>
                    </Stack>
                  </Stack>
                )}
                <Stack className="flex-1 small" sx={{ gap: '24px' }}>
                  <Typography
                    sx={{
                      fontSize: '24px',
                      fontFamily: 'Lato, sans-serif',
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  >
                    Assista a seguir
                  </Typography>
                  {institucional?.slice(0, 3).map((z, i) =>
                    z?.link ? (
                      <Stack
                        className="video-item"
                        sx={{ gap: '10px' }}
                        direction="row"
                        alignItems="center"
                        onClick={() => {
                          setAutoPlayUseEffectP(true);
                          setInstitucionalSelect(i);
                        }}
                      >
                        <div className="thumbnail">
                          <img
                            src={
                              z?.image
                                ? z?.image + '/@@images/image'
                                : getYouTubeThumbnail(z?.link)
                            }
                            alt={z?.title}
                            loading="lazy"
                          />
                          <div className="play">
                            <img src="/icons/play.svg" alt="Play" />
                          </div>
                        </div>
                        <Stack>
                          <h3>{z?.title}</h3>
                        </Stack>
                      </Stack>
                    ) : (
                      <></>
                    ),
                  )}
                </Stack>
              </Stack>
            </CustomTabPanel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withBlockExtensions(View);
