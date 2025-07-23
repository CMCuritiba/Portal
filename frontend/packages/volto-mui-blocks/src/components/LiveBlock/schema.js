import { defineMessages } from 'react-intl';
import { v4 as uuid } from 'uuid';

const messages = defineMessages({
  liveBlock: {
    id: 'liveBlock',
    defaultMessage: 'Ao vivo',
  },
  youtube: {
    id: 'youtube',
    defaultMessage: 'Youtube Live',
  },
});

export const liveBlockSchema = (props) => {
  return {
    title: props.intl.formatMessage(messages.liveBlock),
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['youtube'],
      },
    ],
    properties: {
      youtube: {
        title: props.intl.formatMessage(messages.youtube),
        type: 'string',
      },
    },
    required: ['youtube'],
  };
};
