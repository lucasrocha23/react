import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth"

import './estilos.css'
import CardProduto from "../../components/cardProduto";
import Paginacao from "../../components/paginacao";
import { usePesquisa } from "../../hooks/usePesquisa";
import { useNavigate } from "react-router-dom";
import { LiaSearchSolid } from "react-icons/lia";
import Modal from "../../components/modal";


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
    const {username, setEmail,setToken,setUsername} = useAuth()
    const {pesquisa,setPesquisa} = usePesquisa()

    const [produtos, setProdutos] = useState<Produto[]>([])
    const [categorias, setCategorias] = useState<string[]>([])
    const [categoria, setCategoria] = useState('')
    const [ordenacao, setOrdenacao] = useState('')
    const [pagina,setPagina] = useState(1)
    const [ultimaPag, setUlimaPag] = useState(0)
    const [url,setUrl] = useState('')

    const [modalSairVisivel, setModalSairVisivel] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {        
        if(pesquisa){         
            realizarPesquisa()
        }else{
            getProdutos('','','',1)
        }    
        getCategorias()
     
    },[])

    function alterarPag(pag: number){
        setPagina(pag)        
        getProdutos(url,categoria,ordenacao,pag)
    }

    async function getCategorias() {
        fetch('https://dummyjson.com/products/category-list')
        .then(res => res.json())
        .then(dados => {
            setCategorias(dados)
        });
    }

    async function getProdutos(url_: string,categoria: string, ordenacao: string, pag_: number) {
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
        if (url_){
            urlFinal = `${url_}&${filtroOrdenacao}&limit=${ITENS_P_PAGINA}&skip=${(pag_ -1)*ITENS_P_PAGINA}`
        }else {
            urlFinal = `${urlBase}${filtroCategoria}?${filtroOrdenacao}&limit=${ITENS_P_PAGINA}&skip=${(pag_-1)*ITENS_P_PAGINA}` 
        }
        
        fetch(urlFinal)
        .then(res => res.json())
        .then(dados => {
            setUlimaPag(Math.ceil(dados.total/ITENS_P_PAGINA))
            setProdutos(dados.products)
        }); 
    }

    function realizarPesquisa(){
        const url_ = `https://dummyjson.com/products/search?q=${pesquisa}`
        // console.log('entrou no realizar pesquisa');
        
        setUrl(url_)
        setPagina(1)
        getProdutos(url_,'','',1)
        setCategoria('')
        setOrdenacao('')
    }
    
    function submit(e: React.FormEvent<HTMLFormElement>){
        console.log('entrou');
        
        e.preventDefault()
        realizarPesquisa()
    }

    
    function sairDaConta(){
        setPesquisa('')
        setCategoria('')
        setOrdenacao('')
        setEmail('')
        setUsername('')
        setToken('')
        navigate('/')
    }

    return(
        <div className="container-pgInicial">
            <div className="container-cabecalho">
                <h1 onClick={() => {
                    getProdutos('','','',1)
                    setPesquisa('')
                }}>DummyProds</h1>
                <div className="pesquisa">
                    <form action="POST" onSubmit={submit}>
                        <input value={pesquisa} type="text" onChange={(event) => setPesquisa(event.target.value)}/>
                        <button><LiaSearchSolid/></button>
                    </form>
                </div>
                <ul>
                    <li><p>Olá, {username}</p></li>
                    <li><button className="bt-sair" onClick={() => setModalSairVisivel(true)}>SAIR</button></li>
                </ul>
            </div>


            <div className="container-conteudo-pgInicial">
                <div className="cabecalho-conteudo-pgInicial">
                    <h2>Produtos</h2>
                    <div className="filtro-ordenacao">
                        <p>Ordenar por</p>
                        <select value={ordenacao} onChange={(event) => {
                                setOrdenacao(event.target.value)
                                getProdutos(url,categoria,event.target.value,1)
                                setPagina(1)
                            }}>
                            <option value="">Nenhum</option>
                            <option value="asc">Menor preço</option>
                            <option value="desc">Maior preço</option>
                        </select>
                    </div>

                    <div className="filtro-categoria">
                        <p>Categoria</p>
                        <select value={categoria} onChange={(event) => {
                                setCategoria(event.target.value)
                                getProdutos('',event.target.value,ordenacao,1)
                                setPagina(1)
                                setUrl('')
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
                    {produtos.length > 0 ? 
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
                {ultimaPag !== 0 && <Paginacao pagina={pagina}  setPagina={alterarPag} ultimo={ultimaPag}/>}
            </div>

            <Modal visivel={modalSairVisivel}>
                <div className="container-sair">
                    <h1>Confirmar saída</h1>
                    <p>Você deseja realmente sair da conta?</p>
                    <div className="botoes">
                        <button className="bt-sim" onClick={sairDaConta}>
                            Sim
                        </button>
                        <button className="bt-nao"
                        onClick={() => setModalSairVisivel(false)}>
                            Não
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Inicial