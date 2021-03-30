import React from 'react'
import { useParams } from 'react-router'
import HistoryDatathead from './HistoryDatathead';
import { snapshotToArray } from '../Helper/SnaptoArray';
import { database } from '../../utils/firebaseUtils';
import { nomeAuditor } from '../Helper/Auditor';
import { nomeAssunto } from '../Helper/Assunto';


const HistoryData = () => {
  const params = useParams();

  const [auditores, setAuditores] = React.useState(null)
  const [assuntos, setAssuntos] = React.useState(null)
  const [dados, setDados] = React.useState(null)
  const [carregando, setCarregando] = React.useState(true)

  React.useEffect(()=> {
    const auditoresRef = database.ref('lista_auditores');
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
                  {dado.data} 
               </td>
               <td>
                  {dado.requerente} 
               </td>
               <td>
                {assuntos && nomeAssunto(dado.assunto, assuntos)}
               </td>
               <td>
                {auditores && nomeAuditor(dado.auditor, auditores)}
               </td>
               <td>
                <input  type="checkbox" id='prioridade' 
                  name='prioridade'  checked={dado.prioridade} 
                   disabled />
               </td>
               <td>
                <input  type="checkbox" id='notificacao' 
                  name='notificacao'  checked={dado.notificacao} 
                  disabled />
               </td>
               <td>
                {dado.obs} 
               </td>
               <td>
                {dado.key} 
               </td>
               <td>
                {auditores && nomeAuditor(dado.auditorkey, auditores)}
               </td>
               <td>
                 
               </td>
              
             </tr>  )}                               
          </tbody>
        </table>
        

      
      }
    </div>
  )
}

export default HistoryData
