import React from "react";
import { nomeAuditor } from "../Helper/Auditor";
import { nomeAssunto } from "../Helper/Assunto";
import stylesB from "../../Form/Button.module.css";

const TrHistory = ({ dados, assuntos, auditores, handleRecuperar }) => {
  return (
    <tbody>
      {dados.map((dado) => (
        <tr>
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
    </tbody>
  );
};

export default TrHistory;
