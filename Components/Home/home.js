import React from 'react'
import { Navigate } from 'react-router';
import Head from '../../Head'
import { UserContext } from '../../UserContext';


const Home = () => {
  
  const {login} = React.useContext(UserContext);

  if (login === false){
    return <Navigate to='/Login' />
  }

  return (
    <div className="animeLeft">
      <Head title="Controle de Processos SRI" description="Informações de Controle de Processos SRI" />
      


    </div>
  )
}

export default Home