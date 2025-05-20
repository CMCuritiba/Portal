import {CategoriaView} from "./components";
import VereadoresListView from "./components/VereadoresView/VereadoresListView";
import VereadorItemView from "./components/VereadoresView/VereadorItemView";
import AgendaListView from "./components/AgendaView/AgendaListView";
import AgendaItemView from "./components/AgendaView/AgendaItemView";
import MyMenuConfigurationForm from "./components/MyMenuConfigurationForm";
const applyConfig = (config) => {
  config.settings = {
    ...config.settings,
    isMultilingual: false,
    supportedLanguages: ['pt-br'],
    defaultLanguage: 'pt-br',
  };


  config.addonRoutes = [
    {
      path: '/vereadores/conheca-os-vereadores/', // URL onde a página será acessível
      component: VereadoresListView,
    },
  ];

  config.views.contentTypesViews = {
    ...config.views.contentTypesViews,
    vereador: VereadorItemView, // Associa a visualização ao novo tipo de conteúdo
    Event: AgendaItemView
  };


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
