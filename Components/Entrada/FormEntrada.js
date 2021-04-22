import React from "react";
import Error from "../Helper/Error";
import ButtonForm from "../../Form/Button";
import Checkbox from "../../Form/Checkbox";
import Input from "../../Form/Input";
import Select from "../../Form/Select";
import stylesB from "../../Form/Button.module.css";
import styles from "../../Form/Input.module.css";

const FormEntrada = ({
  handleSubmit,
  processos,
  setProcessos,
  processo,
  dataEntrada,
  setDataEntrada,
  requerente,
  setRequerente,
  assuntos,
  assunto,
  setAssunto,
  auditores,
  auditor,
  setAuditor,
  prioridade,
  setPrioridade,
  notificacao,
  setNotificacao,
  refInput,
  obs,
  setObs,
  edit,
  handleSubmitCancelar,
  loadingbutton,
  handleSubmitEditar,
  error,
}) => {
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.row}>
          <div className={styles.col25}>
            <label htmlFor="processo" className={styles.label}>
              <select
                className={styles.select}
                id="processos"
                name="processos"
                value={processos}
                onChange={(e) => setProcessos(e.target.value)}
                style={{ fontWeight: "bold" }}
              >
                <option value="processo">Processo</option>
                <option value="oficio">Ofício</option>
              </select>
            </label>
          </div>
          <div style={{ paddingTop: "12px" }}>
            <Input
              type="text"
              id="processo"
              name="processo"
              label="Processo"
              placeholder="12345/2021"
              {...processo}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.col25}>
            <label htmlFor="dataEntrada" className={styles.label}>
              Data da Entrada:
            </label>
          </div>
          <div className={styles.col75}>
            <input
              className={styles.input}
              type="date"
              name="dataEntrada"
              id="dataEntrada"
              value={dataEntrada}
              onChange={(e) => setDataEntrada(e.target.value)}
              required
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.col25}>
            <label htmlFor="requerente" className={styles.label}>
              Requerente:
            </label>
          </div>
          <Input
            type="text"
            id="requerente"
            name="requerente"
            label="Requerente"
            value={requerente}
            onChange={(e) => setRequerente(e.target.value)}
            required="required"
          />
        </div>
        <div className={styles.row}>
          {assuntos && (
            <Select
              label="Assunto"
              name="assunto"
              value={assunto}
              options={assuntos}
              onChange={setAssunto}
            />
          )}
        </div>
        <div className={styles.row}>
          {auditores && (
            <Select
              label="Auditor"
              name="auditor"
              value={auditor}
              options={auditores}
              onChange={setAuditor}
            />
          )}
        </div>
        <div className={styles.row}>
          <Checkbox
            label="Proridade"
            name="prioridade"
            onChange={setPrioridade}
            checked={prioridade}
          />
        </div>
        <div className={styles.row}>
          <Checkbox
            label="Notificar"
            name="notificacao"
            onChange={setNotificacao}
            checked={notificacao}
          />
        </div>
        <div className={styles.row}>
          <div className={styles.col25}>
            <label htmlFor="obs" className={styles.label}>
              Observações:
            </label>
          </div>
          <div className={styles.col75}>
            <textarea
              ref={refInput}
              id="obs"
              name="obs"
              value={obs}
              onChange={(e) => setObs(e.target.value)}
              className={styles.textarea}
            />
          </div>
          {edit ? (
            <div style={{ float: "right", paddingTop: "1.2rem" }}>
              <button
                className={stylesB.buttonCancel}
                onClick={handleSubmitCancelar}
              >
                Cancelar
              </button>
              <div className={stylesB.divider} />

              <>
                {loadingbutton ? (
                  <button
                    className={stylesB.button}
                    onClick={handleSubmitEditar}
                    disable
                  >
                    Carregando...
                  </button>
                ) : (
                  <button
                    className={stylesB.button}
                    onClick={handleSubmitEditar}
                  >
                    Enviar
                  </button>
                )}
                <Error error={error} />
              </>
            </div>
          ) : (
            <div style={{ float: "right", paddingTop: "1.2rem" }}>
              {loadingbutton ? (
                <ButtonForm disable>Carregando...</ButtonForm>
              ) : (
                <ButtonForm>Enviar</ButtonForm>
              )}
              <Error error={error} />
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default FormEntrada;
