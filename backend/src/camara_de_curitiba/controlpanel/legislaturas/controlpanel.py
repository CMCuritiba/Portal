# -*- coding: utf-8 -*-
from camara_de_curitiba import _
from camara_de_curitiba.interfaces import ICamaraDeCuritibaLayer
from plone.app.registry.browser.controlpanel import ControlPanelFormWrapper
from plone.app.registry.browser.controlpanel import RegistryEditForm
from plone.restapi.controlpanels import RegistryConfigletPanel
from zope import schema
from zope.component import adapter
from zope.interface import Interface


class ILegislaturasSettings(Interface):
    """Schema para configurações de legislaturas"""

    legislaturas = schema.List(
        title="Legislaturas",
        value_type=schema.Dict(
            title="Legislatura",
            value_type=schema.TextLine(),
            key_type=schema.TextLine(),
        ),
        required=False,
        default=[],
    )


class LegislaturasEditForm(RegistryEditForm):
    schema = ILegislaturasSettings
    label = "Configurações de Legislaturas"


class LegislaturasControlPanelView(ControlPanelFormWrapper):
    form = LegislaturasEditForm


@adapter(Interface, ICamaraDeCuritibaLayer)
class LegislaturasConfigletPanel(RegistryConfigletPanel):
    """Control Panel endpoint"""

    schema = ILegislaturasSettings
    configlet_id = "legislaturas-controlpanel"
    configlet_category_id = "Products"
    title = _("Legislaturas")
    group = ""
    schema_prefix = "camara_de_curitiba.legislaturas"
