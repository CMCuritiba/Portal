from plone.app.registry.browser.controlpanel import ControlPanelFormWrapper
from plone.app.registry.browser.controlpanel import RegistryEditForm
from zope import schema
from zope.interface import Interface


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
