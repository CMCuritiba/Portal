from cmcuritiba import logger
from pathlib import Path
from plone import api
from plone.exportimport import importers
from Products.GenericSetup.tool import SetupTool
from plone.registry.interfaces import IRegistry
from zope.component import queryUtility
from cmcuritiba.controlpanel.legislaturas.controlpanel import (
    ILegislaturasSettings,
)
from cmcuritiba.controlpanel.partidos import IPartidosSettings

EXAMPLE_CONTENT_FOLDER = Path(__file__).parent / "examplecontent"


def create_example_content(portal_setup: SetupTool):
    """Import content available at the examplecontent folder."""
    portal = api.portal.get()
    importer = importers.get_importer(portal)
    for line in importer.import_site(EXAMPLE_CONTENT_FOLDER):
        logger.info(line)
    register_registry_entries()

def register_registry_entries():
    """Registra as entradas do registry quando o pacote é instalado"""
    registry = queryUtility(IRegistry)
    if registry:
        registry.registerInterface(IPartidosSettings)
        registry.registerInterface(ILegislaturasSettings)
