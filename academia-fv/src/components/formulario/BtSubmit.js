import styles from './BtSubmit.module.css'

function BtSubmit({ texto, disabled }){
    return(
        <div>
            <button className={styles.bt} disabled={disabled}>{texto}</button>
        </div>
    )
}

export default BtSubmit