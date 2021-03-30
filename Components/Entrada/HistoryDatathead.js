import React from 'react'
import stylesE from './entrada.module.css'

const HistoryDatathead = () => {
  return (
    <thead>
        <tr className={stylesE.upperCase}>
            <th>Processo/Ofício</th>
            <th>Data de Entrada</th>
            <th >Requerente</th>          
            <th >Assunto</th>
            <th>Auditor</th>
            <th>Prioridade</th>
            <th>Notificação</th>
            <th>Observação</th>
            <th>Data da Alteração</th>
            <th>Alteração por</th>            
            <th>Ação</th>
        </tr>
    </thead>
  )
}

export default HistoryDatathead
