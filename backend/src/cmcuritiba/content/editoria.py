# -*- coding: utf-8 -*-
# from plone.app.textfield import RichText
# from plone.autoform import directives
from Acquisition import aq_inner
from Acquisition import aq_parent
from cmcuritiba import _
from plone.dexterity.content import Container
from plone.supermodel import model
from Products.CMFCore.utils import getToolByName
from zope import schema
from zope.component import getUtility
from zope.interface import implementer
from zope.interface import provider
from zope.schema.interfaces import IVocabularyFactory
from zope.schema.vocabulary import SimpleTerm
from zope.schema.vocabulary import SimpleVocabulary
import logging

logger = logging.getLogger(__name__)


@provider(IVocabularyFactory)
def NoticiasFilhasVocabulary(context):
    """Vocabulário para notícias filhas da editoria"""
    catalog = getToolByName(context, "portal_catalog")

    # Se o contexto for uma editoria, usa ele mesmo
    if IEditoria.providedBy(context):
        editoria = context
    else:
        # Se não for, tenta pegar a editoria do contexto
        try:
            editoria = aq_parent(aq_inner(context))
            while editoria and not IEditoria.providedBy(editoria):
                editoria = aq_parent(aq_inner(editoria))
        except (AttributeError, TypeError):
            # Se não conseguir acessar o parent, retorna vocabulário vazio
            return SimpleVocabulary([])

    if not editoria:
        return SimpleVocabulary([])

    path = "/".join(editoria.getPhysicalPath())
    results = catalog(
        portal_type="News Item",
        path={"query": path, "depth": 1},
        sort_on="sortable_title",
        sort_order="ascending",
    )

    terms = []
    for brain in results:
        try:
            terms.append(
                SimpleTerm(
                    value=brain.UID, token=brain.UID, title=brain.Title or brain.getId
                )
            )
        except (AttributeError, TypeError) as e:
            logger.error("Error: %s", e)
            continue

    vocab = SimpleVocabulary(terms)
    return vocab


class IEditoria(model.Schema):
    """Marker interface and Dexterity Python Schema for Editoria"""

    # If you want, you can load a xml model created TTW here
    # and customize it in Python:

    # model.load('editoria.xml')

    # directives.widget(level=RadioFieldWidget)
    # level = schema.Choice(
    #     title=_(u'Sponsoring Level'),
    #     vocabulary=LevelVocabulary,
    #     required=True
    # )

    # text = RichText(
    #     title=_(u'Text'),
    #     required=False
    # )

    # url = schema.URI(
    #     title=_(u'Link'),
    #     required=False
    # )

    # fieldset('Images', fields=['logo', 'advertisement'])
    # logo = namedfile.NamedBlobImage(
    #     title=_(u'Logo'),
    #     required=False,
    # )

    # advertisement = namedfile.NamedBlobImage(
    #     title=_(u'Advertisement (Gold-sponsors and above)'),
    #     required=False,
    # )

    # directives.read_permission(notes='cmf.ManagePortal')
    # directives.write_permission(notes='cmf.ManagePortal')
    # notes = RichText(
    #     title=_(u'Secret Notes (only for site-admins)'),
    #     required=False
    # )

    cor_fundo = schema.Choice(
        title=_("Cor de fundo"),
        description=_("Selecione a cor de fundo da editoria"),
        vocabulary="cmcuritiba.cores",
        required=True,
        default="#FFFFFF",
    )

    noticias_mais_lidas = schema.List(
        title=_("Notícias mais lidas"),
        description=_("Selecione as notícias que devem aparecer como mais lidas"),
        value_type=schema.Choice(
            vocabulary="cmcuritiba.noticias_filhas",
            required=False,
        ),
        required=False,
        default=[],
    )


@implementer(IEditoria)
class Editoria(Container):
    """Content-type class for IEditoria"""

    def __init__(self, *args, **kwargs):
        super(Editoria, self).__init__(*args, **kwargs)
        self.noticias_mais_lidas = []

    def _validate_noticias_mais_lidas(self, value):
        """Validação personalizada para o campo noticias_mais_lidas"""
        if not value:
            return True

        try:
            vocab = getUtility(
                IVocabularyFactory, name="cmcuritiba.noticias_filhas"
            )(self)
            valid_values = [term.value for term in vocab]
            result = all(v in valid_values for v in value)
            return result
        except (LookupError, AttributeError, TypeError):
            return True  # Em caso de erro, permite o valor para não bloquear a edição
