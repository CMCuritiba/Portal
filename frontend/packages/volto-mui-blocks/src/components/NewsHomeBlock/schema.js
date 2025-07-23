import { defineMessages } from 'react-intl';
import { v4 as uuid } from 'uuid';
import { addStyling } from '@plone/volto/helpers/Extensions/withBlockSchemaEnhancer';

const messages = defineMessages({
  newsHomeBlock: {
    id: 'newsHomeBlock',
    defaultMessage: 'News home',
  },
  links: {
    id: 'links',
    defaultMessage: 'Notícias',
  },
});

export const Schema = (props) => {
  return {
    title: props.intl.formatMessage(messages.newsHomeBlock),
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['links'],
      },
    ],
    properties: {
      links: {
        title: 'Banners',
        widget: 'object_list', // Widget para gerenciar listas de objetos
        mode: 'array', // Permite múltiplos itens
        schema: {
          title: 'Link',
          fieldsets: [
            {
              id: 'default',
              title: 'Default',
              fields: ['link'],
            },
          ],
          properties: {
            link: {
              title: 'Link',
              widget: 'object_browser', // Usa o widget object_browser
              mode: 'object', // Vincula ao objeto no Plone
              allowExternals: true,
            },
          },
          required: ['link'],
        },
      },
    },
    required: ['links'],
  };
};
