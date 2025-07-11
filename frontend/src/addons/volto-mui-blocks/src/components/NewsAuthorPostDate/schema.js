import { defineMessages } from 'react-intl';
import { v4 as uuid } from 'uuid';
import { addStyling } from '@plone/volto/helpers/Extensions/withBlockSchemaEnhancer';

const messages = defineMessages({
  newsAuthorPostDate: {
    id: 'newsAuthorPostDate',
    defaultMessage: 'Autor e data de publicação',
  },
});

export const Schema = (props) => {
  return {
    title: props.intl.formatMessage(messages.newsAuthorPostDate),
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['author', 'reviser'],
      },
    ],
    properties: {
      author: {
        id: 'author',
        title: 'Autor',
        mode: 'text',
      },
      reviser: {
        id: 'reviser',
        title: 'Revisor',
        mode: 'text',
      }
    },
    required: [],
  };
};
