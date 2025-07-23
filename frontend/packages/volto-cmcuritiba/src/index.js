import {CategoriaView} from "./components";
import VereadoresListView from "./components/VereadoresView/VereadoresListView";
import VereadorItemView from "./components/VereadoresView/VereadorItemView";
import AgendaItemView from "./components/AgendaView/AgendaItemView";
import EditoriaItemView from "./components/EditoriaView/EditoriaItemView";
import TagsManager from './components/TagsManager';
const applyConfig = (config) => {
  config.settings = {
    ...config.settings,
    isMultilingual: false,
    supportedLanguages: ['pt-br'],
    defaultLanguage: 'pt-br',
    showPloneLogin:true
  };

  config.views.contentTypesViews = {
    ...config.views.contentTypesViews,
    vereador: VereadorItemView, // Associa a visualização ao novo tipo de conteúdo
    Editoria: EditoriaItemView, // Associa a visualização ao novo tipo de conteúdo
    Event: AgendaItemView
  };

  config.addonRoutes = [
    {
      path: '/vereadores/conheca-os-vereadores', // URL onde a página será acessível
      component: VereadoresListView,
    },
    {
      path: '/controlpanel/tags',
      component: TagsManager,
      exact: true,
    },
  ];

  // Adiciona item ao menu do Control Panel
  config.settings.controlpanel = [
    ...(config.settings.controlpanel || []),
    {
      '@id': '/controlpanel/tags',
      title: 'Gerenciador de Tags',
      group: 'Conteúdo',
      icon: 'tag',
      view: TagsManager,
    },
  ];

  config.blocks.initialBlocks = {
    'News Item': [
      { '@type': 'title' },
      {
        "@type": "slate",
        "plaintext": "Author",
        "cssClass" : "Class",
        "styles": {
        },
        "value": [
          {
            "children": [
              {
                "children": [
                  {
                    "text": "Author",
                    "cssClass" : "Class",
                  }
                ],
                "type": "em",
                "cssClass" : "Class",
              },
            ],
            "cssClass" : "Class",
            "type": "p"
          }
        ]
      },
    ],
    'Event': [
      { '@type': 'title', 'plaintext': 'Título do evento'},
      { '@type': 'image' },
      {
        '@type': 'slate',
        'plaintext': 'Descrição do Evento',
        'cssClass': 'Class',
        'styles': {},
        'value': [
          {
            'type': 'p',
            'cssClass': 'Class',
            'children': [
              {
                'text': 'Descrição do evento aqui...',
                'cssClass': 'Class',
              }
            ]
          }
        ]
      }
    ],
  };
  return config;
};

export default applyConfig;
