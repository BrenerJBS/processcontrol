import { Button, Modal } from "react-bootstrap";
import React from "react";
import { nomeAuditor } from "../Helper/Auditor";
import { Link } from "react-router-dom";

const ModalEntrada = ({ show, onHide, mod, auditores }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Mais Informações</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {mod && (
          <>
            <p style={{ textTransform: "lowercase", color: "red" }}>
              alterado por {nomeAuditor(mod.auditorkey, auditores)}
            </p>
            <p style={{ textTransform: "lowercase", color: "red" }}>
              ultima alteração em {mod.history}
            </p>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Fechar
        </Button>
        <Button variant="primary" onClick={onHide}>
          {mod && (
            <Link style={{ color: "white" }} to={"HistoryData/" + mod.key}>
              Mais informações
            </Link>
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEntrada;
