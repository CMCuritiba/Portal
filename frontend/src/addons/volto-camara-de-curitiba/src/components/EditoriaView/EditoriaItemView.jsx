import React, {useEffect, useState} from 'react';
import {Container, Header} from 'semantic-ui-react';
import {useDispatch, useSelector} from 'react-redux';
import {getPartidos, getYouTubeEmbedSrc} from "../../utils/Utils";
import {Button} from "@mui/material";
import {Breadcrumbs} from "@plone/volto/components";
import {Link} from "react-router-dom";
import {flattenToAppURL} from "@plone/volto/helpers/Url/Url";


const EditoriaItemView = (props) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const content = state.content.data || {};
  const items = state.content.data?.items || [];
  const [maisLidas, setMaisLidas] = useState([]);
  console.log('state', state);

  useEffect(() => {
    // Usa as notícias mais lidas definidas na editoria
    if (content?.noticias_mais_lidas?.length > 0) {
      // Busca os detalhes das notícias mais lidas
      const noticiasLidas = content.noticias_mais_lidas.map(uid => {
        return items.find(item => item.UID === uid);
      }).filter(Boolean);
      setMaisLidas(noticiasLidas);
    } else {
      // Fallback para as primeiras 3 notícias se não houver mais lidas definidas
      setMaisLidas(items.slice(0, 3));
    }
  }, [content, items]);

  const [tab, setTab] = useState(0);
  return (
    <div className="container">
      <h1 className="fs-48 fw-600">{content?.title}</h1>
      <p className="fs-24 fw-400 lh-normal">{content?.description}</p>
      <div className="stack gap-24 news-noticia">
      <div className="container">
        <div className="stack row gap-24">
          <div className="stack gap-24">
            {items.length > 0 && (
              <>
                <div className="destaque destaques-home">
                  <div className="card-default px-24 py-24 w-100">
                    <div className="thumbnail">
                      <img src={flattenToAppURL(items[0]?.url + "/" + items[0]?.image_scales?.image[0]?.download) || "/images/news/default.png"} alt={items[0]?.title}/>
                    </div>
                    <div className="mt-16">
                      <h2 className="text-black fs-32 fw-600 title-32">
                        {items[0]?.title}
                      </h2>
                      <div className="mt-16">
                        <p className="mt-16 mb-0 fs-18 ff-lato">
                          {items[0]?.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="destaques grid-col-2 gap-24">
                  {items.slice(1, 5).map((item, index) => (
                    <div key={index} className="card-default py-24 px-24">
                      <div>
                        <img className="mt-8" src={flattenToAppURL(item?.url + "/" + item?.image_scales?.image[0]?.download) || "/images/news/default.png"} alt={item?.title}/>
                        <div className="mt-16">
                          <h2 className="title-32">
                            {item?.title}
                          </h2>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="sidebar-news">
            <div className="mt-0">
              <h2 className="title-24">
                Mais lidos nesta categoria
              </h2>
              <div className="itens flex flex-direction-column gap-24 mt-32">
                {maisLidas.map((item, index) => (
                  <div key={index} className="item">
                    <div className="flex gap-16">
                      <span>
                        {String(index + 1).padStart(2, '0')}.
                      </span>
                      <div className="card-default px-24 py-24 w-100">
                        <Link to={item?.url}>
                          <h3 className="fs-24 text-black fw-600">
                            {item?.title}
                          </h3>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      <div className="stack gap-24 max-w-100 py-32">
        <div className="container w-100-w">
          <h2 className="title-back">Todas as notícias</h2>
          <div className="itens mt-30 stack gap-30">
            {items.length > 0 ? (
              items.map((item, index) => (
                <Link key={index} className="item card-default py-24 px-24"
                      to={item?.url}>
                  <div className="flex gap-32 align-items-center flex-mb flex-column-mb">
                    <div className="thumbnail m-w-218">
                      <img src={flattenToAppURL(item.url + "/" + item.image_scales?.image[0]?.download) || "/images/news/default.png"} alt=""/>
                    </div>
                    <div className="content stack flex-1">
                      <div className="flex flex-start">
                        <span className="tag-color inline-block">Sem categoria</span>
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
                                              <img src="/icons/leia-mais.svg" alt=""/>
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
    </div>
  );
};

export default EditoriaItemView;
