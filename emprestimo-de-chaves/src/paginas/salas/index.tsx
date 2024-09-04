import {FaSearch, FaPlus} from 'react-icons/fa'
import { useEffect, useState } from 'react'

import Modal from '../../components/modal' 
import CardSala from '../../components/cardSala' 
import axios from 'axios'

import './estilos.css'

interface Sala{
    id: string
    cod: string
    nome: string
    funcionario: string
    estado: string
}

interface SalaResumida{
    cod: string
    nome: string
}

function Salas(){
    const [modalAddVisivel, setModalAddVisivel] = useState(false)
    const [modalEditVisivel, setModalEditVisivel] = useState(false)
    const [modalDelVisivel, setModalDelVisivel] = useState(false)
    
    const [pesquisa, setPesquisa] = useState('')
    const [salas, setSalas] = useState<Sala[]>([])

    const [nome, setNome] = useState('')
    const [id, setId] = useState('')
    const [codSala, setCodSala] = useState('')

    const [estado,setEstado] = useState('')

    useEffect(() =>{
        getSalas('','')
    },[])

    async function getSalas(estado_:string,pesquisa_:string){
        var filtro = ''

        if (estado_){
            filtro += `&estado=${estado_}`
        }
        if (pesquisa_){
            filtro += `&nome_like=${pesquisa_}`
        }

        try {
            const dados = await axios.get(`http://localhost:5000/salas?_sort=nome${filtro}`)

            setSalas(dados.data)
        } catch (error) {
            
        }
    }

    async function postSala(sala: Sala){
        try {
            await axios.post('http://localhost:5000/salas',sala)

            setModalAddVisivel(false)
            getSalas('','')
            limpaEstados()
        } catch (error) {
            
        }
    }

    async function editSala(sala: SalaResumida) {
        try {
            await axios.patch(`http://localhost:5000/salas/${id}`,sala)

            setModalEditVisivel(false)
            getSalas(estado,pesquisa)
            limpaEstados()
        } catch (error) {
            
        }
    }

    async function excluirSala(){
        try {
            await axios.delete(`http://localhost:5000/salas/${id}`)

            setModalDelVisivel(false)
            getSalas(estado,pesquisa)
            limpaEstados()
        } catch (error) {
            
        }
        
    }

    function limpaEstados(){
        setNome('')
        setId('')
        setCodSala('')
    }

    function submit(e: React.FormEvent<HTMLFormElement>){
        const sala = {
                        id:String(Date.now()),
                        cod:codSala,
                        nome,
                        funcionario: "",
                        estado: ""
                    }
        
        postSala(sala)
        e.preventDefault()
    }

    function editar(e: React.FormEvent<HTMLFormElement>){
        const sala = {cod:codSala,nome}
        
        editSala(sala)
        e.preventDefault()
    }

   

    return(
        <div className='container-salas'>
            <div className='container-pesquisa'>
                <input type='text' className='input-pesquisa' value={pesquisa} onChange={(event) => {
                    setPesquisa(event.target.value)
                    getSalas(estado,event.target.value)
                }}
                />
                <div className='pesquisa-icone'><FaSearch/></div>
            </div>

            <div className='container-cards-salas'>
                <div className='cabecalho-container-cards-sala'>
                    <h2>Salas</h2>
                    <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                        <p>Filtrar</p>
                        <select value={estado} onChange={(event) => {
                            setEstado(event.target.value)
                            getSalas(event.target.value, pesquisa)
                        }}>
                            <option value={''}>Nenhum</option>
                            <option value={'0'}>Disponível</option>
                            <option value={'1'}>Em uso</option>
                        </select>
                    </div>
                </div>

                <div className='cards'>
                {salas.length > 0 ?
                    salas.map((sala) => (
                        <CardSala 
                            sala={sala} 
                            setNome={setNome} 
                            setId={setId} 
                            setCodSala={setCodSala} 
                            setModalEditVisivel={setModalEditVisivel} 
                            setModalDelVisivel={setModalDelVisivel}
                            key={`_sala_${sala.id}`}
                        />
                    ))
                    :
                    <p>Sem Salas</p>
                }
                </div>
            </div>

            <button className='bt-adicionar' onClick={() => setModalAddVisivel(true)}><FaPlus/></button>

            <Modal visivel={modalAddVisivel}>
                <div className='container-adicionar-sala'>
                    <h2>Adicionar Sala</h2>
                    <form action="POST" className='form-adicionar-sala' onSubmit={submit}>
                        
                        <input value={nome} type="text" placeholder='Nome da sala' onChange={(event) => setNome(event.target.value)}/>

                        <div className='linha'>
                            <input value={codSala} type="text" placeholder='Código da sala' onChange={(event) => setCodSala(event.target.value)} />
                            <button type='button' onClick={() => setCodSala(String(Date.now()))}><FaPlus/></button>
                        </div>

                        <div className='bts'>
                            <button className='bt-add'>Adicionar</button>
                            <button className='bt-cancelar' type='button' onClick={() => setModalAddVisivel(false)}>Cancelar</button>
                        </div>
                    </form>
                </div>
            </Modal>

            <Modal visivel={modalEditVisivel}>
                <div className='container-editar-sala'>
                    <h2>Editar Sala</h2>
                    <form action="POST" className='form-edit-sala' onSubmit={editar}>
                        
                        <input type="text" placeholder='Nome da sala' value={nome} onChange={(event) => setNome(event.target.value)}/>

                        <div className='linha'>
                            <input value={codSala} type="text" placeholder='Código da sala' onChange={(event) => setCodSala(event.target.value)} />
                            <button type='button' onClick={() => setCodSala(String(Date.now()))}><FaPlus/></button>
                        </div>

                        <div className='bts'>
                            <button className='bt-add'>Salvar</button>
                            <button className='bt-cancelar' type='button' onClick={() => setModalEditVisivel(false)}>Cancelar</button>
                        </div>
                    </form>
                </div>
            </Modal>

            <Modal visivel={modalDelVisivel}>
                <div className='container-excluir-sala'>
                    <h2>Excluir Sala</h2>

                    <p>Deseja realmente excluir essa sala?</p>

                    <div className='bts'>
                        <button className='bt-sim' onClick={excluirSala}>Sim</button>
                        <button className='bt-nao' type='button' onClick={() => setModalDelVisivel(false)}>Não</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Salas