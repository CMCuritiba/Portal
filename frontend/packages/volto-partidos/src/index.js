import PartidosControlPanel from './controlpanels/Partidos';
import LegislaturasControlPanel from './controlpanels/Legislaturas';
import ObjectListWithTitleWidget from './widgets/ObjectListWithTitleWidget';
import menuSVG from './icons/logo-camara.svg';

export default function applyConfig(config) {
  config.settings.controlpanels = [
    ...(config.settings.controlpanels || []),
    {
      '@id': 'legislaturas',
      group: 'Vereadores',
      title: 'Legislaturas',
      icon: menuSVG,
    },
    {
      '@id': 'partidos',
      group: 'Vereadores',
      title: 'Partidos políticos',
      icon: menuSVG,
    },
  ];

  config.settings.controlPanelsIcons['partidos'] = menuSVG;
  config.settings.controlPanelsIcons['legislaturas'] = menuSVG;

  config.addonRoutes = [
    ...config.addonRoutes,
    {
      path: '/controlpanels/legislaturas',
      component: LegislaturasControlPanel,
    },
    {
      path: '/controlpanels/partidos',
      component: PartidosControlPanel,
    },
  ];

  console.log("config.addonRoutes");

  config.widgets.widget.object_list_title = ObjectListWithTitleWidget;
  return config;
}
