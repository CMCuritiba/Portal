import { defineMessages } from 'react-intl';

const messages = defineMessages({
  sliderBannerBlock: {
    id: 'SliderBanner',
    default: 'SliderBanner',
  },
});

export const SliderBannerSchema = (props) => {
  return {
    title: props.intl.messages(messages.title),
    fields: [
      {
        id: 'default',
        title: 'Default',
        fields: ['title'],
      },
    ],
    properties: {
      title: {
        widget: 'object_browser',
        mode: 'link',
        allowExternals: true,
      },
    },
    required: ['title'],
  };
};
