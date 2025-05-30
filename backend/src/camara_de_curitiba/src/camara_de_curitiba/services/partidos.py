from ..controlpanels.partidos import IPartidosSettings
from plone.api.portal import get
from plone.dexterity.utils import createContentInContainer
from plone.namedfile.file import NamedBlobImage
from plone.registry.interfaces import IRegistry
from plone.restapi.deserializer import json_body
from plone.restapi.services import Service
from zope.component import getUtility
from zope.interface import implementer
from zope.publisher.interfaces import IPublishTraverse

import base64
import uuid


@implementer(IPublishTraverse)
class PartidosGet(Service):
    def __init__(self, context, request):
        super(PartidosGet, self).__init__(context, request)

    def reply(self):
        registry = getUtility(IRegistry)
        settings = registry.forInterface(IPartidosSettings)

        portal = get()
        portal.absolute_url()
        portal.getId()

        items = []
        for item in settings.partidos:
            new_item = item.copy()
            logo_path = item.get("logo_url")
            if logo_path:
                relative_path = logo_path.lstrip("/")
                logo_obj = portal.restrictedTraverse(relative_path, None)

                if logo_obj and hasattr(logo_obj, "image") and logo_obj.image:
                    new_item["logo"] = {
                        "download": f"{logo_obj.absolute_url()}/@@download/image",
                        "filename": logo_obj.getId(),
                        "content-type": logo_obj.image.contentType,
                    }
            items.append(new_item)

        return {"@id": f"{self.context.absolute_url()}/partidos", "items": items}


@implementer(IPublishTraverse)
class PartidosPut(Service):
    def __init__(self, context, request):
        super(PartidosPut, self).__init__(context, request)

    def reply(self):
        data = json_body(self.request)

        if "items" not in data:
            self.request.response.setStatus(400)
            return {"error": 'O campo "items" é obrigatório'}

        portal = get()
        container_id = "partidos-assets"

        if container_id not in portal:
            portal.invokeFactory("Folder", id=container_id, title="Logos dos Partidos")
            container = portal[container_id]
            container.exclude_from_nav = True
            container.reindexObject()
        else:
            container = portal[container_id]

        processed_items = []
        for item in data["items"]:
            logo = item.get("logo")
            if logo and isinstance(logo, dict):
                raw_data = logo.get("data")
                if raw_data:
                    try:
                        if "," in raw_data:
                            _, base64_data = raw_data.split(",", 1)
                        else:
                            base64_data = raw_data

                        image_data = base64.b64decode(base64_data)
                        filename = logo.get("filename", f"{uuid.uuid4()}.jpg")
                        content_type = logo.get("content-type", "image/jpeg")

                        image_id = f"logo-{uuid.uuid4().hex[:8]}"
                        if image_id in container:
                            container.manage_delObjects([image_id])

                        image_obj = createContentInContainer(
                            container,
                            "Image",
                            id=image_id,
                            title=item.get("sigla", filename),
                            image=NamedBlobImage(
                                data=image_data,
                                filename=filename,
                                contentType=content_type,
                            ),
                        )
                        portal_url = get().absolute_url()
                        relative_path = image_obj.absolute_url().replace(portal_url, "")
                        item["logo_url"] = relative_path

                    except ValueError as e:
                        self.request.response.setStatus(400)
                        return {"error": f"Erro ao processar imagem: {e}"}
            item.pop("logo", None)  # remove o base64 do dict final
            processed_items.append(item)

        processed_items.sort(key=lambda x: x.get("sigla", "").lower())
        registry = getUtility(IRegistry)
        settings = registry.forInterface(IPartidosSettings)
        settings.partidos = processed_items

        return {
            "@id": f"{self.context.absolute_url()}/partidos",
            "items": settings.partidos,
        }
