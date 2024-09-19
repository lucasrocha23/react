import { Link } from 'react-router-dom'
import Logo from "../../assets/logo.png"
import './estilos.css'

function NavBar(){
    return(
        <div className='container-navBar'>
            <Link to={'/'}>
                <img src={Logo} alt="logo" width={'70'}/>
            </Link>

            <ul>
                <li><Link to={'/'}>Home</Link></li>
                <li><Link to={'/salas'}>Salas</Link></li>
                <li><Link to={'/funcionarios'}>Funcionários</Link></li>
                <li><Link to={'/emprestimos'}>Emprestimos</Link></li>
                <li><Link to={'/historico'}>Histórico</Link></li>
            </ul>
        </div>
    )
}

export default NavBar