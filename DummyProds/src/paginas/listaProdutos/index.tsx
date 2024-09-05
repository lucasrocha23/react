import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth"

import './estilos.css'
import CardProduto from "../../components/cardProduto";
import Paginacao from "../../components/paginacao";
import { useNavigate, useSearchParams } from "react-router-dom";
import Cabecalho from "../../components/cabecalho";
import { useQuery } from "@tanstack/react-query";


interface Produto{
    id: string
    title:string
    price: number
    discountPercentage:number
    shippingInformation:string
    availabilityStatus:string
    thumbnail:string
}

const ITENS_P_PAGINA = 20

function Inicial(){
    const {token} = useAuth()

    const [categorias, setCategorias] = useState<string[]>([])

    const [ultimaPag, setUlimaPag] = useState(0)

    const [searchParams, setSearchParams] = useSearchParams()

    const pesquisa = searchParams.get('pesquisa')? String(searchParams.get('pesquisa')) : '' 
    const categoria = searchParams.get('categoria')? String(searchParams.get('categoria')) : ''
    const ordenacao = searchParams.get('ordenacao')? String(searchParams.get('ordenacao')) : ''
    const pagina = searchParams.get('pagina')? String(searchParams.get('pagina')) : ''

    const navigate = useNavigate()

   
    const {data: produtos ,isLoading} = useQuery <Produto[]>({
        queryKey: ['pegarListaProdutos', pesquisa, ordenacao, categoria,pagina],
        queryFn: async () => {

            var filtroCategoria = ''
            var filtroOrdenacao = ''
            var urlBase = 'https://dummyjson.com/products'

            if (categoria){
                filtroCategoria = `/category/${categoria}`
            }

            if (ordenacao){
                filtroOrdenacao = `sortBy=price&order=${ordenacao}`
            } 

            var urlFinal = ''
            if (pesquisa){
                urlFinal = `https://dummyjson.com/products/search?q=${pesquisa}&${filtroOrdenacao}&limit=${ITENS_P_PAGINA}&skip=${(Number(pagina) -1)*ITENS_P_PAGINA}`
            }else {
                urlFinal = `${urlBase}${filtroCategoria}?${filtroOrdenacao}&limit=${ITENS_P_PAGINA}&skip=${(Number(pagina)-1)*ITENS_P_PAGINA}` 
            }
            
            const resposta = await fetch(urlFinal)
            const dados = await resposta.json()

            setUlimaPag(Math.ceil(dados.total/ITENS_P_PAGINA))

            return dados.products
        }
    })

     useEffect(() => {        
        getCategorias()
    },[])

    useEffect(()=>{
        if(!token){
            navigate('/DummyProds/')
        }
    },[token])

    async function getCategorias() {
        fetch('https://dummyjson.com/products/category-list')
        .then(res => res.json())
        .then(dados => {
            setCategorias(dados)
        });
    }

    function mudarPagina(pag: number){
        setSearchParams(params => {
            params.set('pagina', String(pag))

            return params
        })
    }

    if (isLoading){
        if (isLoading){
            return(
                <div className="container-carregamento">
                    <div className="carregando"></div>
                </div>
            )
        }
    }

    return(
        <div className="container-pgInicial">
            <Cabecalho/>

            <div className="container-conteudo-pgInicial">
                <div className="cabecalho-conteudo-pgInicial">
                    <h2>Produtos</h2>
                    <div className="filtro-ordenacao">
                        <p>Ordenar por</p>
                        <select value={ordenacao} onChange={(event) => {
                                setSearchParams(params => {
                                    params.set('ordenacao', event.target.value)
                        
                                    return params
                                })
                                mudarPagina(1)
                            }}>
                            <option value="">Nenhum</option>
                            <option value="asc">Menor preço</option>
                            <option value="desc">Maior preço</option>
                        </select>
                    </div>

                    <div className="filtro-categoria">
                        <p>Categoria</p>
                        <select value={categoria} onChange={(event) => {
                                setSearchParams(params => {
                                    params.set('categoria', event.target.value)
                                    params.set('pesquisa', '')
                        
                                    return params
                                })
                                mudarPagina(1)
                            }}>
                            <option value="">Nenhum</option>
                            {categorias &&
                                categorias.map((categoria) => (
                                    <option key={`_cat_${categoria}`}>{categoria}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                    {produtos && produtos.length > 0 ? 
                    <div className="container-cards-pgInicial" style={{display:'grid'}}>
                            {produtos.map((prod) =>(
                                <CardProduto produto={prod} key={`_prod_${prod.id}`}/>
                            ))}       
                    </div>
                    :
                    <div className="container-cards-pgInicial" style={{display:'flex', justifyContent:'center'}}>
                        <p style={{marginTop: '100px'}}>Sem produtos</p>
                    </div>
                    }
                {ultimaPag !== 0 && <Paginacao pagina={Number(pagina)}  setPagina={mudarPagina} ultimo={ultimaPag}/>}
            </div>

            
        </div>
    )
}

export default Inicial