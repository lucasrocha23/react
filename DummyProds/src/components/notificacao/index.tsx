import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import './estilos.css'

interface NotifProps{
    mensagem: string
    tipo: string
    duracao: number
    setNotif: Dispatch<SetStateAction<string>>
}

function Notificacao({mensagem, tipo, duracao, setNotif}: NotifProps){
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