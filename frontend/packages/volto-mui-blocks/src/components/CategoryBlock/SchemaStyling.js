import { addStyling } from '@plone/volto/helpers/Extensions/withBlockSchemaEnhancer';
import { defineMessages } from 'react-intl';
import config from '@plone/volto/registry';

const messages = defineMessages({
  backgroundColor: {
    id: 'Background color',
    defaultMessage: 'Background color',
  },
});

export const defaultStylingSchema = ({ schema, formData, intl }) => {
  const BG_COLORS = [
    { name: 'transparent', label: 'Transparent' },
    { name: 'grey', label: 'Grey' },
  ];

  // You could allow passing the color definition from the config or from the default
  // defined above
  const colors =
    config.blocks?.blocksConfig?.[formData['@type']]?.colors || BG_COLORS;

  // Same for the default used (or undefined)
  const defaultBGColor =
    config.blocks?.blocksConfig?.[formData['@type']]?.defaultBGColor;

  // This adds the StyleWrapper support to your block
  addStyling({ schema, intl });

  // Then we add the field to the fieldset inside the StyleWrapper `styles` field schema fieldset array
  schema.properties.styles.schema.fieldsets[0].fields = [
    ...schema.properties.styles.schema.fieldsets[0].fields,
    'backGroundColor',
  ];

  // and finally, we add the field to the StyleWrapper `styles` object field schema properties
  schema.properties.styles.schema.properties['backGroundColor'] = {
    widget: 'color_picker',
    title: intl.formatMessage(messages.backgroundColor),
    colors,
    default: defaultBGColor,
  };

  return schema;
};
