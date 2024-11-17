import styles from './HotmartProductCard.module.css'
import iconFavorite from '../../resources/favorite.svg'
import iconStar from '../../resources/star.svg'
import iconBlueprint from '../../resources/blueprint.svg'
import iconFire from '../../resources/fire.svg'
import img from '../../resources/product.jpg'
import Button from '../Button'

export default function HotmartProductCard() {
    return (
        <div className={styles.productCard}>
                
            <div className={styles.productContainer__image}>
                <img className={styles.imgProduct} src={img} alt=''/>
            </div>
            
            <div className={styles.productInfos}>
                <div className={styles.productInfos__header}>
                    <div className={styles.productInfos__header__left}>
                        <h2 className={styles.productName}>Nome do Produto</h2>
                        <p className={styles.productAuthor}>Nome do Produtor</p>
                    </div>
                    <div className={styles.productInfos__header__right}>
                        <img src={iconFavorite} alt=""/>
                    </div>
                </div>
                <div className={styles.productContainerBody}>
                    <div className={styles.productContainerBody__left}>
                        <p className="product-category">Categoria do Produto</p>
                        <div className={styles.productMetrics}>
                            <div className={styles.productMetrics__stars}>                            
                                <img src={iconStar} alt=""/>
                                <p>4.3</p>
                                <p>(412 avaliações)</p>
                            </div>
                            <div className={styles.productMetrics__temperature}>
                                <img src={iconFire} alt=""/>
                                <p>(65)</p>
                            </div>
                            <div className={styles.productMetrics__blueprint}>
                                <img src={iconBlueprint} alt=""/>
                                <p>(65%)</p>
                            </div>
                        </div>
                        <p className="product-maximum-price"><b>Preço máximo do produto:</b> R$ 65,35</p>
                        <p className="product-maximum-comission"><b>Comissão máxima:</b> R$ 56 (85%)</p>
                        
                        <Button text='Links úteis' width={150}/>
                        
                        <div id="popup-${product.id}" className="popup" style={{display: 'none'}}>
                            <div className="popup-content">
                                <span className="popup-content-header">
                                    <span className="close-button">&times;</span>
                                    <h2 className="popup-title">Links</h2>
                                </span>

                                
                                <a href="${product.hotmartProductUrl}" target="_blank"><p className="popup-button-link">Página do Produto</p></a>
                                <a href="${product.googleProductUrl}" target="_blank"><p className="popup-button-link">Rede de Pesquisa - Produto</p></a>
                                <a href="${product.googleProducerUrl}" target="_blank"><p className="popup-button-link">Rede de Pesquisa - Produtor</p></a>
                                <a href="${product.tiktokProducerUrl}" target="_blank"><p className="popup-button-link">Pesquisa TikTok - Produtor</p></a>
                                <a href="${product.youtubeProductUrl}" target="_blank"><p className="popup-button-link">Pesquisa YouTube - Produto</p></a>
                                <a href="${product.youtubeProducerUrl}" target="_blank"><p className="popup-button-link">Pesquisa YouTube - Produtor</p></a>
                            </div>
                        </div>
                    </div>

                    <div className={styles.productContainerBody__right} style={{width: '40%', marginLeft: '0px', marginTop: '0px', height: '100%'}}>
                        <canvas id="${chartId}" width="10" height="5"></canvas>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}