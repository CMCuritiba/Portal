# -*- coding: utf-8 -*-
from plone.app.content.interfaces import INameFromTitle
from plone.app.textfield import RichText
from plone.app.z3cform.widget import RelatedItemsFieldWidget
from plone.app.z3cform.widget import SelectFieldWidget
from plone.autoform import directives
from plone.autoform import directives as form
from plone.dexterity.content import Container
from plone.dexterity.interfaces import IDexterityContent
from plone.namedfile import field as namedfile
from plone.supermodel import model
from plone.supermodel.directives import fieldset
from zope import schema
from zope.component import adapter
from zope.interface import implementer
from zope.interface import provider


@provider(INameFromTitle)
@adapter(IDexterityContent)
class NameFromTitle(object):
    def __init__(self, context):
        self.context = context

    @property
    def title(self):
        return self.context.title


class IVereador(model.Schema):
    """Marker interface and Dexterity Python Schema for Vereador"""

    fieldset(
        "dados_vereador",
        label="Perfil do Vereador",
        fields=[
            "partido",
            "legislatura",
            "mandato",
            "foto",
            "video_principal",
            "telefone_principal",
            "email",
            "noticias_relacionadas",
            "perfil_do_vereador",
            "trabalho_parlamentar",
            "contatos",
            "mesa_diretora",
            "cargo_mesa_diretora",
            "lideranca",
            "corregedoria",
            "cargo_corregedoria",
            "licenciado",
        ],
    )

    mandato = schema.TextLine(
        title="Mandato",
        description="Mandato",
        required=False,
    )

    partido = schema.Choice(
        title="Partido",
        required=True,
        vocabulary="camara_de_curitiba.partidos",
    )

    legislatura = schema.List(
        title="Legislatura",
        required=True,
        value_type=schema.Choice(vocabulary="camara_de_curitiba.legislaturas"),
    )

    foto = namedfile.NamedBlobImage(
        title="Foto",
        required=True,
    )

    perfil_do_vereador = RichText(
        title="Perfil do vereador",
        required=False,
    )

    trabalho_parlamentar = RichText(
        title="Trabalho Parlamentar",
        required=False,
    )

    contatos = RichText(
        title="Contatos",
        required=False,
    )

    video_principal = schema.TextLine(
        title="Vídeo principal",
        description="URL do vídeo principal do vereador",
        required=False,
    )

    telefone_principal = schema.TextLine(
        title="Telefone principal",
        description="",
        required=False,
    )

    email = schema.TextLine(
        title="E-mail",
        description="",
        required=False,
    )

    link_projeto_de_lei = schema.TextLine(
        title="Link projetos de lei",
        description="Caso este link não seja preenchido, o valor padrão é: ",
        required=False,
    )

    mesa_diretora = schema.Bool(
        title="Mesa Diretora",
        required=False,
    )

    cargo_mesa_diretora = schema.TextLine(
        title="Cargo na Mesa Diretora",
        description="Somente se mesa diretora estiver selecionado",
        required=False,
    )

    lideranca = schema.Bool(
        title="Liderança",
        required=False,
    )

    corregedoria = schema.Bool(
        title="Corregedoria",
        required=False,
    )

    cargo_corregedoria = schema.TextLine(
        title="Cargo na Corregedoria",
        description="Somente se corregedoria estiver selecionado",
        required=False,
    )

    licenciado = schema.Bool(
        title="Licenciado",
        required=False,
    )

    noticias_relacionadas = schema.List(
        title="Notícias relacionadas",
        required=False,
        value_type=schema.Choice(
            title="Notícia", vocabulary="camara_de_curitiba.news_items"
        ),
    )

    form.widget(
        "noticias_relacionadas",
        RelatedItemsFieldWidget,
        pattern_options={
            "selectableTypes": ["News Item"],
            "basePath": "/",
            "mode": "search",
            "maximumSelectionSize": 20,
        },
    )
    directives.widget(partido=SelectFieldWidget)
    directives.widget(legislatura=SelectFieldWidget)

    # If you want, you can load a xml model created TTW here
    # and customize it in Python:

    # model.load('vereador.xml')

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


@implementer(IVereador)
class Vereador(Container):
    """Content-type class for IVereador"""
