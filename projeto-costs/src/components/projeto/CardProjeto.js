import styles from './CardProjeto.module.css'

import { Link } from 'react-router-dom'

import {BsPencil, BsFillTrashFill} from 'react-icons/bs'

function CardProjeto({ id, nome, orçamento, categoria, handleRemove }){
    function remover(e){
        e.preventDefault()
        handleRemove(id)
    }
    
    return(
        <div className={styles.card_projeto}>
            <h4>{nome}</h4>
            <p>
                <span>Orçamento:</span> R${orçamento}
            </p>
            <p className={styles.texto_categoria}>
                <span className={`${styles[categoria.toLowerCase()]}`}></span> {categoria}
            </p>
            <div className={styles.card_projeto_açoes}>
                <Link to={`/Projeto/${id}`}>
                    <BsPencil /> Editar
                </Link>
                <button onClick={remover}>
                    <BsFillTrashFill /> Excluir
                </button>
            </div>
        </div>
    )
}

export default CardProjeto