import React, { useEffect, useState, useMemo } from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import { schemaLegislaturas } from '../schemaLegislaturas';
import { BlockDataForm } from '@plone/volto/components/manage/Form';
import { Button } from 'semantic-ui-react';
import {
  GET_CONTROLPANEL,
  UPDATE_CONTROLPANEL,
} from '@plone/volto/constants/ActionTypes';
import {
  Icon,
  Toast,
  Toolbar,
} from '@plone/volto/components';
import { toast } from 'react-toastify';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import saveSVG from '@plone/volto/icons/save.svg';
import clearSVG from '@plone/volto/icons/clear.svg';

const messages = defineMessages({
  title: {
    id: 'Legislaturas',
    defaultMessage: 'Legislaturas',
  },
  description: {
    id: 'Configurações dos Legislaturas',
    defaultMessage: 'Configurações dos Legislaturas',
  },
  add: {
    id: 'Adicionar partido',
    defaultMessage: 'Adicionar partido',
  },
  save: {
    id: 'Salvar',
    defaultMessage: 'Salvar',
  },
  saveSuccess: {
    id: 'Partidos salvos com sucesso',
    defaultMessage: 'Partidos salvos com sucesso',
  },
  saveError: {
    id: 'Erro ao salvar partidos',
    defaultMessage: 'Erro ao salvar partidos',
  },
});

const get = (url) => {
  return {
    type: GET_CONTROLPANEL,
    request: {
      op: 'get',
      path: url,
    },
  };
};

const put = (url, data) => {
  return {
    type: UPDATE_CONTROLPANEL,
    request: {
      op: 'put',
      path: url,
      data,
    },
  };
};

const handleFileUpload = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/++api++/@upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Erro ao fazer upload do arquivo');
    }

    const data = await response.json();
    return data['@id'] || data.url;
  } catch (error) {
    toast.error(<Toast error title="Erro no upload" content={error.message} />);
    throw error;
  }
};

const LegislaturasControlPanel = (props) => {
  const { intl } = props;
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [formData, setFormData] = useState({ partidos: [] });
  const [uploading, setUploading] = useState(false);
  const isClient = typeof document !== 'undefined';

  const legislaturas = useMemo(
    () => state.controlpanels?.controlpanel?.items || [],
    [state.controlpanels?.controlpanel?.items]
  );

  const schema = {
    title: intl.formatMessage(messages.title),
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['legislaturas'],
      },
    ],
    properties: {
      legislaturas: {
        title: intl.formatMessage(messages.title),
        description: intl.formatMessage(messages.description),
        widget: 'object_list_title',
        schema: schemaLegislaturas({ intl }),
        default: [],
      },
    },
    required: [],
  };

  const onChangeField = async (id, value) => {
    // Se o valor for um arquivo, fazer upload
    if (id === 'partidos' && Array.isArray(value)) {
      const updatedPartidos = await Promise.all(
        value.map(async (partido) => {
          if (partido.logo && partido.logo instanceof File) {
            const logoUrl = await handleFileUpload(partido.logo);
            return { ...partido, logo: logoUrl };
          }
          return partido;
        }),
      );

      setFormData({ ...formData, [id]: updatedPartidos });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const onSubmit = async () => {
    setUploading(true);
    try {
      const response = await dispatch(
        put('++api++/@legislaturas', {
          items: formData.legislaturas || [],
        }),
      );
      if (response?.error) {
        throw new Error(response.error);
      }
      toast.success(<Toast success title={'Salvo'} />);
    } catch (error) {
      toast.error(<Toast error title="Ops..." content={error.message} />);
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    dispatch(get('++api++/@legislaturas'));
  }, [dispatch]);

  useEffect(() => {
    if (legislaturas.length > 0) {
      setFormData({ legislaturas });
    }
  }, [legislaturas]);

  return (
    <>
      <div className="container">
        <BlockDataForm
          schema={schema}
          title={schema.title}
          onChangeField={onChangeField}
          formData={formData}
        />
      </div>
      {isClient &&
        createPortal(
          <Toolbar
            pathname={props.pathname}
            hideDefaultViewButtons
            inner={
              <>
                <Button
                  id="toolbar-save"
                  className="save"
                  aria-label={props.intl.formatMessage(messages.save)}
                  onClick={onSubmit}
                  disabled={uploading}
                  loading={uploading}
                >
                  <Icon
                    name={saveSVG}
                    className="circled"
                    size="30px"
                    title={intl.formatMessage(messages.save)}
                  />
                </Button>

                <Button
                  className="cancel"
                  aria-label={'Cancelar'}
                  onClick={() => props.history.goBack()}
                >
                  <Icon
                    name={clearSVG}
                    className="circled"
                    size="30px"
                    title={'Cancelar'}
                  />
                </Button>
              </>
            }
          />,
          document.getElementById('toolbar'),
        )}
    </>
  );
};

export default injectIntl(LegislaturasControlPanel);
