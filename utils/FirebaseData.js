import {database} from './firebaseUtils'
import { snapshotToArray } from '../Components/Helper/SnaptoArray';
 


export function nomeUsuario(){
  const auditoresRef = database.ref('lista_auditores');
  const auditores = auditoresRef.once('value', (snapshot) => {
     return snapshotToArray(snapshot)  })      
     console.log(auditores);

  let auditorFiltro = auditores.filter((objeto) => objeto.key === window.localStorage.getItem('token'))      
  return auditorFiltro[0].nome;
 
}