import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@mui/material";
import MenuIcon from "./Icons/MenuIcon";
import AccessibleForwardIcon from "@mui/icons-material/AccessibleForward";
import ContrastCircleIcon from "./Icons/ContrastCircleIcon";
import ExposurePlusIcon from "./Icons/ExposurePlusIcon";
import SignLanguageOutlinedIcon from "@mui/icons-material/SignLanguageOutlined";
import SearchBar from "./SearchBar";
import LoginBar from "./LoginBar";
import PropTypes from "prop-types";
import Destaques from "../../../../../components/DropdownMenu/components/Destaques";
import {flattenToAppURL} from "@plone/volto/helpers";

const menuData = [
    {
        title: "Atendimento",
        items: [
            "Avaliação de Satisfação",
            "Carta de Serviços",
            "Fale com a Câmara",
            "Ouvidoria",
            "Procuradoria da Mulher",
            "Sala da Defensoria",
            "Serviço de Informação ao Cidadão (SIC)",
            "Visite a Câmara",
        ],
    },
    {
        title: "Atividade Parlamentar",
        items: [
            "Agenda da Câmara",
            "Agora é Lei",
            "Audiências Públicas",
            "Comissões",
            "Conselho de Ética e Decoro Parlamentar",
            "Painel de Atividades Legislativas",
            "Projetos de Lei e Requerimentos",
            "Sessões da Câmara",
            "Tribuna Livre",
        ],
    },
    {
        title: "Comunicação",
        items: [
            "CMC Podcasts",
            "Fotos",
            "Histórias de Curitiba",
            "Notícias",
            "Projetos Especiais",
            "Redes Sociais",
            "Sala de Imprensa",
            "TV Câmara",
        ],
    },
    {
        title: "Institucional",
        items: [
            "Administração da Câmara",
            "Concurso Público",
            "Conheça a Câmara",
            "Escola do Legislativo",
            "Instruções Normativas",
            "Programa de Estágio",
            "Servidores da Câmara",
        ],
    },
    {
        title: "Participe",
        items: [
            "Banco de Ideias Legislativas",
            "Consultas Públicas",
            "Parlamento Jovem",
            "WhatsApp da Câmara",
        ],
    },
    {
        title: "Serviços Internos",
        items: [
            "E-mail da Câmara",
            "Portal Recursos Humanos",
            "Ramais Administrativos",
            "Registro de Frequência",
            "Sistema de Almoxarifado",
            "Sistema de Chamados",
            "SPA - Processo Administrativo",
            "SPAE - Processo Eletrônico",
            "SPL - Vereadores",
        ],
    },
    {
        title: "Transparência",
        items: [
            "Controladoria do Legislativo",
            "Julgamento das Contas da Prefeitura",
            "Leis de Curitiba e Atos da Câmara",
            "Orçamento de Curitiba",
            "Perguntas Frequentes",
            "Prestação de Contas da Câmara",
            "Política de Proteção de Dados (LGPD)",
            "Portal da Transparência",
            "Radar da Transparência Pública",
        ],
    },
    {
        title: "Vereadores",
        items: [
            "Conheça os Vereadores",
            "Corregedoria",
            "Frentes Parlamentares",
            "Lideranças e Blocos Parlamentares",
            "Mesa Diretora",
            "Participação em Conselhos",
        ],
    },
];

const Header = (props) => {
    const [act, setAct] = useState(false);
    const [activeMenu, setActiveMenu] = useState(menuData[0]);
    const [activeMenuMobile, setActiveMenuMobile] = useState(null);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);
    const pathname = props.pathname;
    const menuHeader = Destaques("/destaques", "");


    // Fecha o menu se clicar fora
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                if(buttonRef.current && !buttonRef.current.contains(event.target))
                    setAct(false);
            }
        }

        if (act) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        // Adiciona dinamicamente o script ao <head>
        const script = document.createElement("script");
        script.src = "https://apps.elfsight.com/p/platform.js";
        script.async = true;
        document.head.appendChild(script);


        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.head.removeChild(script);
        };
    }, [act]);

    return (
        <>
            <div className="stack">
                <div className="header-top">
                    <div className="container-base container">
                        <div className="stack row flex-between py-16">
                            <div className="stack row gap-16">
                                <a className="link-flex">
                                    <AccessibleForwardIcon className="icon" />
                                    Acessibilidade
                                </a>
                                <a className="link-flex">
                                    <ContrastCircleIcon className="icon" />
                                    Contraste
                                </a>
                                <a className="link-flex">
                                    <ExposurePlusIcon className="icon" />
                                    Aumentar letras
                                </a>
                                <a className="link-flex">
                                    <SignLanguageOutlinedIcon className="icon" />
                                    Vlibras
                                </a>
                            </div>
                            <div className="stack row align-items-center gap-24">
                                <SearchBar />
                                <LoginBar />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Header Principal */}
            <div className="stack background-primary position-sticky z-999">
                <div className="container-base header py-16 w-100 fadeIn">
                    <div className="stack row align-items-center flex-between">
                        <a href="#" className="d-sm-block d-none mr-0">
                            <img src="/icons/acessibilidade.svg" alt="Acessibilidade"/>
                        </a>
                        <div className="stack row gap-24">
                            <Button ref={buttonRef} className={act ? "link-flex menu d-mb-none act" : "link-flex menu d-mb-none"} href="#"
                                    onClick={() => {setAct(!act)}}>
                                <MenuIcon/>
                                MENU
                            </Button>
                            <Link to="/" alt="Página Inicial">
                                <img src="/camara-curitiba.png" alt="" className="logo-camara"/>
                            </Link>
                        </div>
                        <Button ref={buttonRef} className={act ? "link-flex menu-mobile act min-unset" : "link-flex menu-mobile min-unset"} href="#"
                                onClick={() => {setAct(!act)}}>
                            <img src="/icons/menu-mobile.svg" alt="Menu mobile"/>
                        </Button>
                        <div className="links-menu row align-items-center gap-8 d-mb-none stack">
                            <p className="fs-16 fw-600 text-white mb-0">Destaques:</p>
                            {
                                menuHeader.map((z, i) => (
                                    <>
                                        {
                                            i != 0 && <svg width="2" height="13" viewBox="0 0 2 13" fill="none"
                                                                xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1.728 0.356445V12.3564H0.936V0.356445H1.728Z" fill="white"/>
                                            </svg>
                                        }
                                        {
                                            z.mode === 'simpleLink' && <Link to={flattenToAppURL(z.linkUrl?.[0]?.['@id'])} key={i} title={z?.title}>{z.title}</Link>
                                        }
                                        {
                                            z.mode === 'linkExternal' && <a href={z?.link_external} target="_blank" title={z?.title} key={i}>{z.title}</a>
                                        }
                                    </>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <motion.div
                    ref={menuRef}
                    initial={false}
                    animate={{ height: act ? (window?.innerWidth > 768 ? "auto" : '100vh') : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className={"menu-open background-primary"}
                >
                    <div className="container">
                        <div className="content-menu">
                            <div className="d-none d-mb-block">
                                <div className="logo-mobile flex flex-center">
                                    <img src="/icons/logo-mobile.svg" alt="Logo mobile" />
                                </div>
                                <div className="mt-24">
                                    <div className="flex flex-between align-items-center">
                                        <div className="flex gap-16 align-items-center">
                                            {
                                                activeMenuMobile && (
                                                    <Button className="button-reset" onClick={() => {setActiveMenuMobile(null)}}>
                                                        <img src="/icons/menu/return.svg" alt="Retornar" />
                                                    </Button>
                                                )
                                            }
                                            <span className="fs-20 fw-700 text-white">
                                                Menu
                                            </span>
                                        </div>
                                        <Button className="button-reset" onClick={() => setAct(false)}>
                                            <img src="/icons/menu/close.svg" alt="Fechar menu" />
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-10 mt-10">
                                <div className="col-1">
                                    <ul className="menu-ul">
                                        {menuData.map((menu, index) => (
                                            <li key={index} className={menu.title === activeMenuMobile?.title ? "active" : ""}>
                                                <a
                                                    href="#"
                                                    className={menu.title === activeMenu.title ? "active" : ""}
                                                    onMouseEnter={() => {setActiveMenu(menu);setActiveMenuMobile(menu)}}
                                                >
                                                    {menu.title}

                                                    <span className="d-none d-mb-block">
                                                        <img src="/icons/menu/chevron.svg" alt="Chevron" />
                                                    </span>
                                                </a>
                                                <ul className="sub-menu">
                                                    {menu.items.map((menu, index) => (
                                                        <li key={index}>
                                                            <a href="">
                                                                {menu}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </li>
                                        ))}
                                    </ul>
                                    <Link className="mt-24 acessar-mobile" to="/login?return_url=">
                                        <img src="/icons/menu/acessar-mobile.svg" alt="Acessar mobile"/>
                                        Acessar
                                    </Link>
                                </div>
                                <div className="col-2">
                                    <h2 className="fs-18 color-black fw-600 mb-2">
                                        {activeMenu.title}:
                                    </h2>
                                    <ul className="grid-col-2 col-menu">
                                        {activeMenu.items.map((item, idx) => (
                                            <li key={idx}>
                                                <a href="#" title={item}>
                                                    <span>{item}</span>
                                                    <img src="/icons/menu/col-menu.svg" alt={item} />
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="col-1 border-1">
                                    <h2 className="fs-18 fw-600 text-white mb-0">
                                        Mais acessados:
                                    </h2>
                                    <ul className="mais-acessadas">
                                        <li>
                                            <a href="">
                                                <img src="/icons/menu/col-menu-white.svg" alt="" />
                                                Avaliação de Satisfação
                                            </a>
                                        </li>
                                        <li>
                                            <a href="">
                                                <img src="/icons/menu/col-menu-white.svg" alt="" />
                                                Sala da Defensoria
                                            </a>
                                        </li>
                                        <li>
                                            <a href="">
                                                <img src="/icons/menu/col-menu-white.svg" alt="" />
                                                Fale com a Câmara
                                            </a>
                                        </li>
                                        <li>
                                            <a href="">
                                                <img src="/icons/menu/col-menu-white.svg" alt="" />
                                                Ouvidoria
                                            </a>
                                        </li>
                                        <li>
                                            <a href="">
                                                <img src="/icons/menu/col-menu-white.svg" alt="" />
                                                Visite a Câmara
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="d-mb-none">
                                <div className="flex flex-end">
                                    <Button className="menu-close" onClick={() => setAct(false)}>
                                        Fechar
                                        <img src="/icons/close.svg" alt="" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
            {/* Menu Bottom Mobile */}
            <div className="fadeIn menu-bottom-mobile stack row">
                <Link to="/" className={pathname === "" ? "flex-1 act" : "flex-1"}>
                    <img src="/icons/menu/home.svg" alt="Home"/>
                    Home
                </Link>
                <Link to="/noticias" className={pathname === "/noticias" ? "flex-1 act" : "flex-1"}>
                    <img src="/icons/menu/news.svg" alt="Home"/>
                    Notícias
                </Link>
                <Link to="/vereadores" className={pathname === "/vereadores" ? "flex-1 act" : "flex-1"}>
                    <img src="/icons/menu/vereadores.svg" alt="Home"/>
                    Vereadores
                </Link>
                <a href="#" className="flex-1">
                    <img src="/icons/menu/projetos-de-lei.svg" alt="Home"/>
                    Projeto de Lei
                </a>
            </div>
        </>
    );
};

export default Header;

Header.propTypes = {
    token: PropTypes.string,
    pathname: PropTypes.string.isRequired,
    content: PropTypes.objectOf(PropTypes.any),
};

Header.defaultProps = {
    token: null,
    content: null,
};
