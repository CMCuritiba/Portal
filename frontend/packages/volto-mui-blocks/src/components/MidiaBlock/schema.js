import { defineMessages } from 'react-intl';
import { v4 as uuid } from 'uuid';
import { addStyling } from '@plone/volto/helpers/Extensions/withBlockSchemaEnhancer';

const messages = defineMessages({
  midiaBlock: {
    id: 'midiaBlock',
    defaultMessage: 'Bloco Podcasts, Lives e Institucional',
  },
  links: {
    id: 'links',
    defaultMessage: 'Links',
  },
});

export const Schema = (props) => {
  return {
    title: props.intl.formatMessage(messages.midiaBlock),
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['podcasts', 'lives', 'institucional'],
      },
    ],
    properties: {
      podcasts: {
        title: 'Podcasts',
        widget: 'object_list', // Widget para gerenciar listas de objetos
        mode: 'array', // Permite múltiplos itens
        schema: {
          title: 'Video',
          fieldsets: [
            {
              id: 'default',
              title: 'Default',
              fields: ['title', 'link', 'image', 'description'],
            },
          ],
          properties: {
            title: {
              title: 'Título',
              mode: 'string',
            },
            description: {
              title: 'Descrição',
              mode: 'string',
            },
            image: {
              title: 'Imagem',
              widget: 'image',
            },
            link: {
              title: 'Link Youtube',
              mode: 'string',
            },
          },
          required: ['title', 'link', 'image'],
        },
      },
      lives: {
        title: 'Lives',
        widget: 'object_list', // Widget para gerenciar listas de objetos
        mode: 'array', // Permite múltiplos itens
        schema: {
          title: 'Video',
          fieldsets: [
            {
              id: 'default',
              title: 'Default',
              fields: ['title', 'link', 'image', 'description'],
            },
          ],
          properties: {
            title: {
              title: 'Título',
              mode: 'string',
            },
            description: {
              title: 'Descrição',
              mode: 'string',
            },
            image: {
              title: 'Imagem',
              widget: 'image',
            },
            link: {
              title: 'Link Youtube',
              mode: 'string',
            },
          },
          required: ['title', 'link', 'image'],
        },
      },
      institucional: {
        title: 'Institucionais',
        widget: 'object_list', // Widget para gerenciar listas de objetos
        mode: 'array', // Permite múltiplos itens
        schema: {
          title: 'Video',
          fieldsets: [
            {
              id: 'default',
              title: 'Default',
              fields: ['title', 'link', 'image', 'description'],
            },
          ],
          properties: {
            title: {
              title: 'Título',
              mode: 'string',
            },
            description: {
              title: 'Descrição',
              mode: 'string',
            },
            image: {
              title: 'Imagem',
              widget: 'image',
            },
            link: {
              title: 'Link Youtube',
              mode: 'string',
            },
          },
          required: ['title', 'link', 'image'],
        },
      },
    },
    required: [],
  };
};
