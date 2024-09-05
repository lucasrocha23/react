import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

import Notificacao from '../../components/notificacao'

import './estilos.css'

function Login(){
    const [emailInput, setEmailInput] = useState('')
    const [senha, setSenha] = useState('')

    const navigate = useNavigate()
    const {setUsername,setEmail,setToken,token} = useAuth()

    const [notificacao, setNotificacao] = useState('')
    const [duracao, setDuracao] = useState(3000)
    const [tipo, setTipo] = useState('')

    useEffect(()=>{
        if(token){
            navigate('/DummyProds/listaProdutos')
        }
    },[])

    async function logar(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()

        fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username: emailInput,
              password: senha,
            })
          })
          .then(res => res.json())
          .then(dados => {
                if (dados?.message === 'Invalid credentials'){
                    setNotificacao('Usuário ou senha inválido')
                    setTipo('falha')
                    setDuracao(3000)
                }
                else{
                    setEmail(dados.email)
                    setUsername(dados.username)
                    setToken(dados.token)
                    navigate('/DummyProds/listaProdutos')
                }
            })
    }

    return(
        <div className='container-login'>
            <h1>Bem vindo ao DummyProds!</h1>
            <form action="post" className='form-login' onSubmit={logar}>
                <input type="text" placeholder='Nome de usuário' onChange={(event) => setEmailInput(event.target.value)}/>
                <input type="password" placeholder='Senha' onChange={(event) => setSenha(event.target.value)}/>
                <button className='bt-entrar'>ENTRAR</button>
            </form>
            <Notificacao mensagem={notificacao} duracao={duracao} tipo=
            {tipo} setNotif={setNotificacao}/>
        </div>
    )
}

export default Login