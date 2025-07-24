from plone.app.registry.browser.controlpanel import ControlPanelFormWrapper
from plone.app.registry.browser.controlpanel import RegistryEditForm
from zope import schema
from zope.interface import Interface
from camara_de_curitiba.interfaces import ICamaraDeCuritibaLayer
from plone.restapi.controlpanels import RegistryConfigletPanel
from zope.component import adapter


class IPartidosSettings(Interface):
    """Schema para configurações de partidos"""

    partidos = schema.List(
        title="Partidos Políticos",
        value_type=schema.Dict(
            title="Partido", value_type=schema.TextLine(), key_type=schema.TextLine()
        ),
        required=False,
        default=[],
    )


class PartidosEditForm(RegistryEditForm):
    schema = IPartidosSettings
    label = "Configurações de Partidos Políticos"


class PartidosControlPanelView(ControlPanelFormWrapper):
    form = PartidosEditForm


@adapter(Interface, ICamaraDeCuritibaLayer)
class PartidosConfigletPanel(RegistryConfigletPanel):
    """Control Panel endpoint"""

    schema = IPartidosSettings
    configlet_id = "partidos-controlpanel"
    configlet_category_id = "Products"
    title = "Partidos Políticos"
    group = ""
    schema_prefix = "camara_de_curitiba.partidos"
