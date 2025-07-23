import React from 'react';
import {withBlockExtensions} from '@plone/volto/helpers';
import Box from '@mui/material/Box';
import {Button} from '@mui/material';
import './style.less';
import {Link} from 'react-router-dom';
import {flattenToAppURL} from "@plone/volto/helpers/Url/Url";

const View = (content) => {
    console.log("content", content);
    return (
        <div className="cardsBlockBackground py-32 w-100-w background-white max-w-100">
            <div className="container">
                {
                    content?.data?.title && (
                        <h2 className="fs-24 color-dark text-center">{content?.data?.title}</h2>
                    )
                }
                {
                    content?.data?.subtitle && (
                        <p className="fs-18 color-gray mb-0 text-center ff-lato">
                            {content?.data?.subtitle}
                        </p>
                    )
                }

                <div className="max-w-mobile-100vw">
                    <div className="stack row mt-40 gap-32 grid-cols-3 overflow-auto-mobile child-75vw">
                        {
                            content?.data?.links?.map((item, index) => {
                                return item?.link?.map((link) => (
                                    <div key={index} className="item-card back card card-default position-relative">
                                        <div className="thumbnail">
                                            <Link to={flattenToAppURL(link?.getURL)} title={link?.title}>
                                                <img
                                                    src={flattenToAppURL(link["@id"] + "/" + link.image_scales?.image[0]?.download) || "/images/news/default.png"}
                                                    alt="Especial de Halloween: caça às bruxas em Curitiba"
                                                    className="aspect-ratio-358-537"
                                                />
                                            </Link>
                                        </div>
                                        <div className="content stack flex-between gap-24 flex-column ">
                                            <Link to={flattenToAppURL(link?.getURL)} title={link?.title}>
                                                <h3 className="color-white ff-lato fs-20 fw-400">
                                                    {link?.title}
                                                </h3>
                                            </Link>
                                            <Link to={flattenToAppURL(link?.getURL)} title={link?.title}>
                                                <Button>
                                                    Veja mais
                                                    <img src="/icons/ver-mais-background.svg" alt="Ver mais"/>
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                ))
                            })
                        }
                    </div>
                </div>
                <div className="flex flex-center mt-40 mb-16">
                    {
                        content?.data?.link && content?.data?.link_text && (
                            content?.data?.link.map((link) => (
                                <Link to={flattenToAppURL(link.getURL)} title={content?.data?.link_text}>
                                    <Button
                                        className="button button-secondary"
                                        component="a"
                                    >
                                        {content?.data?.link_text}
                                    </Button>
                                </Link>
                            ))
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default withBlockExtensions(View);
