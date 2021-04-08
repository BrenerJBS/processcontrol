import React from 'react'

const FiltroSelecao = ({label,id,name,onChange, value, options, nameoption}) => {
  return (
    <div style={{display: 'flex', marginLeft:'15px'}}>
    <label>{label}
                <div style={{display: 'block'}}>
                  <select id={id} name={name} onChange={onChange}  value={value} >
                  <option value=''>TODOS</option>
                    {options.map((item) => { return (<option key={item[nameoption]} value={item.value}>{item[nameoption]}</option>)
                    })}
                  </select>
                </div> 
              </label>  
              </div>
  )
}

export default FiltroSelecao
