import axios from "axios"
import { useEffect, useState } from "react"

import './estilos.css'

interface Historico{
    id: string
    dataInicio: string
    dataFim: string
    hrInicio: string
    hrFim: string
    idSala: string
    idFunc: string
    concluido: string
}

interface Funcionário{
    id: string
    nome: string
}

interface Sala{
    id: string
    nome: string
}

interface CardProps{
    historico: Historico
}

function CardHistorico({historico}: CardProps){
    const [sala, setSala] = useState<Sala>()
    const [func, setFunc] = useState<Funcionário>()

    useEffect(() =>{
        getSala(historico.idSala)
        getFunc(historico.idFunc)
    },[])

    async function getSala(id: string){
        try {
            const dados = await axios.get(`http://localhost:5000/salas/${id}`)
            
            setSala(dados.data)
        } catch (error) {
            
        }
    }
    
    async function getFunc(id: string){
        try {
            const dados = await axios.get(`http://localhost:5000/funcionarios/${id}`)

            setFunc(dados.data)
        } catch (error) {
            
        }
    }

    return(
        <div className="container-card-historico">
            {historico.dataFim?
                <div className="estado" style={{marginBottom: '10px'}}>
                    <h4 style={{marginRight: '10px'}}>Estado:</h4>
                    Concluído
                    <span className='concluido'></span>
                </div>
            :
                <div className="estado" style={{marginBottom: '10px'}}>
                    <h4 style={{marginRight: '10px'}}>Estado:</h4>
                    Em aberto
                    <span className='emAberto'></span>
                </div>
            }
            <div className="row">
                <div className="esq"><h4>Início:</h4>{historico.dataInicio}</div>
                <div className="meio"><h4>Devolução:</h4>{historico.dataFim}</div>
                <div className="dir"><h4>Sala:</h4> {sala?.nome}</div>
            </div>
            <div className="row">
                <p className="esq">{historico.hrInicio}</p>
                <p className="meio">{historico.hrFim}</p>
                <div className="dir"><h4>Funcionário:</h4>{func?.nome}</div>
            </div>
            <div className="row">
                
            </div>
        </div>
    )
}

export default CardHistorico