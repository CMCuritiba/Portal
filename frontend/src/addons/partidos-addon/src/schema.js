import { defineMessages } from 'react-intl';

const messages = defineMessages({
  partido_politico: {
    id: 'Partido Político',
    defaultMessage: 'Partido Político',
  },
  nome: {
    id: 'Nome',
    defaultMessage: 'Nome',
  },
  abreviacao: {
    id: 'Abreviação',
    defaultMessage: 'Abreviação',
  },
  logo: {
    id: 'Logo',
    defaultMessage: 'Logo',
  },
});

export const partidoSchema = ({ intl }) => ({
  title: 'Partido Político',
  titleField: 'sigla',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['sigla', 'nome', 'logo'],
    },
  ],
  properties: {
    sigla: {
      title: 'Sigla',
      required: true,
    },
    nome: {
      title: 'Nome completo',
      required: true,
    },
    logo: {
      title: 'Logo do partido',
      widget: 'file',
      allowedFileTypes: ['image/jpeg', 'image/png'],
      maxSize: '1MB',
    },
  },
  required: ['nome', 'sigla'],
});
