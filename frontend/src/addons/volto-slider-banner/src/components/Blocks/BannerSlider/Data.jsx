import React, { useEffect, useState } from 'react';
import { BlockDataForm } from '@plone/volto/components';
import { isValidbannerSliderUrl } from '../../../helpers/validator';
import { getOembed } from '../../../helpers/data';
import { bannerSliderSchema } from './schema';
import { useIntl } from 'react-intl';

const BannerSliderBlockData = (props) => {
  const { data, block, onChangeBlock, blocksConfig, navRoot, contentType } =
    props;
  const [href, setHref] = useState(data.href ? data.href : '');

  useEffect(() => {
    const current = data.href ? data.href[0]['@id'] : '';
    const newValue = href ? href[0]['@id'] : '';
    if (newValue && current !== newValue) {
      getOembed(newValue).then((oembed) => {
        onChangeBlock(block, {
          ...data,
          href: href,
          bannerSliderOembed: oembed,
        });
      });
    }
  }, [href, data, block, onChangeBlock]);

  const intl = useIntl();
  const schema = bannerSliderSchema({ ...props, intl });
  const onChangeField = (id, value) => {
    if (id === 'href' && value !== '') {
      setHref(value);
    } else {
      onChangeBlock(block, {
        ...data,
        [id]: value,
      });
    }
  };

  return (
    <BlockDataForm
      schema={schema}
      title={schema.title}
      onChangeField={onChangeField}
      onChangeBlock={onChangeBlock}
      formData={data}
      block={block}
      blocksConfig={blocksConfig}
      navRoot={navRoot}
      contentType={contentType}
    />
  );
};

export default BannerSliderBlockData;
