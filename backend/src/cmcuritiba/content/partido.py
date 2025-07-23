from plone.dexterity.content import Container
from plone.supermodel import model
from zope import schema
from zope.interface import implementer


class IPartido(model.Schema):
    """Marker interface and Dexterity Python Schema for Partido"""

    sigla = schema.TextLine(
        title="Sigla",
        required=True,
    )

    nome = schema.TextLine(
        title="Nome",
        required=True,
    )

    logo = schema.URI(
        title="URL do Logo",
        required=False,
    )


@implementer(IPartido)
class Partido(Container):
    """Content-type class for IPartido"""
