import estilos from './Filtro.module.css'

function Filtro({ filtro,setFiltro,setOrdenar }){
    return(
        <div className={estilos.filtro}>
            <h2>Filtrar</h2>
            <div className={estilos.opçoes_filtro}>
                <div>
                    <p>Status:</p>
                    <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
                        <option value={"todas"}>Todas</option>
                        <option value={"completas"}>Completas</option>
                        <option value={"incompletas"}>Incompletas</option>
                    </select>
                </div>
                <div>
                    <p>Ordem alfabética:</p>
                    <button onClick={() => setOrdenar("cresc")}>Asc</button>
                    <button onClick={() => setOrdenar("dec")}>Desc</button>
                </div>
            </div>
        </div>
    )
}

export default Filtro