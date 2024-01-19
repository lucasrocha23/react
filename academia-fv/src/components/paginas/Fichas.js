import { useState,useEffect } from "react"

import styles from "./Fichas.module.css"

import Pesquisa from "../../components/layout/Pesquisa"
import CardFicha from "../../components/fichas/CardFicha"


function Fichas(){
    const [fichas, setFichas] = useState([])
    const [pesquisa,setPesquisa] = useState('')

    useEffect(() => {
        fetch(`http://localhost:5002/fichas`, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
            },
        }).then(resp => resp.json())
        .then(data => setFichas(data))
        .catch((err) => console.log(err))
    }, [])

    return(
        <div className={styles.fichas_container}>
            <Pesquisa pesquisa={pesquisa} setPesquisa={setPesquisa}/>

            <div className={styles.resultados_container}>
                {fichas.length > 0 ? (
                    fichas.filter(ficha =>
                        ficha.nome.toLowerCase().includes(pesquisa.toLowerCase())
                    ).sort((a,b) =>
                        a.nome.localeCompare(b.nome)
                    ).map(ficha => (
                        <div className={styles.resultados_container}>
                            <CardFicha id={ficha.id} key={ficha.id}/>
                        </div>
                ))) : (
                    <p>Sem fichas</p>
                )}
            </div>
        </div>
    )
}

export default Fichas