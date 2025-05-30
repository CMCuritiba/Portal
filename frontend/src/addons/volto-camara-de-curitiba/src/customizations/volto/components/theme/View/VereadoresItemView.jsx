/**
 * NewsItemView view component.
 * @module components/theme/View/NewsItemView
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Container as SemanticContainer, Sidebar } from 'semantic-ui-react';
import { hasBlocksData, flattenHTMLToAppURL } from '@plone/volto/helpers';
import RenderBlocks from '@plone/volto/components/theme/View/RenderBlocks';
import config from '@plone/volto/registry';
import SidebarNews from './SidebarNews';

/**
 * NewsItemView view component class.
 * @function NewsItemView
 * @params {object} content Content object.
 * @returns {string} Markup of the component.
 */
const VereadoresItemView = ({ content }) => {
  const Image = config.getComponent({ name: 'Image' }).component;
  const Container =
    config.getComponent({ name: 'Container' }).component || SemanticContainer;

  document.addEventListener('DOMContentLoaded', function () {
    const elements = document.querySelectorAll('del');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.5 },
    ); // Ativa quando 50% do elemento estiver visível

    elements.forEach((el) => observer.observe(el));
  });

  return hasBlocksData(content) ? (
    <Container id="page-document" className="view-wrapper newsitem-view">
      <div className="container">
        <div className="flex gap-32 mobile-flex-direction-col">
          <div className="sd">
            <RenderBlocks content={content} />
          </div>
          <SidebarNews />
        </div>
      </div>
      <div className="background-gray py-48">
        <div className="container">
          <h2 className="title-back">Últimas Notícias</h2>
          <div className="mt-40">
            <div className="grid-col-3 gap-30">
              <div className="item card-default py-24 px-24 destaque stack gap-24">
                <div className="thubmnail">
                  <img
                    src="/images/news/item-4.png"
                    alt=""
                    className="aspect-ratio-16-9"
                  />
                </div>
                <div>
                  <span className="tag-color inline-block">
                    Saúde e assistência social
                  </span>
                </div>
                <div>
                  <h3 className="title-32">
                    Vereadores Discutem Propostas para Melhorar o Atendimento em
                    Postos de Saúde
                  </h3>
                </div>
                <div>
                  <a
                    className="button-secondary px-62 button-small"
                    href="/es-lint-test"
                  >
                    Leia mais
                  </a>
                </div>
              </div>
              <div className="item card-default py-24 px-24 destaque stack gap-24">
                <div className="thubmnail">
                  <img
                    src="/images/news/item-4.png"
                    alt=""
                    className="aspect-ratio-16-9"
                  />
                </div>
                <div>
                  <span className="tag-color inline-block">
                    Saúde e assistência social
                  </span>
                </div>
                <div>
                  <h3 className="title-32">
                    Vereadores Discutem Propostas para Melhorar o Atendimento em
                    Postos de Saúde
                  </h3>
                </div>
                <div>
                  <a
                    className="button-secondary px-62 button-small"
                    href="/es-lint-test"
                  >
                    Leia mais
                  </a>
                </div>
              </div>
              <div className="item card-default py-24 px-24 destaque stack gap-24">
                <div className="thubmnail">
                  <img
                    src="/images/news/item-4.png"
                    alt=""
                    className="aspect-ratio-16-9"
                  />
                </div>
                <div>
                  <span className="tag-color inline-block">
                    Saúde e assistência social
                  </span>
                </div>
                <div>
                  <h3 className="title-32">
                    Vereadores Discutem Propostas para Melhorar o Atendimento em
                    Postos de Saúde
                  </h3>
                </div>
                <div>
                  <a
                    className="button-secondary px-62 button-small"
                    href="/es-lint-test"
                  >
                    Leia mais
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  ) : (
    <Container className="view-wrapper">
      {content.title && (
        <h1 className="documentFirstHeading">
          {content.title}
          {content.subtitle && ` - ${content.subtitle}`}
        </h1>
      )}
      {content.description && (
        <p className="documentDescription">{content.description}</p>
      )}
      {content.image && (
        <Image
          className="documentImage ui right floated image"
          alt={content.title}
          title={content.title}
          item={content}
          imageField="image"
          responsive={true}
        />
      )}
      {content.text && (
        <div
          dangerouslySetInnerHTML={{
            __html: flattenHTMLToAppURL(content.text.data),
          }}
        />
      )}
    </Container>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
VereadoresItemView.propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    text: PropTypes.shape({
      data: PropTypes.string,
    }),
  }).isRequired,
};

export default VereadoresItemView;
