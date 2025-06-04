import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

export const VITE_RAZORPAY_KEY_ID = "ENTER YOUR KEY RAZORPAY ID"
const ShopContextProvider = (props) => {
    const currency = "₹";
    const delivery_fee = 10;
    const backendUrl = "http://localhost:8000";
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    const addToCart = async (itemId, size) => {

        if (!size) {
            toast.error("Select product size")
            return
        }
        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            }
            else {
                cartData[itemId][size] = 1;
            }
        }
        else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData)
        console.log("CartData: ",cartData)
        toast.success("Product added")

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token } });
                console.log("cartItems: ", cartItems);
                console.log("cartData: ", cartData);
            }
            catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                }
                catch (error) {
                    console.log(error);
                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;

        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } });
            }
            catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                }
                catch (error) {
                    console.log(error);
                }
            }
        }
        return totalAmount;
    }

    const getProductList = async () => {

        try {
            const response = await axios.get(backendUrl + '/api/product/listProducts')

            if (response.data.success) {
                console.log(response.data);
                setProducts(response.data.product);
            }
            else {
                toast.error(response.data.message)
            }
        }
        catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    }


    const getUserCart = async (token) => {
        try {
            const response = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token } });

            console.log("getUserCart response: ", response.data);
            
            if (response.data.success) {
                setCartItems(response.data.cartData)
            }
            else{
                toast.error(response.data.message)
            }
        }
        catch (error) { 
            console.log(error);
            toast.error("getUserCart error: ",error.message);
        }
    }

    useEffect(() => {
        getProductList()
    }, []);

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            const localToken = localStorage.getItem('token');
            setToken(localToken);
            getUserCart(localToken);
        }
    }, [token]);

    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch, addToCart, cartItems, getCartCount, updateQuantity, getCartAmount, navigate, backendUrl, token, setToken, setCartItems, VITE_RAZORPAY_KEY_ID
    }
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;