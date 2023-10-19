import { useLocation } from 'react-router-dom'

import Mensagem from "../layout/Mensagem"
import Container from "../layout/Container"
import BotaoLink from "../layout/BotaoLink"
import CardProjeto from '../projeto/CardProjeto'
import Carregamento from '../layout/Carregamento'

import styles from './Projetos.module.css'
import { useState, useEffect } from 'react'

function Projetos(){
    const [projetos, setProjetos] = useState([])
    const [removerCarregamento, setRemover] = useState(false)
    const [msg, setMsg] = useState()
    const [tipo, setTipo] = useState()

    const location = useLocation()

    useEffect(() => {
        fetch('http://localhost:5000/projetos', {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
            },
        }).then ((resp) => resp.json())
        .then((data) => {
            setProjetos(data)
            setRemover(true)
        })
        .catch((err) => console.log(err))

        if(location.state){
            setMsg(location.state.mensagem)
            setTipo('sucesso')
        }
    }, [])

    function remover(id){
        setMsg('')

        const projetoRemover = projetos.filter(projeto => projeto.id === id)
        const projetosAtualizados = projetos.filter(projeto => projeto.id !== id)

        fetch(`http://localhost:5000/projetos/${projetoRemover[0].id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type' : 'application/json',
            },
        }).then(resp => resp.json())
        .then(data => {
            setProjetos(projetosAtualizados)
            setMsg("Projeto removido!")
            setTipo('sucesso')
        })
        .catch(err => console.log(err))

    }

    return(
        <div className={styles.container_projeto}>
            <div className={styles.container_titulo}>
                <h1>Projetos</h1>
                <BotaoLink to="/NovoProjeto" text="Criar Projeto"/>
            </div>

            {msg && <Mensagem type={tipo} msg={msg}/>}
            <Container customClass="start">
                {!removerCarregamento && <Carregamento />}
                {projetos.length > 0 &&
                    projetos.map((projeto) => <CardProjeto nome={projeto.nome} id={projeto.id} orçamento={projeto.orçamento} categoria={projeto.categoria.nome} key={projeto.id} handleRemove={remover}/>)
                }
                {removerCarregamento && projetos.length === 0 && (
                    <p>Não há projetos cadastrados!</p>
                )}
            </Container>
        </div>
    )
}

export default Projetos