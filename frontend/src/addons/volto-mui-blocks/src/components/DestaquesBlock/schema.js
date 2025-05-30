import { defineMessages } from 'react-intl';
import { v4 as uuid } from 'uuid';
import { addStyling } from '@plone/volto/helpers/Extensions/withBlockSchemaEnhancer';

const messages = defineMessages({
  destaquesBlock: {
    id: 'destaquesBlock',
    defaultMessage: 'Destaques da home',
  },
  links: {
    id: 'links',
    defaultMessage: 'Links',
  },
});

export const Schema = (props) => {
  return {
    title: props.intl.formatMessage(messages.destaquesBlock),
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
