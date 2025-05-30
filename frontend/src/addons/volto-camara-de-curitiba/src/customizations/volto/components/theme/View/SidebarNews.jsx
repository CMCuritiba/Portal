import NewsItemView from './NewsItemView';
import { Button } from '@mui/material';
import React from 'react';

function SidebarNews() {
  return (
    <div className="sidebar-single">
      <div className="card-default card">
        <img src="/images/news/single.png" alt="" />
        <div className="py-16 px-16">
          <h3 className="fs-20 fw-400 color-black mb-0">Campanha</h3>
          <p className="fs-16 fw-400 mt-16 mb-16">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          </p>
          <Button className="button-secondary mt-26 w-100 mb-32">
            Saiba mais
          </Button>
        </div>
      </div>
      <div className="mais-acessadas mt-32">
        <h2 className="fs-24 ff-lato text-black">Mais lidos nesta categoria</h2>
        <div className="itens flex flex-direction-column gap-24">
          <div className="item">
            <div className="flex gap-16">
              <span>01.</span>
              <div className="card-default px-24 py-24">
                <a href="/es-lint-test">
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
                <a href="/es-lint-test">
                  <h3 className="fs-24 text-black fw-600">
                    Comissão de Constituição e Justiça Avalia Nova Proposta de
                    Reforma Tributáriat
                  </h3>
                </a>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="flex gap-16">
              <span>03.</span>
              <div className="card-default px-24 py-24">
                <a href="/es-lint-test">
                  <h3 className="fs-24 text-black fw-600">
                    Sessão Plenária Homenageia Personalidades que Contribuíram
                    para o Desenvolvimento de Curitiba
                  </h3>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SidebarNews;
