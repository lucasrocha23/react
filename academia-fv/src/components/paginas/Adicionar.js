import { useState } from "react"

import Mensagem from "../layout/Mensagem"
import FormFicha from "../fichas/FormFicha"

import styles from "./Adicionar.module.css"

function Adicionar(){
    const [mensagem, setMensagem] = useState()
    const [tipoMsg, setTipoMsg] = useState()

    function submit(ficha){
        setMensagem("")
        fetch("http://localhost:5002/fichas", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ficha)
        }).then((resp) => resp.json)
        .then((data) => {
            setMensagem("Ficha adicionada!")
            setTipoMsg('sucesso')
        })
        .catch((err) => console.log(err))
    }

    return(
        <div className={styles.adicionar_container}>
            {mensagem && <Mensagem type={tipoMsg} msg={mensagem}/>}
            <h2>Adicione um Cliente</h2>
            <FormFicha textoBt={"Salvar"} handleSubmit={submit}/>
        </div>
    )
}

export default Adicionar