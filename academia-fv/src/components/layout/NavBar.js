import {Link} from 'react-router-dom'

import Container from './Container'

import styles from './NavBar.module.css'
import logo from '../../img/mini_logo.png'

function NavBar(){
    return (
        <nav className={styles.navBar}>
            <Link to="/"><img src={logo} alt="forca-e-vontade" /></Link>
            <ul className={styles.list}>
                <li className={styles.item}><Link to="/">Home</Link></li>
                <li className={styles.item}><Link to="/Adicionar">Adicionar</Link></li>
                <li className={styles.item}><Link to="/Fichas">Fichas</Link></li>
                <li className={styles.item}><Link to="/Pagamentos">Pagamentos</Link></li>
            </ul>
        </nav>
    )
}

export default NavBar