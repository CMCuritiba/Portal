"""Init and utils."""

from zope.i18nmessageid import MessageFactory

import logging


__version__ = "1.1.29a1"

PACKAGE_NAME = "camara_de_curitiba"

_ = MessageFactory(PACKAGE_NAME)

logger = logging.getLogger(PACKAGE_NAME)
