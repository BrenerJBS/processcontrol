import React from 'react'
import { nomeAssunto } from '../Helper/Assunto';
import { database } from "../../utils/firebaseUtils";
import { snapshotToArray } from "../Helper/SnaptoArray";
import styles from './ModalConta.module.css'


const ModalConta = ({dado}) => {
  const [assuntos, setAssuntos] = React.useState(null);

  React.useEffect(() => {
    const assuntoRef = database.ref("lista_assuntos");
    assuntoRef.once("value", (snapshot) => {
      setAssuntos(snapshotToArray(snapshot));
    });
  }, []);

  function handleChange(key, value, name) {
    const editRef = database.ref("entrada");    
    editRef.child(key).update({ [name]: value });
    dado[name] = value
  }

  return (
    <div className={styles.info}>       
        <div className={styles.item}><div className={styles.itemTitle}>Processo: </div> <div className={styles.itemDesc}>{dado.processo}</div></div>
        <div className={styles.item}><div className={styles.itemTitle}>Data: </div> <div className={styles.itemDesc}>{dado.data}</div></div>
        <div className={styles.item}><div className={styles.itemTitle}>Requerente: </div> <div className={styles.itemDesc}>{dado.requerente}</div></div>
        <div className={styles.item}><div className={styles.itemTitle}>Assunto: </div> <div className={styles.itemDesc}>{nomeAssunto(dado.assunto, assuntos)}</div></div>
        <div className={styles.item}><div className={styles.itemTitle}>Prioridade: </div> 
        <input className={styles.checkbox} type="checkbox" id="prioridade" name="prioridade" checked={dado.prioridade} disabled/></div>
        <div className={styles.item}><div className={styles.itemTitle}>Notificação: </div> <input className={styles.checkbox} type="checkbox" id="notificacao" name="notificacao" checked={dado.notificacao} disabled /></div>
        <div className={styles.item}><div className={styles.itemTitle}>Observação: </div> <div>{dado.obs}</div></div>
        <div className={styles.item}><div className={styles.itemTitle}>Recebimento: </div> <input className={styles.checkbox} type="checkbox" id="recebimento" name="recebimento" checked={dado.recebimento} onChange={(e) => handleChange(dado.key, e.target.checked, e.target.name)} /></div>
        <div className={styles.item}><div className={styles.itemTitle}>Suspensão: </div> <select className={styles.select} id="suspensao" name="suspensao" value={dado.suspensao} onChange={(e) => handleChange(dado.key,e.target.value,e.target.name)}> <option disabled value=""> Selecione </option> <option key="0" value="NÃO">NÃO</option><option key="1" value="SIM">SIM</option></select></div>
        <div className={styles.item}><div className={styles.itemTitle}>Despacho: </div> <select className={styles.select} id="despacho" name="despacho" value={dado.despacho} onChange={(e) => handleChange(dado.key,e.target.value,e.target.name)}> <option disabled value=""> Selecione </option> <option key="0" value="NÃO">NÃO</option><option key="1" value="SIM">SIM</option></select></div>
    </div>
  )
}

export default ModalConta
