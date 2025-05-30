import React from 'react';
import { withBlockExtensions } from '@plone/volto/helpers';
import { Button } from '@mui/material';
import './style.less';

interface AgendaBlockProps {
  data: {
    image?: string;
  };
}

const View = ({ data }: AgendaBlockProps): JSX.Element => {
  return (
    <section className="stack gap-24 max-w-100 py-48">
      <div className="container w-100-w">
        <h2 className="title-back fw-600 flex flex-between w-100 align-items-center">
          O Que Vem por Aí
          <Button
            href="/agenda"
            className="ver-mais-flex"
            component="a"
          >
            Ver todos
            <svg
              width="32"
              height="33"
              viewBox="0 0 32 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.3904 23.0796C12.1404 22.8296 12 22.4905 12 22.1369C12 21.7834 12.1404 21.4443 12.3904 21.1943L16.781 16.8036L12.3904 12.4129C12.1475 12.1615 12.0131 11.8247 12.0161 11.4751C12.0192 11.1255 12.1594 10.7911 12.4066 10.5438C12.6538 10.2966 12.9883 10.1564 13.3378 10.1534C13.6874 10.1503 14.0242 10.2847 14.2757 10.5276L19.609 15.8609C19.859 16.111 19.9994 16.4501 19.9994 16.8036C19.9994 17.1572 19.859 17.4962 19.609 17.7463L14.2757 23.0796C14.0257 23.3296 13.6866 23.47 13.333 23.47C12.9795 23.47 12.6404 23.3296 12.3904 23.0796Z"
                fill="white"
              />
            </svg>
          </Button>
        </h2>
        <div className="mt-40">
          <div className="grid-col-3 gap-32 overflow-auto-mobile child-75vw">
            <div className="card-default card">
              <div className="position-relative">
                <img
                  src={data?.image}
                  alt="Imagem da Agenda"
                  className="w-100 aspect-ratio-16-9"
                />
                <div className="agenda-data">
                  <span>12</span>
                  <span>Fev</span>
                </div>
              </div>
              <div className="px-16 py-16 stack flex-column gap-16 flex-between align-items-start flex-auto">
                <div className="flex-1-auto stack flex-column gap-16 flex-start align-items-start">
                  <span className="tag-color inline-block tag-sessoes-plenarias">
                    Sessões plenárias
                  </span>
                  <h3 className="fs-18 fw-600 mt-0 mb-0">Sessão Ordinária</h3>
                  <span className="tag-agenda">
                    <svg
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.00016 15.4808C11.6822 15.4808 14.6668 12.4961 14.6668 8.81413C14.6668 5.13213 11.6822 2.14746 8.00016 2.14746C4.31816 2.14746 1.3335 5.13213 1.3335 8.81413C1.3335 12.4961 4.31816 15.4808 8.00016 15.4808ZM8.50016 6.14746C8.50016 6.01485 8.44748 5.88768 8.35372 5.79391C8.25995 5.70014 8.13277 5.64746 8.00016 5.64746C7.86755 5.64746 7.74038 5.70014 7.64661 5.79391C7.55284 5.88768 7.50016 6.01485 7.50016 6.14746V8.81413C7.50016 8.94679 7.55283 9.07413 7.64683 9.16746L9.3135 10.8341C9.35927 10.8833 9.41447 10.9227 9.4758 10.95C9.53714 10.9773 9.60335 10.992 9.67048 10.9932C9.73762 10.9944 9.8043 10.982 9.86656 10.9569C9.92882 10.9317 9.98538 10.8943 10.0329 10.8468C10.0803 10.7993 10.1178 10.7428 10.1429 10.6805C10.1681 10.6183 10.1804 10.5516 10.1792 10.4844C10.178 10.4173 10.1633 10.3511 10.136 10.2898C10.1087 10.2284 10.0693 10.1732 10.0202 10.1275L8.50016 8.60746V6.14746Z"
                        fill="#637381"
                      />
                    </svg>
                    09:00 - 12:00
                  </span>
                  <span className="tag-agenda">
                    <svg
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.0269 5.10064C14.9477 4.78424 14.7864 4.49435 14.5593 4.26024C14.3322 4.02613 14.0474 3.85609 13.7336 3.7673C12.5869 3.4873 8.00022 3.4873 8.00022 3.4873C8.00022 3.4873 3.41355 3.4873 2.26689 3.79397C1.95305 3.88276 1.6682 4.0528 1.44112 4.28691C1.21403 4.52102 1.05274 4.81091 0.973552 5.1273C0.763695 6.29101 0.661042 7.47151 0.666885 8.65397C0.659405 9.84533 0.762063 11.0348 0.973552 12.2073C1.06086 12.5139 1.22576 12.7927 1.45231 13.017C1.67887 13.2412 1.95943 13.4032 2.26689 13.4873C3.41355 13.794 8.00022 13.794 8.00022 13.794C8.00022 13.794 12.5869 13.794 13.7336 13.4873C14.0474 13.3985 14.3322 13.2285 14.5593 12.9944C14.7864 12.7603 14.9477 12.4704 15.0269 12.154C15.2351 10.999 15.3378 9.82753 15.3336 8.65397C15.341 7.46261 15.2384 6.2731 15.0269 5.10064Z"
                        stroke="#637381"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6.50022 10.834L10.3336 8.65397L6.50022 6.47397V10.834Z"
                        stroke="#637381"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Youtube da Câmara de Curitiba
                  </span>
                </div>
                <Button
                  href="/agenda/sessao-ordinaria"
                  className="button button-third w-100"
                  component="a"
                >
                  Saiba mais
                </Button>
              </div>
            </div>
            <div className="card-default card">
              <div className="position-relative">
                <img
                  src={data?.image}
                  alt="Imagem da Agenda"
                  className="w-100 aspect-ratio-16-9"
                />
                <div className="agenda-data">
                  <span>13</span>
                  <span>Fev</span>
                </div>
              </div>
              <div className="px-16 py-16 stack flex-column gap-16 flex-between align-items-start flex-auto">
                <div className="flex-1-auto stack flex-column gap-16 flex-start align-items-start">
                  <span
                    className="tag-color inline-block"
                    style={{ 'background-color': '#E6B941', color: 'black' }}
                  >
                    Audiências públicas
                  </span>
                  <h3 className="fs-18 fw-600 mt-0 mb-0">
                    Tema: Gestão de resíduos sólidos e licitação de limpeza
                    urbana.
                  </h3>
                  <span className="tag-agenda">
                    <svg
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.00016 15.4808C11.6822 15.4808 14.6668 12.4961 14.6668 8.81413C14.6668 5.13213 11.6822 2.14746 8.00016 2.14746C4.31816 2.14746 1.3335 5.13213 1.3335 8.81413C1.3335 12.4961 4.31816 15.4808 8.00016 15.4808ZM8.50016 6.14746C8.50016 6.01485 8.44748 5.88768 8.35372 5.79391C8.25995 5.70014 8.13277 5.64746 8.00016 5.64746C7.86755 5.64746 7.74038 5.70014 7.64661 5.79391C7.55284 5.88768 7.50016 6.01485 7.50016 6.14746V8.81413C7.50016 8.94679 7.55283 9.07413 7.64683 9.16746L9.3135 10.8341C9.35927 10.8833 9.41447 10.9227 9.4758 10.95C9.53714 10.9773 9.60335 10.992 9.67048 10.9932C9.73762 10.9944 9.8043 10.982 9.86656 10.9569C9.92882 10.9317 9.98538 10.8943 10.0329 10.8468C10.0803 10.7993 10.1178 10.7428 10.1429 10.6805C10.1681 10.6183 10.1804 10.5516 10.1792 10.4844C10.178 10.4173 10.1633 10.3511 10.136 10.2898C10.1087 10.2284 10.0693 10.1732 10.0202 10.1275L8.50016 8.60746V6.14746Z"
                        fill="#637381"
                      />
                    </svg>
                    09:00 - 12:00
                  </span>
                  <span className="tag-agenda">
                    <svg
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_3263_4668)">
                        <path
                          d="M14 6.9873C14 11.654 8 15.654 8 15.654C8 15.654 2 11.654 2 6.9873C2 5.39601 2.63214 3.86988 3.75736 2.74466C4.88258 1.61945 6.4087 0.987305 8 0.987305C9.5913 0.987305 11.1174 1.61945 12.2426 2.74466C13.3679 3.86988 14 5.39601 14 6.9873Z"
                          stroke="#637381"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M8 8.9873C9.10457 8.9873 10 8.09187 10 6.9873C10 5.88273 9.10457 4.9873 8 4.9873C6.89543 4.9873 6 5.88273 6 6.9873C6 8.09187 6.89543 8.9873 8 8.9873Z"
                          stroke="#637381"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_3263_4668">
                          <rect
                            width="16"
                            height="16"
                            fill="white"
                            transform="translate(0 0.320312)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                    Câmara Municipal de Curitiba
                  </span>
                </div>
                <Button
                  href="/agenda/audiencias-publicas"
                  className="button button-third w-100"
                  component="a"
                >
                  Saiba mais
                </Button>
              </div>
            </div>
            <div className="card-default card">
              <div className="position-relative">
                <img
                  src={data?.image}
                  alt="Imagem da Agenda"
                  className="w-100 aspect-ratio-16-9"
                />
                <div className="agenda-data">
                  <span>12</span>
                  <span>Fev</span>
                </div>
              </div>
              <div className="px-16 py-16 stack flex-column gap-16 flex-between align-items-start flex-auto">
                <div className="flex-1-auto stack flex-column gap-16 flex-start align-items-start">
                  <span
                    className="tag-color inline-block"
                    style={{ 'background-color': '#007AFF', color: 'white' }}
                  >
                    Sessões plenárias
                  </span>
                  <h3 className="fs-18 fw-600 mt-0 mb-0">Sessão Ordinária</h3>
                  <span className="tag-agenda">
                    <svg
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.00016 15.4808C11.6822 15.4808 14.6668 12.4961 14.6668 8.81413C14.6668 5.13213 11.6822 2.14746 8.00016 2.14746C4.31816 2.14746 1.3335 5.13213 1.3335 8.81413C1.3335 12.4961 4.31816 15.4808 8.00016 15.4808ZM8.50016 6.14746C8.50016 6.01485 8.44748 5.88768 8.35372 5.79391C8.25995 5.70014 8.13277 5.64746 8.00016 5.64746C7.86755 5.64746 7.74038 5.70014 7.64661 5.79391C7.55284 5.88768 7.50016 6.01485 7.50016 6.14746V8.81413C7.50016 8.94679 7.55283 9.07413 7.64683 9.16746L9.3135 10.8341C9.35927 10.8833 9.41447 10.9227 9.4758 10.95C9.53714 10.9773 9.60335 10.992 9.67048 10.9932C9.73762 10.9944 9.8043 10.982 9.86656 10.9569C9.92882 10.9317 9.98538 10.8943 10.0329 10.8468C10.0803 10.7993 10.1178 10.7428 10.1429 10.6805C10.1681 10.6183 10.1804 10.5516 10.1792 10.4844C10.178 10.4173 10.1633 10.3511 10.136 10.2898C10.1087 10.2284 10.0693 10.1732 10.0202 10.1275L8.50016 8.60746V6.14746Z"
                        fill="#637381"
                      />
                    </svg>
                    09:00 - 12:00
                  </span>
                  <span className="tag-agenda">
                    <svg
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.0269 5.10064C14.9477 4.78424 14.7864 4.49435 14.5593 4.26024C14.3322 4.02613 14.0474 3.85609 13.7336 3.7673C12.5869 3.4873 8.00022 3.4873 8.00022 3.4873C8.00022 3.4873 3.41355 3.4873 2.26689 3.79397C1.95305 3.88276 1.6682 4.0528 1.44112 4.28691C1.21403 4.52102 1.05274 4.81091 0.973552 5.1273C0.763695 6.29101 0.661042 7.47151 0.666885 8.65397C0.659405 9.84533 0.762063 11.0348 0.973552 12.2073C1.06086 12.5139 1.22576 12.7927 1.45231 13.017C1.67887 13.2412 1.95943 13.4032 2.26689 13.4873C3.41355 13.794 8.00022 13.794 8.00022 13.794C8.00022 13.794 12.5869 13.794 13.7336 13.4873C14.0474 13.3985 14.3322 13.2285 14.5593 12.9944C14.7864 12.7603 14.9477 12.4704 15.0269 12.154C15.2351 10.999 15.3378 9.82753 15.3336 8.65397C15.341 7.46261 15.2384 6.2731 15.0269 5.10064Z"
                        stroke="#637381"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6.50022 10.834L10.3336 8.65397L6.50022 6.47397V10.834Z"
                        stroke="#637381"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Youtube da Câmara de Curitiba
                  </span>
                </div>
                <Button
                  href="/agenda/sessao-ordinaria"
                  className="button button-third w-100"
                  component="a"
                >
                  Saiba mais
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default withBlockExtensions(View);
