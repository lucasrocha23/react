import { FaCircleUser } from "react-icons/fa6";

import './estilos.css'
import { IoMdStar, IoMdStarHalf, IoMdStarOutline } from "react-icons/io";
import { useState } from "react";

interface avaliacao{
    rating: number
    comment: string
    date: string
    reviewerEmail: string
    reviewerName: string
}

interface Cardprops{
    avaliacao: avaliacao
}

function CardAvaliacao({avaliacao}: Cardprops){
    const [data] = useState(new Date(avaliacao.date))

    return(
        <div className='container-card-avaliacao'>
            <div className="cabecalho">
                <FaCircleUser className="perfil"/>
                <p>{avaliacao.reviewerName}</p>
                <div className="estrelas">
                    {Array.from({length: Math.floor(avaliacao.rating)}).map((_,index) => (
                        <IoMdStar key={`_estrelaCheia_${index}`}/>
                    ))
                    }
                    {avaliacao.rating > Math.floor(avaliacao.rating) && avaliacao.rating < Math.ceil(avaliacao.rating) &&
                        <IoMdStarHalf/>
                    }
                    {Array.from({length: 5 - Math.ceil(avaliacao.rating)}).map((_,index) => (
                        <IoMdStarOutline key={`_estrelaVazia_${index}`}/>
                    ))
                    }
                </div>
            </div>
            <p className="comentario">{avaliacao.comment}</p>
            <p>{data.toLocaleString()}</p>
        </div>
    )
}

export default CardAvaliacao