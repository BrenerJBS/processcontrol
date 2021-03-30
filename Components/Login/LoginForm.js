import React from 'react'
import { Link } from 'react-router-dom';
import Button from '../../Form/Button';
import LoginInput from '../../Form/LoginInput';
import useForm from '../../Hooks/useForm';
import { UserContext } from '../../UserContext';
import Error from '../Helper/Error';
import styles from './LoginForm.module.css'

import './LoginForm.css'


  const LoginForm = () => {
  const user = useForm('');
  const pass = useForm('');

  const {userLogin, loading , error} = React.useContext(UserContext);

  function handleSubmit(e) {
    e.preventDefault();
    if (user.validade() && pass.validade()){
      userLogin(user.value, pass.value)       
    }  
  }
  return (    
    <div>  
        <h1 className='title'>Login</h1>
        <form className={styles.form} onSubmit={handleSubmit}>                    
              <LoginInput type="text" id="user" name="user" label="Email do Usuário" 
             required="required" {...user}/>              
              <LoginInput type="password" id="pass" name="pass" label="Password" 
              required="required" {...pass}/>    
              {loading ? <Button disable>Carregando...</Button> : <Button>Entrar</Button>}     
          <Error error={error} />
        </form>
       <Link className={styles.lost} to="LostPass">Perdeu a senha</Link><br></br>
       <Link className={styles.lost}  to="ResetPass">Resetar sua senha</Link>
    </div>
  )
}

export default LoginForm
