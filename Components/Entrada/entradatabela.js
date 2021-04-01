import React from 'react'
import '../../animation.css';
import '../../excel.css';
import Checkbox from '../../Form/Checkbox';
import Input from '../../Form/Input';
import Select from '../../Form/Select';
import useForm from '../../Hooks/useForm';
import styles from '../../Form/Input.module.css' 
import Button from '../../Form/Button';
import { database } from '../../utils/firebaseUtils';
import { snapshotToArray } from '../Helper/SnaptoArray';
import { multiPropsFilter } from '../Helper/Filter';
import { filtrosSelecionados } from '../Helper/Filter';


import stylesE from '../Entrada/entrada.module.css'
import stylesB from '../../Form/Button.module.css'
import {getCurrentDate} from '../Helper/DateCurrent'
import { nomeAuditor } from '../Helper/Auditor';
import { nomeAssunto } from '../Helper/Assunto';
import Entradathead from './Entradathead';
import { Link } from 'react-router-dom';


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
  const [more, setMore] = React.useState({ more: false, key: '' });

  const refInput = React.useRef(null);
  const [edit, setEdit] = React.useState(false);
  const [editkey,setEditkey] = React.useState('')

  const [carregando, setCarregando] = React.useState(true);

  const [filtro,setFiltro] = React.useState({auditor: false, recebimento: false, 
    suspensao: false, despacho: false, tipo: false, notificacao: false, exclusao: false})
  let filtrosColetados = {exclusao: '', auditor: '', recebimento: '', suspensao: '', despacho: '', tipo: '', notificacao: ''}
  const [filtros, setFiltros]  =  React.useState({auditor:'', exclusao: ''});
  const [search, setSearch] = React.useState('');


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

  function handleSearch ({target}){
    setSearch(target.value)      
  }

  function handleMais(key){
    setMore({'more':!more.more,'key':key})    
  }

  function handleExcluir(key){
    atualizarFB(key, true, 'exclusao')
  }
  
  function handleEditar(key){  
    refInput.current.focus();
    setEdit(true);
   dados.forEach(task => {
      if (key === task.key) {
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
    });   
  }

  function atualizarFB(key, value, name){
    const editRef = database.ref('entrada');
    editRef.child(key).update({[name]: value})
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

  function writeNewEntrada() {  
    var newEntradaKey = database.ref().child('entrada').push().key;
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
  
    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/entrada/' + newEntradaKey] = entradaData;  
    //updates['/history/entrada/' + newEntradaKey + '/' + entradaData.history] = entradaData;  
    return database.ref().update(updates);
  }

  function updateEntrada() {    
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

    var historyData = {
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
    
    dados.forEach(task => {
      if (editkey === task.key) {
        historyData = {
          processo: task.processo,
          data: task.data,
          requerente: task.requerente,
          assunto: task.assunto,
          auditor: task.auditor,
          prioridade: task.prioridade,
          notificacao: task.notificacao,
          obs: task.obs,
          recebimento: task.recebimento,
          suspensao: task.suspensao,
          despacho: task.despacho,
          auditorkey: task.auditorkey,
          tipo: task.tipo,  
          disabled: true,
          exclusao: false,
          key: task.key    
        };        
      }
    });
    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/entrada/' + editkey] = entradaData;  
    updates['/history/entrada/' + editkey + '/' + getCurrentDate()] = historyData;
  
    return database.ref().update(updates);
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
      writeNewEntrada();
      
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

    function searchField(dadosfiltrados){
        const lowercasedFilter = search.toLowerCase();
        return (dadosfiltrados.filter(dado => {
          return (dado.requerente.toLocaleLowerCase().includes(lowercasedFilter) || 
          dado.obs.toLocaleLowerCase().includes(lowercasedFilter) || 
          dado.processo === lowercasedFilter || 
          dado.processo.toLocaleLowerCase().includes(lowercasedFilter))          
        }))
    }

    return (
     
      <>
      <div style={{ width: '90%', margin: 'auto', marginBottom:'80px', padding: '10px'}}>
        <div style={{width: '25%',float: 'left'}}>FILTROS MAIS UTILIZADOS
          <div>
          <button id='auditor' value={window.localStorage.getItem('token')} className={
            filtros.auditor === window.localStorage.getItem('token') ? stylesB.filterOn : stylesB.filterOff
            } onClick={handleFilter}>{auditores && nomeAuditor(window.localStorage.getItem('token'), auditores)}</button>
            <button id='prioridade' value={!filtro.prioridade} className={filtro.prioridade ? stylesB.filterOnP : stylesB.filterOff} onClick={handleFilter}>Prioridade</button>
            <button id='recebimento' value={filtro.recebimento} className={filtro.recebimento ? stylesB.filterOn : stylesB.filterOff} onClick={handleFilter}>Não Recebidos</button>
            <button id='notificacao' value={!filtro.notificacao} className={filtro.notificacao ? stylesB.filterOn : stylesB.filterOff} onClick={handleFilter}>Notificado</button>
            <button id='exclusao' value={!filtro.exclusao} className={filtro.exclusao ? stylesB.filterOnP : stylesB.filterOff} onClick={handleFilter}>Excluídos</button>
            
          </div>
        </div>
        <div style={{width: '75%', float: 'left'}}>OUTROS FILTROS
          <div style={{display: 'flex'}}>              
              <label>Tipo
                <div style={{display: 'block'}}>
                  <select id='tipo' name='tipo' onChange={handleFilter}  value={filtros.tipo} >
                    <option value=''>TODOS</option>
                    <option key='0' value='processo'>PROCESSO</option>
                    <option key='1' value='oficio'>OFÍCIO</option>     
                  </select>
                </div> 
              </label>  
              <div style={{display: 'flex', marginLeft:'15px'}}>      
            {assuntos && 
              <label>Assuntos
                <div style={{display: 'block'}}>
                  <select id='assunto' name='assunto' onChange={handleFilter}  value={filtros.assunto} >
                    <option value=''>TODOS</option>
                      {assuntos.map((option) => <option key={option.key} value={option.key}>{option.assunto}</option>)}       
                  </select>
                </div> 
              </label> } 
              </div>  
              <div style={{display: 'flex', marginLeft:'15px'}}>
            {auditores && 
              <label>Auditores
                <div style={{display: 'block'}}>
                  <select id='auditor' name='auditor' onChange={handleFilter}  value={filtros.auditor} >
                    <option value=''>TODOS</option>
                      {auditores.map((option) => <option key={option.key} value={option.key}>{option.nome}</option>)}       
                  </select>
                </div> 
              </label> }   
            </div>                  
            <div style={{display: 'flex', marginLeft:'15px'}}>
              <label>Suspensão
                <div style={{display: 'block'}}>
                  <select id='suspensao' name='suspensao' onChange={handleFilter} >
                    <option value=''>TODOS</option>
                    <option key='0' value='NÃO'>NÃO</option>
                    <option key='1' value='SIM'>SIM</option>
                  </select>
                </div> 
              </label>
            </div>
            <div style={{display: 'flex', marginLeft:'15px'}}>
              <label>DESPACHO
                <div style={{display: 'block'}}>
                  <select id='despacho' name='despacho' onChange={handleFilter} >
                    <option value=''>TODOS</option>
                    <option key='0' value='NÃO'>NÃO</option>
                    <option key='1' value='SIM'>SIM</option>
                  </select>
                </div> 
              </label>
            </div>               
            <div style={{display: 'flex', marginLeft:'15px'}}>
              <label>Busca
                <div style={{display: 'block'}}>
                  <input type='text' name='search' id='search' value={search} onChange={handleSearch} />                    
                  
                </div> 
              </label>
            </div>            
            
          </div>        
        </div>
      </div>
      <table class="containerExcel">
        <Entradathead />
        <tbody>
          {carregando ? <p style={{marginLeft:'10px'}}>Carregando... Aguarde</p> : 
          <>         
          {searchField(multiPropsFilter(dados,filtrosSelecionados(filtro, filtrosColetados, filtros))).map((dado) => {
            return (   
              (!dado.exclusao || filtro.exclusao) &&               
              <tr key={dado.key}>                           
                <td>
                  {dado.tipo === 'oficio' ? <>OF. {dado.processo}</> : dado.processo} 
                  {(more.more && more.key===dado.key)  && 
                  <p style={{textTransform:'lowercase', color:'red'}}>alterado por </p>}
                </td>
                <td className={stylesE.data}>
                  {dado.data} 
                  {(more.more && more.key===dado.key)  && 
                  <p style={{color:'red'}}>{nomeAuditor(dado.auditorkey, auditores)}</p>}
                </td>
                <td className={stylesE.requerente}>
                  {dado.requerente} 
                  {(more.more && more.key===dado.key)  && 
                  <p style={{textTransform:'lowercase', color:'red'}}>ultima alteração em </p>  }
                </td> 
                <td className={stylesE.assunto}>
                  {assuntos && nomeAssunto(dado.assunto, assuntos)}
                  {(more.more && more.key===dado.key)  && 
                  <p style={{textTransform:'lowercase', color:'red'}}> { dado.history }</p>  }
                </td>
                <td className={stylesE.auditor}>
                  {auditores && nomeAuditor(dado.auditor, auditores)}
                  {(more.more && more.key===dado.key)  && 
                  <p style={{textTransform:'lowercase', color:'red'}}> <Link to={"HistoryData/"+dado.key}>Mais informações</Link> </p>  }
                </td>
                <td >
                  <input className={stylesE.inputC} type="checkbox" id='prioridade' 
                  name='prioridade'  checked={dado.prioridade} 
                  onChange={(e) => handleChange(dado.key,e.target.checked, e.target.name)} disabled />
                  {(more.more && more.key===dado.key)  && 
                  <p style={{textTransform:'lowercase', color:'red'}}> ... </p>  }
                </td>
                <td>
                  <input className={stylesE.inputC} type="checkbox" id='notificacao' 
                  name='notificacao'  checked={dado.notificacao} 
                  onChange={(e) => handleChange(dado.key,e.target.checked, e.target.name)} disabled />
                  {(more.more && more.key===dado.key)  && 
                  <p style={{textTransform:'lowercase', color:'red'}}> ... </p>  }
                </td>
                <td className={stylesE.obs}>
                  {dado.obs} 
                  {(more.more && more.key===dado.key)  && 
                  <p style={{textTransform:'lowercase', color:'red'}}> ... </p>  }
                </td>
                <td>
                  <input className={stylesE.inputC} type="checkbox" id='recebimento' 
                  name='recebimento'  checked={dado.recebimento} 
                  onChange={(e) => handleChange(dado.key,e.target.checked, e.target.name)} disabled={edit} />
                  {(more.more && more.key===dado.key)  && 
                  <p style={{textTransform:'lowercase', color:'red'}}> ... </p>  }
                </td>
                <td>
                  <select className={stylesE.selectSimNao} id='suspensao' name='suspensao' 
                  value={dado.suspensao} 
                  onChange={(e) => handleChange(dado.key,e.target.value, e.target.name)} disabled={edit}>
                    <option disabled value="">Selecione</option>
                    <option key='0' value='NÃO'>NÃO</option>
                    <option key='1' value='SIM'>SIM</option>
                  </select>   
                  {(more.more && more.key===dado.key)  && 
                  <p style={{textTransform:'lowercase', color:'red'}}> ... </p>  }
                </td>
                <td>
                  <select className={stylesE.selectSimNao} id='despacho' name='despacho' 
                  value={dado.despacho} 
                  onChange={(e) => handleChange(dado.key,e.target.value, e.target.name)} disabled={edit} >
                    <option disabled value="">Selecione</option>
                    <option key='0' value='NÃO'>NÃO</option>
                    <option key='1' value='SIM'>SIM</option>
                  </select>
                  {(more.more && more.key===dado.key)  && 
                  <p style={{textTransform:'lowercase', color:'red'}}> ... </p>  }
                </td>        
                <td>
                  {(edit || dado.exclusao)  ? 
                  <button className={stylesB.buttonMore} onClick={(e) => handleMais(dado.key)}>Mais...</button> : 
                  <>
                  <button className={stylesB.buttonEdit} onClick={(e) => handleEditar(dado.key)}>Editar</button>
                  <div className={stylesB.dividerVertical}/>
                  <button className={stylesB.buttonDelete} onClick={(e) => handleExcluir(dado.key)}>Excluir</button>                
                  <div className={stylesB.dividerVertical}/>
                  <button className={stylesB.buttonMore} onClick={(e) => handleMais(dado.key)}>Mais...</button>
                  </>
                  }                
                </td>          
              </tr>
            )})}                          
          </>}       
    </tbody>
  </table>            
    <div className={styles.container}>
    <form onSubmit={handleSubmit}  >
      <div className={styles.row}>
      <div className={styles.col25}>
          <label htmlFor="processo" className={styles.label}>
            <select className={styles.select} id='processos' name='processos' value={processos} 
              onChange={(e) => setProcessos(e.target.value)} style={{fontWeight:'bold'}} >
              <option value='processo'>Processo</option>
              <option value='oficio'>Ofício</option>
            </select>    
          </label>  
        </div>
        <div style={{paddingTop: '12px'}}>
          <Input type="text" id="processo" name="processo" label="Processo" 
          placeholder="12345/2021"  {...processo} />         
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.col25}>
          <label htmlFor="dataEntrada" className={styles.label}>
            Data da Entrada:      
          </label>  
        </div>
        <div className={styles.col75}>
          <input  className={styles.input} type="date" name="dataEntrada" id="dataEntrada"  
          value={dataEntrada} 
          onChange={(e) => setDataEntrada(e.target.value)} required   />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.col25}>
          <label htmlFor="requerente" className={styles.label}>
            Requerente:
          </label>
        </div>        
        <Input type="text" id="requerente" name="requerente" label="Requerente" value={requerente} 
        onChange={(e) => setRequerente(e.target.value)} required="required" />
      </div>
      <div className={styles.row}>
        {assuntos && 
        <Select label="Assunto" name="assunto" value={assunto} 
        options={assuntos} onChange={setAssunto}/> }
      </div>
      <div className={styles.row}>
        {auditores && 
        <Select label="Auditor" name="auditor" value={auditor} 
        options={auditores} onChange={setAuditor}/> }      
      </div>
      <div className={styles.row}>
        <Checkbox  label="Proridade" name="prioridade" onChange={setPrioridade} checked={prioridade} />
      </div>
      <div className={styles.row}>
        <Checkbox label="Notificar" name="notificacao" onChange={setNotificacao} checked={notificacao}/>
      </div>
      <div className={styles.row}>
        <div className={styles.col25}>
          <label htmlFor="obs" className={styles.label}>
          Observações:      
          </label>  
        </div>
        <div className={styles.col75} >
          <textarea ref={refInput} id="obs" name="obs" value={obs} 
          onChange={(e) => setObs(e.target.value)} className={styles.textarea}/>
        </div>        
          {edit ? 
            <div style={{float:'right', paddingTop: '1.2rem'}}> 
              <button className={stylesB.buttonCancel} onClick={handleSubmitCancelar}>Cancelar</button>
            <div className={stylesB.divider}/>
            <button className={stylesB.button} onClick={handleSubmitEditar}>Editar</button></div>: <div style={{float:'right', paddingTop: '1.2rem'}}><Button type='submit'>Enviar</Button> </div>}
      </div>
      </form>
    </div>
            </>
  )
}

export default EntradaTabela;
