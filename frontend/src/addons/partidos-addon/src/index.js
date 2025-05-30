import PartidosControlPanel from './controlpanels/Partidos';
import LegislaturasControlPanel from './controlpanels/Legislaturas';
import ObjectListWithTitleWidget from './widgets/ObjectListWithTitleWidget';
import menuSVG from './icons/logo-camara.svg';
export default function applyConfig(config) {
  // Add manage view to controlpanels

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
      path: '/controlpanel/legislaturas',
      component: LegislaturasControlPanel,
    },
    {
      path: '/controlpanel/partidos',
      component: PartidosControlPanel,
    },
  ];

  config.widgets.widget.object_list_title = ObjectListWithTitleWidget;

  return config;
}
