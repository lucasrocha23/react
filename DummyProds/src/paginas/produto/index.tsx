import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { FaMinus, FaPlus } from "react-icons/fa";
import { IoMdStar,IoMdStarHalf, IoMdStarOutline  } from "react-icons/io";

import { useAuth } from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import CardAvaliacao from "../../components/cardAvaliacao";
import CardProduto from "../../components/cardProduto";
import './estilos.css'
import Cabecalho from "../../components/cabecalho";

interface Dimensions{
    width:number
    height:number
    depth:number
}

interface Review{
    rating: number
    comment:string
    date:string
    reviewerName:string
    reviewerEmail:string
}
interface Meta{
    createdAt:string 
    updatedAt:string
    barcode:string
    qrCode:string
}

interface Produto{
    id: string
    title:string
    description: string
    category: string
    price: number
    discountPercentage:number
    rating: number
    stock: number
    tags:string[]
    brand: string
    sku:string
    weight:number
    dimensions: Dimensions
    warrantyInformation:string
    shippingInformation:string
    availabilityStatus:string
    reviews: Review[]
    returnPolicy:string
    minimumOrderQuantity: number
    meta: Meta
    images:string[]
    thumbnail:string
}

function Produto(){
    const params = useParams()
    const navigate = useNavigate()

    const [precoDescontado, setPrecoDescontado] = useState(0)

    const [imgPrincipal, setImgPrincipal] = useState('')
    const [qnt, setQnt] = useState(0)
    const [contagemEstrelas,setContagemEstrelas] = useState([0,0,0,0,0])
    const [porcentagens, setPorcentagens] = useState([0,0,0,0,0])

    const [recomendacoes, setRecomendacoes] = useState<Produto[]>()


    const {token} = useAuth()

    useEffect(()=>{
        if(!token){
            navigate('/DummyProds/')
        }
    },[token])

    const {data: produto,isLoading} = useQuery({
        queryKey: ['produtos',params.id],
        queryFn: getProduto
    })

    function calculaDesconto(prod: 
        Produto){
        const desconto = prod.price * prod.discountPercentage / 100

        const precoFinal = Number((prod.price - desconto).toFixed(2))
        return precoFinal
    }

    function calculaAvaliacoes(reviews:Review[]){
            var copiaContagem = [0,0,0,0,0]
            var copiaPorctgm = [0,0,0,0,0]
            reviews.map((aval) =>{
                copiaContagem[Math.floor(aval.rating)-1] += 1
                setContagemEstrelas(copiaContagem)
            })
            copiaContagem.map((qnt,index) => {
                const prctgm = (qnt * 100/reviews.length)
                copiaPorctgm[index] = Math.floor(prctgm)
            })
            setPorcentagens(copiaPorctgm)            
    }

    async function getProduto(): Promise<Produto>{
        const produto = await fetch(`https://dummyjson.com/products/${params.id}`)

        const result = await produto.json()

        calculaAvaliacoes(result.reviews)
        setPrecoDescontado(calculaDesconto(result))
        setImgPrincipal(result.images[0])
        setQnt(result.minimumOrderQuantity)
        getRecomendacoes(result.category)

        return result
    }

    function getRecomendacoes(categoria: string){
        fetch(`https://dummyjson.com/products/category/${categoria}?limit=15&skip=0`)
        .then(res => res.json())
        .then(dados => {
            setRecomendacoes(dados.products)
        });
    }

    if (isLoading){
        return(
            <div className="container-carregamento">
                <div className="carregando"></div>
            </div>
        )
    }

    return(
        
        <div className="container-produto">
            {produto && <div>
            <Cabecalho/>


            <div className="container-conteudo-produto">
                <div className="container-infoGerais">
                    <div className="coluna-fotos">
                        <div className="container-fotos">
                        <div className="imagens">
                            {produto.images &&
                                produto.images.map((img,index) =>(
                                    <div className="miniatura"
                                        onMouseMove={() => {
                                            setImgPrincipal(img)
                                        }}
                                        key={`_miniatura_${index}`}
                                    >
                                        <img src={img} />
                                    </div>
                                ))
                            }
                        </div>
                        <div className="imgPrincipal">
                            <img src={imgPrincipal}/>
                        </div>
                        </div>
                    </div>
                    <div className="coluna-info">
                        <h1>{produto.title}</h1>
                        <div className="avaliacoes">
                            avaliações:<h4>{produto.rating}</h4>/5
                        </div>
                        <div className='preco'>
                            <h4>R$</h4>
                            <h2>{precoDescontado}</h2>
                            <p className='preco-original'>R$ {produto.price}</p>
                            <p className="disc-porcentagem">{produto.discountPercentage}% desc.</p>
                        </div>
                        <div className="info-adicional">
                            <p>Marca: {produto.brand}</p>
                            <p>Categoria: {produto.category}</p>
                            {/* <p>Tags: {produto.tags}</p> */}
                        </div>
                    </div>
                    <div className="coluna-compra">
                        <div className="container-compra">
                        <div className="qrCode">
                            <img src={produto.meta.qrCode} />
                        </div>
                        <p>{produto.returnPolicy}</p>
                        <p>{produto.warrantyInformation}</p>
                        <p>{produto.shippingInformation}</p>
                        <div>

                        {produto.availabilityStatus === 'In Stock' ?
                            <p className="status-disp">{produto.availabilityStatus}</p>
                        :
                            <p className="status-indisp">{produto.availabilityStatus}</p>
                        }    
                        <p>{produto.stock} restantes</p>
                        <div className='quantidade'>
                            <p>Quantidade:</p>
                            <span onClick={() =>{
                                if(produto.minimumOrderQuantity){
                                    if (qnt > produto.minimumOrderQuantity){
                                        setQnt(qnt - 1)
                                    }
                                }
                            }}><FaMinus/></span>
                            <p>{qnt}</p>
                            <span onClick={() =>{
                                if(produto.minimumOrderQuantity){
                                    if (qnt < produto.stock){
                                        setQnt(qnt + 1)
                                    }
                                }
                            }}><FaPlus/></span>
                        </div>
                        </div>
                        <div className="botoes">
                            <button className="bt-comprar">Comprar</button>
                            <button className="bt-addcarrinho">Adicionar ao Carrinho</button>
                        </div>
                        </div>
                    </div>
                </div>

                {produto.reviews.length > 0 &&
                <div className="container-conteudo-avaliacoes">
                    <h1>Avaliações ({produto.reviews.length})</h1>
                    <div className="avaliacoes-linha">
                        <div className="avaliacoes-col1">
                            <h1>{produto.rating}</h1>
                            <div className="estrelas">
                                {Array.from(
                                    {length: Math.floor(produto.rating)}
                                ).map((_,index) => (
                                    <IoMdStar key={`_estrelaCheia_${index}`}/>
                                ))}
                                {produto.rating > Math.floor(produto.rating) && produto.rating < Math.ceil(produto.rating) &&
                                    <IoMdStarHalf/>
                                }
                                {Array.from(
                                    {length: 5 - Math.ceil(produto.rating)}
                                ).map((_,index) => (
                                    <IoMdStarOutline key={`_estrelaVazia_${index}`}/>
                                ))}
                            </div>
                        </div>
                        <div className="avaliacoes-col2">
                            <div className="linha">
                                <div className="estrelas" 
                                style={{width: '80px'}}>
                                    <IoMdStar/><IoMdStar/><IoMdStar/><IoMdStar/><IoMdStar/>
                                </div>
                                <div className="separador">
                                    <div className="porcentagem"
                                    style={{width: `${porcentagens[4]}%`,
                                            height: '4px',
                                            backgroundColor: 'black'
                                        }}
                                    ></div>
                                </div>
                                <p>{contagemEstrelas[4]} {contagemEstrelas[4] == 1? 'avaliação' : 'avaliações'}</p>
                            </div>

                            <div className="linha">
                                <div className="estrelas" 
                                style={{width: '80px'}}>
                                    <IoMdStar/><IoMdStar/><IoMdStar/><IoMdStar/><IoMdStarOutline/>
                                </div>
                                <div className="separador">
                                    <div className="porcentagem"
                                    style={{width: `${porcentagens[3]}%`,
                                            height: '4px',
                                            backgroundColor: 'black'
                                        }}
                                    ></div>
                                </div>
                                <p>{contagemEstrelas[3]} {contagemEstrelas[3] == 1? 'avaliação' : 'avaliações'}</p>
                            </div>

                            <div className="linha">
                                <div className="estrelas" 
                                style={{width: '80px'}}>
                                    <IoMdStar/><IoMdStar/><IoMdStar/><IoMdStarOutline/><IoMdStarOutline/>
                                </div>
                                <div className="separador">
                                    <div className="porcentagem"
                                    style={{width: `${porcentagens[2]}%`,
                                            height: '4px',
                                            backgroundColor: 'black'
                                        }}
                                    ></div>
                                </div>
                                <p>{contagemEstrelas[2]} {contagemEstrelas[2] == 1? 'avaliação' : 'avaliações'}</p>
                            </div>

                            <div className="linha">
                                <div className="estrelas" 
                                style={{width: '80px'}}>
                                    <IoMdStar/><IoMdStar/><IoMdStarOutline/><IoMdStarOutline/><IoMdStarOutline/>
                                </div>
                                <div className="separador">
                                    <div className="porcentagem"
                                    style={{width: `${porcentagens[1]}%`,
                                            height: '4px',
                                            backgroundColor: 'black'
                                        }}
                                    ></div>
                                </div>
                                <p>{contagemEstrelas[1]} {contagemEstrelas[1] == 1? 'avaliação' : 'avaliações'}</p>
                            </div>

                            <div className="linha">
                                <div className="estrelas" 
                                style={{width: '80px'}}>
                                    <IoMdStar/><IoMdStarOutline/><IoMdStarOutline/><IoMdStarOutline/><IoMdStarOutline/>
                                </div>
                                <div className="separador">
                                    <div className="porcentagem"
                                    style={{width: `${porcentagens[0]}%`,
                                            height: '4px',
                                            backgroundColor: 'black'
                                        }}
                                    ></div>
                                </div>
                                <p>{contagemEstrelas[0]} {contagemEstrelas[0] == 1? 'avaliação' : 'avaliações'}</p>
                            </div>
                        </div>
                    </div>

                    <div className="container-cards-avaliacoes">
                        {produto.reviews &&
                            produto.reviews.map((aval,index) => (
                                <CardAvaliacao avaliacao={aval} key={`_aval_${index}`}/>
                            ))
                        }
                    </div>
                </div>
                }

                <div className="container-infoDetalhadas">
                    <h1>Informações Detalhadas</h1>
                    <p className="descricao">{produto.description}</p>
                    <p>Marca: {produto.brand}</p>
                    <p>Dimensões: {produto.dimensions.width}cm x {produto.dimensions.height}cm x {produto.dimensions.depth}cm</p>
                    <p>peso: {produto.weight}kg</p>
                    <p>Polática de devolução: {produto.returnPolicy}</p>
                    <p>Informação de envio: {produto.shippingInformation}</p>
                    <p>Garantia: {produto.warrantyInformation}</p>
                    <p>Categoria: {produto.category}</p>
                    <p>tags: 
                        {produto.tags.map((tag) => (
                            ` ${tag}`
                        ))}
                    </p>
                    <h2>Imagens do produto</h2>
                    <div className="imagens">
                        {produto.images.map((img, index) => (
                            <div className="img" key={`_img_detalhada_${index}`}>
                                <img src={img}/>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="container-recomendacoes">
                    <h1>Você também pode gostar:</h1>
                    <nav className="nav-cards-recomendacoes"  >
                        <ul>
                            {recomendacoes?.map((prod,index) => (
                                prod.id !== produto.id && prod.availabilityStatus === 'In Stock' &&
                                <li>
                                    <CardProduto produto={prod} key={`_recomendacao_${index}`} />
                                </li>  
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
            </div>}
        </div>
    )
}

export default Produto