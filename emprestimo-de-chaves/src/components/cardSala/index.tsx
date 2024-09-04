import { useEffect, useState, useRef } from 'react'
import { TbDotsVertical } from "react-icons/tb";
import { FiEdit2, FiTrash2} from "react-icons/fi"
import axios from 'axios'

import './estilos.css'

interface Sala{
    id: string
    cod: string
    nome: string
    funcionario: string
    estado: string
}

interface Funcionario{
    id: string
    nome: string
}

interface CardProps{
    sala: Sala
    setNome: React.Dispatch<React.SetStateAction<{}>>
    setId: React.Dispatch<React.SetStateAction<{}>>
    setCodSala: React.Dispatch<React.SetStateAction<{}>>
    setModalEditVisivel: React.Dispatch<React.SetStateAction<{}>>
    setModalDelVisivel: React.Dispatch<React.SetStateAction<{}>>
}

function CardSala({sala,setNome, setId, setCodSala,setModalEditVisivel, setModalDelVisivel}: CardProps){
    const [funcionario, setFuncionario] = useState<Funcionario>()
    const [opcoes, setOpcoes] = useState(false)

    useEffect(() => {
        if (sala.funcionario){
            getFuncionario()
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

    async function getFuncionario(){
        try {
            const dados = await axios.get(`http://localhost:5000/funcionarios/${sala.funcionario}`)

            setFuncionario(dados.data)
        } catch (error) {
            
        }
    }

    function abrirOpcoes(e){
        setOpcoes(true)
    }

    return(
        <div className="container-cardSala">
            <div className='card-cabecalho'>
                <h3>{sala.nome}</h3>
            </div>
            <div className='container-conteudo-sala'>
                <p><span>Código:</span> {sala.cod}</p>
                <p><span>Funcionário:</span> {funcionario?.nome}</p>
                <div className='linha'>
                <div className='conteudo-esquerda'>
                    {sala.funcionario?
                        <div className='estado'><span className='emUso'></span>Em uso</div>
                    :
                        <div className='estado'><span className='disponivel'></span> Disponível</div>
                    }
                </div>
                <div className='conteudo-direita' >
                    {opcoes ?
                        <div className='container-opcoes' id='bts'  >
                            <button onClick={() => {
                                setNome(sala.nome)
                                setId(sala.id)
                                setCodSala(sala.cod)
                                setModalEditVisivel(true)
                            }}><FiEdit2/></button>
                            <button onClick={() => {
                                setModalDelVisivel(true)
                                setId(sala.id)
                            }}><FiTrash2/></button>
                        </div>
                    :
                    <button className='pontos-verticais' onClick={(event) => abrirOpcoes(event)}><TbDotsVertical/></button>
                    }
                </div> 
                </div>
            </div>
        </div>
    )
}

export default CardSala