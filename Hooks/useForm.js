import React from 'react'


const types = {
  processo: { 
    regex :  /^\d+[/](20)\d{2}$/,
    message: 'Número do processo incorreto'
  }

}

const useForm = (type) => {
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(null);

  function validate(value){
    if (value.length === 0){
      setError("Preencha o campo");
      return false;
    }
    else if (types[type] && !types[type].regex.test(value)){
      setError(types[type].message);
      return false;
    }
    else {
      setError(null);
      return true;
    }  
  }
  
  function onChange({ target }){
    if (error){ 
      validate(target.value)
    }

      setValue(target.value)
    

  }

  return {
    value,
    setValue,
    error,
    onChange,
    onBlur: () => validate(value),
    validade: () => validate(value)
  }



}

export default useForm
