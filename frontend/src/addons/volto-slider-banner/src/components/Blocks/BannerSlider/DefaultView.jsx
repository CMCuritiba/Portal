import React from 'react';
import PropTypes from 'prop-types';
import iconSVG from '../../../icons/speakerdeck.svg';
import { Icon } from '@plone/volto/components';
import './Style.less';

const bannerSliderWrapper = ({ ratio, html, size }) => {
  const style = { aspectRatio: ratio };
  return (
    <div
      className={`bannerSlider-wrapper block-${size}`}
      style={style}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

const bannerSliderView = (props) => {
  const { isEditMode, bannerSliderOembed, align, size, className } = props;
  return bannerSliderOembed ? (
    <div className={`block bannerSlider ${className} align-${align}`}>
      {isEditMode && <div className={'overlay'}> </div>}
      <bannerSliderWrapper size={size} {...bannerSliderOembed} />
    </div>
  ) : (
    <div className={`block bannerSlider ${className} align-full`}>
      <div className={'block-placeholder'}>
        <Icon
          name={iconSVG}
          className="blockIcon"
          size={'50px'}
          color={'#009287'}
        />
      </div>
    </div>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
bannerSliderView.propTypes = {
  bannerSliderOembed: PropTypes.object,
};

/**
 * Default properties.
 * @property {Object} defaultProps Default properties.
 * @static
 */
bannerSliderView.defaultProps = {
  align: 'center',
  size: 'l',
};
export default bannerSliderView;
