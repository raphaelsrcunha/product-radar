import Button from '../../components/Button';
import FilterDoubleInput from '../../components/FilterDoubleInput';
import HotmartProductCard from '../../components/HotmartProductCard';
import styles from './Hotmart.module.css';

export default function Hotmart() {

    return (
        <div className={styles.container}>
            <HotmartProductCard/>
        </div>
    )
}