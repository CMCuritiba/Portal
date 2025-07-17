import { defineMessages } from 'react-intl';
import { v4 as uuid } from 'uuid';
import { addStyling } from '@plone/volto/helpers/Extensions/withBlockSchemaEnhancer';

const messages = defineMessages({
  newsThumbnail: {
    id: 'newsThumbnail',
    defaultMessage: 'Thumbnail News',
  },
});

export const Schema = (props) => {
  return {
    title: props.intl.formatMessage(messages.newsThumbnail),
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: [],
      },
    ],
    properties: {
    },
    required: [],
  };
};
