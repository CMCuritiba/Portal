"""Init and utils."""

from zope.i18nmessageid import MessageFactory

import logging


PACKAGE_NAME = "camara_de_curitiba"

_ = MessageFactory("camara_de_curitiba")

logger = logging.getLogger("camara_de_curitiba")
