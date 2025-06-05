# -*- coding: utf-8 -*-
from camara_de_curitiba.content.editoria import IEditoria  # NOQA E501
from camara_de_curitiba.testing import CAMARA_DE_CURITIBA_INTEGRATION_TESTING  # noqa
from plone import api
from plone.app.testing import setRoles
from plone.app.testing import TEST_USER_ID
from plone.dexterity.interfaces import IDexterityFTI
from zope.component import createObject
from zope.component import queryUtility

import unittest


class EditoriaIntegrationTest(unittest.TestCase):

    layer = CAMARA_DE_CURITIBA_INTEGRATION_TESTING

    def setUp(self):
        """Custom shared utility setup for tests."""
        self.portal = self.layer["portal"]
        setRoles(self.portal, TEST_USER_ID, ["Manager"])
        self.parent = self.portal

    def test_ct_editoria_schema(self):
        fti = queryUtility(IDexterityFTI, name="Editoria")
        schema = fti.lookupSchema()
        self.assertEqual(IEditoria, schema)

    def test_ct_editoria_fti(self):
        fti = queryUtility(IDexterityFTI, name="Editoria")
        self.assertTrue(fti)

    def test_ct_editoria_factory(self):
        fti = queryUtility(IDexterityFTI, name="Editoria")
        factory = fti.factory
        obj = createObject(factory)

        self.assertTrue(
            IEditoria.providedBy(obj),
            "IEditoria not provided by {0}!".format(
                obj,
            ),
        )

    def test_ct_editoria_adding(self):
        setRoles(self.portal, TEST_USER_ID, ["Contributor"])
        obj = api.content.create(
            container=self.portal,
            type="Editoria",
            id="editoria",
        )

        self.assertTrue(
            IEditoria.providedBy(obj),
            "IEditoria not provided by {0}!".format(
                obj.id,
            ),
        )

        parent = obj.__parent__
        self.assertIn("editoria", parent.objectIds())

        # check that deleting the object works too
        api.content.delete(obj=obj)
        self.assertNotIn("editoria", parent.objectIds())

    def test_ct_editoria_globally_addable(self):
        setRoles(self.portal, TEST_USER_ID, ["Contributor"])
        fti = queryUtility(IDexterityFTI, name="Editoria")
        self.assertTrue(fti.global_allow, "{0} is not globally addable!".format(fti.id))

    def test_ct_editoria_filter_content_type_false(self):
        setRoles(self.portal, TEST_USER_ID, ["Contributor"])
        fti = queryUtility(IDexterityFTI, name="Editoria")
        portal_types = self.portal.portal_types
        parent_id = portal_types.constructContent(
            fti.id,
            self.portal,
            "editoria_id",
            title="Editoria container",
        )
        self.parent = self.portal[parent_id]
        obj = api.content.create(
            container=self.parent,
            type="Document",
            title="My Content",
        )
        self.assertTrue(obj, "Cannot add {0} to {1} container!".format(obj.id, fti.id))
