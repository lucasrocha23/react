import {Navigate, useNavigate} from 'react-router-dom'

import FormProjeto from '../projeto/FormProjeto'

import styles from './NovoProjeto.module.css'

function NovoProjeto(){
    const historico = useNavigate()

    function criandoPost(projeto){
        projeto.custo = 0
        projeto.servicos = []

        fetch("http://localhost:5000/projetos", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(projeto)
        }).then((resp) => resp.json)
        .then((data) => {
            historico('/Projetos',{state: {mensagem: "Projeto criado com sucesso!"}})
        })
        .catch((err) => console.log(err))
    }

    return(
        <div className={styles.novoprojeto_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <FormProjeto handleSubmit={criandoPost} btTexto="Criar projeto"></FormProjeto>
        </div>
    )
}

export default NovoProjeto