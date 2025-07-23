from cmcuritiba.content.behaviors import IEditoriaBehavior
from cmcuritiba.content.editoria import IEditoria
from plone.api import content
from plone.restapi.interfaces import ISerializeToJson
from plone.restapi.serializer.converters import json_compatible
from plone.restapi.serializer.dxcontent import SerializeToJson
from zope.component import adapter
from zope.interface import implementer
from zope.interface import Interface


@implementer(ISerializeToJson)
@adapter(Interface)
class ParentSerializer(SerializeToJson):
    def __call__(self, *args, **kwargs):
        result = super(ParentSerializer, self).__call__(*args, **kwargs)

        # Obtém o parent do contexto
        parent = self.context.__parent__

        # Verifica se o parent é uma editoria usando a interface
        if parent and IEditoria.providedBy(parent):
            # Adiciona a cor de fundo ao resultado
            result["cor_fundo"] = json_compatible(parent.cor_fundo)
            result["editoria"] = {
                "@id": parent.absolute_url(),
                "title": parent.title,
                "description": parent.description,
                "cor_fundo": json_compatible(parent.cor_fundo),
            }
        else:
            # Verifica se o conteúdo tem o behavior de editoria
            editoria_behavior = IEditoriaBehavior(self.context, None)
            if editoria_behavior is not None:
                editoria_uid = editoria_behavior.editoria
                if editoria_uid:
                    editoria = content.get(UID=editoria_uid)
                    if editoria:
                        result["editoria"] = {
                            "@id": editoria.absolute_url(),
                            "title": editoria.title,
                            "description": editoria.description,
                            "cor_fundo": json_compatible(editoria.cor_fundo),
                        }

        return result
