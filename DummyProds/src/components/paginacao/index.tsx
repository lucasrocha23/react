import './estilos.css'
import { FaCaretLeft,FaCaretRight } from "react-icons/fa";

const QNT = 3
const QNT_ESQ = 1

interface PagProps{
    ultimo: number
    pagina: number
    setPagina: (pag: number) => void
}

function Paginacao({ultimo,pagina,setPagina}: PagProps){
    var atual = pagina
    const primeiro = Math.max(atual !== ultimo? atual - QNT_ESQ : atual - (QNT_ESQ * 2) , 1)

    return(
        <div className='container-paginacao'>
            <button 
                onClick={() => {
                    if (atual > 1){
                        atual -= 1
                        setPagina(atual)
                    }  
                }}
            >
                {<FaCaretLeft/>}
            </button>

            {Array.from({length: ultimo < QNT? ultimo : QNT})
                .map((_,index) => (index + primeiro))
                .map((pag) => (
                    pag == atual?
                    <button 
                        key={`_${pag}`} 
                        style={{color: 'red', textDecoration: 'underline'}}
                        onClick={() => {
                            setPagina(pag)
                        }}
                    >
                        {pag}
                    </button>
                    :
                    <button 
                        key={`_${pag}`} 
                        onClick={() => {
                            setPagina(pag)
                        }}
                    >
                        {pag}
                    </button>
                ))
            }

            <button  
                onClick={() => {
                    if(atual + QNT_ESQ <= ultimo){
                        atual += 1
                        setPagina(atual)
                    }
                }}
            >
                {<FaCaretRight/>}
            </button>
        </div>
    )
}

export default Paginacao