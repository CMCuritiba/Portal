import { defineMessages } from 'react-intl';

const messages = defineMessages({
  defaultFilter: {
    id: 'Default filter',
    defaultMessage: 'Filtro padrão',
  },
  all: {
    id: 'All',
    defaultMessage: 'Todas',
  },
  editorias: {
    id: 'Editorias',
    defaultMessage: 'Editorias',
  },
  tags: {
    id: 'Tags',
    defaultMessage: 'Tags',
  },
  selectedEditorias: {
    id: 'Selected Editorias',
    defaultMessage: 'Editorias selecionadas',
  },
  selectedTags: {
    id: 'Selected Tags',
    defaultMessage: 'Tags selecionadas',
  },
});

export const Schema = (props) => {
  return {
    title: 'Todas as Notícias',
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['defaultFilter', 'selectedEditorias', 'selectedTags'],
      },
    ],
    properties: {
      defaultFilter: {
        title: 'Filtro padrão',
        choices: [
          ['all', 'Todas'],
          ['editorias', 'Editorias'],
          ['tags', 'Tags'],
        ],
        default: 'all',
      },
      selectedEditorias: {
        title: 'Editorias selecionadas',
        widget: 'object_list',
        schema: {
          title: 'Editoria',
          fieldsets: [
            {
              id: 'default',
              title: 'Default',
              fields: ['editoria'],
            },
          ],
          properties: {
            editoria: {
              title: 'Editoria',
              widget: 'object_browser',
              mode: 'link',
              allowExternals: false,
              selectedCovers: ['Editoria'],
            },
          },
          required: ['editoria'],
        },
        description: 'Selecione as editorias que deseja exibir',
        visible: (props) => props.data.defaultFilter === 'editorias',
      },
      selectedTags: {
        title: 'Tags selecionadas',
        widget: 'tags',
        description: 'Selecione as tags que deseja exibir',
        visible: (props) => props.data.defaultFilter === 'tags',
      },
    },
    required: [],
  };
};

export default Schema;
