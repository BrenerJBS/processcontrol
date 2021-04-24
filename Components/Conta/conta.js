import React from "react"
import Head from "../../Head"
import Mod from "./Mod"
import { database } from "../../utils/firebaseUtils";
import { snapshotToArray } from "../Helper/SnaptoArray";
import styles from './conta.module.css'


const Conta = () => {
  const [dados,setDados] = React.useState(null);
  const [mount, setMount] = React.useState(false);

  React.useEffect(() => {
    setMount(true)
  },[])
  
  React.useEffect(() => {
    if (mount){
      const dataRef = database.ref('entrada');
      dataRef.on("value", (snapshot) => {       
      setDados(snapshotToArray(snapshot));        
    });}
  },[mount]);

  return (
    <div className="animeLeft">
      <Head
        title="Conta"
        description="Informações sobre a conta"
      />
      {dados && <div className={styles.wrapper}>
      <Mod title="PRIORIDADE" color="tomato" dados={dados} filtro={dados.filter((dado) => dado.prioridade && !dado.recebimento && dado.auditor === window.localStorage.getItem('token'))}/>
      <Mod title="ITBI" color="#138D75" dados={dados} filtro={dados.filter((dado) => dado.assunto === '-MX3z822tg0x7Ly5bq9-' && dado.auditor === window.localStorage.getItem('token'))}/>
      <Mod title="NÃO RECEBIDOS" color="#4169e1" dados={dados} filtro={dados.filter((dado) => !dado.recebimento && dado.auditor === window.localStorage.getItem('token'))}/>
      <Mod title="INFORMAÇÃO DE SUPENSÃO PENDENTE" color="#FFC300" dados={dados} filtro={dados.filter((dado) => dado.suspensao === '' && dado.auditor === window.localStorage.getItem('token'))}/>
      <Mod title="INFORMAÇÃO DE DESPACHO PENDENTE" color="#B2BABB" dados={dados} filtro={dados.filter((dado) => dado.despacho === '' && dado.auditor === window.localStorage.getItem('token'))}/>
      </div>
      }
    </div>
  )
}

export default Conta
