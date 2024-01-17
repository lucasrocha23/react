import styles from './BtSubmit.module.css'

function BtSubmit({ texto }){
    return(
        <div>
            <button className={styles.bt}>{texto}</button>
        </div>
    )
}

export default BtSubmit