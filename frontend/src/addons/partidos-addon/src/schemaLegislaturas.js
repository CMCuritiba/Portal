import { defineMessages } from 'react-intl';

const messages = defineMessages({
  legislatura: {
    id: 'Legislatura',
    defaultMessage: 'Legislatura',
  },
  nome: {
    id: 'Nome',
    defaultMessage: 'Nome',
  },
  ano_inicial: {
    id: 'Ano inicial',
    defaultMessage: 'Ano inicial',
  },
  ano_final: {
    id: 'Ano final',
    defaultMessage: 'Ano final',
  },
});

export const schemaLegislaturas = ({ intl }) => ({
  title: 'Legislatura',
  titleField: 'nome',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['nome', 'ano_inicio', 'ano_final'],
    },
  ],
  properties: {
    nome: {
      title: 'Nome',
      required: true,
    },
    ano_inicio: {
      title: 'Ano inicial',
      required: true,
    },
    ano_final: {
      title: 'Ano final',
      required: true,
    },
  },
  required: ['nome'],
});
