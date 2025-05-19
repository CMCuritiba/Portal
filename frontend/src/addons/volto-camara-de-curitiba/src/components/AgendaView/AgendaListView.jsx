import React, {useEffect, useRef, useState} from 'react';
import {Container} from 'semantic-ui-react';
import {Link} from "react-router-dom";
import {Button} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {getSchema} from "@plone/volto/actions/schema/schema";
import {searchContent} from "@plone/volto/actions/search/search";
import {flattenToAppURL} from "@plone/volto/helpers";
import {GET_CONTROLPANEL} from "@plone/volto/constants/ActionTypes";
import {getPartidos} from "../../utils/Utils";


const AgendaListView = (content) => {
  const [tab, setTab] = useState(1);
  const dispatch = useDispatch();
  const schema = useSelector((state) => state.schema.schema);
  const items = useSelector((state) => state.search.items);
  const state = useSelector((state) => state);
  const partidos = useSelector((state) => state.controlpanels?.controlpanel?.partidos);
  const legislaturas = useSelector((state) => state.controlpanels?.controlpanel?.legislaturas);
  const [partidoID, setPartidoID] = useState(null);
  const [legislaturaID, setLegislaturaID] = useState(0);

  const contentType = 'vereadores';

  const filteRed = (items) => {
    if (tab === 2 && partidoID) {
      items = items.filter((z) => z?.partido?.token === partidoID)
    }

    if (tab === 3) {
      return items.filter((z) => z?.mesa_diretora === true)
    }

    if (tab === 4) {
      return items.filter((z) => z?.corregedoria === true)
    }

    if (tab === 5) {
      return items.filter((z) => z?.lideranca === true)
    }

    if (tab === 6) {
      return items.filter((z) => z?.licenciado === true)
    }

    if ((tab === 2 || tab === 1) && legislaturas?.length > 0) {
      return items.filter((z) =>
        z?.legislatura?.some((l) => l.token === legislaturas[legislaturaID]["@id"])
      );
    }


    items = items.sort((a, b) => {
      const titleA = a.title?.toLowerCase() || '';
      const titleB = b.title?.toLowerCase() || '';
      return titleA.localeCompare(titleB);
    });
    return items;
  }
  const alreadyLoaded = useRef(false);


  useEffect(() => {
    if (tab === 3 || tab === 4 || tab === 5) {
      setLegislaturaID(0);
    }
  }, [tab]);
  useEffect(() => {
    console.log("state", legislaturaID);
  }, [legislaturaID]);
  useEffect(() => {
    if (!alreadyLoaded.current) {
      dispatch(getSchema(contentType));
      dispatch(
        searchContent('/vereadores', {
          portal_type: 'vereador',
          sort_on: 'getObjPositionInParent',
          fullobjects: 1,
        })
      );
      dispatch(getPartidos('@legislaturas-e-partidos'));
      alreadyLoaded.current = true;
    }
  }, [dispatch]);

  return (
    <div>

    </div>
  );
};

export default AgendaListView;
