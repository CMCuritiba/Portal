import { defineMessages } from 'react-intl';
import { v4 as uuid } from 'uuid';
import { addStyling } from '@plone/volto/helpers/Extensions/withBlockSchemaEnhancer';

const messages = defineMessages({
  categoryBlock: {
    id: 'categoryBlock',
    defaultMessage: 'Lista de categorias',
  },
  links: {
    id: 'links',
    defaultMessage: 'Links',
  },
});

export const Schema = (props) => {
  return {
    title: props.intl.formatMessage(messages.categoryBlock),
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['links'],
      },
    ],
    properties: {
      links: {
        title: props.intl.formatMessage(messages.links),
        widget: 'object_list', // Widget para gerenciar listas de objetos
        mode: 'array', // Permite múltiplos itens
        schema: {
          title: 'Link',
          fieldsets: [
            {
              id: 'default',
              title: 'Default',
              fields: ['title', 'link', 'color'],
            },
          ],
          properties: {
            title: {
              title: 'Título',
              type: 'string',
              description:
                'Caso não preencha será considerado o valor da página',
            },
            link: {
              title: 'Link',
              widget: 'object_browser', // Usa o widget object_browser
              mode: 'link', // Vincula ao objeto no Plone
            },
            color: {
              title: 'Cor',
              widget: 'color_picker',
              colors: [
                {
                  name: 'support1',
                  label: 'support1',
                  style: { 'background-color': '#102A4D', color: 'white' },
                },
                {
                  name: 'support2',
                  label: 'support2',
                  style: { 'background-color': '#3E8A8E', color: 'white' },
                },
                {
                  name: 'support3',
                  label: 'support3',
                  style: { 'background-color': '#FFAB00', color: '#212B36' },
                },
                {
                  name: 'support4',
                  label: 'support4',
                  style: { 'background-color': '#B2C8D3', color: '#212B36' },
                },
                {
                  name: 'support5',
                  label: 'support5',
                  style: { 'background-color': '#C96026', color: '#FFFFFF' },
                },
                {
                  name: 'support6',
                  label: 'support6',
                  style: { 'background-color': '#009262', color: '#212B36' },
                },
              ],
            },
          },
          required: ['link', 'color'],
        },
      },
    },
    required: ['links'],
  };
};
