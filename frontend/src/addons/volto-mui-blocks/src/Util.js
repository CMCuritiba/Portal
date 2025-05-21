export function formatarIntervaloHorario(startUTC, endUTC) {
  const start = new Date(startUTC);
  const end = new Date(endUTC);

  const timeZone = 'America/Sao_Paulo';

  // Formatação das horas no formato 24h
  const opcoesHora = {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  const horaInicio = start.toLocaleTimeString('pt-BR', opcoesHora);
  const horaFim = end.toLocaleTimeString('pt-BR', opcoesHora);

  // Formatação de data completa no formato dd/MM/yyyy
  const formatarDataCompleta = (data) => {
    return new Intl.DateTimeFormat('pt-BR', {
      timeZone,
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(data);
  };

  const dataInicio = formatarDataCompleta(start);
  const dataFim = formatarDataCompleta(end);

  const mesmaData = dataInicio === dataFim;

  if (mesmaData) {
    return `${horaInicio} - ${horaFim}`;
  } else {
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
