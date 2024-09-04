import { useEffect, useState } from 'react'
import './estilos.css'
import { useNavigate } from 'react-router-dom'

interface Produto{
    id: string
    title:string
    price: number
    discountPercentage:number
    shippingInformation:string
    availabilityStatus:string
    thumbnail:string
}

interface CardProps{
    produto: Produto
}



function CardProduto({produto}: CardProps){
    const [precoDescontado, setPrecoDescontado] = useState(calculaDesconto())

    const [estilo,setEstilo] = useState<React.CSSProperties>()

    const navigate = useNavigate()

    useEffect(() => {
        if (produto.availabilityStatus === 'Out of Stock'){
            const estilo: React.CSSProperties = {
                color: '#cf5f6c',
                textDecoration: 'line-through',
                opacity: '50%'
            }
            setEstilo(estilo)
        }
    },[])

    function calculaDesconto(){
        const desconto = produto.price * produto.discountPercentage / 100

        return (produto.price - desconto).toFixed(2)
    }

    return(
        <div className="card-produto" onClick={() => {navigate(`/produto/${produto.id}`)}} style={estilo}>
            <div className='img'>
                <img src={produto.thumbnail}/>

            </div>
            <p className='titulo'>{produto.title}</p>
            <div className='preco'>
                <h4>R$</h4>
                <h2>{precoDescontado}</h2>
                <p className='preco-original'>R$ {produto.price}</p>
            </div>
                <p className='envio'>{produto.shippingInformation}</p>
        </div>
    )
}

export default CardProduto