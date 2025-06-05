from zope.interface import provider
from zope.schema.interfaces import IVocabularyFactory
from zope.schema.vocabulary import SimpleTerm
from zope.schema.vocabulary import SimpleVocabulary


@provider(IVocabularyFactory)
def cargos_mesa_diretora_vocabulary(context):
    """Vocabulário para os cargos da Mesa Diretora"""
    terms = [
        SimpleTerm('presidente', 'presidente', 'Presidente'),
        SimpleTerm('primeiro-vice-presidente', 'primeiro-vice-presidente', '1º Vice-presidente'),
        SimpleTerm('segundo-vice-presidente', 'segundo-vice-presidente', '2º Vice-presidente'),
        SimpleTerm('primeiro-secretario', 'primeiro-secretario', 'Primeiro-secretário'),
        SimpleTerm('segundo-secretario', 'segundo-secretario', 'Segundo-secretário'),
        SimpleTerm('terceiro-secretario', 'terceiro-secretario', 'Terceiro-secretário'),
        SimpleTerm('quarto-secretario', 'quarto-secretario', 'Quarto-secretário'),
        SimpleTerm('presidenta', 'presidenta', 'Presidenta'),
        SimpleTerm('primeira-vice-presidente', 'primeira-vice-presidente', '1ª Vice-presidente'),
        SimpleTerm('segunda-vice-presidente', 'segunda-vice-presidente', '2ª Vice-presidente'),
        SimpleTerm('primeira-secretaria', 'primeira-secretaria', 'Primeira-secretária'),
        SimpleTerm('segunda-secretaria', 'segunda-secretaria', 'Segunda-secretária'),
        SimpleTerm('terceira-secretaria', 'terceira-secretaria', 'Terceira-secretária'),
        SimpleTerm('quarta-secretaria', 'quarta-secretaria', 'Quarta-secretária'),
    ]
    return SimpleVocabulary(terms)


@provider(IVocabularyFactory)
def cargos_corregedoria_vocabulary(context):
    """Vocabulário para os cargos da Corregedoria"""
    terms = [
        SimpleTerm('corregedor', 'corregedor', 'Corregedor'),
        SimpleTerm('primeiro-vice-corregedor', 'primeiro-vice-corregedor', '1º Vice-corregedor'),
        SimpleTerm('segundo-vice-corregedor', 'segundo-vice-corregedor', '2º Vice-corregedor'),
        SimpleTerm('corregedora', 'corregedora', 'Corregedora'),
        SimpleTerm('primeira-vice-corregedora', 'primeira-vice-corregedora', '1ª Vice-corregedora'),
        SimpleTerm('segunda-vice-corregedora', 'segunda-vice-corregedora', '2ª Vice-corregedora'),
    ]
    return SimpleVocabulary(terms)
