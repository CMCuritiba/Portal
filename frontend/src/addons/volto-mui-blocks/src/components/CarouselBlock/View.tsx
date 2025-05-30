import React from 'react';
import { withBlockExtensions } from '@plone/volto/helpers';
import { UniversalLink } from '@plone/volto/components';
import './style.less';
import config from '@plone/volto/registry';
import Box from '@mui/material/Box';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';

interface CarouselLink {
  link?: Array<{ getURL: string }>;
  image?: string;
}

interface ViewProps {
  data?: {
    links?: CarouselLink[];
  };
  isEditMode?: boolean;
}

const View: React.FC<ViewProps> = ({ data, isEditMode }) => {
  const Image = config.getComponent('Image').component;

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const handleClick = (e: React.MouseEvent) => {
    if (isEditMode) {
      e.preventDefault();
    }
  };

  const links = data?.links || [];
  const hasLinks = links.length > 0;

  if (hasLinks) {
    return (
      <div className="bannerCarousel py-32">
        <div className="container">
          <Carousel
            responsive={responsive}
            showDots={links.length > 1}
            autoPlay={true}
            autoPlaySpeed={3000}
          >
            {links.map((item, index) => {
              const href = item?.link?.[0]?.getURL
                ? flattenToAppURL(item.link[0].getURL)
                : '';
              return (
                <UniversalLink
                  key={index}
                  href={href}
                  onClick={handleClick}
                  className="banner-top"
                  openLinkInNewTab={false}
                >
                  {item?.image && (
                    <Image
                      className="w-100 h-auto aspect-ratio-1116-200"
                      loading="lazy"
                      src={`${item.image}/@@images/image`}
                    />
                  )}
                </UniversalLink>
              );
            })}
          </Carousel>
        </div>
      </div>
    );
  }

  return isEditMode ? <div>Adicione banners</div> : null;
};

export default withBlockExtensions(View);
