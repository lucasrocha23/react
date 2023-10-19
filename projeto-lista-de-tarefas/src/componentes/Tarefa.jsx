import React from 'react'

import estilos from "./Tarefa.module.css"

function Tarefa({ tarefa, rmvTarefa, cmpTarefa }){

    function lidarRemover(id){
        rmvTarefa(id)
    }

    function lidarCompletar(id){
        cmpTarefa(id)
    }

    return (
      <div className={estilos.tarefa} style={{textDecoration: tarefa.completo ? "line-through" : "", color: tarefa.completo ? "#5cb85c" : "#000"}}>
          <div className="conteudo">
              <p>{tarefa.titulo}</p>
              <p className='categoria'>{tarefa.categoria}</p>
          </div>
          <div>
              <button className={estilos.completar} onClick={() => lidarCompletar(tarefa.id)}>Completar</button>
              <button className={estilos.remover} onClick={() => lidarRemover(tarefa.id)}>X</button>
          </div>
      </div>
    )
}

export default Tarefa