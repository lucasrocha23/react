import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import Home from './components/pages/Home';
import Empresa from './components/pages/Empresa';
import Contato from './components/pages/Contato';
import Projetos from './components/pages/Projetos';
import NovoProjeto from './components/pages/NovoProjeto'
import ProjetoEd from './components/pages/ProjetoEd';

import Container from './components/layout/Container';
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';

function App() {
  return (
    <Router>
      <NavBar/>
      <Container customClass="min_height">
        <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/Empresa' element={<Empresa/>}></Route>
            <Route path='/Projetos' element={<Projetos/>}></Route>
            <Route path='/NovoProjeto' element={<NovoProjeto/>}></Route>
            <Route path='/Contato' element={<Contato/>}></Route>
            <Route path='/Projeto/:id' element={<ProjetoEd/>}></Route>
        </Routes>
      </Container>
      <Footer/>
    </Router> 
  )
}

export default App;
