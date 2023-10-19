import carregamento from '../../img/loading.svg'

import styles from './Carregamento.module.css'

function Carregamento(){
    return(
        <div className={styles.container_carregamento}>
            <img className={styles.carregamento} src={carregamento} alt="Carregamento" />
        </div>
    )
}

export default Carregamento