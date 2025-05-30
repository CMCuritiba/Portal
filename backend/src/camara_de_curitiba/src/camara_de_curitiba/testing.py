from plone.app.contenttypes.testing import PLONE_APP_CONTENTTYPES_FIXTURE
from plone.app.robotframework.testing import REMOTE_LIBRARY_BUNDLE_FIXTURE
from plone.app.testing import applyProfile
from plone.app.testing import FunctionalTesting
from plone.app.testing import IntegrationTesting
from plone.app.testing import PloneSandboxLayer
from plone.testing.zope import WSGI_SERVER_FIXTURE
from plone.app.testing import quickInstallProduct
from plone.app.testing import setRoles
from plone.app.testing import TEST_USER_ID

import camara_de_curitiba


class Layer(PloneSandboxLayer):

    defaultBases = (PLONE_APP_CONTENTTYPES_FIXTURE,)

    def setUpZope(self, app, configurationContext):
        # Load any other ZCML that is required for your tests.
        # The z3c.autoinclude feature is disabled in the Plone fixture base
        # layer.
        import plone.restapi
        import pas.plugins.oidc
        import pas.plugins.keycloakgroups

        self.loadZCML(package=plone.restapi)
        self.loadZCML(package=pas.plugins.oidc)
        self.loadZCML(package=pas.plugins.keycloakgroups)
        self.loadZCML(package=camara_de_curitiba)

    def setUpPloneSite(self, portal):
        # Instala os produtos necessários
        quickInstallProduct(portal, "pas.plugins.oidc")
        quickInstallProduct(portal, "pas.plugins.keycloakgroups")
        
        # Aplica os perfis
        applyProfile(portal, "pas.plugins.oidc:default")
        applyProfile(portal, "pas.plugins.keycloakgroups:default")
        applyProfile(portal, "camara_de_curitiba:default")
        applyProfile(portal, "camara_de_curitiba:initial")
        
        # Configura as permissões necessárias
        setRoles(portal, TEST_USER_ID, ["Manager"])


FIXTURE = Layer()


INTEGRATION_TESTING = IntegrationTesting(
    bases=(FIXTURE,),
    name="CamaraDeCuritibaLayer:IntegrationTesting",
)


FUNCTIONAL_TESTING = FunctionalTesting(
    bases=(FIXTURE, WSGI_SERVER_FIXTURE),
    name="CamaraDeCuritibaLayer:FunctionalTesting",
)


ACCEPTANCE_TESTING = FunctionalTesting(
    bases=(
        FIXTURE,
        REMOTE_LIBRARY_BUNDLE_FIXTURE,
        WSGI_SERVER_FIXTURE,
    ),
    name="CamaraDeCuritibaLayer:AcceptanceTesting",
)
