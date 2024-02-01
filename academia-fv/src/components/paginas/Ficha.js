import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react"

import styles from './Ficha.module.css'
import FormFicha from '../fichas/FormFicha'
import Mensagem from '../layout/Mensagem'

function Ficha(){
    const {id} = useParams()

    const historico = useNavigate()

    const [ficha, setFicha] = useState([])
    const [editar, setEditar] = useState(false)
    const [mensagem, setMensagem] = useState()
    const [tipo, setTipo] = useState()

    useEffect(() => {
        fetch(`http://localhost:5002/fichas/${id}`, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
            },
        }).then(resp => resp.json())
        .then(data => {
            setFicha(data)
        })
        .catch((err) => console.log(err))
    }, [id])

    function editar_cancelar(){
        setEditar(!editar) 
    }

    function salvar_edicao(ficha_atualizada){
        setMensagem('')

        fetch(`http://localhost:5002/fichas/${id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(ficha_atualizada),
        }).then(resp => resp.json())
        .then(data => {
            setFicha(data)
            setMensagem("Ficha atualizada!")
            setTipo('sucesso')
            editar_cancelar()
        })
        .catch(err => console.log(err))
    }

    function excluir(){
        fetch(`http://localhost:5002/fichas/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type' : 'application/json',
            },
        }).then(resp => resp.json())
        .then(data => {
            historico('/Fichas',{state: {mensagem: "Ficha excluida"}})
        })
        .catch(err => console.log(err))
    }


    return(
        <div className={styles.ficha_container}>
            {mensagem && <Mensagem type={tipo} msg={mensagem}/>}
            <h2>Edite a ficha</h2>
            <div>
                <button className={styles.bt} onClick={editar_cancelar}>{!editar ? "Editar" : "Cancelar"}</button>
                <button className={styles.bt} onClick={excluir}>Excluir</button>
            </div>
            <div className={styles.ficha_info}>
                {/* {ficha.id && <FormFicha handleSubmit={salvar_edicao} textoBt={'Salvar'} dadosFicha={ficha} disabled={!editar}/>} */}
                {ficha.id && (editar ? (
                        <FormFicha handleSubmit={salvar_edicao} textoBt={'Salvar'} dadosFicha={ficha}/>
                    ):(
                        <div><FormFicha handleSubmit={salvar_edicao} textoBt={'Salvar'} dadosFicha={ficha} disabled={!editar}/></div>
                ))}
            </div>
        </div>
    )
}

export default Ficha