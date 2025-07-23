import React from 'react';
import {withBlockExtensions} from '@plone/volto/helpers';
import {Link} from 'react-router-dom';
import Stack from '@mui/material/Stack';
import {Button, Card} from '@mui/material';
import config from '@plone/volto/registry';
import {flattenToAppURL} from '@plone/volto/helpers';
import './style.less';

const Image = config.getComponent({name: 'Image'}).component;

const View = (props) => {
    const {data, isEditMode, className, block, classes} = props;
    const links = data?.links?.filter((z) => z?.link !== undefined) || [];
    if (links)
        return (
            <div className="stack gap-24 flex-mb flex-column-mb py-24 home-news-block">
                <div className="news stack row gap-24 flex-mb flex-column-mb">
                    {links &&
                        links.slice(0, 2).map((link, index) => (
                            <Link
                                to={link?.link[0]['getPath'].replace('/Plone/', '')}
                                key={index}
                                className="new card-default flex-1"
                            >
                                <div className="d-none d-mb-block">
                                    <div className="py-24 px-16">
                                        <span className="tag-color">Sem categoria</span>
                                    </div>
                                </div>
                                <div className="context pt-mb-0">
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
                                    <div className="flex-direction-column gap-24 flex align-items-start">
                                        <span className="tag-color d-mb-none">Sem categoria</span>
                                        <h2 className="mt-0">{link?.link[0]?.title}</h2>
                                    </div>
                                </div>
                            </Link>
                        ))}

                    <div className="banner flex-1 card-default d-mb-none">
                        <img
                            src="/images/mock/banner.png"
                            alt=""
                            className="banner-auto-adjust"
                        />
                    </div>
                </div>
                <div className="grid-col-2 news-2-columns">
                    {links &&
                        links.slice(2, 12).map((link, index) => (
                            <Link
                                to={link?.link[0]['getPath'].replace('/Plone/', '')}
                                key={index}
                                className="new card-default flex-1"
                            >
                                <div className="context">
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
                                    <div className="info">
                    <span
                        className="tag-color inline-block"
                        style={{backgroundColor: '#102A4D', color: 'white'}}
                    >
                      Sem categoria
                    </span>
                                        <h2 className="mt-0">{link?.link[0]?.title}</h2>
                                    </div>
                                </div>
                            </Link>
                        ))}
                </div>
                <div className="button-call stack row align-items-center flex-center">
                    <Link className="button-primary" to="/noticias">
                        Veja todas as notícias
                    </Link>
                </div>

                <div className="banner flex-1 card-default d-none d-mb-block mt-32 mb-32">
                    <img
                        src="/images/mock/banner.png"
                        alt=""
                        className="banner-auto-adjust"
                    />
                </div>
            </div>
        );

    return <>Carregando</>;
};

export default withBlockExtensions(View);
