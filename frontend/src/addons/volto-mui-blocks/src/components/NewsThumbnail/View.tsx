import React, { useEffect, useState } from 'react';
import { withBlockExtensions } from '@plone/volto/helpers';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import './style.less';
import config from '@plone/volto/registry';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, Typography } from '@mui/material';
import cx from "classnames";

const View = (props) => {
  const { data, isEditMode, className, block, classes, properties } = props;
  const Image = config.getComponent('Image').component;

  return (
    <>
        {properties?.image && (
            <p>
                {(() => {
                    const image = (
                        <figure className="figure center large">
                            <Image
                                className={"w-100"}
                                item={properties}
                                imageField="image"
                                sizes={config.blocks.blocksConfig.leadimage.getSizes(data)}
                                alt={properties.image_caption || ''}
                                responsive={true}
                                caption={properties.image_caption || ''}
                            />
                            {
                                properties?.image_caption && (
                                    <figcaption>
                                        <div className="description"><p>{properties.image_caption}</p></div>
                                    </figcaption>
                                )
                            }

                        </figure>
                    );
                    return image;
                })()}
            </p>
        )}
        {
            (!properties?.image && isEditMode) && (
                <div>
                    Adicione uma imagem principal à notícia
                </div>
            )
        }
    </>
  );
};

export default withBlockExtensions(View);
