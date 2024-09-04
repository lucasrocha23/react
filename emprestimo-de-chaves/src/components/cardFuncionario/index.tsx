import { useEffect, useState, useRef } from 'react'
import { TbDotsVertical } from "react-icons/tb";
import { FiEdit2, FiTrash2} from "react-icons/fi"
import axios from 'axios'

import './estilos.css'

interface Funcionario{
    cod: string
    nome: string
    sala:string
    id: string
    estado:string
}

interface Sala{
    id: string
    nome: string
}

interface CardProps{
    funcionario: Funcionario
    setNome: React.Dispatch<React.SetStateAction<string>>
    setId: React.Dispatch<React.SetStateAction<string>>
    setCodFunc: React.Dispatch<React.SetStateAction<string>>
    setModalEditVisivel: React.Dispatch<React.SetStateAction<boolean>>
    setModalDelVisivel: React.Dispatch<React.SetStateAction<boolean>>
}

function CardFuncionario({funcionario,setNome,setId,setCodFunc,setModalEditVisivel,setModalDelVisivel}:CardProps){
    const [sala_, setSala_] = useState<Sala>()
    const [opcoes, setOpcoes] = useState(false)

    useEffect(() => {
        if (funcionario.sala){
            getSala()
        }

        function handleClickOutside(event: MouseEvent) {   
            const bt = document.getElementById('bts')         
            if (bt && !bt.contains(event.target as Node)) {
                setOpcoes(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    },[])

    async function getSala(){
        try {
            const dados = await axios.get(`http://localhost:5000/salas/${funcionario.sala}`)
            
            setSala_(dados.data)
        } catch (error) {
            
        }
    }

    return(
        <div className="container-cardFunc">
            <div className="card-cabecalho">
                <h3>{funcionario.nome}</h3>
            </div>
            <div className='container-conteudo'>
                <p><span>Código:</span> {funcionario.cod}</p>
                <p><span>Sala:</span> {sala_?.nome}</p>
                <div className='linha'>
                <div className='conteudo-esquerda'>
                    {funcionario.sala?
                        <div className='estado'><span className='comChave'></span>Com chave</div>
                    :
                        <div className='estado'><span className='semChave'></span>Sem chave</div>
                    }
                </div>
                <div className='conteudo-direita' >
                    {opcoes ?
                        <div className='container-opcoes' id='bts'  >
                            <button onClick={() => {
                                setNome(funcionario.nome)
                                setId(funcionario.id)
                                setCodFunc(funcionario.cod)
                                setModalEditVisivel(true)
                            }}><FiEdit2/></button>
                            <button onClick={() => {
                                setModalDelVisivel(true)
                                setId(funcionario.id)
                            }}><FiTrash2/></button>
                        </div>
                    :
                    <button className='pontos-verticais' onClick={() => setOpcoes(true)}><TbDotsVertical/></button>
                    }
                </div> 
                </div>
            </div>
        </div>
    )
}

export default CardFuncionario