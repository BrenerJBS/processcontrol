import React from 'react'
import { NavLink } from 'react-router-dom'
import { ReactComponent as IconeLogout}  from '../../Assets/logout.svg'




const AuditorHeader = (props) => {
  

  return (
    <>
      <NavLink activeStyle={{ color: 'tomato' }} to="/" end>Home</NavLink>
      <NavLink activeStyle={{ color: 'tomato' }} to="entrada">Entrada</NavLink>
      <NavLink activeStyle={{ color: 'tomato' }} to="cadastro">Cadastro</NavLink>
      <NavLink activeStyle={{ color: 'tomato' }} to="dividaativa">Dívida Ativa</NavLink>
      <NavLink activeStyle={{ color: 'tomato' }} to="prescricao">Prescrição</NavLink> 
      <NavLink activeStyle={{ color: 'tomato' }} to="login" >{props.username}</NavLink>   
      <button onClick={props.userLogout} className="logoutButton"><IconeLogout/>{props.botaoLogin}</button> 
    </>   

  
                  
  
  )
}

export default AuditorHeader
