import { Link } from "react-router-dom"
import logoHotmart from '../../resources/hotmart_logo.svg';
import styles from './MenuPlatforms.module.css';

export default function MenuPlatforms() {
    return (
        <aside className={styles.containerAds}>
            <h2>Plataformas</h2>

            <div className={styles.gridContainer}>
                <Link to="/clickbank"><div className={styles.gridItem}><img src={logoHotmart} alt=""/></div></Link>
                <Link to=""><div className={styles.gridItem}><img src={logoHotmart} alt=""/></div></Link>
                <Link to=""><div className={styles.gridItem}><img src={logoHotmart} alt=""/></div></Link>
                <Link to=""><div className={styles.gridItem}><img src={logoHotmart} alt=""/></div></Link>
                <Link to=""><div className={styles.gridItem}><img src={logoHotmart} alt=""/></div></Link>
                <Link to=""><div className={styles.gridItem}><img src={logoHotmart} alt=""/></div></Link>
                <Link to=""><div className={styles.gridItem}><img src={logoHotmart} alt=""/></div></Link>
                <Link to=""><div className={styles.gridItem}><img src={logoHotmart} alt=""/></div></Link>
                <Link to=""><div className={styles.gridItem}><img src={logoHotmart} alt=""/></div></Link>
                <Link to=""><div className={styles.gridItem}><img src={logoHotmart} alt=""/></div></Link>
            </div>
        </aside>
    )
}
