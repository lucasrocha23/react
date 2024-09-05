import { useNavigate, useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import { LiaSearchSolid } from 'react-icons/lia'
import { useAuth } from '../../hooks/useAuth'
import Modal from '../modal'

import './estilos.css'

function Cabecalho(){
    const [searchParams,setSearchParams] = useSearchParams()
    const [pesquisa, setPesquisa] = useState(searchParams.get('pesquisa')? String(searchParams.get('pesquisa')) : '')
    const [modalSairVisivel, setModalSairVisivel] = useState(false)

    const {username,logout} = useAuth()
    const navigate = useNavigate()

    function submit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        setSearchParams(params =>{
            params.set('pesquisa', pesquisa)

            return params
        })
        navigate(`/DummyProds/listaProdutos?pesquisa=${pesquisa}`)
    }

    function sairDaConta(){
        setPesquisa('')
        logout()
        navigate('/DummyProds/')
    }
    
    return (
        <div className="container-cabecalho">
            <h1 onClick={() => {
                navigate('/DummyProds/listaProdutos?pesquisa=')
                setPesquisa('')
            }}>DummyProds</h1>
            <div className="pesquisa">
                <form action="POST" onSubmit={submit}>
                    <input value={pesquisa} type="text" onChange={(event) => setPesquisa(event.target.value)}/>
                    <button><LiaSearchSolid/></button>
                </form>
            </div>
            <ul>
                <li><p>Olá, {username}</p></li>
                <li><button className="bt-sair" onClick={() => setModalSairVisivel(true)}>SAIR</button></li>
            </ul>

            <Modal visivel={modalSairVisivel}>
                <div className="container-sair">
                    <h1>Confirmar saída</h1>
                    <p>Você deseja realmente sair da conta?</p>
                    <div className="botoes">
                        <button className="bt-sim" onClick={sairDaConta}>
                            Sim
                        </button>
                        <button className="bt-nao"
                        onClick={() => setModalSairVisivel(false)}>
                            Não
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Cabecalho