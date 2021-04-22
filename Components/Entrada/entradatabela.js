import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import useForm from "../../Hooks/useForm";
import { database } from "../../utils/firebaseUtils";
import {
  carregarBDval,
  writeNewEntrada,
  updateEntrada,
  atualizarFB,
} from "../../utils/FirebaseData";
import { multiPropsFilter } from "../Helper/Filter";
import { filtrosSelecionados } from "../Helper/Filter";
import { nomeAuditor } from "../Helper/Auditor";
import { nomeAssunto } from "../Helper/Assunto";
import { searchField } from "../Helper/SearchField";
import { snapshotToArray } from "../Helper/SnaptoArray";
import { getCurrentDate } from "../Helper/DateCurrent";
import FilterButton from "../../Table/FilterButton";
import FilterSelect from "../../Table/FilterSelect";
import FilterSearch from "../../Table/FilterSearch";
import "../../animation.css";
import "../../excel.css";
import stylesE from "../Entrada/entrada.module.css";
import stylesB from "../../Form/Button.module.css";
import FormEntrada from "./FormEntrada";
import Thead from "../../Table/Thead";
import ModalEntrada from "./ModalEntrada";
import Acao from "./Acao";

const Entradatabela = () => {
  const [dados, setDados] = React.useState(null);
  const [carregando, setCarregando] = React.useState(true);

  const processo = useForm("processo");
  const [processos, setProcessos] = React.useState("processo");
  const [dataEntrada, setDataEntrada] = React.useState("");
  const [requerente, setRequerente] = React.useState("");
  const [assunto, setAssunto] = React.useState("");
  const [auditor, setAuditor] = React.useState("");
  const [prioridade, setPrioridade] = React.useState(false);
  const [notificacao, setNotificacao] = React.useState(false);
  const [obs, setObs] = React.useState("");
  const [recebimento, setRecebimento] = React.useState(false);
  const [suspensao, setSuspensao] = React.useState("");
  const [despacho, setDespacho] = React.useState("");

  const [auditores, setAuditores] = React.useState(null);
  const [assuntos, setAssuntos] = React.useState(null);

  const [filtro, setFiltro] = React.useState({
    recebimento: false,
    prioridade: false,
    notificacao: false,
    exclusao: false,
  });
  var filtrosColetados = {};
  const [filtros, setFiltros] = React.useState({});
  const [search, setSearch] = React.useState("");

  const [show, setShow] = React.useState(false);
  const [mod, setMod] = React.useState(null);

  const [loadingbutton, setLoadingbutton] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [editkey, setEditkey] = React.useState("");
  const [edit, setEdit] = React.useState(false);
  const refInput = React.useRef(null);

  const scrollRef = React.useRef(null);
  const executeScroll = () => scrollRef.current.scrollIntoView();

  const handleClose = () => setShow(false);

  const adress = "entrada";
  const theads = [
    "Processo/Ofício",
    "Data de Entrada",
    "Requerente",
    "Assunto",
    "Auditor",
    "Prioridade",
    "Notificação",
    "Observação",
    "Confirmação de recebimento",
    "Suspensão",
    "Despacho no Protocolo",
    "Ação",
  ];
  const selectedfilter = [
    "suspensao",
    "despacho",
    "auditor",
    "assunto",
    "tipo",
  ];
  const filtersButtonObj = [
    {
      id: "auditor",
      value: window.localStorage.getItem("token"),
      className:
        filtros.auditor === window.localStorage.getItem("token")
          ? stylesB.filterOn
          : stylesB.filterOff,
      onClick: handleFilter,
      name:
        auditores &&
        nomeAuditor(window.localStorage.getItem("token"), auditores),
    },
    {
      id: "prioridade",
      value: !filtro.prioridade,
      className: filtro.prioridade ? stylesB.filterOnP : stylesB.filterOff,
      onClick: handleFilter,
      name: "Prioridade",
    },
    {
      id: "recebimento",
      value: filtro.recebimento,
      className: filtro.recebimento ? stylesB.filterOn : stylesB.filterOff,
      onClick: handleFilter,
      name: "Não Recebidos",
    },
    {
      id: "notificacao",
      value: !filtro.notificacao,
      className: filtro.notificacao ? stylesB.filterOn : stylesB.filterOff,
      onClick: handleFilter,
      name: "Notificado",
    },
    {
      id: "exclusao",
      value: !filtro.exclusao,
      className: filtro.exclusao ? stylesB.filterOnP : stylesB.filterOff,
      onClick: handleFilter,
      name: "Excluídos",
    },
  ];
  const filtersSelectedObj = [
    {
      label: "Tipo",
      id: "tipo",
      name: "tipo",
      onChange: handleFilter,
      value: filtros.tipo,
      options: [
        { name: "PROCESSO", value: "processo" },
        { name: "OFÍCIO", value: "oficio" },
      ],
      nameoption: "name",
    },
    {
      label: "Assuntos",
      id: "assunto",
      name: "assunto",
      onChange: handleFilter,
      value: filtros.assunto,
      options: assuntos,
      nameoption: "assunto",
    },
    {
      label: "Auditores",
      id: "auditor",
      name: "auditor",
      onChange: handleFilter,
      value: filtros.auditor,
      options: auditores,
      nameoption: "nome",
    },
    {
      label: "Suspensão",
      id: "suspensao",
      name: "suspensao",
      onChange: handleFilter,
      options: [
        { name: "NÃO", value: "NÃO" },
        { name: "SIM", value: "SIM" },
      ],
      nameoption: "name",
      value: filtros.suspensao,
    },
    {
      label: "Despacho",
      id: "despacho",
      name: "despacho",
      onChange: handleFilter,
      options: [
        { name: "NÃO", value: "NÃO" },
        { name: "SIM", value: "SIM" },
      ],
      nameoption: "name",
      value: filtros.despacho,
    },
  ];

  React.useEffect(() => {
    const dataRef = database.ref("entrada");
    dataRef.on("value", (snapshot) => {
      setDados(snapshotToArray(snapshot));
      setCarregando(false);
    });
  }, []);

  React.useEffect(() => {
    const auditoresRef = database.ref("lista_auditores");
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

  function handleFilter({ target }) {
    let selectFilter = false;
    for (let i = 0; i < selectedfilter.length; ++i) {
      if (target.id === selectedfilter[i]) {
        selectFilter = true;
      }
    }
    if (selectFilter === true) {
      if (target.value === "") {
        setFiltros({ ...filtros, [target.id]: "" });
        setFiltro({ ...filtro, [target.id]: false });
      } else {
        setFiltros({ ...filtros, [target.id]: target.value });
        setFiltro({ ...filtro, [target.id]: true });
      }
    } else {
      setFiltros({ ...filtros, [target.id]: target.value });
      setFiltro((prevFiltro) => ({
        ...filtro,
        [target.id]: !prevFiltro[target.id],
      }));
    }
  }

  function handleSearch({ target }) {
    setSearch(target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (processo.validade()) {
      const entradaData = {
        processo: processo.value,
        data: dataEntrada,
        requerente: requerente,
        assunto: assunto,
        auditor: auditor,
        prioridade: prioridade,
        notificacao: notificacao,
        obs: obs,
        recebimento: recebimento,
        suspensao: suspensao,
        despacho: despacho,
        auditorkey: window.localStorage.getItem("token"),
        tipo: processos,
        disabled: true,
        exclusao: false,
        history: getCurrentDate(),
      };
      writeNewEntrada(
        database,
        entradaData,
        adress,
        setLoadingbutton,
        setError
      );
      processo.setValue("");
      setProcessos("processo");
      setDataEntrada("");
      setRequerente("");
      setAssunto("");
      setAuditor("");
      setPrioridade(false);
      setNotificacao(false);
      setObs("");
      setRecebimento(false);
      setSuspensao("");
      setDespacho("");
    }
  }

  function handleSubmitCancelar(e) {
    e.preventDefault();
    processo.setValue("");
    setProcessos("processo");
    setDataEntrada("");
    setRequerente("");
    setAssunto("");
    setAuditor("");
    setPrioridade(false);
    setNotificacao(false);
    setObs("");
    setEdit(false);
    setEditkey("");
    setRecebimento(false);
    setSuspensao("");
    setDespacho("");
  }

  function handleSubmitEditar(e) {
    e.preventDefault();
    if (processo.validade()) {
      var entradaData = {
        processo: processo.value,
        data: dataEntrada,
        requerente: requerente,
        assunto: assunto,
        auditor: auditor,
        prioridade: prioridade,
        notificacao: notificacao,
        obs: obs,
        recebimento: recebimento,
        suspensao: suspensao,
        despacho: despacho,
        auditorkey: window.localStorage.getItem("token"),
        tipo: processos,
        disabled: true,
        exclusao: false,
        key: editkey,
        history: getCurrentDate(),
      };
      updateEntrada(setLoadingbutton, setError, entradaData, adress, editkey);
      processo.setValue("");
      setProcessos("processo");
      setDataEntrada("");
      setRequerente("");
      setAssunto("");
      setAuditor("");
      setPrioridade(false);
      setNotificacao(false);
      setObs("");
      setEdit(false);
      setEditkey("");
      setRecebimento(false);
      setSuspensao("");
      setDespacho("");
    }
  }

  function handleShow(dado) {
    setShow(true);
    setMod(dado);
  }

  function handleRecuperar(key) {
    const confirma = window.confirm("Tem certeza que deseja recuperar?");
    if (confirma)
      atualizarFB(key, false, "exclusao", database, adress, setError);
  }

  function handleExcluir(key) {
    const confirma = window.confirm("Tem certeza que deseja deletar?");
    if (confirma) {
      atualizarFB(key, true, "exclusao", database, adress, setError);
    }
  }

  async function handleEditar(key) {
    try {
      refInput.current.focus();
      setEdit(true);
      let task = null;
      task = await carregarBDval("entrada/" + key);
      processo.setValue(task.processo);
      setProcessos(task.tipo);
      setDataEntrada(task.data);
      setRequerente(task.requerente);
      setAssunto(task.assunto);
      setAuditor(task.auditor);
      setPrioridade(task.prioridade);
      setNotificacao(task.notificacao);
      setObs(task.obs);
      setRecebimento(task.recebimento);
      setSuspensao(task.suspensao);
      setDespacho(task.despacho);
      setEditkey(task.key);
    } catch (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      setError(errorCode + " - " + errorMessage);
    }
  }

  function handleChange(key, value, name, dados) {
    if (name === "prioridade" || name === "recebimento" || name === "suspensao" || name === "despacho") {
      dados.map((task) => {
        if (key === task.key) {
          return { ...task, [name]: value };
        }
        return task;
      });
      atualizarFB(key, value, name, database, adress, setError);
      //setDados(editedRequerente);
    }
  }

  function dadosF() {
    return searchField(
      multiPropsFilter(
        dados,
        filtrosSelecionados(filtro, filtrosColetados, filtros)
      ),
      search
    ).filter((dado) => !dado.exclusao || filtro.exclusao).length;
  }

  return (
    <section>
      <ModalEntrada
        show={show}
        onHide={handleClose}
        mod={mod}
        auditores={auditores}
      />
      {auditores && assuntos && (
        <>
          <FilterButton filtersobject={filtersButtonObj}></FilterButton>
          <FilterSelect filtersobject={filtersSelectedObj} />
          <FilterSearch value={search} onChange={handleSearch} />
          <button
            style={{ display: "flex", marginLeft: "15px" }}
            onClick={executeScroll}
          >
            {" "}
            Última Linha{" "}
          </button>
        </>
      )}

      <table className="containerExcel">
        <Thead theads={theads} />
        <tbody>
          {carregando ? (
            <tr>
              <td colSpan={theads.length}>
                <p style={{ textAlign: "center", marginTop: "10px", fontWeight: "bold" }}>Carregando... Aguarde</p>
              </td>
            </tr>
          ) : (
            <>
              {searchField(
                multiPropsFilter(
                  dados,
                  filtrosSelecionados(filtro, filtrosColetados, filtros)
                ),
                search
              )
                .filter((dado) => !dado.exclusao || filtro.exclusao)
                .map((dado, index) => {
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
                      {dadosF() >= 5 ? (
                        dadosF() === index + 4 ? (
                          <td ref={scrollRef} className={stylesE.data}>
                            {dado.data}
                          </td>
                        ) : (
                          <td className={stylesE.data}>{dado.data}</td>
                        )
                      ) : dadosF() === index + 1 ? (
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
                              dados
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
                            handleChange(
                              dado.key,
                              e.target.checked,
                              e.target.name,
                              dados
                            )
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
                              dados
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
                            handleChange(
                              dado.key,
                              e.target.value,
                              e.target.name,
                              dados
                            )
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
                            handleChange(
                              dado.key,
                              e.target.value,
                              e.target.name,
                              dados
                            )
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
          )}
        </tbody>
      </table>

      <FormEntrada
        handleSubmit={handleSubmit}
        processos={processos}
        setProcessos={setProcessos}
        processo={processo}
        dataEntrada={dataEntrada}
        setDataEntrada={setDataEntrada}
        setRequerente={setRequerente}
        requerente={requerente}
        assuntos={assuntos}
        assunto={assunto}
        setAssunto={setAssunto}
        auditores={auditores}
        auditor={auditor}
        setAuditor={setAuditor}
        prioridade={prioridade}
        setPrioridade={setPrioridade}
        notificacao={notificacao}
        setNotificacao={setNotificacao}
        refInput={refInput}
        obs={obs}
        setObs={setObs}
        edit={edit}
        handleSubmitCancelar={handleSubmitCancelar}
        loadingbutton={loadingbutton}
        handleSubmitEditar={handleSubmitEditar}
        error={error}
      />
    </section>
  );
};
export default Entradatabela;
