import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { Breadcrumb, Container, Segment } from 'semantic-ui-react';
import { defineMessages, useIntl } from 'react-intl';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import { getBreadcrumbs } from '@plone/volto/actions/breadcrumbs/breadcrumbs';
import { getBaseUrl } from '@plone/volto/helpers/Url/Url';
import { hasApiExpander } from '@plone/volto/helpers/Utils/Utils';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import homeSVG from './home.svg';

const messages = defineMessages({
  home: {
    id: 'Home',
    defaultMessage: 'Home',
  },
  breadcrumbs: {
    id: 'Breadcrumbs',
    defaultMessage: 'Breadcrumbs',
  },
  controlpanel: {
    id: 'Site Setup',
    defaultMessage: 'Site Setup',
  },
});

const BreadcrumbsComponent = ({ pathname }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const { pathname: realPath } = useLocation();
  const controlpanelItems = [
    {
      url: '/controlpanel',
      title: intl.formatMessage(messages.controlpanel),
    },
  ];

  const items = useSelector(
    (state) =>
      realPath.startsWith('/controlpanel')
        ? controlpanelItems
        : state.breadcrumbs.items,
    shallowEqual,
  );
  const root = useSelector((state) => state.breadcrumbs.root);

  useEffect(() => {
    if (!hasApiExpander('breadcrumbs', getBaseUrl(pathname))) {
      dispatch(getBreadcrumbs(getBaseUrl(pathname)));
    }
  }, [dispatch, pathname]);

  return (
    <Segment
      role="navigation"
      aria-label={intl.formatMessage(messages.breadcrumbs)}
      className="breadcrumbs"
      secondary
      vertical
    >
      <Container>
        <Breadcrumb>
          <Link
            to={root || '/'}
            className="section"
            title={intl.formatMessage(messages.home)}
          >
            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.66667 14.8802H13.3333M9.18141 3.01683L3.52949 7.41277C3.15168 7.70662 2.96278 7.85355 2.82669 8.03755C2.70614 8.20054 2.61633 8.38415 2.56169 8.57938C2.5 8.79977 2.5 9.03908 2.5 9.51771V15.5468C2.5 16.4802 2.5 16.947 2.68166 17.3035C2.84144 17.6171 3.09641 17.872 3.41002 18.0318C3.76654 18.2135 4.23325 18.2135 5.16667 18.2135H14.8333C15.7668 18.2135 16.2335 18.2135 16.59 18.0318C16.9036 17.872 17.1586 17.6171 17.3183 17.3035C17.5 16.947 17.5 16.4802 17.5 15.5468V9.51771C17.5 9.03908 17.5 8.79977 17.4383 8.57938C17.3837 8.38415 17.2939 8.20054 17.1733 8.03755C17.0372 7.85355 16.8483 7.70662 16.4705 7.41277L10.8186 3.01683C10.5258 2.78912 10.3794 2.67527 10.2178 2.6315C10.0752 2.59288 9.92484 2.59288 9.78221 2.6315C9.62057 2.67527 9.47418 2.78912 9.18141 3.01683Z" stroke="#667085" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          {items.map((item, index, items) => [
            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 12.7134L10 8.71338L6 4.71338" stroke="#D0D5DD" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>,
            index < items.length - 1 ? (
              <Link key={item.url} to={item.url} className="section">
                {item.title}
              </Link>
            ) : (
              <Breadcrumb.Section key={item.url} active>
                {item.title}
              </Breadcrumb.Section>
            ),
          ])}
        </Breadcrumb>
      </Container>
    </Segment>
  );
};

BreadcrumbsComponent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default BreadcrumbsComponent;
