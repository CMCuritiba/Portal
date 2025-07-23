import { defineMessages } from 'react-intl';
import { v4 as uuid } from 'uuid';

const messages = defineMessages({
  gridMuiBlock: {
    id: 'gridMuiBlock',
    defaultMessage: 'Grid MUI',
  },
  columns: {
    id: 'columns',
    defaultMessage: 'Colunas',
  },
  item: {
    id: 'item',
    defaultMessage: 'Colunas',
  },
  addItem: {
    id: 'addItem',
    defaultMessage: 'Adicionar coluna',
  },
});

export const itemSchema = (props) => {
  return {
    title: props.intl.formatMessage(messages.item),
    addMessage: props.intl.formatMessage(messages.addItem),
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['offset'],
      },
    ],
    properties: {
      offset: {
        title: 'Offset',
        default: '1',
        type: 'integer',
      },
    },
    required: [],
  };
};
export const gridBlockSchema = (props) => {
  return {
    title: props.intl.formatMessage(messages.gridMuiBlock),
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['columns'],
      },
    ],
    properties: {
      columns: {
        title: props.intl.formatMessage(messages.columns),
        widget: 'object_list',
        schema: itemSchema(props),
        activeObject: props.activeObject,
        setActiveObject: props.setActiveObject,
        default: [{ '@id': uuid(), offset: 1 }],
      },
    },
    required: ['columns'],
  };
};
