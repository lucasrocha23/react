import { useEffect, useState} from "react"

import Input from "../formulario/Input"
import styles from "./FormFicha.module.css"
import BtSubmit from "../../components/formulario/BtSubmit"

function FormFicha({ dadosFicha, handleSubmit, textoBt, disabled, setMensagem, setTipoMsg}){
    const [ficha, setFicha] = useState(dadosFicha || {})
    const [fichaInicial, setFichaIni] = useState(ficha)

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
            <Input tipo={'text'} placeholder={'digite o nome'} nomeAtributo={'nome'} titulo={'Nome completo'} handleOnChange={handleOnChange} valor={ficha.nome ? ficha.nome : ''} disabled={disabled}/>
            <Input nomeAtributo={'telefone'} titulo={'Telefone'} telefone={true} handleOnChange={handleOnChange} valor={ficha.telefone ? ficha.telefone : ''} disabled={disabled}/>
            <Input tipo={'number'} placeholder={'digite o dia do pagamento'} nomeAtributo={'diaPagamento'} titulo={'Dia do pagamento'} valorMax={"31"} handleOnChange={handleOnChange} valor={ficha.diaPagamento ? ficha.diaPagamento : ''} disabled={disabled}/>

            <div>
                <BtSubmit texto={textoBt} disabled={disabled}/>
            </div>
        </form>
    )
}

export default FormFicha