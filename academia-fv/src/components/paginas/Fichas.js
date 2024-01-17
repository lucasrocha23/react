import { useState,useEffect } from "react"

import styles from "./Fichas.module.css"

import Pesquisa from "../../components/layout/Pesquisa"
import Container from "../../components/layout/Container"

function Fichas(){
    const [pesquisa,setPesquisa] = useState('')

    return(
        <div className={styles.fichas_container}>
            <Pesquisa pesquisa={pesquisa} setPesquisa={setPesquisa}/>
        </div>
    )
}

export default Fichas