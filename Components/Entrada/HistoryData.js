import React from 'react'
import { useParams } from 'react-router'
import HistoryDatathead from './HistoryDatathead';
import { snapshotToArray } from '../Helper/SnaptoArray';
import { database } from '../../utils/firebaseUtils';
import { nomeAuditor } from '../Helper/Auditor';
import { nomeAssunto } from '../Helper/Assunto';
import {getCurrentDate} from '../Helper/DateCurrent'
import {carregarBDval} from '../../utils/FirebaseData'

import stylesB from '../../Form/Button.module.css'


const HistoryData = () => {
  const params = useParams();

  const [auditores, setAuditores] = React.useState(null)
  const [assuntos, setAssuntos] = React.useState(null)
  const [dados, setDados] = React.useState(null)
  const [carregando, setCarregando] = React.useState(true)

  React.useEffect(()=> {
    const lista = 'lista_auditores'
    const auditoresRef = database.ref(lista);
    auditoresRef.once('value', (snapshot) => {
      setAuditores(snapshotToArray(snapshot));            
  });
  },[])

  React.useEffect(()=> {
    const assuntoRef = database.ref('lista_assuntos');
    assuntoRef.once('value', (snapshot) => {
      setAssuntos(snapshotToArray(snapshot));       
  });  
  },[])

  React.useEffect(()=> {
    const dataRef = database.ref('history/entrada/'+params.keyline);
    dataRef.on('value', (snapshot) => {
      setDados(snapshotToArray(snapshot)); 
      
      setCarregando(false);  
  });
    
  },[params])

 

  function handleRecuperar(dadoRecuperado){
    let newData = carregarBDval('entrada/'+params.keyline)
    let historyData = newData

    const datakeys = Object.keys(newData);     
      datakeys.forEach(key => {
        if (dadoRecuperado[key] !== undefined && key !== 'key'){
          return ((historyData[key] !== dadoRecuperado[key]) && (newData[key] =  dadoRecuperado[key]))
        }          
      })
      newData.history = getCurrentDate()
      newData.auditorkey = window.localStorage.getItem('token')  
      // Write the new post's data simultaneously in the posts list and the user's post list.
      var updates = {};
      updates['/entrada/' + params.keyline] = newData;  
      updates['/history/entrada/' + params.keyline + '/' + getCurrentDate()] = historyData;    
      return database.ref().update(updates);    
  }
 

  return (
    <div className="animeLeft">
      {carregando ? <p style={{marginLeft:'10px'}}>Carregando... </p> : 
        <table class="containerExcel">
          <HistoryDatathead />
          <tbody>
            { dados.map((dado) =>
             <tr>
               <td>
                  {dado.tipo === 'oficio' ? <>OF. {dado.processo}</> : dado.processo} 
               </td>
               <td>
                  {dado.data !== undefined && dado.data} 
               </td>
               <td>
                  {dado.requerente !== undefined && dado.requerente} 
               </td>
               <td>
                {assuntos && dado.assunto && nomeAssunto(dado.assunto, assuntos)}
               </td>
               <td>
                {auditores && dado.auditor && nomeAuditor(dado.auditor, auditores)}
               </td>
               <td>
               {dado.prioridade !== undefined && <input  type="checkbox" id='prioridade' 
                  name='prioridade' checked={dado.prioridade} 
                   disabled />}
               </td>
               <td>
                 {dado.notificacao !== undefined &&
                <input  type="checkbox" id='notificacao' 
                  name='notificacao'  checked={dado.notificacao} 
                  disabled /> }
               </td>
               <td>
                {dado.obs !== undefined && dado.obs} 
               </td>
               <td>
                {dado.key} 
               </td>
               <td>
                {auditores && nomeAuditor(dado.auditorkey, auditores)}
               </td>
                <td>
                <button className={stylesB.buttonEdit} onClick={(e) => handleRecuperar(dado)}>Recuperar</button>
                </td>             
               </tr>  )}                               
          </tbody>
        </table>
      }
    </div>
  )
}

export default HistoryData
