import styles from './FilterDoubleInput.module.css'

export default function FilterDoubleInput({type='', id='', placeholder=''}) {
    return(
        <input className={styles.input} type={type} id={id} placeholder={placeholder}/>
    )
}