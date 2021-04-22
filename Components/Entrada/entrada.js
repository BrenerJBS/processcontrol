import React from "react";
import { Route, Routes } from "react-router";
import Head from "../../Head";
import EntradaTabela from "./Entradatabela";
import HistoryData from "./HistoryData";

const Entrada = () => {
  return (
    <div className="animeLeft">
      <Head
        title="Entrada"
        description="Processo encaminhados para setor de Auditoria"
      />
      <Routes>
        <Route path="/" element={<EntradaTabela />} />
        <Route path="HistoryData/:keyline" element={<HistoryData />} />
      </Routes>
    </div>
  );
};

export default Entrada;
