from camara_de_curitiba import logger
from camara_de_curitiba.setuphandlers import content
from camara_de_curitiba.setuphandlers import users
from plone import api
from Products.CMFPlone.interfaces import INonInstallable
from zope.interface import implementer
import os


@implementer(INonInstallable)
class HiddenProfiles(object):
    def getNonInstallableProfiles(self):
        """Hide uninstall profile from site-creation and quickinstaller."""
        return [
            "camara_de_curitiba:uninstall",
        ]


def populate_portal(context):
    """Post install script"""
    portal = api.portal.get()
    # Delete content
    content.delete_content(portal)
    logger.info("Deleted default portal content")
    user = users.create_default_user()
    creators = [user.id]
    logger.info("Created default user")
    # Create other users
    users.create_team_accounts()
    logger.info("Created team accounts")
    # Create Initial content
    content.populate_portal(portal, creators)
    logger.info("Created initial content")
    # Update cover content
    content.update_home(portal, creators)
    #update_keycloak(portal)


def update_keycloak(portal):
    """Set keycloak information on acl_users."""
    plugin = portal.acl_users.oidc
    payload = {
        "issuer": os.environ.get("KEYCLOAK_ISSUER", "http://sso.localhost/realms/plone"),
        "client_id": os.environ.get("KEYCLOAK_CLIENT_ID", "plone"),
        "client_secret": os.environ.get("KEYCLOAK_CLIENT_SECRET", "12345678"),  # nosec B105
        "scope": os.environ.get("KEYCLOAK_OPEN_ID_SCOPES", "openid,profile,email").split(","),
        "create_restapi_ticket": True,
        "redirect_uris": [os.environ.get("KEYCLOAK_REDIRECT_URI", "http://localhost:3000/login-oidc/oidc")],
    }
    for key, value in payload.items():
        setattr(plugin, key, value)
