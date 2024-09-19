import { Link } from 'react-router-dom'
import Logo from "../../assets/logo.png"
import './estilos.css'


function Home(){
    return(
        <div className='container-conteudo-home'>
            <h1>Bem Vindo ao gerenciador de chaves</h1>
            <p>Gerencie o emprestimo e devolução de chaves de forma mais prática</p>
            <Link className='bt-emprestimos' to={'/emprestimos'}>Realizar emprestimo/devolução</Link>
            <img src={Logo} alt='logo'/>
        </div>
    )
}

export default Home