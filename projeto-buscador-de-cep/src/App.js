import { useState } from 'react';
import {FiSearch} from 'react-icons/fi'
import estilos from './App.module.css'
import Api from './serviços/Api';

function App() {
  const [input,setInput] = useState('')

  async function handleSearch(){
    if (input === ""){
      return
    }

    try{
      const resposta = await Api.get(`${input}/json`)
      console.log(resposta);
    } catch{

    }
  }

  return (
    <div className={estilos.container}>
      <h1 className={estilos.titulo}>Buscador de CEP</h1>

      <div className={estilos.containerInput}>
        <input type="text" placeholder="Digite seu CEP..." value={input} onChange={(e) => setInput(e.target.value)}/>

        <button className={estilos.bt_pesquisa} onClick={handleSearch}>
          <FiSearch size={25} color="FFF"/>
        </button>
      </div>

      <div className={estilos.main}>
        <h2>CEP</h2>

        <span>Rua</span>
        <span>Complemento</span>
        <span>Bairro</span>
        <span>Estado</span>
      </div>
    </div>
  );
}

export default App;
