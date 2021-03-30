import React from 'react'
import styles from '../Form/Input.module.css'


const Checkbox = (props) => {
  return (
    <>
      <div className={styles.col25}>
          <label htmlFor={props.name} className={styles.label}>
          {props.label}:      
          </label>  
        </div>
        <div className={styles.col75}>      
        <input className={styles.input} type="checkbox" id={props.name} name={props.name}  checked={props.checked}
        onChange={(e) => props.onChange(e.target.checked)} />
        </div>
    </>
  )
}

export default Checkbox
