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
    console.log("properties", properties);

    // Format dates
    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const time = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        const formattedDate = date.toLocaleDateString('pt-BR', options);
        return `${formattedDate} ${time}`;
    };

    const created = properties?.created ? formatDate(properties.created) : '';
    const modified = properties?.modified ? formatDate(properties.modified) : '';

    return (
        <p>
            <em>
                por {data?.author}
                {data?.reviser ? ` | Revisão: ${data.reviser}` : ''} — publicado {created}
                {modified && `, última modificação ${modified}`}
            </em>
        </p>
    );
};

export default withBlockExtensions(View);
