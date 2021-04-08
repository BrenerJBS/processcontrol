import React from 'react'

const Filtrosmais = ({id,value,className,onClick, name}) => {
  return (
    

            <button id={id} value={value} className={className} onClick={onClick}>{name}</button>
            
      
    
   
  )
}

export default Filtrosmais
