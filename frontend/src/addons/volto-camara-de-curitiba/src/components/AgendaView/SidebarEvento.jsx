import NewsItemView from "./NewsItemView";
import {Button} from "@mui/material";
import React from "react";
import {formatDate} from "../../utils/Utils";

function SidebarEvento({content}) {
  return (
    <div className="sidebar-event-single">
      <p className="fs-16 mb-0"><strong>Início:</strong> {formatDate(content.start)}</p>
      <p className="fs-16 mb-0 mt-16"><strong>Fim:</strong> {formatDate(content.end)} </p>
      <p className="fs-16 mb-0 mt-16"><strong>Local:</strong> {content.location}</p>
      <a href="" className="button button-third block w-100 mt-16">Cadastrar na agenda</a>
    </div>
  );
}

export default SidebarEvento;
