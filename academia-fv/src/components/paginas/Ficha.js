import { useParams } from 'react-router-dom'
import { useState, useEffect } from "react"

import styles from './Ficha.module.css'
import FormFicha from '../fichas/FormFicha'

function Ficha(){
    const {id} = useParams()

    const [ficha, setFicha] = useState([])
    const [editar, setEditar] = useState(false)

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

    function salvar_edicao(){
        console.log('apertou');
    }


    return(
        <div className={styles.ficha_container}>
            <h2>Edite a ficha</h2>
            <button className={styles.bt_edita} onClick={editar_cancelar}>{!editar ? "Editar" : "Cancelar"}</button>
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