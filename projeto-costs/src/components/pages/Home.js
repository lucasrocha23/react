import styles from './Home.module.css'
import savings from '../../img/savings.svg'
import BotaoLink from '../layout/BotaoLink'

function Home(){
    return(
        <section className={styles.home_container}>
            <h1>Bem-vindo ao <span>Costs</span></h1>
            <p>Comece a gerenciar os seus projetos agora mesmo!</p>
            <BotaoLink to="/NovoProjeto" text="Criar Projeto"></BotaoLink>
            <img src={savings} alt="costs" />
        </section>
    )
}

export default Home