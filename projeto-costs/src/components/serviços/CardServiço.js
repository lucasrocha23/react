import {BsPencil, BsFillTrashFill} from 'react-icons/bs'

import styles from '../projeto/CardProjeto.module.css'

function CardServiço({ id, nome, custo, descriçao, handleRemove, handleEdit}){
    function remover (e){
        e.preventDefault()
        handleRemove(id,custo)
    }    

    function editar(e){
        e.preventDefault()
        handleEdit(id)
    }
    
    return(
        <div className={styles.card_projeto}>
            <h4>{nome}</h4>
            <p>
                <span>Custo total:</span> {custo}
            </p>
            <p>{descriçao}</p>
            <div className={styles.card_projeto_açoes}>
                <button onClick={remover}>
                    <BsFillTrashFill/>
                    Excluir
                </button>
                <button onClick={editar}>
                    <BsPencil/>
                    Editar
                </button>
            </div>
        </div>
    )
}

export default CardServiço