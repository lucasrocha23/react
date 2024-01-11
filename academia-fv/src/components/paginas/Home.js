import { Link } from 'react-router-dom'

import styles from './Home.module.css'
import logo from '../../img/logo.png'
import BotaoLink from '../layout/BotaoLink'

function Home(){
    return(
        <div className={styles.home_container}>
            <h1>Bem-vindo!</h1>
            <img src={logo} alt="forca-e-vontade" />
            <p>Comece a gerenciar os clientes!</p>
            <BotaoLink texto={"Adicionar cliente"} para={"/Adicionar"}></BotaoLink>
        </div>
    )
}

export default Home