import { useState, useEffect } from 'react'

import styles from './Mensagem.module.css'

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
                <div className={`${styles.mensagem} ${styles[type]}`}>{msg}</div>
            )}
        </>
    )
}

export default Mensagem