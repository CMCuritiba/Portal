import React from "react";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import {Button, Typography} from "@mui/material";
import {Link} from "react-router-dom";

const Footer = (Props) => {
    return <Stack className="footer-ind">
        <Stack className="pesquisa">
            <div className="container">
                <Stack direction="row" sx={{gap: "48px"}} alignItems="center" justifyContent="center"
                       className="mobile-flex-direction-col">
                    <div className="info">
                        <h2>
                            Foi fácil encontrar o que buscava?
                        </h2>
                        <p>
                            Agradecemos sua participação.
                        </p>
                    </div>
                    <div className="flex-buttons">
                        <Button className="button-primary">
                            Sim
                        </Button>
                        <Button className="button-secondary">
                            Não
                        </Button>
                    </div>
                </Stack>
            </div>
        </Stack>

        <Stack className={"footer-stack"}>
            <div className="container">
                <div className="stack row flex-between gap-24 stack-footer flex-column-mb">
                    <Stack className="column min-w-224 pr-32" sx={{gap: "17px"}}>
                        <img src="/logo-footer.svg" alt="Logo CMC" className="max-w-150"/>
                        <Typography>
                            © 2025
                        </Typography>
                        <Link to="/">
                            Termos de privacidade
                        </Link>
                        <Stack direction="row" sx={{"gap": "16px"}}>
                            <a href="">
                                <img src="/icons/instagram.svg" alt="Instagram da Câmara de Curitiba"/>
                            </a>
                            <a href="">
                                <img src="/icons/facebook.svg" alt="Facebook da Câmara de Curitiba"/>
                            </a>
                            <a href="">
                                <img src="/icons/twitter.svg" alt="Twitter da Câmara de Curitiba"/>
                            </a>
                            <a href="">
                                <img src="/icons/youtube.svg" alt="Youtube da Câmara de Curitiba"/>
                            </a>
                            <a href="">
                                <img src="/icons/discord.svg" alt="Discord da Câmara de Curitiba"/>
                            </a>
                            <a href="">
                                <img src="/icons/spotify.svg" alt="Spotify da Câmara de Curitiba"/>
                            </a>
                        </Stack>
                    </Stack>
                    <div className="grid-col-4 gap-18 gap-y-24 flex-column-mb flex-mb">
                        <Stack className="column a-menus" sx={{gap: "6px"}}>
                            <h3 className="fs-16 fw-700 text-white">Atendimento</h3>
                            <a href="">
                                Avaliação de Satisfação
                            </a>
                            <a href="">
                                Carta de Serviços
                            </a>
                            <a href="">
                                Fale com a Câmara
                            </a>
                            <a href="">
                                Ouvidoria
                            </a>
                            <a href="">
                                Procuradoria da Mulher
                            </a>
                            <a href="">
                                Sala da Defensoria
                            </a>
                            <a href="">
                                Serviço de Informação ao Cidadão (SIC)
                            </a>
                            <a href="">
                                Visite a Câmara
                            </a>
                        </Stack>
                        <Stack className="column a-menus" sx={{gap: "6px"}}>
                            <h3 className="fs-16 fw-700 text-white">Atividade Parlamentar</h3>
                            <a href="">
                                Agenda da Câmara
                            </a>
                            <a href="">
                                Agora é Lei
                            </a>
                            <a href="">
                                Audiências Públicas
                            </a>
                            <a href="">
                                Comissões
                            </a>
                            <a href="">
                                Conselho de Ética e Decoro Parlamentar
                            </a>
                            <a href="">
                                Painel de Atividades Legislativas
                            </a>
                            <a href="">
                                Projetos de Lei e Requerimentos
                            </a>
                            <a href="">
                                Sessões da Câmara
                            </a>
                            <a href="">
                                Tribuna Livre
                            </a>

                        </Stack>
                        <Stack className="column a-menus" sx={{gap: "6px"}}>
                            <h3 className="fs-16 fw-700 text-white">Comunicação</h3>
                            <a href="">
                                CMC Podcasts
                            </a>
                            <a href="">
                                Fotos
                            </a>
                            <a href="">
                                Histórias de Curitiba
                            </a>
                            <a href="">
                                Notícias
                            </a>
                            <a href="">
                                Projetos Especiais
                            </a>
                            <a href="">
                                Redes Sociais
                            </a>
                            <a href="">
                                Sala de Imprensa
                            </a>
                            <a href="">
                                TV Câmara
                            </a>
                        </Stack>
                        <Stack className="column a-menus" sx={{gap: "6px"}}>
                            <h3 className="fs-16 fw-700 text-white">Institucional</h3>
                            <a href="">
                                Administração da Câmara
                            </a>
                            <a href="">
                                Concurso Público
                            </a>
                            <a href="">
                                Conheça a Câmara
                            </a>
                            <a href="">
                                Escola do Legislativo
                            </a>
                            <a href="">
                                Instruções Normativas
                            </a>
                            <a href="">
                                Programa de Estágio
                            </a>
                            <a href="">
                                Servidores da Câmara
                            </a>

                        </Stack>

                        <Stack className="column a-menus" sx={{gap: "6px"}}>
                            <h3 className="fs-16 fw-700 text-white">Participe</h3>
                            <a href="">
                                Banco de Ideias Legislativas
                            </a>
                            <a href="">
                                Consultas Públicas
                            </a>
                            <a href="">
                                Parlamento Jovem
                            </a>
                            <a href="">
                                WhatsApp da Câmara
                            </a>
                        </Stack>

                        <Stack className="column a-menus" sx={{gap: "6px"}}>
                            <h3 className="fs-16 fw-700 text-white mt-32">Serviços internos</h3>
                            <a href="">
                                E-mail da Câmara
                            </a>
                            <a href="">
                                Portal Recursos Humanos
                            </a>
                            <a href="">
                                Ramais Administrativos
                            </a>
                            <a href="">
                                Registro de Frequência
                            </a>
                            <a href="">
                                Sistema de Almoxarifado
                            </a>
                            <a href="">
                                Sistema de Chamados
                            </a>
                            <a href="">
                                SPA - Processo Administrativo
                            </a>
                            <a href="">
                                SPAE - Processo Eletrônico
                            </a>
                            <a href="">
                                SPL - Vereadores
                            </a>
                        </Stack>

                        <Stack className="column a-menus" sx={{gap: "6px"}}>
                            <h3 className="fs-16 fw-700 text-white">Transparência</h3>
                            <a href="">
                                Controladoria do Legislativo
                            </a>
                            <a href="">
                                Julgamento das Contas da Prefeitura
                            </a>
                            <a href="">
                                Leis de Curitiba e Atos da Câmara
                            </a>
                            <a href="">
                                Orçamento de Curitiba
                            </a>
                            <a href="">
                                Perguntas Frequentes
                            </a>
                            <a href="">
                                Prestação de Contas da Câmara
                            </a>
                            <a href="">
                                Política de Proteção de Dados (LGPD)
                            </a>
                            <a href="">
                                Portal da Transparência
                            </a>
                            <a href="">
                                Radar da Transparência Pública
                            </a>
                        </Stack>

                        <Stack className="column a-menus" sx={{gap: "6px"}}>
                            <h3 className="fs-16 fw-700 text-white">Vereadores</h3>
                            <a href="">
                                Conheça os Vereadores
                            </a>
                            <a href="">
                                Corregedoria
                            </a>
                            <a href="">
                                Frentes Parlamentares
                            </a>
                            <a href="">
                                Lideranças e Blocos Parlamentares
                            </a>
                            <a href="">
                                Mesa Diretora
                            </a>
                            <a href="">
                                Participação em Conselhos
                            </a>


                        </Stack>
                    </div>
                </div>
            </div>
        </Stack>
    </Stack>
}

export default Footer;
