import React from 'react'
import Error from '../Components/Helper/Error'
import styles from '../Form/Input.module.css'


const Input = (props) => {
  return (
    <>      
        <div className={styles.col75}>
        <input className={styles.input} type={props.type} name={props.name} id={props.id} placeholder={props.placeholder}  ref={props.ref}  style={{textTransform: 'uppercase'}}
        value={props.value}  onChange={props.onChange}  onBlur={props.onBlur} required={props.required}/>
        </div>
        <Error error={props.error} />       
    </>
  )
}

export default Input