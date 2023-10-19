import estilos from './Pesquisa.module.css'

function Pesquisa({ pesquisa, setPesquisa}){
    return(
        <div className={estilos.pesquisa}>
            <h2>Pesquisar:</h2>
            <input type="text" value={pesquisa} onChange={(e) => setPesquisa(e.target.value)} placeholder='Digite para pesquisar' />
        </div>
    )
}

export default Pesquisa