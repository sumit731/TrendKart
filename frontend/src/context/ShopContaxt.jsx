import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = "₹";
    const delivery_fee = 10;
    const backendUrl = import.meta.env.BACKEND_URL;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    const addToCart = async(itemId, size) => {

        if(!size){
            toast.error("Select product size")
            return
        }
        let cartData = structuredClone(cartItems);

        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1;
            }
            else{
                cartData[itemId][size] = 1;
            }
        }
        else{
            cartData[itemId] = {}
            cartData[itemId][size] = 1; 
        }
        setCartItems(cartData)
        toast.success("Product added")
    }

    const getCartCount = () => {
        let totalCount = 0;
        for(const items in cartItems){
            for(const item in cartItems[items]){
            try{
                if(cartItems[items][item] > 0){
                    totalCount += cartItems[items][item];
                }
            }
            catch(error){
                console.log(error);
            }
        }
    }
        return totalCount;
    }

    const updateQuantity = async(itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;

        setCartItems(cartData);
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for(const items in cartItems){
            let itemInfo = products.find((product) => product._id === items);
            for(const item in cartItems[items]){
                try{
                    if(cartItems[items][item] > 0){
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                }
                catch(error){
                    console.log(error);
                }
            }
        }
        return totalAmount;
    }

    const fetchProductList = async () => {
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

    useEffect(()=>{
        fetchProductList()
    },[]);

    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch, addToCart, cartItems, getCartCount, updateQuantity, getCartAmount, navigate, backendUrl
    }
    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;