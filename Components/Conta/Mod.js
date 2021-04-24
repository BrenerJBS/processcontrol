import React from 'react'
import styles from './Mod.module.css'
import { database } from "../../utils/firebaseUtils";
import { snapshotToArray } from "../Helper/SnaptoArray";
import { nomeAssunto } from '../Helper/Assunto';
import ModalConta from './ModalConta';
import Modal from '../../Modal/Modal';

const Mod = ({dados,filtro, title,color}) => {
  const [carregando,setCarregando] = React.useState(true);
  const [dadosF,setDadosF] = React.useState(null);
  const [assuntos, setAssuntos] = React.useState(null);
  const [modal, setModal] = React.useState(null);

  

  React.useEffect(() => { 
    if (dados){
      setDadosF(filtro)
      setCarregando(false)   
    }     
  },[dados,filtro])

  React.useEffect(() => {
    const assuntoRef = database.ref("lista_assuntos");
    assuntoRef.once("value", (snapshot) => {
      setAssuntos(snapshotToArray(snapshot));
    });
  }, []);

  function handleClick(dado){
    setModal(dado)    
  }

 
  return (
    !carregando && 
    <>    
    {modal && <Modal title={title + " - " + modal.processo} color={color} setModal={setModal} modal={<ModalConta dado={modal}/>}/> }
    <div className={styles.caixaP}>      
      <div className={styles.titulo} style={{ background:  `${color}`  }}>{title}</div>
      <div className={styles.texto}>{dadosF.length === 1 ? "Você possui "+dadosF.length+" processo pendente:": "Você possui "+dadosF.length+" processos pendentes:"}  
      </div> 
     
     <ul className={styles.lista}>
       {dadosF.map((dado)=> { 
            return (          
            <div key={dado.key} className={styles.item} onClick={() => handleClick(dado)}>
            {dado.data} - {dado.processo} - {dado.requerente} - {nomeAssunto(dado.assunto, assuntos)}
            </div>
            )}
          )}
     </ul>
    </div>
    </>
  )
}

export default Mod