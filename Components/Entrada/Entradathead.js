import React from 'react'
import stylesE from './entrada.module.css'

const Entradathead = () => {
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
            <th>Confirmação de recebimento</th>
            <th>Suspensão</th>
            <th>Despacho no Protocolo</th>
            <th>Ação</th>
        </tr>
    </thead>
  )
}

export default Entradathead
