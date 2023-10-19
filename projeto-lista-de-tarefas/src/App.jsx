import { useState,useEffect } from 'react'

import './App.css'
import Tarefa from './componentes/Tarefa'
import TarefaForm from './componentes/TarefaForm'
import Pesquisa from './componentes/Pesquisa'
import Filtro from './componentes/Filtro'
import Mensagem from './componentes/Mensagem'

function App() {
  const [tarefas, setTarefas] = useState([])

  const [pesquisa,setPesquisa] = useState('')
  const [filtro, setFiltro] = useState("todas")
  const [ordenar, setOrdenar] = useState("cresc")
  const [mensagem, setMensagem] = useState("")
  const [tipo, setTipo] = useState("")

  useEffect(() => {
    fetch(`http://localhost:5001/tarefas`, {
      method: 'GET',
      headers:{
          'Content-Type': 'application/json',
      },
    }).then(resp => resp.json())
    .then(data => {
      setTarefas(data)
    })
    .catch((err) => console.log(err))
  }, [])

  function addTarefa (titulo, categoria){
    setMensagem("")
    const novaTarefa = {
      id: Math.floor(Math.random() * 10000),
      titulo: titulo,
      categoria: categoria,
      completo: false,
    }

    fetch(`http://localhost:5001/tarefas`, {
      method: 'POST',
      headers:{
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(novaTarefa),
    }).then(resp => resp.json())
    .then(data => {
      tarefas.push(novaTarefa)
      setMensagem("Tarefa adicionada")
      setTipo("sucesso")
    })
    .catch((err) => console.log(err))
  }

  function rmvTarefa(id){    
    setMensagem("")
    const tarefasFiltradas = tarefas.filter(tarefa => id !== tarefa.id ? tarefa : null)
    
    fetch(`http://localhost:5001/tarefas/${id}`, {
      method: 'DELETE',
      headers:{
          'Content-Type': 'application/json',
      },
    }).then(resp => resp.json())
    .then(data => {
      setTarefas(tarefasFiltradas)
      setMensagem("Tarefa removida")
      setTipo("sucesso")
    })
    .catch((err) => console.log(err))
  }

  function cmpTarefa(id){
    const tarefasFiltradas = tarefas.filter(tarefa => id === tarefa.id ? (tarefa.completo = true) : tarefa)
    const tarefaCompleta = tarefas.filter(tarefa => id === tarefa.id)[0]
    tarefaCompleta.completo = true
    
    fetch(`http://localhost:5001/tarefas/${id}`, {
      method: 'PATCH',
      headers:{
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(tarefaCompleta),
    }).then(resp => resp.json())
    .then(data => {
      setTarefas(tarefasFiltradas)
    })
    .catch((err) => console.log(err))
  }

  return (
    <div className="app">
      <h1>Lista de Tarefas</h1>
      <Pesquisa pesquisa={pesquisa} setPesquisa={setPesquisa}/>
      <Filtro filtro={filtro} setFiltro={setFiltro} setOrdenar={setOrdenar}/>
      <div className="lista_tarefas">
        {mensagem && <Mensagem msg={mensagem} type={tipo}/>}
        {tarefas.length > 0 ? (
          tarefas.filter(tarefa =>
            filtro === "todas" ? true : filtro === "completas" ? tarefa.completo : !tarefa.completo 
            ).filter(tarefa => 
              tarefa.titulo.toLowerCase().includes(pesquisa.toLowerCase())
            ).sort((a,b) =>
              ordenar === "cresc" ? a.titulo.localeCompare(b.titulo) : b.titulo.localeCompare(a.titulo)
            ).map(tarefa => (
              <Tarefa tarefa={tarefa} key={tarefa.id} rmvTarefa={rmvTarefa} cmpTarefa={cmpTarefa} />
          ))): (
            <p>Sem tarefas</p>
          )
        }
      </div>
      <TarefaForm submit={addTarefa}/>
    </div>
  )
}



export default App
