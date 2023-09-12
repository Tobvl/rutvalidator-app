import { useState } from "react"

export const InputComponent = () => {

  const [input, setInput] = useState('');  
  const [valid, setValid] = useState(false);
  const onInputChange = (event) => {
    // /[^kK\d]/g
    // /^(\d{1,3}(?:\.\d{1,3}){2}-[\dkK])$/g
    const inputValue = event.target.value.replace(/[^kK\d]/g, '');
    if (inputValue.length >= 15) return;    
    
    const rut = inputValue.slice(0, inputValue.length - 1);
    const dv = inputValue.slice(inputValue.length - 1);
    validarRut(rut, dv) ? setValid(true) : setValid(false);
    setInput(inputValue);
  }

  const showFormattedRut = (rut) => {
    let formattedRut = '';
    rut = rut.replace(/[^kK\d]/g, '');
    if (rut.length <= 2){
      formattedRut = 
      `${rut}-`;
    }
    if (rut.length >= 3 && rut.length <= 4){
      formattedRut = 
      `${rut.slice(0,1)}.${rut.slice(1)}-`;
    }
    if (rut.length >= 5 && rut.length <= 8){
      formattedRut = 
      `${rut.slice(0,1)}.${rut.slice(1,4)}.${rut.slice(4,7)}-${rut.slice(7)}`;
    }
    if (rut.length == 9){
      formattedRut = 
      `${rut.slice(0,2)}.${rut.slice(2,5)}.${rut.slice(5,8)}-${rut.slice(8)}`;
    }
    return formattedRut;
  }

  const validarRut = (rut, dv) => {

    let c = 2;
    let sum = 0;
    if (rut.length < 7 || rut.length >= 9) return false;
    while (parseInt(rut) > 0){
      let d = rut % 10;

      if (c > 7){
        c = 2;
      }

      sum += c * d;

      rut = Math.floor(rut / 10);
      
      c++;
    } 
    const res = sum % 11;

    if (dv.toLowerCase() == "k"){
      if (11 - res == 10){
        return true;
      }
    }else if (dv == 0){
      if (11 - res == 11){
        return true;
      }
    }
    if (11 - res == parseInt(dv)){
        return true;
    }else{
        return false; 
    }
  }
  
  return (
    <>
    <p className="center-item" style={{"marginLeft":".5rem"}}>Rut
    <input 
        style={{"marginLeft":".5rem", "width":"12rem", "textAlign":"center"}}
        className="text-center" 
        type="text" 
        placeholder="12.345.678-9"
        value= {input}
        onChange= { onInputChange }/>
        </p>
        
    {
      input ? (
        valid ? (<p className="center-item">{showFormattedRut(input)}</p>) : (<p className="center-item">{showFormattedRut(input)}</p>)
      ) : null
    }
    {
      input ? (
        valid ? 
        <p className="center-item" style={{color:'green'}}>Rut Válido</p> : 
        <p className="center-item" style={{color:'red'}}>Rut Inválido</p>) : 
        <p className="center-item" style={{color:'black'}}>Escribe un RUT!</p>
    }
    </>
  )
}
