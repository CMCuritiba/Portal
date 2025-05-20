import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";



const ComissoesItemView = (content) => {
    const [tab, setTab] = useState(1);
    const dispatch = useDispatch();
    const schema = useSelector((state) => state.schema.schema);
    const items = useSelector((state) => state.search.items);
    const state = useSelector((state) => state);
    const partidos = useSelector((state) => state.controlpanels?.controlpanel?.partidos);
    const legislaturas = useSelector((state) => state.controlpanels?.controlpanel?.legislaturas);
    const [partidoID, setPartidoID] = useState(null);
    const [legislaturaID, setLegislaturaID] = useState(0);

    return (
        <section className="stack gap-24 max-w-100 py-32">

        </section>
    );
};

export default ComissoesItemView;
