import { useEffect, useState } from 'react'
import './estilos.css'

interface Props{
    mensagem: string
    tipo: string
    duracao: number
    setNotif: React.Dispatch<React.SetStateAction<string>>
}

function Notificacao({mensagem, tipo, duracao, setNotif}:Props){
    const [haMensagem, setHaMensagem ] = useState(mensagem.length > 0? true: false)

    useEffect(() => {
        setHaMensagem(mensagem.length > 0? true: false)

        setTimeout(() =>{
            setHaMensagem(false)
            setNotif('')
        },duracao)
    },[mensagem])

    return(
        <div>
            {haMensagem &&
                <div className='container-notificacao' id='notif' style={tipo === 'sucesso'? { backgroundColor: '#09a876'} : { backgroundColor: 'red'}}>
                    <p>{mensagem}</p>
                </div>
            }
        </div>
    )
}

export default Notificacao