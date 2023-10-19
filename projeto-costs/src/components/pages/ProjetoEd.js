import {parse,v4 as uuidv4} from 'uuid'

import styles from './ProjetoEd.module.css'

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Carregamento from '../layout/Carregamento'
import Container from '../layout/Container'
import FormProjeto from '../projeto/FormProjeto'
import Mensagem from '../layout/Mensagem'
import FormServiços from '../serviços/FormServiços'
import CardServiço from '../serviços/CardServiço'

function ProjetoEd(){
    const {id} = useParams()

    const [projeto, setProjeto] = useState([])
    const [serviços, setServiços] = useState([])
    const [condiçao, setCondiçao] = useState(false)
    const [mostraForm, setMostraForm] = useState(false)
    const [mostraFormServiço, setMostraFormServiço] = useState(false)
    const [mensagem, setMensagem] = useState()
    const [tipo, setTipo] = useState()
    const [criarServiçoBool,setCriarServiçoBool] = useState(true)
    const [serviçoSelecionado,setServiçoelecionado] = useState()

    useEffect(() => {
        fetch(`http://localhost:5000/projetos/${id}`, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
            },
        }).then(resp => resp.json())
        .then(data => {
            setProjeto(data)
            setCondiçao(true)
            setServiços(data.servicos)
        })
        .catch((err) => console.log(err))
    }, [id])

    function toggleProjectForm(){
        setMostraForm(!mostraForm)
    }

    function toggleServiceForm(){
        setMostraFormServiço(!mostraFormServiço)
    }

    function toggleCriarServiçoBool(){
        setCriarServiçoBool(!criarServiçoBool)
    }

    function criarServiço(projeto,serviço){
        setMensagem('')
        projeto.servicos.push(serviço)
        const ultimoServiço = projeto.servicos[projeto.servicos.length -1]

        ultimoServiço.id = uuidv4()

        const custoUltimoServço = ultimoServiço.custo
        const novoCusto = parseFloat(projeto.custo) + parseFloat(custoUltimoServço)

        if (novoCusto > parseFloat(projeto.orçamento)){
            setMensagem('Orçamento ultrapassado, verifique o valor do serviço')
            setTipo('falha')
            projeto.servicos.pop()
            return false
        }

        projeto.custo = novoCusto

        fetch(`http://localhost:5000/projetos/${projeto.id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(projeto),
        }).then(resp => resp.json())
        .then(data => {
            setProjeto(data)
            setMostraFormServiço(!mostraFormServiço)
            setMensagem("Serviço adicionado!")
            setTipo('sucesso')
            setServiços(projeto.servicos)
        })
        .catch(err => console.log(err))
    }

    function editar(projeto_atualizado){
        setMensagem('')

        if(projeto_atualizado.orçamento < projeto_atualizado.custo){
            setMensagem("O orçamento não pode ser menor que o custo do projeto!")
            setTipo('falha')
            return false
        }

        fetch(`http://localhost:5000/projetos/${projeto_atualizado.id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(projeto_atualizado),
        }).then(resp => resp.json())
        .then(data => {
            setProjeto(data)
            setMostraForm(!mostraForm)
            setMensagem("Projeto atualizado!")
            setTipo('sucesso')
        })
        .catch(err => console.log(err))
    }

    function removerServiço(id, custo){
        setMensagem('')

        const serviçosAtualizados = projeto.servicos.filter(serviço => serviço.id !== id)
        const projetoAtualizado = projeto //garantir que se a requisição de remoção deu falha o objeto inicial não mude

        projetoAtualizado.servicos = serviçosAtualizados
        projetoAtualizado.custo = parseFloat(projetoAtualizado.custo) - parseFloat(custo)

        fetch(`http://localhost:5000/projetos/${projeto.id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(projetoAtualizado),
        }).then(resp => resp.json())
        .then(data => {
            setProjeto(projetoAtualizado)
            setMensagem("Serviço removido!")
            setTipo('sucesso')
            setServiços(serviçosAtualizados)
        })
        .catch(err => console.log(err))
    }

    function addServiço_cancelarEdic(){
        if (!criarServiçoBool) toggleCriarServiçoBool()
        toggleServiceForm()
    }

    function ediçaoServiço(id){
        const serviço = projeto.servicos.filter(serviço => serviço.id === id)[0]
        setServiçoelecionado(serviço)

        toggleCriarServiçoBool()
        toggleServiceForm()
    }

    function editarServiço(projeto, serviço){
        setMensagem('')

        const custoAtual = projeto.custo
        const serviçoAntigo = projeto.servicos.filter(s => s.id === serviço.id)[0]

        const novoCusto = parseFloat(custoAtual) - parseFloat(serviçoAntigo.custo) + parseFloat(serviço.custo)
        
        if (novoCusto > parseFloat(projeto.orçamento)){
            setMensagem('Orçamento ultrapassado, verifique o valor do serviço')
            setTipo('falha')
            return false
        }

        projeto.custo = novoCusto
        
        for (var i = 0; i < projeto.servicos.length; i++) {
            if (projeto.servicos[i].id === serviço.id){
                projeto.servicos[i] = serviço
            }
        }
        
        fetch(`http://localhost:5000/projetos/${projeto.id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(projeto),
        }).then(resp => resp.json())
        .then(data => {
            setProjeto(projeto)
            setMostraFormServiço(!mostraFormServiço)
            setMensagem("Edição de serviço salva!")
            setTipo('sucesso')
            setServiços(projeto.servicos)
            addServiço_cancelarEdic()
        })
        .catch(err => console.log(err))
    }

    return(
    <>
        {condiçao ? (
            <div className={styles.detalhes_projeto}>
                <Container customClass="column">
                    {mensagem && <Mensagem type={tipo} msg={mensagem}/>}
                    <div className={styles.detalhes_container}>
                        <h1>Projeto: {projeto.nome}</h1>
                        <button className={styles.btn} onClick={toggleProjectForm}>
                            {!mostraForm ? "Editar Projeto" : "Cancelar"}
                        </button>
                        {!mostraForm? (
                            <div className={styles.info_projeto}>
                                <p>
                                    <span>Categoria:</span> {projeto.categoria.nome}
                                </p>
                                <p>
                                    <span>Total do orçamento:</span> R${projeto.orçamento}
                                </p>
                                <p>
                                    <span>Total utilizado:</span> R${projeto.custo}
                                </p>
                            </div>
                        ) : (
                            <div className={styles.info_projeto}>
                                <FormProjeto handleSubmit={editar} btTexto={"Salvar edição"} dadosProjeto={projeto}/>
                            </div>
                        )}
                    </div>
                    <div className={styles.serviço_form_container}>
                        {criarServiçoBool ? (
                            <h2>Adicione um serviço:</h2>
                        ) : (
                            <h2>Edite o serviço:</h2>
                        )}
                        <button className={styles.btn} onClick={addServiço_cancelarEdic}>
                            {!mostraFormServiço ? "Adicionar serviço" : "Cancelar"}
                        </button>
                        <div className={styles.info_projeto}>
                            {mostraFormServiço && criarServiçoBool && (
                                <FormServiços handleSubmit={criarServiço} txtBt={"Adicionar Serviço"} dadosProjeto={projeto}/>
                            )}
                            {mostraFormServiço && !criarServiçoBool && (
                                <FormServiços handleSubmit={editarServiço} txtBt={"Salvar Edição"} dadosProjeto={projeto} dadosServiçoSelecionado={serviçoSelecionado}/>
                            )}
                        </div>
                    </div>
                    <h2>Serviços</h2>
                    <Container customClass="start">
                        {serviços.length > 0 ? (
                            serviços.map(serviço => (
                                <CardServiço id={serviço.id} nome={serviço.nome} custo={serviço.custo} descriçao={serviço.descriçao} key={serviço.id} handleRemove={removerServiço} handleEdit={ediçaoServiço}/>
                            ))
                        ) : (
                            <p>não tem serviços</p>
                        )}
                    </Container>
                </Container>
            </div>
        ) : (
            <Carregamento />
        )}
    </>)
}

export default ProjetoEd