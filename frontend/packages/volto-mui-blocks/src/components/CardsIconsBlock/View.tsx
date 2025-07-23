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
  const Image = config.getComponent('Image').component;
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div className="stack py-48 w-100">
      <div className="container">
        <h2 className="fs-32 fw-600 text-center mb-0">{data?.title}</h2>
        {data?.subtitle && (
          <div className="mt-40">
            <p className="fs-18 color-gray mb-0 text-center ff-lato">
              {data?.subtitle}
            </p>
          </div>
        )}

        <div className="max-w-mobile-100vw">
          <div className="mt-40 grid-col-4 gap-16 overflow-auto-mobile child-75vw">
            {data?.links?.map((z) => (
              <Link
                to={
                  z?.link?.length > 0 ? flattenToAppURL(z?.link[0].getURL) : ''
                }
                onClick={(e) => {
                  isEditMode ? e.preventDefault() : '';
                }}
                className="card-icon"
              >
                <div className="flex flex-center">
                  {z?.image && (
                    <Image
                      className="max-w-72"
                      loading="lazy"
                      src={z?.image + '/@@images/image'}
                    />
                  )}
                </div>
                <div className="info flex-between stack gap-16">
                  <h3 className="mb-0 text-center color-white">{z?.title}</h3>
                  <p className="mt-0 fs-14 color-black text-left ff-lato color-black px-16">
                    {z?.subtitle}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withBlockExtensions(View);
