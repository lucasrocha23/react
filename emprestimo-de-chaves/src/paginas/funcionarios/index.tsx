import {FaSearch, FaPlus} from 'react-icons/fa'
import React, { useEffect, useState } from 'react'

import Modal from '../../components/modal'
import axios from 'axios'

import './estilos.css'
import CardFuncionario from '../../components/cardFuncionario'

interface Funcionario{
    cod: string
    nome: string
    sala:string
    id: string
    estado:string
}

interface FuncionarioResumido{
    cod: string
    nome: string
}

function Funcionarios(){
    const [modalAddVisivel, setModalAddVisivel] = useState(false)
    const [modalEditVisivel, setModalEditVisivel] = useState(false)
    const [modalDelVisivel, setModalDelVisivel] = useState(false)
    
    const [pesquisa, setPesquisa] = useState('')
    const [funcionarios, setFuncionarios] = useState([])

    const [nome, setNome] = useState('')
    const [id, setId] = useState('')
    const [codFunc, setCodFunc] = useState('')

    const [estado, setEstado] = useState('')

    useEffect(() =>{
        getFuncionarios('','')
    },[])


    async function getFuncionarios(estado_: string,pesquisa_: string){
        var filtro = ''

        if (estado_){
            filtro += `&estado=${estado_}`
        }
        if (pesquisa_){
            filtro += `&nome_like=${pesquisa_}`
        }

        console.log(filtro);
        
        try {
            const dados = await axios.get(`http://localhost:5000/funcionarios?_sort=nome${filtro}`)

            setFuncionarios(dados.data)
        } catch (error) {
            
        }
    }

    async function postFuncionario(funcionario:Funcionario){
        try {
            await axios.post('http://localhost:5000/funcionarios',funcionario)

            setModalAddVisivel(false)
            getFuncionarios('','')
            limpaEstados()
        } catch (error) {
            
        }
    }

    async function editFuncionario(funcionario: FuncionarioResumido) {
        try {
            await axios.patch(`http://localhost:5000/funcionarios/${id}`,funcionario)

            setModalEditVisivel(false)
            getFuncionarios(estado,pesquisa)
            limpaEstados()
        } catch (error) {
            
        }
    }

    async function excluirFuncionario(){
        try {
            await axios.delete(`http://localhost:5000/funcionarios/${id}`)

            setModalDelVisivel(false)
            getFuncionarios(estado,pesquisa)
            limpaEstados()
        } catch (error) {
            
        }
    }

    function limpaEstados(){
        setNome('')
        setId('')
        setCodFunc('')
    }

    function submit(e: React.FormEvent<HTMLFormElement>){
        const func = {
                        id:String(Date.now()),
                        cod:codFunc,
                        nome,
                        sala: "",
                        estado: "0"
                    }
        
        postFuncionario(func)
        e.preventDefault()
    }

    function editar(e: React.FormEvent<HTMLFormElement>){
        const func = {cod:codFunc,nome}
        
        editFuncionario(func)
        e.preventDefault()
    }

    return(
        <div className='container-func'>
            <div className='container-pesquisa'>
                <input type='text' className='input-pesquisa' value={pesquisa} onChange={(event) => {
                    setPesquisa(event.target.value)
                    getFuncionarios(estado,event.target.value)
                }} />
                <div className='pesquisa-icone'><FaSearch/></div>
            </div>

            <div className='container-cards-funcionarios'>
                <div className='cabecalho-container-cards-funcionarios'>
                    <h2>Funcionários</h2>
                    <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                        <p>Estado</p>
                        <select value={estado} onChange={(event) => {
                            setEstado(event.target.value)
                            getFuncionarios(event.target.value,pesquisa)
                        }}>
                            <option value={''}>Nenhum</option>
                            <option value={'1'}>Com chave</option>
                            <option value={'0'}>Sem chave</option>
                        </select>
                    </div>
                </div>

                <div className='cards'>
                {funcionarios.length > 0 ?
                    funcionarios.map((func,index) => (   
                        <CardFuncionario 
                            funcionario={func} 
                            setNome={setNome}
                            setId={setId} 
                            setCodFunc={setCodFunc} 
                            setModalEditVisivel={setModalEditVisivel}
                            setModalDelVisivel={setModalDelVisivel}
                            key={`_func_${index}`}
                        />
                    ))
                    :
                    <p>Sem funcionários</p>
                }
                </div>
            </div>

            <button className='bt-adicionar' onClick={() => setModalAddVisivel(true)}><FaPlus/></button>

            <Modal visivel={modalAddVisivel}>
                <div className='container-adicionar-func'>
                    <h2>Adicionar Funcionário</h2>
                    <form action="POST" className='form-adicionar-func' onSubmit={submit}>
                        
                        <input value={nome} type="text" placeholder='Nome do funcionário' onChange={(event) => setNome(event.target.value)}/>

                        <div className='linha'>
                            <input value={codFunc} type="text" placeholder='Código do funcionário' onChange={(event) => setCodFunc(event.target.value)} />
                            <button type='button' onClick={() => setCodFunc(String(Date.now()))}><FaPlus/></button>
                        </div>

                        <div className='bts'>
                            <button className='bt-add'>Adicionar</button>
                            <button className='bt-cancelar' type='button' onClick={() => {setModalAddVisivel(false); limpaEstados()}}>Cancelar</button>
                        </div>
                    </form>
                </div>
            </Modal>

            <Modal visivel={modalEditVisivel}>
                <div className='container-editar-func'>
                    <h2>Editar Funcionário</h2>
                    <form action="POST" className='form-editar-func' onSubmit={editar}>
                        
                        <input value={nome} type="text" placeholder='Nome do funcionário' onChange={(event) => setNome(event.target.value)}/>

                        <div className='linha'>
                            <input value={codFunc} type="text" placeholder='Código do funcionário' onChange={(event) => setCodFunc(event.target.value)} />
                            <button type='button' onClick={() => setCodFunc(String(Date.now()))}><FaPlus/></button>
                        </div>

                        <div className='bts'>
                            <button className='bt-add'>Salvar</button>
                            <button className='bt-cancelar' type='button' onClick={() => {setModalEditVisivel(false); limpaEstados()}}>Cancelar</button>
                        </div>
                    </form>
                </div>
            </Modal>

            <Modal visivel={modalDelVisivel}>
                <div className='container-excluir-func'>
                    <h2>Excluir Funcionário</h2>

                    <p>Deseja realmente excluir esse funcionário?</p>

                    <div className='bts'>
                        <button className='bt-sim' onClick={excluirFuncionario}>Sim</button>
                        <button className='bt-nao' type='button' onClick={() => setModalDelVisivel(false)}>Não</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Funcionarios