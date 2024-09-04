import {useState} from 'react'
import Notificacao from '../../components/notificacao'
import axios from 'axios'

import './estilos.css'

interface Sala{
    id: string
    cod: string
    nome: string
    funcionario: string
    estado: string
}

interface Funcionario{
    cod: string
    nome: string
    sala:string
    id: string
    estado:string
}

interface Emprestimo{
    id: string
    dataInicio: string
    dataFim: string
    hrInicio:string
    hrFim: string
    idSala:string
    idFunc: string
    concluido: string
}

function Emprestimos(){
    const [codFunc, setCodFunc] = useState('')
    const [codSala, setCodSala] = useState('')

    const [notificacao, setNotif] = useState('')
    const [tipo, setTipo] = useState('')
    const [duracao, setDuracao] = useState(0)

    async function cadastrarEmprestimo(sala: Sala, func: Funcionario) {
        const hoje = new Date()
        const emprestimo = {
            id:String(Date.now()),
            dataInicio: hoje.toLocaleDateString(),
            dataFim: '',
            hrInicio: hoje.toLocaleTimeString(),
            hrFim: '',
            idSala: sala.id,
            idFunc: func.id,
            concluido: '0'
        }
        
        await axios.post('http://localhost:5000/emprestimos-abertos',emprestimo)
        await axios.post('http://localhost:5000/historico',emprestimo)

        const salaEd = {...sala}
        const funcEd = {...func}
        salaEd.funcionario = func.id
        salaEd.estado = '1'
        funcEd.sala = sala.id
        funcEd.estado = '1'

        await axios.put(`http://localhost:5000/salas/${sala.id}`,salaEd)

        await axios.put(`http://localhost:5000/funcionarios/${func.id}`,funcEd)

        setCodFunc('')
        setCodSala('')
        setNotif('Novo emprestimo cadastrado')
        setTipo('sucesso')
        setDuracao(2000)
    }

    async function confirmarDevolucao(sala: Sala, func: Funcionario, emprestimo: Emprestimo) {
        const hoje = new Date()
        const devolucao = {...emprestimo}
        devolucao.dataFim = hoje.toLocaleDateString()
        devolucao.hrFim = hoje.toLocaleTimeString()
        devolucao.concluido = '1'

        await axios.put(`http://localhost:5000/historico/${emprestimo.id}`,devolucao)
        await axios.delete(`http://localhost:5000/emprestimos-abertos/${emprestimo.id}`)

        const salaEd = {...sala}
        const funcEd = {...func}
        salaEd.funcionario = ''
        salaEd.estado = '0'
        funcEd.sala = ''
        funcEd.estado = '0'
        
        await axios.put(`http://localhost:5000/salas/${sala.id}`,salaEd)

        await axios.put(`http://localhost:5000/funcionarios/${func.id}`,funcEd)

        setCodFunc('')
        setCodSala('')
        setNotif('Devolução confirmada')
        setTipo('sucesso')
        setDuracao(2000)
    }

    async function submit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()

        const func = await axios.get(`http://localhost:5000/funcionarios/?cod=${codFunc}`)

        const sala = await axios.get(`http://localhost:5000/salas/?cod=${codSala}`)
        
        if (func.data.length === 0){
            setNotif('Código do funcionário inválido')
            setTipo('falha')
            setDuracao(3000)
        }
        else if(sala.data.length === 0){
            setNotif('Código da sala inválido')
            setTipo('falha')
            setDuracao(3000)
        }
        else{
            const func_ = func.data[0]
            const sala_ = sala.data[0]

            const emprestimo = await axios.get(`http://localhost:5000/emprestimos-abertos/?idSala=${sala_.id}&idFunc=${func_.id}`)

            const empTemFunc = await axios.get(`http://localhost:5000/emprestimos-abertos/?idFunc=${func_.id}`)
            const empTemSala = await axios.get(`http://localhost:5000/emprestimos-abertos/?idSala=${sala_.id}`)

            console.log(sala_.id,empTemSala.data);
            
            if(emprestimo.data.length !== 0){
                confirmarDevolucao(sala_,func_,emprestimo.data[0])
            }else if(empTemSala.data.length !== 0){
                setNotif('Sala em uso')
                setTipo('falha')
                setDuracao(3000)
            }else if(empTemFunc.data.length !== 0){
                setNotif('Funcionário já possui uma chave')
                setTipo('falha')
                setDuracao(3000)
            }else if (emprestimo.data.length === 0){
                cadastrarEmprestimo(sala_,func_)
            }
        }
    }

    return(
        <div className='container-emprestimos'>
            <h2>Emprestimos</h2>

            <form action="POST" onSubmit={submit} className='form-emprestimos'>
                <div className='linha'>
                    <h4>Código do funcionário</h4>
                    <input type="text" value={codFunc} onChange={(event) => setCodFunc(event.target.value)} required/>    
                </div>
                <div className='linha'>
                    <h4>Código da Sala</h4>
                    <input type="text" value={codSala} onChange={(event) => setCodSala(event.target.value)} required/>
                </div>

                <div className='linha'>
                    <button>CONFIRMAR</button>
                </div>

                <Notificacao mensagem={notificacao} tipo={tipo} duracao={duracao} setNotif={setNotif} />
            </form>

        </div>
    )
}

export default Emprestimos