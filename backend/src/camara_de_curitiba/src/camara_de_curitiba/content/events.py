from plone import api
from plone.dexterity.interfaces import IDexterityContent
from plone.locking.interfaces import ILockable
from zope.component import adapter
from zope.interface import implementer
from zope.lifecycleevent.interfaces import IObjectAddedEvent
from zope.lifecycleevent.interfaces import IObjectModifiedEvent

import logging


logger = logging.getLogger("camara_de_curitiba")


@implementer(IObjectAddedEvent)
@adapter(IDexterityContent)
def vereador_added(obj, event):
    """Evento disparado quando um vereador é criado"""
    if obj.portal_type != "vereador":
        return

    portal = api.portal.get()

    # Verifica se a página vereadores existe, se não, cria
    if "vereadores" not in portal:
        api.content.create(
            type="Document", title="Vereadores", id="vereadores", container=portal
        )

    # Se o vereador não estiver na página correta, move
    if obj.aq_parent != portal["vereadores"]:
        api.content.move(source=obj, target=portal["vereadores"], safe_id=True)


@implementer(IObjectAddedEvent)
@adapter(IDexterityContent)
def editoria_added(obj, event):
    """Evento disparado quando uma editoria é criada"""
    logger.info(f"Evento editoria_added disparado para {obj.portal_type}")

    if obj.portal_type != "Editoria":
        logger.info(f"Objeto não é uma Editoria: {obj.portal_type}")
        return

    try:
        portal = api.portal.get()
        logger.info("Portal obtido com sucesso")

        # Verifica se a pasta noticias existe, se não, cria
        if "noticias" not in portal:
            logger.info("Criando pasta noticias")
            api.content.create(
                type="Folder", title="Notícias", id="noticias", container=portal
            )

        # Se a editoria não estiver na pasta correta, move
        if obj.aq_parent != portal["noticias"]:
            logger.info(f"Movendo editoria para {portal['noticias'].absolute_url()}")
            api.content.move(source=obj, target=portal["noticias"], safe_id=True)
            logger.info("Editoria movida com sucesso")
        else:
            logger.info("Editoria já está no local correto")

    except ValueError as e:
        logger.error(f"Erro ao processar evento editoria_added: {e}")
        raise


@adapter(IDexterityContent, IObjectAddedEvent)
@adapter(IDexterityContent, IObjectModifiedEvent)
def noticia_added_modified(obj, event):
    """Evento disparado quando uma notícia é criada ou modificada"""
    if obj.portal_type != "News Item":
        return

    try:
        portal = api.portal.get()

        # Verifica se a pasta noticias existe, se não, cria
        if "noticias" not in portal:
            api.content.create(
                type="Folder", title="Notícias", id="noticias", container=portal
            )

        # Verifica se tem editoria vinculada
        editoria_uid = getattr(obj, "editoria", None)

        if editoria_uid:
            # Busca a editoria pelo UID
            editoria = api.content.get(UID=editoria_uid)
            if editoria:
                # Move para a pasta da editoria
                if obj.aq_parent != editoria:
                    # Usa uma abordagem que não depende do sistema de locking
                    with api.env.adopt_roles(["Manager"]):
                        try:
                            # Primeiro desbloqueia o objeto
                            if hasattr(obj, "_p_jar") and obj._p_jar is not None:
                                obj._p_jar.sync()

                            # Verifica se o objeto está bloqueado e desbloqueia
                            lockable = ILockable(obj, None)
                            if lockable and lockable.locked():
                                lockable.clear_locks()

                            # Move o objeto
                            editoria.manage_pasteObjects(
                                obj.aq_parent.manage_cutObjects([obj.getId()])
                            )
                            # Atualiza o campo editoria
                            obj.editoria = editoria_uid
                            obj.reindexObject()
                            logger.info(
                                f"Notícia movida para editoria: "
                                f"{editoria.absolute_url()}"
                            )
                        except ValueError as e:
                            logger.error(f"Erro ao mover notícia: {e}")
                            raise
            else:
                logger.warning(f"Editoria com UID {editoria_uid} não encontrada")
        else:
            # Move para a pasta noticias
            if obj.aq_parent != portal["noticias"]:
                # Usa uma abordagem que não depende do sistema de locking
                with api.env.adopt_roles(["Manager"]):
                    try:
                        # Primeiro desbloqueia o objeto
                        if hasattr(obj, "_p_jar") and obj._p_jar is not None:
                            obj._p_jar.sync()

                        # Verifica se o objeto está bloqueado e desbloqueia
                        lockable = ILockable(obj, None)
                        if lockable and lockable.locked():
                            lockable.clear_locks()

                        # Move o objeto
                        portal["noticias"].manage_pasteObjects(
                            obj.aq_parent.manage_cutObjects([obj.getId()])
                        )
                        # Limpa o campo editoria
                        obj.editoria = None
                        obj.reindexObject()
                        logger.info(
                            "Notícia movida para pasta noticias e campo editoria limpo"
                        )
                    except ValueError as e:
                        logger.error(f"Erro ao mover notícia: {e}")
                        raise

    except ValueError as e:
        logger.error(f"Erro ao processar evento noticia_added_modified: {e}")
        raise
