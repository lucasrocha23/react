import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

import styles from "./CardFicha.module.css"

function CardFicha({id}){
    const [ficha, setFicha] = useState([])

    useEffect(() => {
        fetch(`http://localhost:5002/fichas/${id}`, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
            },
        }).then(resp => resp.json())
        .then(data => {
            setFicha(data)
        })
        .catch((err) => console.log(err))
    }, [id])

    return (
        <Link className={styles.link} to={`/Ficha/${ficha.id}`}>
            <div className={styles.card_ficha}>
                <h3>{ficha.nome}</h3>
                <p>{ficha.telefone}</p>
            </div>
        </Link>
    )
}

export default CardFicha