import { IMaskInput } from "react-imask";

import styles from './Input.module.css'

function Input({tipo, titulo, nomeAtributo, placeholder, handleOnChange, valor, telefone, valorMax, disabled}){
    return(
        <div className={styles.form_control}>
            <label htmlFor={nomeAtributo}>{titulo}:</label>
            {telefone ? (
                <IMaskInput mask={'(00) 0 0000-0000'} name={nomeAtributo} placeholder="(dd) 9 9999-9999" onChange={handleOnChange} value={valor} disabled={disabled}/>
            ) : (
                <input type={tipo} name={nomeAtributo} id={nomeAtributo} placeholder={placeholder} onChange={handleOnChange} value={valor} max={valorMax} disabled={disabled}/>
            )}
        </div>
    )
}

export default Input 