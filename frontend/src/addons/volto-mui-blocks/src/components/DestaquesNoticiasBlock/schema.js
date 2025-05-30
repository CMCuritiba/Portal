import { defineMessages } from 'react-intl';
import { v4 as uuid } from 'uuid';
import { addStyling } from '@plone/volto/helpers/Extensions/withBlockSchemaEnhancer';

const messages = defineMessages({
  destaquesNoticiasBlock: {
    id: 'destaquesNoticiasBlock',
    defaultMessage: 'Destaques de noticias',
  },
  links: {
    id: 'links',
    defaultMessage: 'Destaques principais',
  },
  linksDestaques: {
    id: 'linksDestaques',
    defaultMessage: 'Destaques da semana',
  },
  linksMaisLidos: {
    id: 'linksMaisLidos',
    defaultMessage: 'Mais lidos',
  },
});

export const Schema = (props) => {
  return {
    title: props.intl.formatMessage(messages.destaquesNoticiasBlock),
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['links', 'linksDestaques', 'linksMaisLidos'],
      },
    ],
    properties: {
      links: {
        title: 'Destaques principais',
        widget: 'object_list', // Widget para gerenciar listas de objetos
        mode: 'array', // Permite múltiplos itens
        schema: {
          title: 'Link',
          fieldsets: [
            {
              id: 'default',
              title: 'Default',
              fields: ['link', 'image'],
            },
          ],
          properties: {
            image: {
              title: 'Imagem',
              widget: 'object_browser',
              mode: 'image',
              allowExternals: true,
            },
            link: {
              title: 'Link',
              widget: 'object_browser', // Usa o widget object_browser
              mode: 'link', // Vincula ao objeto no Plone
              allowExternals: true,
            },
          },
          required: ['link', 'image'],
        },
      },
      linksDestaques: {
        title: 'Destaques da semana',
        widget: 'object_list', // Widget para gerenciar listas de objetos
        mode: 'array', // Permite múltiplos itens
        schema: {
          title: 'Link',
          fieldsets: [
            {
              id: 'default',
              title: 'Default',
              fields: ['link', 'image'],
            },
          ],
          properties: {
            image: {
              title: 'Imagem',
              widget: 'object_browser',
              mode: 'image',
              allowExternals: true,
            },
            link: {
              title: 'Link',
              widget: 'object_browser', // Usa o widget object_browser
              mode: 'link', // Vincula ao objeto no Plone
              allowExternals: true,
            },
          },
          required: ['link', 'image'],
        },
      },
      linksMaisLidos: {
        title: 'Mais lidos',
        widget: 'object_list', // Widget para gerenciar listas de objetos
        mode: 'array', // Permite múltiplos itens
        schema: {
          title: 'Link',
          fieldsets: [
            {
              id: 'default',
              title: 'Default',
              fields: ['link', 'image'],
            },
          ],
          properties: {
            image: {
              title: 'Imagem',
              widget: 'object_browser',
              mode: 'image',
              allowExternals: true,
            },
            link: {
              title: 'Link',
              widget: 'object_browser', // Usa o widget object_browser
              mode: 'link', // Vincula ao objeto no Plone
              allowExternals: true,
            },
          },
          required: ['link', 'image'],
        },
      },
    },
    required: ['links'],
  };
};
