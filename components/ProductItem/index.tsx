import Link from 'next/link';
import { Product } from '../../types/Product';
import styles from './styles.module.css';
import { useAppContext } from '../../contexts/app';
import { useFormatter } from '../../libs/useFormatter';

type Props = {
    data: Product;
}

export const ProductItem = ({data}: Props) => {
    const { tenant } = useAppContext();

    const formatter = useFormatter();
    return (
        <>
        
        <div className={styles.productsContainer}>
            <Link legacyBehavior href={`/${tenant?.slug}/product/${data.id}`}>
                <a className={styles.container}>
                    <div className={styles.head} style={{backgroundColor: tenant?.secondColor}}></div>
                    <div className={styles.info}>
                        <div className={styles.img}>
                            <img src={data.image} alt=''/>
                        </div>
                        <div className={styles.catName}>{data.categoryName}</div>
                        <div className={styles.name}>{data.name}</div>
                        <div className={styles.price} style={{color: tenant?.mainColor}}>{formatter.formatPrice(data.price)}</div>
                    </div>
                </a>
            </Link>
    
            <Link legacyBehavior href={`/${tenant?.slug}`}>
                <a className={styles.container}>
                    <div className={styles.head} style={{backgroundColor: tenant?.secondColor}}></div>
                    <div className={styles.info}>
                        <div className={styles.img}>
                            <img src='/tmp/rainbow.jpg' alt=''/>
                        </div>
                        <div className={styles.catName}>Festa - Promoção</div>
                        <div className={styles.name}>Revoada Colorida</div>
                        <div className={styles.price} style={{color: tenant?.mainColor}}>ESGOTADO</div>
                    </div>
                </a>
            </Link>

            <Link legacyBehavior href={`/${tenant?.slug}`}>
                <a className={styles.container}>
                    <div className={styles.head} style={{backgroundColor: tenant?.secondColor}}></div>
                    <div className={styles.info}>
                        <div className={styles.img}>
                            <img src='/tmp/ferrero.png' alt=''/>
                        </div>
                        <div className={styles.catName}>Festa - Promoção</div>
                        <div className={styles.name}>Rocher Rock</div>
                        <div className={styles.price} style={{color: tenant?.mainColor}}>ESGOTADO</div>
                    </div>
                </a>
            </Link>

            <Link legacyBehavior href={`/${tenant?.slug}`}>
                <a className={styles.container}>
                    <div className={styles.head} style={{backgroundColor: tenant?.secondColor}}></div>
                    <div className={styles.info}>
                        <div className={styles.img}>
                            <img src='/tmp/strawberry.jpg' alt=''/>
                        </div>
                        <div className={styles.catName}>Festa - Novidades</div>
                        <div className={styles.name}>Choco Loko</div>
                        <div className={styles.price} style={{color: tenant?.mainColor}}>EM BREVE</div>
                    </div>
                </a>
            </Link>
        </div>
        </>
    );
}