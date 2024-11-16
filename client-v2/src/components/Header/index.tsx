import styles from './Header.module.css';
import logo from '../../resources/logo.png'

export default function Header() {
    return (
        <header className={styles.header}>
            <span className={styles.headerLeft}>
                <img 
                    className={styles.logo}
                    alt='logo' 
                    src={logo}
                />
                <p className={styles.logoText}>Product <b>Radar</b></p>
            </span>

            <span className={styles.headerRight}>
                <p className={styles.headerRight__firstLetter}>R</p>
            </span>
        </header>
    )
}