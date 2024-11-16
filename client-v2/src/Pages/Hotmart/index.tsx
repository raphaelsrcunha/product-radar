import Button from '../../components/Button';
import HotmartProductCard from '../../components/HotmartProductCard';
import styles from './Hotmart.module.css';

export default function Hotmart() {

    return (
        <div className={styles.container}>
            <h1 >oi</h1>
            <Button text='botao' width={150}/>
            <Button text='botao' width={180}/>
            <Button text='botao' />
            <HotmartProductCard/>
        </div>
    )
}