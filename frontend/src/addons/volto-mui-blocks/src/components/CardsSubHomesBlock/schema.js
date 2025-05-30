import { defineMessages } from 'react-intl';
import { v4 as uuid } from 'uuid';
import { addStyling } from '@plone/volto/helpers/Extensions/withBlockSchemaEnhancer';

const messages = defineMessages({
  cardsSubHomeBlock: {
    id: 'cardsSubHomeBlock',
    defaultMessage: 'Cards páginas institucionais',
  },
  links: {
    id: 'links',
    defaultMessage: 'Links',
  },
});

export const Schema = (props) => {
  return {
    title: props.intl.formatMessage(messages.cardsSubHomeBlock),
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['variacao', 'links'],
      },
    ],
    properties: {
      variacao: {
        title: 'Variação',
        type: 'boolean',
      },
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
              fields: ['link', 'image', 'title', 'subtitle'],
            },
          ],
          properties: {
            image: {
              title: 'Imagem',
              widget: 'image',
              mode: 'object',
              allowExternals: true,
            },
            link: {
              title: 'Link',
              widget: 'object_browser', // Usa o widget object_browser
              mode: 'link', // Vincula ao objeto no Plone
              allowExternals: true,
            },
            title: {
              title: 'Título',
              type: 'string',
            },
            subtitle: {
              title: 'Subtítulo',
              type: 'string',
            },
          },
          required: ['link', 'image', 'title', 'subtitle'],
        },
      },
    },
    required: ['links'],
  };
};
