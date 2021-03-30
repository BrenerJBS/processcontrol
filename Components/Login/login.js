import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import Head from '../../Head';
import { UserContext } from '../../UserContext';
import LoginForm from './LoginForm';
import LostPass from './LostPass';
import ResetPass from './ResetPass';
import styles from './Login.module.css'

const Login = () => {
  const {login} = React.useContext(UserContext);

  if (login === true){
    return <Navigate to='/Entrada' />
  }
  


  return (
    <div className="animeLeft">
      <div className={styles.login}>
      <div className={styles.forms}>
      <Head title="Login" description="Faça login para continuar"/>

        <Routes>
          <Route path="/" element={<LoginForm />}/>
          <Route path="lost" element={<LostPass />}/>
          <Route path="reset" element={<ResetPass />}/>

        </Routes>
        </div>

        </div>
           



    </div>
  )
}

export default Login