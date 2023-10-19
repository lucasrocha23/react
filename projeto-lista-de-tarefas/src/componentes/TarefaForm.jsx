import {useState} from 'react'

import './TarefaForm.module.css'

const TarefaForm = ({ submit }) => {
    const [titulo, setTitulo] = useState("")
    const [categoria, setCategoria] = useState("")

    function lidarSubmit(e){
        e.preventDefault()

        if(!titulo || !categoria) return

        submit(titulo,categoria)
        setTitulo("")
        setCategoria("")
    }

    return (
        <div className='tarefa-form'>
            <h2>Criar Tarefa:</h2>
            <form onSubmit={lidarSubmit}>
                <input type="text" placeholder='Digite o título'  onChange={(e) => setTitulo(e.target.value)} value={titulo}/>
                <select onChange={(a) => setCategoria(a.target.value)} value={categoria}>
                    <option value="">Selecione uma categoria</option>
                    <option value="trabalho">Trabalho</option>
                    <option value="pessoal">Pessoal</option>
                    <option value="estudo">Estudo</option>
                </select>
                <button type='submit'>Criar Tarefa</button>
            </form>
        </div>
    )
}

export default TarefaForm