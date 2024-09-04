import './estilos.css'

interface ModalProps {
    children: React.ReactNode
    visivel: boolean
}

function Modal({children, visivel}: ModalProps){
    const estilo =  visivel? {display: 'flex'} : {display: 'none'}

    return (
        <div className='janela-modal' style={estilo}>
            {children}
        </div>
    )
}

export default Modal