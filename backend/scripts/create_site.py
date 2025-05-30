from AccessControl.SecurityManagement import newSecurityManager
from camara_de_curitiba.interfaces import ICamaraDeCuritibaLayer
from Products.CMFPlone.factory import _DEFAULT_PROFILE
from Products.CMFPlone.factory import addPloneSite
from Testing.makerequest import makerequest
from zope.interface import directlyProvidedBy
from zope.interface import directlyProvides

import os
import transaction


truthy = frozenset(("t", "true", "y", "yes", "on", "1"))


def asbool(s):
    """Return the boolean value ``True`` if the case-lowered value of string
    input ``s`` is a :term:`truthy string`. If ``s`` is already one of the
    boolean values ``True`` or ``False``, return it."""
    if s is None:
        return False
    if isinstance(s, bool):
        return s
    s = str(s).strip()
    return s.lower() in truthy


DELETE_EXISTING = asbool(os.getenv("DELETE_EXISTING"))

app = makerequest(app)  # noQA

request = app.REQUEST

ifaces = [
    ICamaraDeCuritibaLayer,
] + list(directlyProvidedBy(request))

directlyProvides(request, *ifaces)

admin = app.acl_users.getUserById("admin")
admin = admin.__of__(app.acl_users)
newSecurityManager(None, admin)

site_id = "Plone"
payload = {
    "title": "Câmara de Curitiba",
    "profile_id": _DEFAULT_PROFILE,
    "extension_ids": [
        "camara_de_curitiba:default",
        "camara_de_curitiba:initial",
    ],
    "setup_content": False,
    "default_language": "pt-br",
    "portal_timezone": "America/Sao_Paulo",
}

if site_id in app.objectIds() and DELETE_EXISTING:
    app.manage_delObjects([site_id])
    transaction.commit()
    app._p_jar.sync()

if site_id not in app.objectIds():
    site = addPloneSite(app, site_id, **payload)
    transaction.commit()
    app._p_jar.sync()

    # Atualiza o registry do Keycloak diretamente no contexto do site criado
    registry = site.portal_registry
    prefix = 'keycloak_groups.'
    registry[f'{prefix}client_id'] = os.environ.get('KEYCLOAK_CLIENT_ID', 'plone-admin')
    registry[f'{prefix}client_secret'] = os.environ.get('KEYCLOAK_CLIENT_SECRET', '12345678')
    registry[f'{prefix}enabled'] = True
    registry[f'{prefix}realm_name'] = os.environ.get('KEYCLOAK_REALM_NAME', 'plone-teste')
    registry[f'{prefix}server_url'] = os.environ.get('KEYCLOAK_ISSUER', 'http://sso.localhost')
    registry[f'{prefix}verify'] = False

    transaction.commit()
    app._p_jar.sync()

    # Atualiza o registry do Keycloak após criar o site
