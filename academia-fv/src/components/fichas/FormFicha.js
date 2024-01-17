import { useEffect, useState} from "react"

import Input from "../formulario/Input"
import styles from "./FormFicha.module.css"
import BtSubmit from "../../components/formulario/BtSubmit"

function FormFicha({ handleSubmit, textoBt, dadosFicha, setMensagem, setTipoMsg}){
    const [ficha, setFicha] = useState(dadosFicha || {})

    useEffect (() => {
        fetch("http://localhost:5002/fichas", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((resp) => resp.json())
        .then((data) => setFicha(data))
        .catch((err) => console.log(err))
    }, [])


    const submit = (e) => {
        e.preventDefault()
        handleSubmit(ficha)
    }

    function handleOnChange(e) {
        setFicha({...ficha, [e.target.name]: e.target.value})
        // aqui é pego o nome do atributo (e.target.name) e em seguida o valor
        // referente ao atributo (e.target.value) para cada atributo da ficha
    }

    return(
        <form onSubmit={submit}>
            <Input tipo={'text'} placeholder={'digite o nome'} nomeAtributo={'nome'} titulo={'Nome completo'} handleOnChange={handleOnChange} value={ficha.nome ? ficha.nome : ''}/>
            <Input nomeAtributo={'telefone'} titulo={'Telefone'} telefone={true} handleOnChange={handleOnChange} value={ficha.telefone ? ficha.telefone : ''}/>
            <Input tipo={'number'} placeholder={'digite o dia do pagamento'} nomeAtributo={'diaPagamento'} titulo={'Dia do pagamento'} valorMax={"31"} handleOnChange={handleOnChange} value={ficha.diaPagamento ? ficha.diaPagamento : ''}/>

            <div>
                <BtSubmit texto={textoBt}/>
            </div>
        </form>
    )
}

export default FormFicha