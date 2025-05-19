# -*- coding: utf-8 -*-
# from plone.app.textfield import RichText
# from plone.autoform import directives
from camara_de_curitiba import _
from plone.dexterity.content import Container
from plone.app.vocabularies.catalog import CatalogSource
from plone.app.contenttypes.behaviors.richtext import IRichText
from plone.app.contenttypes.interfaces import INewsItem
from zope.schema.vocabulary import SimpleVocabulary, SimpleTerm
from zope.interface import implementer
from plone.supermodel import model
from zope import schema
from zope.schema.interfaces import IVocabularyFactory
from zope.interface import provider
from plone.app.vocabularies.catalog import parse_query
from zope.component import getUtility
from Products.CMFCore.utils import getToolByName
from plone.app.layout.navigation.interfaces import INavigationRoot
from Acquisition import aq_inner, aq_parent
from zope.interface import Interface
from zope.component import adapter
from plone.restapi.interfaces import ISerializeToJson
from plone.restapi.serializer.converters import json_compatible


@provider(IVocabularyFactory)
def NoticiasFilhasVocabulary(context):
    """Vocabulário para notícias filhas da editoria"""
    catalog = getToolByName(context, 'portal_catalog')
    path = '/'.join(context.getPhysicalPath())
    print("Path original:", path)
    
    # Remove o último segmento do path se for "noticias/teste-1"
    if path.endswith("/noticias/teste-1"):
        path = path[:-len("/noticias/teste-1")]
    
    print("Path ajustado:", path)
    results = catalog(
        portal_type='News Item',
        path={'query': path, 'depth': 1},
        sort_on='sortable_title',
        sort_order='ascending'
    )
    print("Results:", results)

    terms = []
    for brain in results:
        try:
            print("Brain:", brain.Title, brain.UID)
            terms.append(SimpleTerm(
                value=brain.UID,
                token=brain.UID,
                title=brain.Title or brain.getId
            ))
        except (AttributeError, TypeError) as e:
            print("Error:", e)
            continue

    vocab = SimpleVocabulary(terms)
    print("Vocabulary terms:", [term.title for term in vocab])
    return vocab

    vocab = SimpleVocabulary(terms)
    print("Vocabulary terms:", [term.title for term in vocab])
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
        vocabulary="camara_de_curitiba.cores",
        required=True,
        default="#FFFFFF",
    )

    noticias_mais_lidas = schema.List(
        title=_("Notícias mais lidas"),
        description=_("Selecione as notícias que devem aparecer como mais lidas"),
        value_type=schema.Choice(
            vocabulary="camara_de_curitiba.noticias_filhas",
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
        print("Validando noticias_mais_lidas:", value)
        if not value:
            print("Valor vazio, retornando True")
            return True

        try:
            vocab = getUtility(IVocabularyFactory, name="camara_de_curitiba.noticias_filhas")(self)
            valid_values = [term.value for term in vocab]
            print("Valores válidos:", valid_values)
            print("Valores a validar:", value)
            result = all(v in valid_values for v in value)
            print("Resultado da validação:", result)
            return result
        except Exception as e:
            print("Erro na validação:", str(e))
            return True  # Em caso de erro, permite o valor para não bloquear a edição
