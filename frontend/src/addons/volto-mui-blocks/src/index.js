import { cloneDeep } from 'lodash';
import LogoCamara from './icons/logo-camara.svg';
import View from './components/GridBlock/View';
import GridBlockEdit from './components/GridBlock/Edit';
import LiveBlockView from './components/LiveBlock/View';
import LiveBlockEdit from './components/LiveBlock/Edit';
import CategoryBlockView from './components/CategoryBlock/View';
import CategoryBlockEdit from './components/CategoryBlock/Edit';
import BannersBlockView from './components/BannersBlock/View';
import BannersBlockEdit from './components/BannersBlock/Edit';
import NewsHomeBlockView from './components/NewsHomeBlock/View';
import NewsHomeBlockEdit from './components/NewsHomeBlock/Edit';
import MidiaBlockView from './components/MidiaBlock/View';
import MidiaBlockEdit from './components/MidiaBlock/Edit';
import CardsBlockView from './components/CardsBlock/View';
import CardsBlockEdit from './components/CardsBlock/Edit';
import CardsBackBlockView from './components/CardsWithBackgroundBlock/View';
import CardsBackBlockEdit from './components/CardsWithBackgroundBlock/Edit';
import DestaquesBlockView from './components/DestaquesBlock/View';
import DestaquesBlockEdit from './components/DestaquesBlock/Edit';
import AgendaBlockView from './components/AgendaBlock/View';
import AgendaBlockEdit from './components/AgendaBlock/Edit';
import DestaquesNoticiasView from './components/DestaquesNoticiasBlock/View';
import DestaquesNoticiasEdit from './components/DestaquesNoticiasBlock/Edit';
import CategoriasView from './components/CategoriasBlock/View';
import CategoriasEdit from './components/CategoriasBlock/Edit';
import TodasBlockView from './components/TodasAsNoticiasBlock/View';
import TodasBlockEdit from './components/TodasAsNoticiasBlock/Edit';
import TodasNoticiasCategoriaBlockView from './components/NoticiasCategoriaBlock/View';
import TodasNoticiasCategoriaBlockEdit from './components/NoticiasCategoriaBlock/Edit';
import CardsSubHomesBlockView from './components/CardsSubHomesBlock/View';
import CardsSubHomesBlockEdit from './components/CardsSubHomesBlock/Edit';
import CadsIconsBlockView from './components/CardsIconsBlock/View';
import CadsIconsBlockEdit from './components/CardsIconsBlock/Edit';

import CarouselBlockView from './components/CarouselBlock/View';
import CarouselBlockEdit from './components/CarouselBlock/Edit';

import HomeNewsBlockView from './components/HomeNewsBlock/View';
import HomeNewsBlockEdit from './components/HomeNewsBlock/Edit';

const blockDefinitions = {
  gridMuiBlock: { title: 'Grid View', view: View, edit: GridBlockEdit },
  liveBlock: { title: 'Ao vivo', view: LiveBlockView, edit: LiveBlockEdit },
  categoryBlock: {
    title: 'Lista de Categorias',
    view: CategoryBlockView,
    edit: CategoryBlockEdit,
  },
  bannersBlock: {
    title: 'Banners sidebar',
    view: BannersBlockView,
    edit: BannersBlockEdit,
  },
  newsHomeBlock: {
    title: 'News home',
    view: NewsHomeBlockView,
    edit: NewsHomeBlockEdit,
  },
  midiaBlock: {
    title: 'Mídia home',
    view: MidiaBlockView,
    edit: MidiaBlockEdit,
  },
  cardsBlock: {
    title: 'Cards Institucionais',
    view: CardsBlockView,
    edit: CardsBlockEdit,
  },
  destaquesBlock: {
    title: 'Destaques da Home',
    view: DestaquesBlockView,
    edit: DestaquesBlockEdit,
  },
  cardsBackBlock: {
    title: 'Cards com Background',
    view: CardsBackBlockView,
    edit: CardsBackBlockEdit,
  },
  agendaBlock: {
    title: 'Agenda',
    view: AgendaBlockView,
    edit: AgendaBlockEdit,
  },
  destaquesNoticiasBlock: {
    title: 'Destaques notícias',
    view: DestaquesNoticiasView,
    edit: DestaquesNoticiasEdit,
  },
  categoriasBlock: {
    title: 'Todas as categorias',
    view: CategoriasView,
    edit: CategoriasEdit,
  },
  todasnoticiasBlock: {
    title: 'Todas as notícias',
    view: TodasBlockView,
    edit: TodasBlockEdit,
  },
  noticiasCategoriaBlock: {
    title: 'Todas as notícias da categoria',
    view: TodasNoticiasCategoriaBlockView,
    edit: TodasNoticiasCategoriaBlockEdit,
  },
  cardsSubHomeBlock: {
    title: 'Cards da SubHomes',
    view: CardsSubHomesBlockView,
    edit: CardsSubHomesBlockEdit,
  },
  cadsIconsBlock: {
    title: 'Cards com ícones',
    view: CadsIconsBlockView,
    edit: CadsIconsBlockEdit,
  },
  carouselBlock: {
    title: 'Carousel',
    view: CarouselBlockView,
    edit: CarouselBlockEdit,
  },
  homeNewsBlock: {
    title: 'Notícias da Home',
    view: HomeNewsBlockView,
    edit: HomeNewsBlockEdit,
  },
};

const applyConfig = (config) => {
  Object.entries(blockDefinitions).forEach(([id, { title, view, edit }]) => {
    config.blocks.blocksConfig[id] = {
      id,
      title,
      group: 'common',
      icon: LogoCamara,
      view,
      edit,
      restricted: false,
      mostUsed: false,
      sidebarTab: 1,
      blockHasOwnFocusManagement: false,
    };
  });

  const localBlocks = Object.keys(blockDefinitions);
  localBlocks.forEach((blockId) => {
    const block = config.blocks.blocksConfig[blockId];
    if (
      block?.allowedBlocks !== undefined &&
      block?.blocksConfig !== undefined
    ) {
      block.allowedBlocks = [...block.allowedBlocks, ...localBlocks];
      localBlocks.forEach((id) => {
        block.blocksConfig[id] = cloneDeep(config.blocks.blocksConfig[id]);
      });
    }
  });

  return config;
};

export default applyConfig;
