import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './paginas/home'
import Funcionarios from './paginas/funcionarios' 
import Salas from './paginas/salas' 
import Emprestimos from './paginas/emprestimos' 
import Historico from './paginas/historico'
import NavBar from './components/navBar' 

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path='/' element={<Home/>} ></Route>
          <Route path='/funcionarios' element={<Funcionarios/>} ></Route>
          <Route path='/salas' element={<Salas/>} ></Route>
          <Route path='/emprestimos' element={<Emprestimos/>} ></Route>
          <Route path='/historico' element={<Historico/>} ></Route>
        </Routes>
      </BrowserRouter>  
    </div>
  );
}

export default App;
