from plone.app.upgrade.utils import loadMigrationProfile
from Products.CMFPlone.interfaces import IPloneSiteRoot
from zope.component import getUtility


def update_profile(context):
    """Atualiza o perfil do produto"""
    if not IPloneSiteRoot.providedBy(context):
        portal = getUtility(IPloneSiteRoot)
    else:
        portal = context

    loadMigrationProfile(
        portal,
        "profile-camara_de_curitiba:default",
        steps=["typeinfo", "controlpanel", "registry"],
    )


if __name__ == "__main__":
    update_profile(None)
