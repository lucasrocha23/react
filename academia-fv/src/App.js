import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import Home from './components/paginas/Home'
import Adicionar from './components/paginas/Adicionar'; 
import Fichas from './components/paginas/Fichas';
import Pagamentos from './components/paginas/Pagamentos.js' 
import NavBar from './components/layout/NavBar';
import Container from './components/layout/Container';

function App() {
  return (
    <Router>
      <NavBar/>
      <Container>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/Adicionar' element={<Adicionar/>}></Route>
          <Route path='/Fichas' element={<Fichas/>}></Route>
          <Route path='/Pagamentos' element={<Pagamentos/>}></Route>
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
