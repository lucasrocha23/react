import { Link } from 'react-router-dom'
import styles from './BotaoLink.module.css'

function BotaoLink ({ para, texto }){
    return(
        <Link className={styles.bt} to={para}>
            {texto}
        </Link>
    )
}

export default BotaoLink