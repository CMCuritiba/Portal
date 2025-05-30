import React from 'react';
import { withBlockExtensions } from '@plone/volto/helpers';
import config from '@plone/volto/registry';
import './style.less';
import { Link } from 'react-router-dom';
import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';

const Image = config.getComponent({ name: 'Image' }).component;

const View = (props) => {
  const { content } = props;
  const items = content?.items || []; // Garantindo que items existe
  console.log(items);
  return (
    <div className="stack gap-24 max-w-100 py-32">
      <div className="container w-100-w">
        <h2 className="title-back">Todas as notícias</h2>
        <div className="itens mt-30 stack gap-30">
          {items.length > 0 ? (
            items.map((item, index) => (
              <Link
                key={index}
                className="item card-default py-24 px-24"
                to={item?.url}
              >
                <div className="flex gap-32 align-items-center flex-mb flex-column-mb">
                  <div className="thumbnail m-w-218">
                    <img
                      src={
                        flattenToAppURL(
                          item.url +
                            '/' +
                            item.image_scales?.image[0]?.download,
                        ) || '/images/news/default.png'
                      }
                      alt=""
                    />
                  </div>
                  <div className="content stack flex-1">
                    <div className="flex flex-start">
                      <span className="tag-color inline-block">
                        Sem categoria
                      </span>
                    </div>
                    <div className="mt-18">
                      <h3 className="title-24 mt-0">{item?.title}</h3>
                    </div>
                    {/*<div>*/}
                    {/*  <span className="tag-color inline-block">*/}
                    {/*    {item?.category}*/}
                    {/*  </span>*/}
                    {/*</div>*/}
                    {/*<p className="ff-lato fs-14 mb-0">*/}
                    {/*  <strong>Tags: </strong>*/}
                    {/*  {item?.tags?.join(" ")}*/}
                    {/*</p>*/}
                    <div className="mt-14">
                      <span href={item?.link} className="leia-mais">
                        Leia mais
                        <img src="/icons/leia-mais.svg" alt="" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>Nenhuma notícia disponível.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default withBlockExtensions(View);
