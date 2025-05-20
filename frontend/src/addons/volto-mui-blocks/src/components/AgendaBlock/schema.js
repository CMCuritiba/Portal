import {defineMessages} from 'react-intl';
import {v4 as uuid} from "uuid";
import {addStyling} from '@plone/volto/helpers/Extensions/withBlockSchemaEnhancer';

const messages = defineMessages({
  agendaListBlock: {
    id: 'agendaListBlock',
    defaultMessage: 'Listagem Agenda',
  },
});


export const Schema = (props) => {
  return {
    title: props.intl.formatMessage(messages.agendaListBlock),
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
      },
    ],
    properties: {

    },
    required: [],
  };
};
