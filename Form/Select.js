import React from 'react'
import styles from '../Form/Input.module.css'



const Select = (props) => {
  if (props.name === 'auditor'){
    return (<> 
    <div className={styles.col25}>
          <label htmlFor={props.name} className={styles.label}>
          {props.label}
          </label>  
        </div>
        <div className={styles.col75}>
        <select className={styles.select} id={props.name} name={props.name} value={props.value} onChange={(e) => props.onChange(e.target.value)} style={{textTransform: 'uppercase'}} required={props.required}>
        <option disabled value="">Selecione</option>
        {props.options.map((option) => <option key={option.key} value={option.key}>{option.nome}</option>)}         
          
        </select>       
       
       
        </div>
    
    
    </> ) }

  else if (props.name === 'assunto'){
  return (<> 
  <div className={styles.col25}>
        <label htmlFor={props.name} className={styles.label}>
        {props.label}
        </label>  
      </div>
      <div className={styles.col75}>
      <select className={styles.select} id={props.name} name={props.name} value={props.value} onChange={(e) => props.onChange(e.target.value)} style={{textTransform: 'uppercase'}} required={props.required}>
      <option disabled value="">Selecione</option>
      {props.options.map((option) => <option key={option.key} value={option.key}>{option.assunto}</option>)}         
        
      </select>       
     
     
      </div>
  
  
  </> ) }

else{
  return (
    <>
      <div className={styles.col25}>
          <label htmlFor={props.name} className={styles.label}>
          {props.label}
          </label>  
        </div>
        <div className={styles.col75}>
        <select className={styles.select} id={props.name} name={props.name} value={props.value} onChange={(e) => props.onChange(e.target.value)} style={{textTransform: 'uppercase'}} required={props.required}>
        <option disabled value="">Selecione</option>
        {props.options.map((option) => <option key={option} value={option}>{option}</option>)}         
          
        </select>       
       
       
        </div>
    </>
  )
}
}

export default Select;
