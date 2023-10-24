import { useState, useEffect } from 'react'

import estilos from './Mensagem.module.css'

function Mensagem({ type, msg }){

    const [visibilidade,setVisibilidade] = useState(false)

    useEffect(() =>{
        if (!msg){
            setVisibilidade(false)
            return
        }
        setVisibilidade(true)

        const timer = setTimeout(() =>{
            setVisibilidade(false)
        }, 3000)

        return () => clearTimeout(timer)
    }, [msg])

    return(
        <>
            {visibilidade && (
                <div className={`${estilos.mensagem} ${estilos[type]}`}>{msg}</div>
            )}
        </>
    )
}

export default Mensagem