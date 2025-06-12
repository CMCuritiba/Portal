from Products.Five.browser import BrowserView
from zExceptions import Redirect


class AddPartidoView(BrowserView):
    """View para redirecionar tentativas de adicionar partido"""

    def __call__(self):
        if self.request.form.get("type") == "partido":
            raise Redirect(self.context.absolute_url() + "/controlpanel/partidos")
        # Se não for partido, continua com o comportamento normal
        return self.context.restrictedTraverse("@@add-content")()
