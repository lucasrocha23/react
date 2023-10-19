import { Link } from 'react-router-dom'
import styles from './BotaoLink.module.css'

function BotaoLink ({ to, text }){
    return(
        <Link className={styles.bt} to={to}>
            {text}
        </Link>
    )
}

export default BotaoLink