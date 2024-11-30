import styles from '../../../styles/Product-id.module.css';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useApi } from '../../../libs/useApi';
import { useAppContext } from '../../../contexts/app';
import { useEffect, useState } from 'react';
import { Tenant } from '../../../types/Tenant';
import { Product } from '../../../types/Product';
import { Header } from '../../../components/Header';
import { Button } from '../../../components/Button';
import { useFormatter } from '../../../libs/useFormatter';
import { Quantity } from '../../../components/Quantity';
import { CartCookie } from '../../../types/CartCookies';
import { getCookie, hasCookie, setCookie } from 'cookies-next';
import { Router, useRouter } from 'next/router';
import { Footer } from '@/components/Footer';

const Products = (data: Props) => {
  const { tenant, setTenant } = useAppContext();

  useEffect(() => {
    setTenant(data.tenant);
  }, []);

    const router = useRouter();
    const [qtCount, setQtCount] = useState(0);
    const formatter = useFormatter();
    const handleAddToCart = () => {
      let cart: CartCookie[] =[];

      //Create or Get Existing Cart
      if (hasCookie('cart')){
        const cartCookie = getCookie('cart');
        const cartJson: CartCookie[] = JSON.parse(cartCookie as string);
        for (let i in cartJson) {
          if (cartJson[i].qt && cartJson[i].id) {
            cart.push(cartJson[i]);
          }
        }
      }
      //Search Product in Cart
      const cartIndex = cart.findIndex(item => item.id === data.product.id);
      if (cartIndex > -1) {
        cart[cartIndex].qt += qtCount;
      } else {
          cart.push({id: data.product.id, qt: qtCount});
      }

      //Setting cookie
      setCookie('cart', JSON.stringify(cart));

      //Going to cart
      router.push(`/${data.tenant.slug}/cart`);
    }

    const handleUpdateQt = (newCount: number) => {
      setQtCount(newCount);
    }

  return (
    <div className= {styles.container}>  
        <Head>
            <title>{data.product.name} | {data.tenant.name}</title>
        </Head>

            <div className={styles.headerArea}>
                <Header
                    color={data.tenant.mainColor}
                    backHref={`/${data.tenant.slug}`}
                    title="Produto"
                    invert
                />
            </div>
            <div className={styles.headerBg} style={{backgroundColor: data.tenant.mainColor}}></div>
            <div className={styles.productImage}>
                <img src={data.product.image} alt=""/>
            </div>

            <div className={styles.category}>{data.product.categoryName}</div>
            <div className={styles.title} style={{borderBottomColor: data.tenant.mainColor}}>{data.product.name}</div>
            <div className={styles.line}></div>
            <div className={styles.description}>{data.product.description}</div>
            <div className={styles.qtText}>Quantidade</div>
            <div className={styles.area}>
                <div className={styles.areaLeft}>
                  <Quantity
                    color={data.tenant.mainColor}
                    count={qtCount}
                    onUpdateCount={handleUpdateQt}
                    min={1}
                    small                 
                  />
                </div>
                <div 
                    className={styles.areaRight}
                    style={{color:data.tenant.mainColor}}
                >{formatter.formatPrice(data.product.price)}</div>
            </div>
            <div className={styles.buttonArea}>
                <Button
                    color={data.tenant.mainColor}
                    label="Adicionar ao carro de compras"
                    onClick={handleAddToCart}
                    fill
                />
            </div>
            <Footer />
    </div>
  );
}

export default Products;

type Props = {
  tenant: Tenant
  product: Product
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {tenant: tenantSlug, id} = context.query;
  const api = useApi(tenantSlug as string);

  // Get Tenant
  const tenant = await api.getTenant();
  if (!tenant) {
    return {redirect: { destination: '/',permanent: false}}
  }

  // Get Products
  const product = await api.getProducts(parseInt(id as string));

  return {
    props: {
      tenant,
      product
    }
  }
}