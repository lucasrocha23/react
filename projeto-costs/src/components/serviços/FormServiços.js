import { useState, useEffect } from 'react'

import Input from '../form/Input'
import BtSubmit from '../form/BtSubmit'

import styles from '../projeto/FormProjeto.module.css'

function FormServiços({ handleSubmit, txtBt, dadosProjeto, dadosServiçoSelecionado}){
    const [serviço, setServiço] = useState(dadosServiçoSelecionado || {})

    function submit(e){
        e.preventDefault()
        handleSubmit(dadosProjeto,serviço)
    }

    function handleChange(e){
        setServiço({...serviço, [e.target.name]: e.target.value})
    }
    
    return (
        <form onSubmit={submit} className={styles.form}>
            <Input type="text" text="Nome do serviço" name="nome" placeholder="Insira o nome do serviço" handleOnChange={handleChange} value={serviço.nome ? serviço.nome : ''}/>
            <Input type="number" text="Custo do serviço" name="custo" placeholder="Insira o valor total" handleOnChange={handleChange} value={serviço.custo ? serviço.custo : ''}/>
            <Input type="text" text="Descrição do serviço" name="descriçao" placeholder="Descreva o serviço" handleOnChange={handleChange} value={serviço.descriçao ? serviço.descriçao : ''}/>
            <BtSubmit text={txtBt} />
        </form> 
    )
}

export default FormServiços