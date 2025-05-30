import React, { useEffect, useState } from 'react';
import { Container, Header } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { getPartidos, getYouTubeEmbedSrc } from '../../utils/Utils';
import { Button } from '@mui/material';

const VereadorItemView = (props) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const content = state.content.data;
  const partido = state?.controlpanels?.controlpanel?.items?.find(
    (z) => z['@id'] === content?.partido?.token,
  );

  useEffect(() => {
    dispatch(getPartidos('@partidos'));
  }, [dispatch]);

  const [tab, setTab] = useState(0);
  return (
    <article>
      <div className="py-30">
        <div className="container">
          <div className="top-vereador flex gap-24 align-items-center flex-column-mb">
            <img
              src={content?.foto?.download}
              alt=""
              className="aspect-ratio-1-1 d-mb-none"
            />
            <div className="info">
              <div className="flex gap-16 align-items-center flex-column-mb">
                <h1 className="fs-30 fw-600 lh-normal mb-0 fs-mb-24">
                  Vereador {content?.title} • {partido?.nome} ({partido?.sigla}){' '}
                </h1>
                <img
                  src={content?.image?.download}
                  alt={`Vereador ${content?.title}`}
                  className="aspect-ratio-1-1 d-none d-mb-block"
                />
                {partido?.logo?.download && (
                  <img
                    src={partido?.logo?.download}
                    alt={`Logo ${partido?.sigla}`}
                    className="aspect-ratio-1-1 border-rounded logo-partido"
                  />
                )}
              </div>
              <p className="fs-24 fw-600 fs-mb-18 fs-montserrat mt-16 text-mb-center">
                {content?.mandato}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-100 background-color-cinza-soft py-32">
        <div className="container">
          <div className="grid-vereador gap-32 row">
            <div className="card-default py-24 px-24 px-mb-16 py-mb-16">
              {getYouTubeEmbedSrc(content?.video_principal) && (
                <iframe
                  className="aspect-ratio-16-9 w-100 h-auto border-radius-16"
                  width="560"
                  height="315"
                  src={getYouTubeEmbedSrc(content?.video_principal)}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              )}
              <div className="options-vereador-single overflow-auto-mobile">
                <a
                  href="/es-lint-test"
                  className={tab === 0 ? 'active' : ''}
                  onClick={(event) => {
                    event.preventDefault();
                    setTab(0);
                    return false;
                  }}
                >
                  Perfil do Vereador
                </a>
                <a
                  href="/es-lint-test"
                  className={tab === 1 ? 'active' : ''}
                  onClick={(event) => {
                    event.preventDefault();
                    setTab(1);
                    return false;
                  }}
                >
                  Trabalho Parlamentar
                </a>
                <a
                  href="/es-lint-test"
                  className={tab === 2 ? 'active' : ''}
                  onClick={(event) => {
                    event.preventDefault();
                    setTab(2);
                    return false;
                  }}
                >
                  Contato
                </a>
              </div>
              <div className="py-12 mt-16">
                {tab === 0 && (
                  <div className="flex gap-8 align-items-center">
                    <svg
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.00002 22.7208C4.6026 22.9033 5.41649 22.9033 6.8 22.9033H17.2C18.5835 22.9033 19.3974 22.9033 20 22.7208M4.00002 22.7208C3.87082 22.6816 3.75133 22.6341 3.63803 22.5763C3.07354 22.2887 2.6146 21.8298 2.32698 21.2653C2 20.6236 2 19.7835 2 18.1033V7.70332C2 6.02316 2 5.18308 2.32698 4.54135C2.6146 3.97686 3.07354 3.51792 3.63803 3.2303C4.27976 2.90332 5.11984 2.90332 6.8 2.90332H17.2C18.8802 2.90332 19.7202 2.90332 20.362 3.2303C20.9265 3.51792 21.3854 3.97686 21.673 4.54135C22 5.18308 22 6.02316 22 7.70332V18.1033C22 19.7835 22 20.6236 21.673 21.2653C21.3854 21.8298 20.9265 22.2887 20.362 22.5763C20.2487 22.6341 20.1292 22.6816 20 22.7208M4.00002 22.7208C4.00035 21.9114 4.00521 21.4832 4.07686 21.123C4.39249 19.5362 5.63288 18.2958 7.21964 17.9802C7.60603 17.9033 8.07069 17.9033 9 17.9033H15C15.9293 17.9033 16.394 17.9033 16.7804 17.9802C18.3671 18.2958 19.6075 19.5362 19.9231 21.123C19.9948 21.4832 19.9996 21.9114 20 22.7208M16 10.4033C16 12.6125 14.2091 14.4033 12 14.4033C9.79086 14.4033 8 12.6125 8 10.4033C8 8.19418 9.79086 6.40332 12 6.40332C14.2091 6.40332 16 8.19418 16 10.4033Z"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <h3 className="fs14 fw-600 fs-public-sans mt-0 mb-0">
                      Perfil do Vereador
                    </h3>
                  </div>
                )}

                {tab === 1 && (
                  <div className="flex gap-8 align-items-center">
                    <svg
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 14.9033V11.4033M12 7.90332H12.01M9.9 20.1033L11.36 22.05C11.5771 22.3395 11.6857 22.4842 11.8188 22.536C11.9353 22.5813 12.0647 22.5813 12.1812 22.536C12.3143 22.4842 12.4229 22.3395 12.64 22.05L14.1 20.1033C14.3931 19.7125 14.5397 19.517 14.7185 19.3678C14.9569 19.1689 15.2383 19.0282 15.5405 18.9568C15.7671 18.9033 16.0114 18.9033 16.5 18.9033C17.8978 18.9033 18.5967 18.9033 19.1481 18.675C19.8831 18.3705 20.4672 17.7865 20.7716 17.0514C21 16.5001 21 15.8011 21 14.4033V8.70332C21 7.02316 21 6.18308 20.673 5.54135C20.3854 4.97686 19.9265 4.51792 19.362 4.2303C18.7202 3.90332 17.8802 3.90332 16.2 3.90332H7.8C6.11984 3.90332 5.27976 3.90332 4.63803 4.2303C4.07354 4.51792 3.6146 4.97686 3.32698 5.54135C3 6.18308 3 7.02316 3 8.70332V14.4033C3 15.8011 3 16.5001 3.22836 17.0514C3.53284 17.7865 4.11687 18.3705 4.85195 18.675C5.40326 18.9033 6.10218 18.9033 7.5 18.9033C7.98858 18.9033 8.23287 18.9033 8.45951 18.9568C8.76169 19.0282 9.04312 19.1689 9.2815 19.3678C9.46028 19.517 9.60685 19.7125 9.9 20.1033Z"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <h3 className="fs14 fw-600 fs-public-sans mt-0 mb-0">
                      Trabalho Parlamentar
                    </h3>
                  </div>
                )}

                {tab === 2 && (
                  <div className="flex gap-8 align-items-center">
                    <svg
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.38028 9.75667C9.07627 11.2063 10.0251 12.5649 11.2266 13.7665C12.4282 14.9681 13.7869 15.9169 15.2365 16.6129C15.3612 16.6727 15.4235 16.7027 15.5024 16.7257C15.7828 16.8074 16.127 16.7487 16.3644 16.5787C16.4313 16.5308 16.4884 16.4737 16.6027 16.3594C16.9523 16.0098 17.1271 15.835 17.3029 15.7207C17.9658 15.2897 18.8204 15.2897 19.4833 15.7207C19.6591 15.835 19.8339 16.0098 20.1835 16.3594L20.3783 16.5542C20.9098 17.0857 21.1755 17.3514 21.3198 17.6368C21.6069 18.2043 21.6069 18.8746 21.3198 19.4422C21.1755 19.7276 20.9098 19.9933 20.3783 20.5247L20.2207 20.6824C19.6911 21.212 19.4263 21.4768 19.0662 21.679C18.6667 21.9035 18.0462 22.0648 17.588 22.0635C17.1751 22.0622 16.8928 21.9821 16.3284 21.8219C13.295 20.9609 10.4326 19.3365 8.04466 16.9485C5.65668 14.5605 4.03221 11.6982 3.17124 8.66476C3.01103 8.10031 2.93092 7.81809 2.9297 7.40514C2.92833 6.94692 3.08969 6.32643 3.31411 5.92692C3.51636 5.56689 3.78117 5.30208 4.3108 4.77245L4.46843 4.61482C4.99987 4.08338 5.2656 3.81766 5.55098 3.67331C6.11854 3.38624 6.7888 3.38624 7.35636 3.67331C7.64174 3.81765 7.90747 4.08338 8.43891 4.61482L8.63378 4.80969C8.98338 5.15929 9.15819 5.3341 9.27247 5.50988C9.70347 6.17277 9.70347 7.02735 9.27247 7.69024C9.15819 7.86602 8.98338 8.04082 8.63378 8.39042C8.51947 8.50474 8.46231 8.56189 8.41447 8.6287C8.24446 8.86613 8.18576 9.21039 8.26748 9.49075C8.29048 9.56964 8.32041 9.63198 8.38028 9.75667Z"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <h3 className="fs14 fw-600 fs-public-sans mt-0 mb-0">
                      Contato
                    </h3>
                  </div>
                )}
              </div>

              {tab === 0 && (
                <div
                  className="mt-16 fs-16 fw-400 fs-lato space-16 child lh-normal context"
                  dangerouslySetInnerHTML={{
                    __html: content?.perfil_do_vereador?.data,
                  }}
                ></div>
              )}

              {tab === 1 && (
                <div
                  className="mt-16 fs-16 fw-400 fs-lato space-16 child lh-normal context"
                  dangerouslySetInnerHTML={{
                    __html: content?.trabalho_parlamentar?.data,
                  }}
                ></div>
              )}

              {tab === 2 && (
                <div
                  className="mt-16 fs-16 fw-400 fs-lato space-16 child lh-normal context"
                  dangerouslySetInnerHTML={{ __html: content?.contatos?.data }}
                ></div>
              )}

              <p className="fs-14 mt-16">
                <strong>
                  » Com informações cedidas pelo mandato parlamentar.
                </strong>
              </p>

              <div className="mt-16 fs-16 fw-400 fs-lato space-16 child lh-normal context">
                <div className="flex gap-8 align-items-center">
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21 10.1533H15M21 4.90332H3M21 15.6533H15M21 20.9033H3M4.6 16.9033H9.4C9.96005 16.9033 10.2401 16.9033 10.454 16.7943C10.6422 16.6985 10.7951 16.5455 10.891 16.3573C11 16.1434 11 15.8634 11 15.3033V10.5033C11 9.94327 11 9.66324 10.891 9.44933C10.7951 9.26117 10.6422 9.10819 10.454 9.01231C10.2401 8.90332 9.96005 8.90332 9.4 8.90332H4.6C4.03995 8.90332 3.75992 8.90332 3.54601 9.01231C3.35785 9.10819 3.20487 9.26117 3.10899 9.44933C3 9.66324 3 9.94327 3 10.5033V15.3033C3 15.8634 3 16.1434 3.10899 16.3573C3.20487 16.5455 3.35785 16.6985 3.54601 16.7943C3.75992 16.9033 4.03995 16.9033 4.6 16.9033Z"
                      stroke="black"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <h3 className="fs14 fw-600 fs-public-sans mt-0 mb-0">
                    Projetos de Lei
                  </h3>
                </div>
                <div className="mt-16 projetosdelei">
                  <h2 className="mb-0 mt-0">Pesquise os projetos de lei</h2>
                  <div className="mt-24">
                    <Button className="button button-primary w-100">
                      Acessar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="sidebar stack gap-24">
              <h2 className="fs-24 fw-600 mb-0 fs-mb-20 lh-mb-26">
                Notícias sobre
                <br /> {content?.title}
              </h2>
              <div className="card-default py-24 px-24 stack gap-8 align-items-start px-mb-16 py-mb-16">
                <h3 className="fs-24 fw-600 lh-30 mb-0 fs-mb-20">
                  Curitiba Avança com Projeto de Cidade Inteligente para
                  Melhorar Serviços Públicos
                </h3>
                <span className="tag-color">Constituição e Justiça</span>
              </div>

              <div className="card-default py-24 px-24 stack gap-8 align-items-start px-mb-16 py-mb-16">
                <h3 className="fs-24 fw-600 lh-30 mb-0 fs-mb-20">
                  Comissão de Constituição e Justiça Avalia Nova Proposta de
                  Reforma Tributáriat
                </h3>
                <span className="tag-color">Constituição e Justiça</span>
              </div>

              <div className="card-default py-24 px-24 stack gap-8 align-items-start px-mb-16 py-mb-16">
                <h3 className="fs-24 fw-600 lh-30 mb-0 fs-mb-20">
                  Sessão Plenária Homenageia Personalidades que Contribuíram
                  para o Desenvolvimento de Curitiba
                </h3>
                <span className="tag-color">Constituição e Justiça</span>
              </div>

              <div className="card-default py-24 px-24 stack gap-8 align-items-start px-mb-16 py-mb-16">
                <h3 className="fs-24 fw-600 lh-30 mb-0 fs-mb-20">
                  Câmara Municipal Entrega Prêmio de Mérito Comunitário a
                  Líderes Locais
                </h3>
                <span className="tag-color">Constituição e Justiça</span>
              </div>
              <a href="" className="button-secondary">
                Leia mais
              </a>

              <div className="other-blocks mt-24">
                <h2 className="fs-24 fw-600 mb-0 fs-mb-20 lh-mb-26">
                  Outros assuntos
                </h2>

                <div className="mt-24 other-blocks-sd">
                  <h2 className="mb-0 mt-0 fs-20 max-w-250">
                    Outros vereadores
                  </h2>
                  <div className="mt-24">
                    <Button className="button button-primary w-100">
                      Acessar
                    </Button>
                  </div>
                </div>

                <div className="mt-24 other-blocks-sd">
                  <h2 className="mb-0 mt-0 fs-20 max-w-250">
                    Líderes dos blocos e bancadas partidárias
                  </h2>
                  <div className="mt-24">
                    <Button className="button button-primary w-100">
                      Acessar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default VereadorItemView;
