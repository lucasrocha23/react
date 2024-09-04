import { useEffect, useState } from 'react'

import CardHistorico from '../../components/cardHistorico'
import axios from 'axios'

import Paginacao from '../../components/paginacao'
import './estilos.css'

const ITENS_P_PAGINA = 100

function Historico(){
    const [historico, setHistorico] = useState([])
    
    const [estado, setEstado] = useState('')
    const [data, setData] = useState('')
    const [pagina,setPagina] = useState(1)
    const [ultimaPag, setUlimaPag] = useState(1)
 
    useEffect(() =>{
        getHistorico('','',1)
    },[])


    async function getHistorico(estado:string, data:string, pagina:number){
        var str = ''

        if(estado){
            str += `&concluido=${estado}`
        }
        if(data){
            str += `&dataInicio=${data}`
        }

        try {
            const emprestimos = await axios.get(`http://localhost:5000/historico?_sort=id&_order=desc&_page=${pagina}&_limit=${ITENS_P_PAGINA}${str}`)
            
             
            setHistorico(emprestimos.data)
            tratamentoPegarUltimaPag(emprestimos.headers.link)
        } catch (error) {
            
        }
    }

    function aplicarFiltroEstado(estado_:string){
        setEstado(estado_)
        setPagina(1)

        getHistorico(estado_,data,1)
    }

    function aplicarFiltroData(data_:string){
        const dataFormatada = data_? new Date(`${data_}T00:00:00`).toLocaleDateString() : '' 
        setData(dataFormatada)
        setPagina(1)

        getHistorico(estado,dataFormatada,1)
    }

    function mudarPagina(valor:number){
        getHistorico(estado,data,valor)
    }

    function tratamentoPegarUltimaPag(link: string){
        setUlimaPag(Number(link.split(',')[2].split('page=')[1][0]))
    }

    return(
        <div className='container-historico'>
            <div className='cabecalho'>
                <h2>Histórico</h2>
                <div className='filtro'>
                    <p>Estado:</p>
                    <select onChange={(event) => aplicarFiltroEstado(event.target.value)}>
                        <option value={''}>Nenhum</option>
                        <option value={'0'}>Em aberto</option>
                        <option value={'1'}>Concluído</option>
                    </select>
                </div>

                <div className='filtro'>
                    <p>Data:</p>
                    <input type="date" onChange={(event) => aplicarFiltroData(event.target.value)}/>
                </div>
            </div>

            <div className="container-cards-historico">
                {historico?.length > 0?
                    historico.map((emp,index) =>(
                        <CardHistorico historico={emp} key={`_emp_${index}`}/>
                    ))
                :
                    <p>Não há dados</p>
                }
            </div>

            <div className='paginacao'>
            
                <Paginacao ultimo={ultimaPag} pagina={pagina} setPagina={setPagina} mudarPagina={mudarPagina} />

            </div>
        </div>
    )
}

export default Historico