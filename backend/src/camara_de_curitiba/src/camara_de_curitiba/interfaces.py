from zope import schema
from zope.interface import Interface
from zope.publisher.interfaces.browser import IDefaultBrowserLayer


class ICamaraDeCuritibaLayer(IDefaultBrowserLayer):
    """Marker interface para o layer"""


class IVereador(Interface):
    """Content type: Vereador"""

    nome = schema.TextLine(
        title="Nome",
        required=True,
    )

    partido = schema.TextLine(
        title="Partido",
        required=False,
    )

    biografia = schema.Text(
        title="Biografia",
        required=False,
    )

    foto = schema.URI(
        title="URL da foto",
        required=False,
    )
