import React from 'react';
import { withBlockExtensions } from '@plone/volto/helpers';
import config from '@plone/volto/registry';
import './style.less';

const View = () => {
  return (
    <div className="stack gap-24 news-noticia">
      <div className="container">
        <div className="stack row gap-24">
          <div className="stack gap-24">
            <div className="destaque destaques-home">
              <div className="card-default px-24 py-24">
                <div className="thumbnail">
                  <img
                    src="/images/mock/img.png"
                    alt="Imagem da notícia em destaque"
                  />
                </div>
                <div className="mt-16">
                  <h2 className="text-black fs-32 fw-600 title-32">
                    Flexibilização da publicidade em eventos esportivos entrará
                    em vigor em 2025
                  </h2>
                  <div className="mt-16">
                    <p className="mt-16 mb-0 fs-18 ff-lato">
                      A Câmara debate soluções para reduzir filas e garantir
                      agilidade no atendimento, com medidas que incluem a
                      digitalização de prontuários e o aumento de profissionais.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="destaques grid-col-2 gap-24">
              <div className="card-default py-24 px-24">
                <div>
                  <img
                    className="mt-8"
                    src="/images/mock/img.png"
                    alt="Imagem da notícia"
                  />
                  <div className="mt-16">
                    <h2 className="title-32">
                      Vereadores Criam Fórum para Debater Inclusão Social da
                      Juventude
                    </h2>
                  </div>
                </div>
              </div>
              <div className="card-default py-24 px-24">
                <div>
                  <img
                    className="mt-8"
                    src="/images/mock/img.png"
                    alt="Imagem da notícia"
                  />
                  <div className="mt-16">
                    <h2 className="title-32">
                      Vereadores Criam Fórum para Debater Inclusão Social da
                      Juventude
                    </h2>
                  </div>
                </div>
              </div>
              <div className="card-default py-24 px-24">
                <div>
                  <img
                    className="mt-8"
                    src="/images/mock/img.png"
                    alt="Imagem da notícia"
                  />
                  <div className="mt-16">
                    <h2 className="title-32">
                      Vereadores Criam Fórum para Debater Inclusão Social da
                      Juventude
                    </h2>
                  </div>
                </div>
              </div>
              <div className="card-default py-24 px-24">
                <div>
                  <img
                    className="mt-8"
                    src="/images/mock/img.png"
                    alt="Imagem da notícia"
                  />
                  <div className="mt-16">
                    <h2 className="title-32">
                      Vereadores Criam Fórum para Debater Inclusão Social da
                      Juventude
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="sidebar-news">
            <div className="mt-0">
              <h2 className="title-24">Mais lidos nesta categoria</h2>
              <div className="itens flex flex-direction-column gap-24 mt-32">
                <div className="item">
                  <div className="flex gap-16">
                    <span>01.</span>
                    <div className="card-default px-24 py-24">
                      <a href="/noticias/curitiba-avanca-cidade-inteligente">
                        <h3 className="fs-24 text-black fw-600">
                          Curitiba Avança com Projeto de Cidade Inteligente para
                          Melhorar Serviços Públicos
                        </h3>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="flex gap-16">
                    <span>02.</span>
                    <div className="card-default px-24 py-24">
                      <a href="/noticias/comissao-constituicao-justica">
                        <h3 className="fs-24 text-black fw-600">
                          Comissão de Constituição e Justiça Avalia Nova
                          Proposta de Reforma Tributáriat
                        </h3>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="flex gap-16">
                    <span>03.</span>
                    <div className="card-default px-24 py-24">
                      <a href="/noticias/sessao-plenaria-homenagens">
                        <h3 className="fs-24 text-black fw-600">
                          Sessão Plenária Homenageia Personalidades que
                          Contribuíram para o Desenvolvimento de Curitiba
                        </h3>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withBlockExtensions(View);
