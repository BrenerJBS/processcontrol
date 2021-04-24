import React from 'react'
import styles from './Modal.module.css'

const Modal = (props) => {

  function handleClick({target}){
    if (target.className === styles.box)
      props.setModal(null)   
  }

  return (
    <div className={styles.box} onClick={(e) => handleClick(e)}>      \      
      <div className={styles.wrapper}>
        <div className={styles.title} style={{ background:  `${props.color}`   }}>        
          {props.title}
        </div> 
        {props.modal}   
        <div className={styles.close} onClick={() => props.setModal(null)}>Fechar</div>
      </div>
    </div>
  )
}

export default Modal
