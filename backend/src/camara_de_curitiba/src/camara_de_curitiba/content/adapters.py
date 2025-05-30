from plone import api
from plone.dexterity.interfaces import IDexterityFTI
from zExceptions import Redirect
from zope.component import adapter
from zope.interface import implementer
from zope.interface import Interface
from zope.publisher.interfaces.browser import IBrowserRequest


class IPartidoRedirect(Interface):
    """Interface para o adapter de redirecionamento de partido"""


@implementer(IPartidoRedirect)
@adapter(IDexterityFTI, IBrowserRequest)
class PartidoRedirect(object):
    """Adapter para redirecionar adição de partido para o control panel"""

    def __init__(self, context, request):
        self.context = context
        self.request = request

    def __call__(self):
        if self.context.getId() == "partido":
            portal_url = api.portal.get().absolute_url()
            raise Redirect(portal_url + "/controlpanel/partidos")
        return None
