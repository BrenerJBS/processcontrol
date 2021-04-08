import React from 'react'
import stylesB from '../../Form/Button.module.css'

const Acao = ({edit,handleShow,handleRecuperar,handleExcluir,handleEditar,dado}) => {
  return (
    <td>
      {(edit )  
      ? 
      <button className={stylesB.buttonMore} onClick={(e) => handleShow(dado)}>Mais...</button>
        : dado.exclusao ?
          <>
        <button className={stylesB.buttonEdit} onClick={(e) => handleRecuperar(dado.key)}>Recuperar</button>
        <div className={stylesB.dividerVertical}/>
        <button className={stylesB.buttonMore} onClick={(e) => handleShow(dado)}>Mais...</button>
        </>
        :
        <>
        <button className={stylesB.buttonEdit} onClick={(e) => handleEditar(dado.key)}>Editar</button>
        <div className={stylesB.dividerVertical}/>
        <button className={stylesB.buttonDelete} onClick={(e) => handleExcluir(dado.key)}>Excluir</button>                
        <div className={stylesB.dividerVertical}/>
        <button className={stylesB.buttonMore} onClick={(e) => handleShow(dado)}>Mais...</button>
        </>
        }       
    </td>
  )
}

export default Acao
