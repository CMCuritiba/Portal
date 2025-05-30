import React, { useEffect, useRef, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getSchema } from '@plone/volto/actions/schema/schema';
import { searchContent } from '@plone/volto/actions/search/search';
import { flattenToAppURL } from '@plone/volto/helpers';
import { GET_CONTROLPANEL } from '@plone/volto/constants/ActionTypes';
import { getPartidos } from '../../utils/Utils';

const VereadoresListView = (content) => {
  const [tab, setTab] = useState(1);
  const dispatch = useDispatch();
  const schema = useSelector((state) => state.schema.schema);
  const items = useSelector((state) => state.search.items);
  const state = useSelector((state) => state);
  const partidos = useSelector(
    (state) => state.controlpanels?.controlpanel?.partidos,
  );
  const legislaturas = useSelector(
    (state) => state.controlpanels?.controlpanel?.legislaturas,
  );
  const [partidoID, setPartidoID] = useState(null);
  const [legislaturaID, setLegislaturaID] = useState(0);

  const contentType = 'vereadores';

  const filteRed = (items) => {
    if (tab === 2 && partidoID) {
      items = items.filter((z) => z?.partido?.token === partidoID);
    }

    if (tab === 3) {
      return items.filter((z) => z?.mesa_diretora === true);
    }

    if (tab === 4) {
      return items.filter((z) => z?.corregedoria === true);
    }

    if (tab === 5) {
      return items.filter((z) => z?.lideranca === true);
    }

    if (tab === 6) {
      return items.filter((z) => z?.licenciado === true);
    }

    if ((tab === 2 || tab === 1) && legislaturas?.length > 0) {
      return items.filter((z) =>
        z?.legislatura?.some(
          (l) => l.token === legislaturas[legislaturaID]['@id'],
        ),
      );
    }

    items = items.sort((a, b) => {
      const titleA = a.title?.toLowerCase() || '';
      const titleB = b.title?.toLowerCase() || '';
      return titleA.localeCompare(titleB);
    });
    return items;
  };
  const alreadyLoaded = useRef(false);

  useEffect(() => {
    if (tab === 3 || tab === 4 || tab === 5) {
      setLegislaturaID(0);
    }
  }, [tab]);
  useEffect(() => {
    console.log('state', legislaturaID);
  }, [legislaturaID]);
  useEffect(() => {
    if (!alreadyLoaded.current) {
      dispatch(getSchema(contentType));
      dispatch(
        searchContent('/vereadores', {
          portal_type: 'vereador',
          sort_on: 'getObjPositionInParent',
          fullobjects: 1,
        }),
      );
      dispatch(getPartidos('@legislaturas-e-partidos'));
      alreadyLoaded.current = true;
    }
  }, [dispatch]);

  return (
    <article>
      <div className="container py-30">
        <div className="flex flex-between align-items-center flex-column-mb gap-mb-16 justify-mb-start align-items-mb-start">
          <h1 className="fs-48 fw-600 mb-0 lh-normal fs-mb-32">
            Conheça os vereadores
          </h1>
          <a href="" className="button-secondary">
            Histórico de vereadores
          </a>
        </div>
      </div>
      <div className="background-color-cinza-soft py-32">
        <div className="container pl-mb pr-mb">
          <div className="legislacoes">
            <h2 className="mt-0 mb-0">
              Selecione uma Legislatura para visualizar os Vereadores
            </h2>
            <form action="" className="mt-24 flex gap-24">
              <select
                value={legislaturaID}
                onChange={(e) => setLegislaturaID(e.target.value)}
                className={
                  tab === 3 || tab === 4 || tab === 5 ? 'disabled-events' : ''
                }
              >
                {legislaturas?.length > 0 &&
                  legislaturas.map((z, i) => (
                    <option key={z['@id'] || i} value={i}>
                      {z?.nome}
                    </option>
                  ))}
              </select>
              <Button
                className={
                  tab === 3 || tab === 4 || tab === 5
                    ? 'disabled-events button button-primary'
                    : 'button button-primary'
                }
              >
                Aplicar
              </Button>
            </form>
          </div>
          <div className="flex gap-8 align-items-center">
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 4.71338C2 3.60881 2.89543 2.71338 4 2.71338H20C21.1046 2.71338 22 3.60881 22 4.71338V5.53089C22 6.29077 21.7116 7.02233 21.1932 7.57784L15.5379 13.6371C15.1922 14.0074 15 14.4951 15 15.0017V19.0953C15 19.4741 14.786 19.8204 14.4472 19.9898L10.4472 21.9898C9.78231 22.3222 9 21.8387 9 21.0953V15.0017C9 14.4951 8.80776 14.0074 8.46211 13.6371L2.80683 7.57784C2.28836 7.02233 2 6.29077 2 5.53089V4.71338Z"
                stroke="#3E8A8E"
                strokeWidth="1.5"
              />
            </svg>
            <h2 className="color-primary fs-24 fw-600 mt-0 mb-0 fs-mb-18">
              Organize e ordene por:
            </h2>
          </div>
          <div className="mt-24 options-vereador overflow-auto-mobile">
            <span
              className={tab === 1 ? 'active' : ''}
              onClick={() => setTab(1)}
            >
              Ordem alfabética
            </span>
            <span
              className={tab === 2 ? 'active' : ''}
              onClick={() => setTab(2)}
            >
              Partido
            </span>
            <span
              className={tab === 3 ? 'active' : ''}
              onClick={() => setTab(3)}
            >
              Mesa Diretora
            </span>
            <span
              className={tab === 4 ? 'active' : ''}
              onClick={() => setTab(4)}
            >
              Corregedoria
            </span>
            <span
              className={tab === 5 ? 'active' : ''}
              onClick={() => setTab(5)}
            >
              Lideranças
            </span>
            <span
              className={tab === 6 ? 'active' : ''}
              onClick={() => setTab(6)}
            >
              Licenciados
            </span>
            <span
              className={tab === 7 ? 'active' : ''}
              onClick={() => setTab(7)}
            >
              Suplentes
            </span>
          </div>
          {tab === 2 && (
            <div className="mt-24 flex gap-16 partidos flex-wrap">
              {partidos?.map((z) => (
                <Button
                  onClick={() => setPartidoID(z['@id'])}
                  className={partidoID === z['@id'] ? 'act' : ''}
                >
                  {z?.sigla}
                </Button>
              ))}
            </div>
          )}
          <div className="mt-24">
            <div className="flex grid-cols-3 gap-16 grid-cols-mb-1">
              {filteRed(items).map((item) => (
                <div className="item stack row card-default item-vereador">
                  <div className="thumbnail max-w-161 min-w-161 border-right-none position-relative">
                    <Link to={flattenToAppURL(item['@id'])}>
                      <img
                        src={item?.foto?.download}
                        alt=""
                        className="aspect-ratio-161-179 border-right-none"
                      />
                    </Link>
                    {partidos?.find(
                      (z) => z['@id'] === item?.partido?.token,
                    ) && (
                      <img
                        src={
                          partidos?.find(
                            (z) => z['@id'] === item?.partido?.token,
                          )?.logo?.download
                        }
                        alt={`Logo ${partidos?.find((z) => z['@id'] === item?.partido?.token)?.sigla}`}
                        className=" border-rounded logo-partido position-absolute partido-list"
                      />
                    )}
                  </div>
                  <div className="infos stack flex-between px-16 py-16">
                    <Link to={flattenToAppURL(item['@id'])}>
                      <h3 className="fs-16 fw-600 fs-montserrat mb-16 lh-normal color-black">
                        {item?.title}
                      </h3>
                    </Link>
                    <div className="context">
                      <div className="stack gap-10 align-items-start mt-8">
                        {item?.mesa_diretora && tab === 3 && (
                          <span className="mb-0 fs-14">
                            {item?.cargo_mesa_diretora}
                          </span>
                        )}
                        {item?.corregedoria && tab === 4 && (
                          <span className="mb-0 fs-14">
                            {item?.cargo_corregedoria}
                          </span>
                        )}
                        <a href="" className="flex align-items-center gap-4">
                          <svg
                            width="16"
                            height="17"
                            viewBox="0 0 16 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3.077 13.3802C2.77011 13.3802 2.51389 13.2774 2.30833 13.0719C2.10278 12.8663 2 12.6101 2 12.3032V5.12387C2 4.81699 2.10278 4.56076 2.30833 4.35521C2.51389 4.14965 2.77011 4.04688 3.077 4.04688H12.923C13.2299 4.04688 13.4861 4.14965 13.6917 4.35521C13.8972 4.56076 14 4.81699 14 5.12387V12.3032C14 12.6101 13.8972 12.8663 13.6917 13.0719C13.4861 13.2774 13.2299 13.3802 12.923 13.3802H3.077ZM8 8.79054L2.66667 5.30321V12.3032C2.66667 12.4229 2.70511 12.5212 2.782 12.5982C2.859 12.6751 2.95733 12.7135 3.077 12.7135H12.923C13.0427 12.7135 13.141 12.6751 13.218 12.5982C13.2949 12.5212 13.3333 12.4229 13.3333 12.3032V5.30321L8 8.79054ZM8 8.04687L13.1282 4.71354H2.87183L8 8.04687ZM2.66667 5.30321V4.71354V12.3032C2.66667 12.4229 2.70511 12.5212 2.782 12.5982C2.859 12.6751 2.95733 12.7135 3.077 12.7135H2.66667V5.30321Z"
                              fill="#3E8A8E"
                            />
                          </svg>
                          E-mail
                        </a>
                        <a href="" className="flex align-items-center gap-4">
                          <svg
                            width="16"
                            height="17"
                            viewBox="0 0 16 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12.6205 14.0465C11.4966 14.0465 10.3445 13.7652 9.16419 13.2024C7.98385 12.6395 6.88724 11.8495 5.87435 10.8324C4.86158 9.81538 4.07374 8.71883 3.51085 7.54272C2.94808 6.36661 2.66669 5.21661 2.66669 4.09272C2.66669 3.88905 2.73335 3.71933 2.86669 3.58355C3.00002 3.44777 3.16669 3.37988 3.36669 3.37988H5.01535C5.19658 3.37988 5.35469 3.43694 5.48969 3.55105C5.6248 3.66516 5.7163 3.81155 5.76419 3.99022L6.09485 5.57988C6.12563 5.76622 6.12008 5.92905 6.07819 6.06838C6.0363 6.20772 5.96235 6.32183 5.85635 6.41072L4.39369 7.77472C4.66713 8.27127 4.96947 8.73261 5.30069 9.15872C5.63191 9.58483 5.98513 9.98844 6.36035 10.3695C6.74747 10.7568 7.16413 11.1168 7.61035 11.4497C8.05647 11.7826 8.54619 12.0969 9.07952 12.3927L10.5052 10.9414C10.6137 10.8243 10.7357 10.7472 10.8712 10.71C11.0066 10.6728 11.1564 10.6653 11.3205 10.6875L12.723 10.9747C12.9042 11.0192 13.0513 11.1104 13.1642 11.2485C13.277 11.3865 13.3334 11.5449 13.3334 11.7235V13.3465C13.3334 13.5465 13.2655 13.7132 13.1297 13.8465C12.9939 13.9799 12.8242 14.0465 12.6205 14.0465ZM4.08085 7.14905L5.36035 5.97222C5.40302 5.93799 5.4308 5.89099 5.44369 5.83122C5.45646 5.77133 5.4543 5.71577 5.43719 5.66455L5.14102 4.25172C5.12391 4.18327 5.09402 4.13199 5.05135 4.09788C5.00858 4.06366 4.95302 4.04655 4.88469 4.04655H3.51669C3.46535 4.04655 3.42263 4.06366 3.38852 4.09788C3.3543 4.13199 3.33719 4.17472 3.33719 4.22605C3.34996 4.68161 3.42135 5.15722 3.55135 5.65288C3.68124 6.14866 3.85774 6.64738 4.08085 7.14905ZM9.71419 12.7055C10.1645 12.9287 10.6446 13.0936 11.1545 13.2004C11.6643 13.3073 12.1085 13.3645 12.4872 13.3722C12.5385 13.3722 12.5812 13.3551 12.6154 13.3209C12.6496 13.2867 12.6667 13.2439 12.6667 13.1927V11.8542C12.6667 11.7859 12.6496 11.7303 12.6154 11.6875C12.5812 11.6449 12.53 11.615 12.4615 11.5979L11.2282 11.3452C11.177 11.3281 11.1321 11.326 11.0937 11.3389C11.0551 11.3517 11.0145 11.3794 10.9719 11.4222L9.71419 12.7055Z"
                              fill="#3E8A8E"
                            />
                          </svg>
                          3350-4573
                        </a>
                        <Link className="" to={flattenToAppURL(item['@id'])}>
                          <Button className="button-vereador text-transform-none">
                            Saiba Mais
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default VereadoresListView;
