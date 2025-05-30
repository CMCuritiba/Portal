import { GET_CONTROLPANEL } from '@plone/volto/constants/ActionTypes';

export function getYouTubeEmbedSrc(url) {
  if (!url) return '';
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/;
  const match = url.match(regex);

  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}`;
  } else {
    throw new Error('URL inválida');
  }
}

export function getPartidos(url) {
  return {
    type: GET_CONTROLPANEL,
    request: {
      op: 'get',
      path: url,
    },
  };
}
