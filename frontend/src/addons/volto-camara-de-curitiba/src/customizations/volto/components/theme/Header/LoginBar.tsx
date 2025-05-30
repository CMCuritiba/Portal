import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import AccessLoginIcon from './Icons/AccessLoginIcon';

const LoginBar = () => {
  const token = useSelector((state) => state.userSession.token);
  const content = useSelector((state) => state.content.data);

  return (
    !token && (
      <Menu pointing secondary floated="right" className="menu-camara">
        <Menu.Item>
          <Link
            aria-label="login"
            to={`/login${
              content?.['@id']
                ? `?return_url=${flattenToAppURL(content['@id'])}`
                : ''
            }`}
          >
            <AccessLoginIcon />
            Acessar
          </Link>
        </Menu.Item>
      </Menu>
    )
  );
};

export default LoginBar;

LoginBar.propTypes = {
  token: PropTypes.string,
  content: PropTypes.shape({
    '@id': PropTypes.string,
  }),
};

LoginBar.defaultProps = {
  token: null,
  content: {
    '@id': null,
  },
};
