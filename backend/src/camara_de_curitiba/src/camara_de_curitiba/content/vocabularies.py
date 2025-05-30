from ..controlpanels.legislaturas.controlpanel import ILegislaturasSettings
from ..controlpanels.partidos import IPartidosSettings
from camara_de_curitiba import _
from plone.registry.interfaces import IRegistry
from Products.CMFCore.utils import getToolByName
from zope.component import getUtility
from zope.interface import implementer
from zope.interface import provider
from zope.schema.interfaces import IVocabularyFactory
from zope.schema.vocabulary import SimpleTerm
from zope.schema.vocabulary import SimpleVocabulary


@provider(IVocabularyFactory)
def partidos_vocabulary(context):
    registry = getUtility(IRegistry)
    settings = registry.forInterface(IPartidosSettings)
    terms = []
    for partido in settings.partidos:
        id = partido.get("@id", "")
        sigla = partido.get("sigla", "")
        nome = partido.get("nome", "")
        terms.append(SimpleTerm(value=id, token=id, title=f"{sigla} - {nome}"))
    return SimpleVocabulary(terms)


@provider(IVocabularyFactory)
def legislaturas_vocabulary(context):
    registry = getUtility(IRegistry)
    settings = registry.forInterface(ILegislaturasSettings)
    terms = []
    for legislatura in settings.legislaturas:
        id = legislatura.get("@id", "")
        nome = legislatura.get("nome", "")
        terms.append(SimpleTerm(value=id, token=id, title=nome))
    return SimpleVocabulary(terms)


@implementer(IVocabularyFactory)
class NewsItemsVocabulary(object):
    """Vocabulary factory for news items."""

    def __call__(self, context):
        catalog = getToolByName(context, "portal_catalog")
        results = catalog(
            portal_type="News Item",
            review_state="published",
            sort_on="created",
            sort_order="reverse",
        )

        items = []
        for brain in results:
            items.append(SimpleVocabulary.createTerm(brain.UID, brain.UID, brain.Title))

        return SimpleVocabulary(items)


NewsItemsVocabularyFactory = NewsItemsVocabulary()


@implementer(IVocabularyFactory)
class CoresVocabularyFactory(object):
    """Vocabulary factory for colors."""

    def __call__(self, context):
        items = [
            ("#FFFFFF", _("Branco")),
            ("#F5F5F5", _("Cinza Claro")),
            ("#E0E0E0", _("Cinza Médio")),
            ("#9E9E9E", _("Cinza Escuro")),
            ("#FFEBEE", _("Vermelho Claro")),
            ("#FFCDD2", _("Vermelho Médio")),
            ("#EF5350", _("Vermelho")),
            ("#E3F2FD", _("Azul Claro")),
            ("#90CAF9", _("Azul Médio")),
            ("#2196F3", _("Azul")),
            ("#E8F5E9", _("Verde Claro")),
            ("#A5D6A7", _("Verde Médio")),
            ("#4CAF50", _("Verde")),
            ("#FFF3E0", _("Laranja Claro")),
            ("#FFCC80", _("Laranja Médio")),
            ("#FF9800", _("Laranja")),
        ]
        terms = [
            SimpleTerm(value=value, token=value, title=title) for value, title in items
        ]
        return SimpleVocabulary(terms)


CoresVocabulary = CoresVocabularyFactory()
