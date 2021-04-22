import React from "react";
import { multiPropsFilter } from "../Helper/Filter";
import { filtrosSelecionados } from "../Helper/Filter";
import { nomeAuditor } from "../Helper/Auditor";
import { nomeAssunto } from "../Helper/Assunto";
import { searchField } from "../Helper/SearchField";

import "../../animation.css";
import "../../excel.css";
import stylesE from "../Entrada/entrada.module.css";

import "bootstrap/dist/css/bootstrap.min.css";

import Acao from "./Acao";

const Tr = ({
  auditores,
  assuntos,

  filtro,
  filtrosColetados,
  filtros,
  search,
  scrollRef,

  edit,

  dados,
  handleShow,
  handleRecuperar,
  handleExcluir,
  handleEditar,
  handleChange,
}) => {
  let dadosFNE = searchField(
    multiPropsFilter(
      dados,
      filtrosSelecionados(filtro, filtrosColetados, filtros)
    ),
    search
  );
  let dadosF = dadosFNE.filter((dado) => !dado.exclusao || filtro.exclusao);
  return (
    <>
      {dadosF.map((dado, index) => {
        return (
          <tr
            key={dado.key}
            className={
              dado.prioridade && !dado.recebimento
                ? stylesE.prioridade
                : undefined
            }
          >
            <td>
              {dado.tipo === "oficio" ? (
                <>OF. {dado.processo}</>
              ) : (
                dado.processo
              )}
            </td>
            {dadosF.length >= 5 ? (
              dadosF.length === index + 4 ? (
                <td ref={scrollRef} className={stylesE.data}>
                  {dado.data}
                </td>
              ) : (
                <td className={stylesE.data}>{dado.data}</td>
              )
            ) : dadosF.length === index + 1 ? (
              <td ref={scrollRef} className={stylesE.data}>
                {dado.data}
              </td>
            ) : (
              <td className={stylesE.data}>{dado.data}</td>
            )}
            <td className={stylesE.requerente}>{dado.requerente}</td>
            <td className={stylesE.assunto}>
              {assuntos && nomeAssunto(dado.assunto, assuntos)}
            </td>
            <td className={stylesE.auditor}>
              {auditores && nomeAuditor(dado.auditor, auditores)}
            </td>
            <td>
              <input
                className={stylesE.inputC}
                type="checkbox"
                id="prioridade"
                name="prioridade"
                checked={dado.prioridade}
                onChange={(e) =>
                  handleChange(
                    dado.key,
                    e.target.checked,
                    e.target.name,
                    dadosF
                  )
                }
                disabled
              />
            </td>
            <td>
              <input
                className={stylesE.inputC}
                type="checkbox"
                id="notificacao"
                name="notificacao"
                checked={dado.notificacao}
                onChange={(e) =>
                  handleChange(dado.key, e.target.checked, e.target.name, dados)
                }
                disabled
              />
            </td>
            <td className={stylesE.obs}>{dado.obs}</td>
            <td>
              <input
                className={stylesE.inputC}
                type="checkbox"
                id="recebimento"
                name="recebimento"
                checked={dado.recebimento}
                onChange={(e) =>
                  handleChange(
                    dado.key,
                    e.target.checked,
                    e.target.name,
                    dadosF
                  )
                }
                disabled={edit}
              />
            </td>
            <td>
              <select
                className={stylesE.selectSimNao}
                id="suspensao"
                name="suspensao"
                value={dado.suspensao}
                onChange={(e) =>
                  handleChange(dado.key, e.target.value, e.target.name, dadosF)
                }
                disabled={edit}
              >
                <option disabled value="">
                  Selecione
                </option>
                <option key="0" value="NÃO">
                  NÃO
                </option>
                <option key="1" value="SIM">
                  SIM
                </option>
              </select>
            </td>
            <td>
              <select
                className={stylesE.selectSimNao}
                id="despacho"
                name="despacho"
                value={dado.despacho}
                onChange={(e) =>
                  handleChange(dado.key, e.target.value, e.target.name, dadosF)
                }
                disabled={edit}
              >
                <option disabled value="">
                  Selecione
                </option>
                <option key="0" value="NÃO">
                  NÃO
                </option>
                <option key="1" value="SIM">
                  SIM
                </option>
              </select>
            </td>

            <Acao
              edit={edit}
              handleShow={handleShow}
              dado={dado}
              handleRecuperar={handleRecuperar}
              handleExcluir={handleExcluir}
              handleEditar={handleEditar}
            />
          </tr>
        );
      })}
    </>
  );
};

export default Tr;
