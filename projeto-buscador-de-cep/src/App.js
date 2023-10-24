import { useState } from 'react';
import {FiSearch} from 'react-icons/fi'
import estilos from './App.module.css'
import Api from './serviços/Api';
import Mensagem from './layout/Mensagem';

function App() {
  const [input,setInput] = useState('')
  const [cep, setCep] = useState('')
  const [tipo, setTipo] = useState("")
  const [msg, setMsg] = useState("")

  async function handleSearch(){
    setTipo("")
    setMsg("")
    if (input === ""){
      return
    }

    try{
      const resposta = await Api.get(`${input}/json`)
      setCep(resposta.data)
      setInput("")
    } catch{
      setInput("");
      setCep("")
      setTipo("falha")
      setMsg("Erro ao tentar procurar o CEP digitaddo")
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

      <Mensagem type={tipo} msg={msg}/>

      {cep && (
        <div className={estilos.main}>
          <h2>CEP: {cep.cep}</h2>

          {cep.logradouro && (<span>{cep.logradouro}</span>)}
          {cep.complemento && (<span>Complemento: {cep.complemento}</span>)}
          {cep.bairro && (<span>{cep.bairro}</span>)}
          {cep.localidade && (<span>{cep.localidade} - {cep.uf}</span>)}
        </div>
      )}
        
    </div>
  );
}

export default App;
