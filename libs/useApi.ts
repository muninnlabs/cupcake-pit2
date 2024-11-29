import { Tenant } from "../types/Tenant";
import { Product } from "../types/Product";
import { User } from "../types/User";
import { CartItem } from "../types/CartItem";
import { Address } from "../types/Address";
import { Order } from "../types/Order";

const TEMPORARYoneProduct: 
Product={
    id:1,
    image:'/tmp/red-velvet.jpg', 
    categoryName: "Festa - Promoção", 
    name: 'Red Dream', 
    price: 13.00,
    description: "Cupcake de Red Velvet com recheio de geléia de morango 100% orgânico",
}

const TEMPORARYorder: Order = {
    id: 123,
    status: 'preparing',
    orderDate: '2024/09/20',
    userid:'123',
    shippingAddress: {
        id: 2,
        street: "Rua das Margaridas",
        number: `200`,
        cep: '99999999',
        city:'São Paulo',
        neighborhood: 'Paraíso',
        state: 'SP'
    },
    shippingPrice: 3.00,
    paymentType: 'card',
    cupom: 'CUPCAKES',
    cupomDiscount: 3,
    products: [
        {product: {...TEMPORARYoneProduct, id:1}, qt:3},
        {product: {...TEMPORARYoneProduct, id:2}, qt:2},
        {product: {...TEMPORARYoneProduct, id:3}, qt:1},

    ],
    subtotal: 36.00,
    total: 36.00
}

export const useApi = (tenantSlug: string) => ({
    getTenant: async () => {
        switch(tenantSlug) {
            case 'home':
                return {
                    slug: 'home',
                    name: 'home',
                    mainColor: '#8B008B',
                    secondColor: '#FFF'
                }
                break;
            default: return false;
        }
    },
    getAllProducts: async () => {
        let products = [];
        for (let q =0; q <1; q++) {
            products.push({
                ...TEMPORARYoneProduct,
                id: q + 1
            });
        }
        return products;
    },

    getProducts: async (id: number) => {
        return {...TEMPORARYoneProduct, id};
    },

    authorizeToken: async(token: string): Promise<User | false> => {
        if(!token) return false;

        return {
            name: "Fulano",
            email: 'fulano@gmail.com'
        }
    },
    getCartProducts: async (cartCookie: string) => {
        let cart: CartItem[] = [];
        if(!cartCookie) return cart;

        const cartJson = JSON.parse(cartCookie);
        for (let i in cartJson) {
            if (cartJson[i].id && cartJson[i].qt) {
                const product ={
                    ...TEMPORARYoneProduct,
                    id: cartJson[i].id
                };
                cart.push({
                    qt: cartJson[i].qt,
                    product
                });
            }
        }
        return cart;
    },
    getUserAddresses: async (email: string) => {
        const addresses: Address[] = [];
        for (let i = 0; i < 4; i++) {
            addresses.push({
                id: i + 1,
                street: 'Rua das Margaridas',
                number: `${i + 1}00`,
                cep:'999999999',
                city: 'São Paulo',
                neighborhood: 'Santana',
                state: 'SP',
            });
        }
        return addresses;
    },

    getUserAddress: async (addressid: number) => {
        let address: Address = {
            id: addressid,
            street: 'Rua das Margaridas',
            number: `${addressid}00`,
            cep:'999999999',
            city: 'São Paulo',
            neighborhood: 'Santana',
            state: 'SP',
        }
        return address;

    },

    addUserAddress: async (address: Address) => {
        return { ...address, id: 9};
        
    },

    editUserAddress: async(newAddressData: Address) => {
        return true;
    },

    deleteUserAddress: async (addressid: number) => {
        return true;
    },

    getShippingPrice: async (address: Address) => {
        return 3.00;
    },
    setOrder: async (
        address: Address,
        paymentType: 'money' | 'card',
        paymentChange: number,
        cupom: string,
        cart: CartItem[]
    ) => {
        return TEMPORARYorder;
    },
    getOrder: async (orderid: number) => {
        return TEMPORARYorder;
    }
});