import styles from './BtSubmit.module.css'

function BtSubmit({ text }){
    return(
        <div>
            <button className={styles.bt}>{text}</button>
        </div>
    )
}

export default BtSubmit