import styles from '../../styles/Cart.module.css';
import { GetServerSideProps } from 'next';
import { useApi } from '../../libs/useApi';
import { useAppContext } from '../../contexts/app';
import { useEffect, useState } from 'react';
import { Tenant } from '../../types/Tenant';
import { getCookie, setCookie } from 'cookies-next';
import { User } from '../../types/User';
import { useAuthContext } from '../../contexts/auth';
import Head from 'next/head';
import { Header } from '../../components/Header';
import { InputField } from '../../components/InputField';
import { Button } from '../../components/Button';
import { useFormatter } from '../../libs/useFormatter';
import { CartItem } from '../../types/CartItem';
import { useRouter } from 'next/router';
import { CartProductItem } from '../../components/CartProductItem';
import { CartCookie } from '../../types/CartCookies';
import { Footer } from '@/components/Footer';


const Cart = (data: Props) => {
  const {setToken, setUser} = useAuthContext();
  const { tenant, setTenant } = useAppContext();

  useEffect(() => {
    setTenant(data.tenant);
    setToken(data.token);
    if (data.user) setUser(data.user);
  }, []);

  const formatter = useFormatter();
  const router = useRouter();

  // Product Control
  const [cart, setCart] = useState<CartItem[]>(data.cart);
  const handleCartChange = (newCount: number, id: number) => {
    const tmpCart: CartItem[] = [...cart];
    const cartIndex = tmpCart.findIndex(item => item.product.id = id);
    if (newCount > 0) {
      tmpCart[cartIndex].qt = newCount;
    } else {
        delete tmpCart[cartIndex];      
    }
    let newCart: CartItem[] = tmpCart.filter(item => item);
    setCart(newCart);

    // update cookie
    let cartCookie: CartCookie[] =[];
    for (let i in newCart) {
      cartCookie.push({
        id: newCart[i].product.id,
        qt: newCart[i].qt
      });
    }
    setCookie('cart', JSON.stringify(cartCookie));
  }

  //Shipping
  const [shippingInput, setShippingInput] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [shippingPrice, setShippingPrice] = useState(0);
  const [shippingTime, setShippingTime] = useState(0);
  const handleShippingCalc = () => {
    setShippingAddress('Rua das Valinor, 100');
    setShippingPrice(3);
    setShippingTime(20);
  }

  // Resume
  const [subtotal, setSubtotal] = useState(0);
  useEffect(() => {
    let sub = 0;
    for (let i in cart) {
      sub += cart[i].product.price * cart[i].qt;
    }
    setSubtotal(sub);
  }, [cart]);

  const handleFinish = () => {
    router.push(`/${data.tenant.slug}/checkout`);
  }

  return (
    <div className= {styles.container}>
      <Head>
        <title>Carro de compras | {data.tenant.name}</title>
      </Head>

      <Header
        backHref={`/${data.tenant.slug}`}
        color={data.tenant.mainColor}
        title="Carro de compras"
      />
      <div className={styles.productsQuantity}>{cart.length} {cart.length === 1 ? 'item' : 'itens'}</div>
      <div className={styles.productsList}>
        {cart.map((cartItem, index) =>(
          <CartProductItem
            key={index}
            color={data.tenant.mainColor}
            quantity={cartItem.qt}
            product={cartItem.product}
            onChange={handleCartChange}
          />
        ))}
      </div>
      <div className={styles.shippingArea}>
        <div className={styles.shippingTitle}>Calcular Frete e Prazo</div>
        <div className={styles.shippingForm}>
          <InputField
            color={data.tenant.mainColor}
            placeholder='Digite seu frete'
            value={shippingInput}
            onChange={newValue => setShippingInput(newValue)}
          />
          <Button
            color={data.tenant.mainColor}
            label="OK"
            onClick={handleShippingCalc}
          />
        </div>
        {shippingTime > 0 &&
          <div className={styles.shippingInfo}>
            <div className={styles.shippingAddress}>{shippingAddress}</div>
            <div className={styles.shippingTime}>
              <div className={styles.shippingTimeText}>Receba em até {shippingTime} dias</div>
              <div
                className={styles.shippingPrice}
                style={{color: data.tenant.mainColor}}
              >{formatter.formatPrice(shippingPrice)}</div>
            </div>
          </div>
        }
      </div>
      <div className={styles.resumeArea}>
        <div className={styles.resumeItem}>
          <div className={styles.resumeLeft}>Subtotal</div>
          <div className={styles.resumeRight}>{formatter.formatPrice(subtotal)}</div>
        </div>
        <div className={styles.resumeItem}>
          <div className={styles.resumeLeft}>Frete</div>
          <div className={styles.resumeRight}>{shippingPrice > 0 ? formatter.formatPrice(shippingPrice): '--'}</div>
        </div>
        <div className={styles.resumeLine}></div>
        <div className={styles.resumeItem}>
          <div className={styles.resumeLeft}>Total</div>
          <div 
            className={styles.resumeRightBig}
            style={{color: data.tenant.mainColor}}
          >{shippingPrice > 0 ? formatter.formatPrice(shippingPrice + subtotal): '--'}</div>
        </div>
        < div className={styles.resumeButton}>
          <Button
            color={data.tenant.mainColor}
            label="Continuar"
            onClick={handleFinish}
            fill
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Cart;

type Props = {
  tenant: Tenant;
  token: string;
  user: User | null;
  cart: CartItem[]
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {tenant: tenantSlug} = context.query;
  const api = useApi(tenantSlug as string);

  // Get Tenant
  const tenant = await api.getTenant();
  if (!tenant) {
    return {redirect: { destination: '/',permanent: false}}
  }

  // Get Logged User
//  const token = context.req.cookies.token;
const token = getCookie('token', context);
const user = await api.authorizeToken(token as string);

  //Get Cart Products
  const cartCookie = getCookie('cart', context);
  const cart = await api.getCartProducts(cartCookie as string);
  return {
    props: {
      tenant,
      user,
      token,
      cart
    }
  }
}