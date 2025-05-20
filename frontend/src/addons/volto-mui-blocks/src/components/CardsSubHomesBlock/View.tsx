import React, { useEffect, useState } from 'react';
import { withBlockExtensions } from '@plone/volto/helpers';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import './style.less';
import config from '@plone/volto/registry';
import Box from '@mui/material/Box';
import { Button, Card, Typography } from '@mui/material';
import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';
import { getFieldURL } from './helpers';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      className="box"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: '40px' }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const View = (props) => {
  const { data, isEditMode, className, block, classes } = props;

  console.log(data);
  const Image = config.getComponent('Image').component;

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div className="stack py-32 cardsBlock w-100 background-color-cinza">
      <div className="container">
        <div
          className={
            data?.variacao
              ? 'cards-flex row grid-cols-mb-1 stack gap-24 wrap grid-cols-2 type-2'
              : 'cards-flex row stack gap-24 wrap grid-cols-4 grid-cols-mb-1'
          }
        >
          {data?.links?.map((z) => (
            <Link
              to={z?.link?.length > 0 ? flattenToAppURL(z?.link[0].getURL) : ''}
              onClick={(e) => {
                isEditMode ? e.preventDefault() : '';
              }}
              className="item-card card"
            >
              <div
                className={
                  data?.variacao
                    ? 'thumbnail border-right-none aspect-ratio-270-184'
                    : 'thumbnail'
                }
              >
                {z?.image && (
                  <Image
                    className={
                      data?.variacao
                        ? 'border-right-none aspect-ratio-270-184'
                        : ''
                    }
                    loading="lazy"
                    src={z?.image + '/@@images/image'}
                  />
                )}
              </div>
              <div className="info flex-between stack gap-16">
                <h3 className="mb-0">{z?.title}</h3>
                <span className="mt-0 fs-14 color-black text-left">
                  {z?.subtitle}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default withBlockExtensions(View);
