import React, { useEffect, useState } from 'react';
import { withBlockExtensions } from '@plone/volto/helpers';
import Grid from '@mui/material/Grid2';
import Item from '@mui/material/Card';
import { RenderBlocks } from '@plone/volto/components';
import { useLocation } from 'react-router';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import './style.less';

function createYouTubeEmbed(url, options = {}) {
  const { width = 560, height = 315, allowFullScreen = true } = options;

  // Extrair o ID do vídeo a partir do URL
  const videoId = url.split('v=')[1]?.split('&')[0];
  if (!videoId) {
    throw new Error(
      'URL inválida. Certifique-se de que seja um link do YouTube.',
    );
  }

  // Montar o URL de embed
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
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
  return (
    <>
      {isEditMode || data?.youtube ? (
        <Stack className="mb-32">
          {isEditMode &&
            (data?.youtube ? (
              <img
                src={getYouTubeThumbnail(data?.youtube)}
                className="iframe"
                title="Live Stream"
                alt="Live Stream"
              />
            ) : (
              <Typography>Insira a URL ao vivo</Typography>
            ))}
          {!isEditMode && data?.youtube && (
            <iframe
              title="Live Stream"
              frameborder="0"
              src={createYouTubeEmbed(data?.youtube)}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              autoplay
            />
          )}
        </Stack>
      ) : (
        <></>
      )}
    </>
  );
};

export default withBlockExtensions(View);
