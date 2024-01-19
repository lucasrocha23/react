import { useEffect, useState } from 'react'

import styles from './Pesquisa.module.css'

import {BsSearch} from 'react-icons/bs'

function Pesquisa({ pesquisa, setPesquisa }){
    return(
        <div className={styles.pesquisa}>
            <h2>Pesquisar:</h2>
            <input type="text" placeholder='Digite para pesquisar' value={pesquisa} onChange={(e) => setPesquisa(e.target.value)}/>
        </div>
    )
}

export default Pesquisa