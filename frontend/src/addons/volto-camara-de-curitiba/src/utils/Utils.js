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

export function formatDate(dataUTC) {
  const data = new Date(dataUTC);

  const dataFormatada = data.toLocaleString('pt-BR', {
    timeZone: 'UTC', // Garante que a data seja tratada como UTC
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return dataFormatada;
}

export function formatarIntervaloHorario(startUTC, endUTC) {
  const start = new Date(startUTC);
  const end = new Date(endUTC);

  // Ajusta para o horário local do Brasil (Brasília)
  const opcoesHora = {
    timeZone: 'America/Sao_Paulo',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  const opcoesData = {
    timeZone: 'America/Sao_Paulo',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };

  const mesmaData =
    start.toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' }) ===
    end.toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' });

  const horaInicio = start.toLocaleTimeString('pt-BR', opcoesHora);
  const horaFim = end.toLocaleTimeString('pt-BR', opcoesHora);

  if (mesmaData) {
    return `${horaInicio} - ${horaFim}`;
  } else {
    const dataFim = end.toLocaleDateString('pt-BR', opcoesData);
    return `${horaInicio} - Fim: ${dataFim} - ${horaFim}`;
  }
}


export function formatarDataParaAgenda(dataUTC) {
  const data = new Date(dataUTC);
  const formatadorDia = new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    day: '2-digit',
  });
  const formatadorMes = new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    month: 'short',
  });

  const dia = formatadorDia.format(data);
  const mesFormatado = formatadorMes.format(data).replace('.', '');
  const mesCapitalizado = mesFormatado.charAt(0).toUpperCase() + mesFormatado.slice(1);

  return { dia, mes: mesCapitalizado };
}



