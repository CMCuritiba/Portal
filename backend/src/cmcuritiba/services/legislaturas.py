from ..controlpanel.legislaturas.controlpanel import ILegislaturasSettings
from plone.registry.interfaces import IRegistry
from plone.restapi.deserializer import json_body
from plone.restapi.services import Service
from zope.component import getUtility
from zope.interface import implementer
from zope.publisher.interfaces import IPublishTraverse

import uuid


@implementer(IPublishTraverse)
class LegislaturasGet(Service):
    def __init__(self, context, request):
        super(LegislaturasGet, self).__init__(context, request)

    def reply(self):
        registry = getUtility(IRegistry)
        settings = registry.forInterface(ILegislaturasSettings)

        items = []
        for item in settings.legislaturas:
            new_item = item.copy()
            if "@id" not in new_item:
                new_item["@id"] = str(uuid.uuid4())
            items.append(new_item)

        return {"@id": f"{self.context.absolute_url()}/legislaturas", "items": items}


@implementer(IPublishTraverse)
class LegislaturasPut(Service):
    def __init__(self, context, request):
        super(LegislaturasPut, self).__init__(context, request)

    def reply(self):
        data = json_body(self.request)

        if "items" not in data:
            self.request.response.setStatus(400)
            return {"error": 'O campo "items" é obrigatório'}

        processed_items = []
        for item in data["items"]:
            if "@id" not in item:
                item["@id"] = str(uuid.uuid4())
            processed_items.append(item)

        processed_items.sort(key=lambda x: x.get("ano_final", 0), reverse=True)
        registry = getUtility(IRegistry)
        settings = registry.forInterface(ILegislaturasSettings)
        settings.legislaturas = processed_items

        return {
            "@id": f"{self.context.absolute_url()}/legislaturas",
            "items": settings.legislaturas,
        }
