import React from 'react'

import useForm from '../../Hooks/useForm';
import { database } from '../../utils/firebaseUtils';
import { snapshotToArray } from '../Helper/SnaptoArray';
import { multiPropsFilter } from '../Helper/Filter';
import { filtrosSelecionados } from '../Helper/Filter';
import {carregarBDval} from '../../utils/FirebaseData'
import {getCurrentDate} from '../Helper/DateCurrent'
import { nomeAuditor } from '../Helper/Auditor';
import { nomeAssunto } from '../Helper/Assunto';
import {searchField} from '../Helper/SearchField';

import Entradathead from './Entradathead';
import ModalEntrada from './ModalEntrada'

import '../../animation.css';
import '../../excel.css';
import stylesE from '../Entrada/entrada.module.css'
import stylesB from '../../Form/Button.module.css'
import stylesC from '../Components.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Filtrosmais from './Filtrosmais';
import FiltroSelecao from './FiltroSelecao';
import Acao from './Acao';
import FormEntrada from './FormEntrada';

const EntradaTabela = () => {
  const processo = useForm('processo');
  const [processos, setProcessos] = React.useState('processo');
  const [dataEntrada, setDataEntrada] = React.useState('');
  const [requerente, setRequerente] = React.useState('');
  const [assunto, setAssunto] = React.useState('');
  const [auditor, setAuditor] = React.useState('');
  const [prioridade, setPrioridade] = React.useState(false);
  const [notificacao, setNotificacao] = React.useState(false);
  const [obs, setObs] = React.useState('');
  const [auditores, setAuditores] = React.useState('');
  const [assuntos, setAssuntos] = React.useState('');
  const [suspensao, setSuspensao] = React.useState('');
  const [recebimento, setRecebimento] = React.useState(false);
  const [despacho, setDespacho] = React.useState('');

  const [dados, setDados] = React.useState(null);  

  const refInput = React.useRef(null);
  const [edit, setEdit] = React.useState(false);
  const [editkey,setEditkey] = React.useState('')

  const [carregando, setCarregando] = React.useState(true);

  const [filtro,setFiltro] = React.useState({auditor: false, recebimento: false, 
    suspensao: false, despacho: false, tipo: false, notificacao: false, exclusao: false})
  let filtrosColetados = {exclusao: '', auditor: '', recebimento: '', suspensao: '', despacho: '', tipo: '', notificacao: ''}
  const [filtros, setFiltros]  =  React.useState({auditor:'', exclusao: ''});
  const [search, setSearch] = React.useState('');
  const [error, setError] = React.useState(null);
  const [loadingbutton, setLoadingbutton] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [mod, setMod] = React.useState(null)

  
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
      const dataRef = database.ref('entrada');
      dataRef.on('value', (snapshot) => {
      setDados(snapshotToArray(snapshot)); 
      setCarregando(false);  
  });
  },[])

  const handleClose = () => setShow(false);
  function handleShow (dado) {
    //setMore({'more':!more.more,'key':dado.key})
    setShow(true)    
    setMod(dado)
  }

  function handleRecuperar(key){
    atualizarFB(key, false, 'exclusao')
  }

  function handleSearch ({target}){
    setSearch(target.value)      
  }

  function handleExcluir(key){
    atualizarFB(key, true, 'exclusao')
  }
  
  async function handleEditar(key){  
    try {
      refInput.current.focus();
      setEdit(true);
      let task = null
      task = await carregarBDval('entrada/'+key)
          processo.setValue(task.processo)
          setProcessos(task.tipo);
          setDataEntrada(task.data);
          setRequerente(task.requerente);
          setAssunto(task.assunto);
          setAuditor(task.auditor);
          setPrioridade(task.prioridade);
          setNotificacao(task.notificacao);
          setObs(task.obs);
          setRecebimento(task.recebimento)        
          setSuspensao(task.suspensao)
          setDespacho(task.despacho)        
          setEditkey(task.key)
    }
    catch (error){
      var errorCode = error.code;
      var errorMessage = error.message;
      setError(errorCode + " - " + errorMessage)
    }
  }

  function handleChange(key, value, name ){  
    if(name==='prioridade' ||name==='recebimento' || name==='suspensao' || name==='despacho'){
      const editedRequerente = dados.map(task => {
        if (key === task.key) {
          return {...task, [name]: value}
        }
        return task;
      });
      atualizarFB(key, value, name)
      setDados(editedRequerente);
    } 
  }  

  function handleSubmitEditar(e){
    e.preventDefault();
    if (processo.validade()){
      updateEntrada();

      processo.setValue('')
      setProcessos('processo');
      setDataEntrada('');
      setRequerente('');
      setAssunto('');
      setAuditor('');
      setPrioridade(false);
      setNotificacao(false);
      setObs('');
      setEdit(false);
      setEditkey('');
      setRecebimento(false);        
      setSuspensao('');
      setDespacho('') ;       
    }
    
  }

  function handleSubmitCancelar(e){
    e.preventDefault();
    
      processo.setValue('')
      setProcessos('processo');
      setDataEntrada('');
      setRequerente('');
      setAssunto('');
      setAuditor('');
      setPrioridade(false);
      setNotificacao(false);
      setObs('');
      setEdit(false);
      setEditkey('');
      setRecebimento(false)        
      setSuspensao('')
      setDespacho('')  

  }
  
  function handleSubmit(e){  
    e.preventDefault();
    if (processo.validade()){
        writeNewEntrada()      
        processo.setValue('')
        setProcessos('processo');
        setDataEntrada('');
        setRequerente('');
        setAssunto('');
        setAuditor('');
        setPrioridade(false);
        setNotificacao(false);
        setObs('');
        setRecebimento(false)        
        setSuspensao('')
        setDespacho('')
    }
  }

  function handleFilter({target}){  
    if (target.id === 'suspensao' || target.id === 'despacho' || target.id === 'auditor' || target.id === 'assunto' || target.id === 'tipo'){
      if (target.value === ''){
        setFiltros({...filtros, [target.id]: ''})
        setFiltro({...filtro, [target.id]: false})
      }else{
        setFiltros({...filtros, [target.id]: target.value})
        setFiltro({...filtro, [target.id]: true})
      }
    } else{
      setFiltros({...filtros, [target.id]: target.value})
      setFiltro(prevFiltro => ({...filtro, [target.id]: !prevFiltro[target.id]}))
    }     
  }

  async function atualizarFB(key, value, name){
    try {
      const editRef = await database.ref('entrada');
      return editRef.child(key).update({[name]: value})      
    } 
    catch (error){
      var errorCode = error.code;
      var errorMessage = error.message;
      setError(errorCode + " - " + errorMessage)
    }   
  }

  async function writeNewEntrada() {
    setLoadingbutton(true)
    setError(null) 
    try {
      const newEntradaKey = database.ref().child('entrada').push().key;
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
          auditorkey: window.localStorage.getItem('token'),
          tipo: processos,  
          disabled: true,
          exclusao: false,
          key: newEntradaKey,   
          history: getCurrentDate()  
       };
      var updates = {};
      updates['/entrada/' + newEntradaKey] = entradaData;  
      //updates['/history/entrada/' + newEntradaKey + '/' + entradaData.history] = entradaData;  
      await database.ref().update(updates);     
      setLoadingbutton(false)
      
    }catch(error){
        var errorCode = error.code;
        var errorMessage = error.message;
        setError(errorCode + " - " + errorMessage)
        setLoadingbutton(false)       
    }
  }

  async function updateEntrada() { 
    setLoadingbutton(true)
    setError(null) 
    try {
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
        auditorkey: window.localStorage.getItem('token'),
        tipo: processos,  
        disabled: true,
        exclusao: false,
        key: editkey,   
        history: getCurrentDate()  
      };
  
      let historyData = await carregarBDval('entrada/'+editkey)   
      const datakeys = Object.keys(historyData);
  
      datakeys.forEach(key => { return (
        (historyData[key] === entradaData[key]) && (historyData[key] = null)
      )})
      historyData.auditorkey = entradaData.auditorkey
      // Write the new post's data simultaneously in the posts list and the user's post list.
      var updates = {};
      updates['/entrada/' + editkey] = entradaData;  
      updates['/history/entrada/' + editkey + '/' + getCurrentDate()] = historyData;
    
      await database.ref().update(updates);
      setLoadingbutton(false)
    }catch (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      setError(errorCode + " - " + errorMessage)
      setLoadingbutton(false)       
    }    
  }
    return (     
      <>
      <ModalEntrada show={show} onHide={handleClose} mod={mod} auditores={auditores} />      
      <div style={{ width: '90%', margin: 'auto', marginBottom:'80px', padding: '10px'}}>
      <div style={{width: '25%',float: 'left'}}>FILTROS MAIS UTILIZADOS
      <div>
        <Filtrosmais id='auditor' value={window.localStorage.getItem('token')} className={
            filtros.auditor === window.localStorage.getItem('token') ? stylesB.filterOn : stylesB.filterOff
            } onClick={handleFilter} name={auditores && nomeAuditor(window.localStorage.getItem('token'), auditores)}/>
        <Filtrosmais id='prioridade' value={!filtro.prioridade} className={filtro.prioridade ? stylesB.filterOnP : stylesB.filterOff} onClick={handleFilter} name='Prioridade'/>
        <Filtrosmais id='recebimento' value={filtro.recebimento} className={filtro.recebimento ? stylesB.filterOn : stylesB.filterOff} onClick={handleFilter} name='Não Recebidos' />
        <Filtrosmais id='notificacao' value={!filtro.notificacao} className={filtro.notificacao ? stylesB.filterOn : stylesB.filterOff} onClick={handleFilter} name='Notificado'/>
        <Filtrosmais id='exclusao' value={!filtro.exclusao} className={filtro.exclusao ? stylesB.filterOnP : stylesB.filterOff} onClick={handleFilter} name='Excluídos'/>
        </div>
       </div> 
       
        <div style={{width: '75%', float: 'left'}}>OUTROS FILTROS
          <div style={{display: 'flex'}}>  
              <FiltroSelecao label='Tipo' id='tipo' name='tipo' onChange={handleFilter} value={filtros.tipo} options={[{name: 'PROCESSO', value:'processo'}, {name: 'OFÍCIO', value:'oficio'}]} nameoption='name' />              
            {assuntos && 
              <FiltroSelecao label='Assuntos' id='assunto' name='assunto' onChange={handleFilter} 
              value={filtros.assunto} options={assuntos} nameoption='assunto' /> }             
             
            {auditores && 
              <FiltroSelecao label='Auditores' id='auditor' name='auditor' onChange={handleFilter} 
              value={filtros.auditor} options={auditores} nameoption='nome' /> }                        
            
            <FiltroSelecao label='Suspensão' id='suspensao' name='suspensao' onChange={handleFilter} 
              value={filtros.auditor} options={[{name: 'NÃO', value:'NÃO'}, {name: 'SIM', value:'SIM'}]} nameoption='name' value={filtros.suspensao}/>         
           
            <FiltroSelecao label='Despacho' id='despacho' name='despacho' onChange={handleFilter} 
              value={filtros.despacho} options={[{name: 'NÃO', value:'NÃO'}, {name: 'SIM', value:'SIM'}]} nameoption='name' value={filtros.suspensao}/>        
                      
            <div style={{display: 'flex', marginLeft:'15px'}}>
              <label>Busca
                <div style={{display: 'block'}}>
                  <input type='text' name='search' id='search' value={search} 
                  onChange={handleSearch} />             
                </div> 
              </label>
            </div>   
          </div>        
        </div>
      </div>
      <table className="containerExcel">
        <Entradathead />
        <tbody>
          {carregando ? <p style={{marginLeft:'10px'}}>Carregando... Aguarde</p> : 
          <>         
          {searchField(multiPropsFilter(dados,filtrosSelecionados(filtro, filtrosColetados, filtros)),search).map((dado) => {
            return (   
              (!dado.exclusao || filtro.exclusao) &&               
              <tr key={dado.key} className={(dado.prioridade && !dado.recebimento) && stylesC.prioridade}>                           
                <td>
                  {dado.tipo === 'oficio' ? <>OF. {dado.processo}</> : dado.processo}                   
                </td>
                <td className={stylesE.data}>
                  {dado.data}                  
                </td>
                <td className={stylesE.requerente}>
                  {dado.requerente}                   
                </td> 
                <td className={stylesE.assunto}>
                  {assuntos && nomeAssunto(dado.assunto, assuntos)}                 
                </td>
                <td className={stylesE.auditor}>
                  {auditores && nomeAuditor(dado.auditor, auditores)}                
                </td>
                <td >
                  <input className={stylesE.inputC} type="checkbox" id='prioridade' 
                  name='prioridade'  checked={dado.prioridade} 
                  onChange={(e) => handleChange(dado.key,e.target.checked, e.target.name)} 
                  disabled />                 
                </td>
                <td>
                  <input className={stylesE.inputC} type="checkbox" id='notificacao' 
                  name='notificacao'  checked={dado.notificacao} 
                  onChange={(e) => handleChange(dado.key,e.target.checked, e.target.name)} 
                  disabled />                
                </td>
                <td className={stylesE.obs}>
                  {dado.obs} 
                </td>
                <td>
                  <input className={stylesE.inputC} type="checkbox" id='recebimento' 
                  name='recebimento'  checked={dado.recebimento} 
                  onChange={(e) => handleChange(dado.key,e.target.checked, e.target.name)} 
                  disabled={edit} />                 
                </td>
                <td>
                  <select className={stylesE.selectSimNao} id='suspensao' name='suspensao' 
                  value={dado.suspensao} 
                  onChange={(e) => handleChange(dado.key,e.target.value, e.target.name)} disabled={edit}>
                    <option disabled value="">Selecione</option>
                    <option key='0' value='NÃO'>NÃO</option>
                    <option key='1' value='SIM'>SIM</option>
                  </select>                    
                </td>
                <td>
                  <select className={stylesE.selectSimNao} id='despacho' name='despacho' 
                  value={dado.despacho} onChange={(e) => handleChange(dado.key,e.target.value, e.target.name)} disabled={edit} >
                    <option disabled value="">Selecione</option>
                    <option key='0' value='NÃO'>NÃO</option>
                    <option key='1' value='SIM'>SIM</option>
                  </select>                 
                </td> 
                  <Acao edit={edit} handleShow={handleShow} dado={dado} handleRecuperar={handleRecuperar} handleExcluir={handleExcluir} handleEditar={handleEditar} />         
              </tr>
            )})}                          
          </>}       
    </tbody>
  </table>            
    <FormEntrada handleSubmit={handleSubmit} processos={processos} setProcessos={setProcessos} processo={processo} dataEntrada={dataEntrada} setDataEntrada={setDataEntrada} setRequerente={setRequerente} requerente={requerente} assuntos={assuntos} assunto={assunto} setAssunto={setAssunto} auditores={auditores} auditor={auditor} setAuditor={setAuditor} prioridade={prioridade} setPrioridade={setPrioridade} notificacao={notificacao} setNotificacao={setNotificacao} refInput={refInput} obs={obs} setObs={setObs} edit={edit} handleSubmitCancelar={handleSubmitCancelar} loadingbutton={loadingbutton} handleSubmitEditar={handleSubmitEditar} error={error}/>
  </>
  )
}

export default EntradaTabela;
