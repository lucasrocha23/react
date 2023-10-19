import { useState, useEffect } from "react"

import Input from "../form/Input"
import Select from "../form/Select"
import BtSubmit from "../form/BtSubmit"

import styles from './FormProjeto.module.css'

function FormProjeto({handleSubmit, btTexto, dadosProjeto}){
    const [categorias, setCategorias] = useState([])
    const [projeto, setProjeto] = useState(dadosProjeto || {})
    
    useEffect (() => {

        fetch("http://localhost:5000/categorias", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((resp) => resp.json())
        .then((data) => setCategorias(data))
        .catch((err) => console.log(err))
    }, [])

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(projeto)
    }

    function handleOnChange(e) {
        setProjeto({...projeto, [e.target.name]: e.target.value})
    }

    function handleSelect(e) {
        setProjeto({...projeto, categoria: {
            id: e.target.value,
            nome: e.target.options[e.target.selectedIndex].text
        }})
    }

    return(
        <form onSubmit={submit}>
            <Input type="text" text="Nome do projeto" name="nome" placeholder="Insira o nome do projeto" handleOnChange={handleOnChange} value={projeto.nome ? projeto.nome : ''}/>
            <Input type="number" text="Orçamento do projeto" name="orçamento" placeholder="Insira o orçamento total" handleOnChange={handleOnChange} value={projeto.orçamento ? projeto.orçamento : ''}/>
            <div>
                <Select name="id_categoria" text="Selecione a categoria" options={categorias} handleOnChange={handleSelect} value={projeto.categoria ? projeto.categoria.id : ''}/>
            </div>
            <div>
                <BtSubmit text={btTexto}/>
            </div>
        </form>
    )
}

export default FormProjeto