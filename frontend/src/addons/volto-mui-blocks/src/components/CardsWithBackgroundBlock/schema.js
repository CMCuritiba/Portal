import { defineMessages } from 'react-intl';
import { v4 as uuid } from 'uuid';
import { addStyling } from '@plone/volto/helpers/Extensions/withBlockSchemaEnhancer';

const messages = defineMessages({
  cardsBackBlock: {
    id: 'cardsBackBlock',
    defaultMessage: 'Cards institucionais com background',
  },
  links: {
    id: 'links',
    defaultMessage: 'Links',
  },
});

export const Schema = (props) => {
  return {
    title: props.intl.formatMessage(messages.cardsBackBlock),
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['title', 'subtitle', 'links', 'link_text', 'link'],
      },
    ],
    properties: {
      title: {
        title:"Título",
        mode:"text",
        default:"Histórias de Curitiba",
        value:"Histórias de Curitiba",
      },
      subtitle: {
        title:"Subtitulo",
        mode:"text",
      },
      links: {
        title: 'Notícias',
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
              mode: 'link', // Vincula ao objeto no Plone
              allowExternals: true,
            },
          },
          required: ['link', 'image'],
        },
      },
      link_text: {
        title: 'Texto do link',
        mode: 'text', // Vincula ao objeto no Plone
      },
      link: {
        title: 'Link',
        widget: 'object_browser', // Usa o widget object_browser
        mode: 'link', // Vincula ao objeto no Plone
        allowExternals: true,
      },
    },
    required: ['links'],
  };
};
