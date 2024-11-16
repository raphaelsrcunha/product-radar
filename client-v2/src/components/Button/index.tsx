import styles from './Button.module.css'

export default function Button( {text='', width=130, onClick=(() => {})} ) {
    return (
        <button 
            className={styles.button} 
            style={{width: width}}
            onClick={onClick}
            >{text}
        </button>
    )
}