import { defineMessages } from 'react-intl';

const messages = defineMessages({
  nome: {
    id: 'Nome',
    defaultMessage: 'Nome',
  },
  data_inicio: {
    id: 'Data de início',
    defaultMessage: 'Data de início',
  },
  data_fim: {
    id: 'Data de fims',
    defaultMessage: 'Data de fim',
  },
  lideres: {
    id: 'Líderes',
    defaultMessage: 'Líderes',
  },
  vereador: {
    id: 'Vereador',
    defaultMessage: 'Vereador',
  },
  cargo: {
    id: 'Cargo',
    defaultMessage: 'Cargo',
  },
  adicionar_lider: {
    id: 'Adicionar líder',
    defaultMessage: 'Adicionar líder',
  },
  remover_lider: {
    id: 'Remover líder',
    defaultMessage: 'Remover líder',
  },
});

export const schemaLegislaturas = ({ intl }) => ({
  title: intl.formatMessage(messages.nome),
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['nome', 'data_inicio', 'data_fim'],
    },
  ],
  properties: {
    nome: {
      title: intl.formatMessage(messages.nome),
      type: 'string',
    },
    data_inicio: {
      title: intl.formatMessage(messages.data_inicio),
      type: 'string',
      widget: 'date',
    },
    data_fim: {
      title: intl.formatMessage(messages.data_fim),
      type: 'string',
      widget: 'date',
    },
    lideres: {
      title: intl.formatMessage(messages.lideres),
      widget: 'string',
      schema: {
        title: intl.formatMessage(messages.lideres),
        fieldsets: [
          {
            id: 'default',
            title: 'Default',
            fields: ['vereador', 'cargo'],
          },
        ],
        properties: {
          vereador: {
            title: intl.formatMessage(messages.vereador),
            type: 'string',
            widget: 'object_browser',
            mode: 'search',
            selectedItems: [],
            allowExternals: true,
            pattern_options: {
              selectableTypes: ['vereador'],
              maximumSelectionSize: 1,
            },
          },
          cargo: {
            title: intl.formatMessage(messages.cargo),
            type: 'string',
            choices: [
              ['presidente', 'Presidente'],
              ['primeiro-vice-presidente', '1º Vice-presidente'],
              ['segundo-vice-presidente', '2º Vice-presidente'],
              ['primeiro-secretario', 'Primeiro-secretário'],
              ['segundo-secretario', 'Segundo-secretário'],
              ['terceiro-secretario', 'Terceiro-secretário'],
              ['quarto-secretario', 'Quarto-secretário'],
              ['presidenta', 'Presidenta'],
              ['primeira-vice-presidente', '1ª Vice-presidente'],
              ['segunda-vice-presidente', '2ª Vice-presidente'],
              ['primeira-secretaria', 'Primeira-secretária'],
              ['segunda-secretaria', 'Segunda-secretária'],
              ['terceira-secretaria', 'Terceira-secretária'],
              ['quarta-secretaria', 'Quarta-secretária'],
              ['corregedor', 'Corregedor'],
              ['primeiro-vice-corregedor', '1º Vice-corregedor'],
              ['segundo-vice-corregedor', '2º Vice-corregedor'],
              ['corregedora', 'Corregedora'],
              ['primeira-vice-corregedora', '1ª Vice-corregedora'],
              ['segunda-vice-corregedora', '2ª Vice-corregedora'],
            ],
          },
        },
        required: ['vereador', 'cargo'],
      },
    },
  },
  required: ['nome', 'data_inicio', 'data_fim'],
});
