import React from "react";
import { Navigate, useParams } from "react-router";
import { snapshotToArray } from "../Helper/SnaptoArray";
import { database } from "../../utils/firebaseUtils";
import { getCurrentDate } from "../Helper/DateCurrent";
import { nomeAssunto } from "../Helper/Assunto";
import { nomeAuditor } from "../Helper/Auditor";
import stylesB from "../../Form/Button.module.css";
import Thead from "../../Table/Thead";

const HistoryData = () => {
  const params = useParams();

  const [dados, setDados] = React.useState(null);
  const [carregando, setCarregando] = React.useState(true);

  const [auditores, setAuditores] = React.useState(null);
  const [assuntos, setAssuntos] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [newData, setNewData] = React.useState(null);
  const [redirect, setRedirect] = React.useState(false);
  const theads = [
    "Processo/Ofício",
    "Data de Entrada",
    "Requerente",
    "Assunto",
    "Auditor",
    "Prioridade",
    "Notificação",
    "Observação",
    "Alterado em",
    "Modificado por",
    "Ação",
  ];

  React.useEffect(() => {
    const dataRef = database.ref('history/entrada/'+params.keyline);
    dataRef.on("value", (snapshot) => {
      setDados(snapshotToArray(snapshot));
      setCarregando(false);      
    });
  },[]);// eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    const dataRef = database.ref('entrada/'+params.keyline);
    dataRef.once("value", (snapshot) => {
      setNewData(snapshot.val());
    });
  },[]);// eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    const lista = "lista_auditores";
    const auditoresRef = database.ref(lista);
    auditoresRef.once("value", (snapshot) => {
      setAuditores(snapshotToArray(snapshot));
    });
  }, []);

  React.useEffect(() => {
    const assuntoRef = database.ref("lista_assuntos");
    assuntoRef.once("value", (snapshot) => {
      setAssuntos(snapshotToArray(snapshot));
    });
  }, []);

  function handleRecuperar(dadoRecuperado) {
    try {
      let historyData = newData;
      let datakeys = Object.keys(newData);
      console.log(datakeys);
      datakeys.forEach((key) => {
        if (dadoRecuperado[key] !== undefined && key !== "key") {
          return (
            historyData[key] !== dadoRecuperado[key] &&
            (newData[key] = dadoRecuperado[key])
          );
        }
      });
      newData.history = getCurrentDate();
      newData.auditorkey = window.localStorage.getItem("token");
      // Write the new post's data simultaneously in the posts list and the user's post list.
      var updates = {};
      updates["/entrada/" + params.keyline] = newData;
      updates[
        "/history/entrada/" + params.keyline + "/" + getCurrentDate()
      ] = historyData;
      database.ref().update(updates);
      setRedirect(true);
    } catch (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      setError(errorCode + " - " + errorMessage);
    }
  }

  if (redirect) {
    return <Navigate to="/Entrada" />;
  } else
    return (
      <section>
          {error && error}
          <table className="containerExcel">
            <Thead theads={theads}></Thead>
            <tbody>
            {carregando ? (
            <tr>
              <td colSpan={theads.length}>
                <p style={{ textAlign: "center", marginTop: "10px", fontWeight: "bold" }}>Carregando... Aguarde</p>
              </td>
            </tr>
          ) : (
            <>
            {dados.map((dado) => (
                <tr key={dado.key}>
                  <td>
                    {dado.tipo === "oficio" ? <>OF. {dado.processo}</> : dado.processo}
                  </td>
                  <td>{dado.data !== undefined && dado.data}</td>
                  <td>{dado.requerente !== undefined && dado.requerente}</td>
                  <td>
                    {assuntos && dado.assunto && nomeAssunto(dado.assunto, assuntos)}
                  </td>
                  <td>
                    {auditores && dado.auditor && nomeAuditor(dado.auditor, auditores)}
                  </td>
                  <td>
                    {dado.prioridade !== undefined && (
                      <input
                        type="checkbox"
                        id="prioridade"
                        name="prioridade"
                        checked={dado.prioridade}
                        disabled
                      />
                    )}
                  </td>
                  <td>
                    {dado.notificacao !== undefined && (
                      <input
                        type="checkbox"
                        id="notificacao"
                        name="notificacao"
                        checked={dado.notificacao}
                        disabled
                      />
                    )}
                  </td>
                  <td>{dado.obs !== undefined && dado.obs}</td>
                  <td>{dado.key}</td>
                  <td>{auditores && nomeAuditor(dado.auditorkey, auditores)}</td>
                  <td>
                    <button
                      className={stylesB.buttonEdit}
                      onClick={(e) => handleRecuperar(dado)}
                    >
                      Recuperar
                    </button>
                  </td>
                </tr>
              ))}
              </>)   }
            </tbody>
          </table>
                     

      </section>
    );
};

export default HistoryData;
