import React from 'react';
import { withBlockExtensions } from '@plone/volto/helpers';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { Button, Card } from '@mui/material';
import config from '@plone/volto/registry';
import { flattenToAppURL } from '@plone/volto/helpers';
import './style.less';

const Image = config.getComponent({ name: 'Image' }).component;

const View = (props) => {
  const { data, isEditMode, className, block, classes } = props;
  const links = data?.links?.filter((z) => z?.link !== undefined) || [];
  if (links)
    return (
      <div className="stack gap-24 flex-mb flex-column-mb news-featured">
        <div className="destaques-home stack row gap-24 flex-mb flex-column-mb">
          {links &&
            links.length > 0 &&
            links.slice(0, 1).map((link, index) => (
              <Link
                key={index}
                className="destaque principal flex-2 stack"
                to={link?.link[0]['getPath'].replace('/Plone/', '')}
              >
                <div className="thumbnail">
                  {/* Verificando se a imagem existe antes de exibir */}
                  <img
                    src={flattenToAppURL(
                      link?.link[0]['getURL'] +
                        '/' +
                        link?.link[0].image_scales?.image[0]?.download,
                    )}
                    alt={link?.link[0]?.title}
                  />
                </div>
                <div className="content">
                  <span className="tag-color inline-block">Sem categoria</span>
                  <h2>{link?.link[0]?.title}</h2>
                </div>
              </Link>
            ))}
          <div className="destaques flex-1 stack gap-24 flex-mb flex-column-mb">
            {links &&
              links.slice(1, 3).map((link, index) => (
                <Link
                  to={link?.link[0]['getPath'].replace('/Plone/', '')}
                  key={index}
                >
                  <div key={index} className="destaque small stack">
                    <div className="thumbnail">
                      <img
                        src={flattenToAppURL(
                          link?.link[0]['getURL'] +
                            '/' +
                            link?.link[0].image_scales?.image[0]?.download,
                        )}
                        alt={link?.link[0]?.title}
                      />
                    </div>
                    <div className="content">
                      <span className="tag-color inline-block">
                        Sem categoria
                      </span>
                      <h2>{link?.link[0]?.title}</h2>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    );

  return <>Carregando</>;
};

export default withBlockExtensions(View);
