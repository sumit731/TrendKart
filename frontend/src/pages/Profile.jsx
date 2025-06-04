import { useContext, useState } from "react"
import { assets } from "../assets/assets"
import CartTotal from "../components/CartTotal"
import Title from "../components/Title"
import { ShopContext } from "../context/ShopContaxt"
import axios from "axios"
import { toast } from "react-toastify"


const Profile = () => {
    const [method, setMethod] = useState('cod');
    const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products, VITE_RAZORPAY_KEY_ID } = useContext(ShopContext);

    const [fromData, setFromData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        phone: ''
    });

    const onChangeHandler = (e) => {
        const name = e.target.name
        const value = e.target.value

        setFromData(data => ({ ...data, [name]: value }))
    }

    const initPay = (order) => {
        const options = {
            key: VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currence,
            name: 'Order Payment',
            description: 'Order Payment',
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {
                console.log(response);
                try {
                    const { data } = await axios.post(backendUrl + '/api/order/verifyRazorpay', { response, order }, { headers: { token } });
                    if (data.success) {
                        navigate('/order');
                        setCartItems({});
                    }
                }
                catch (error) {
                    console.log(error);
                    toast.error(error.message);
                }
            }
        }
        const rzp = new window.Razorpay(options);
        rzp.open();
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            let orderItems = [];

            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        const itemInfo = structuredClone(products.find(product => product._id === items));
                        if (itemInfo) {
                            itemInfo.size = item;
                            itemInfo.quantity = cartItems[items][item];
                            orderItems.push(itemInfo);
                        }
                    }
                }
            }
            console.log(orderItems);

            let orderData = {
                address: fromData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee
            }

            switch (method) {

                //api calls fro COD
                case 'cod': {
                    const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } });
                    console.log("running placeOrder: ", response.data);
                    if (response.data.success) {
                        toast.success(response.data.message);
                        setCartItems({});
                        navigate('/orders');
                    }
                    break;
                }

                case 'stripe': {
                    const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, { headers: { token } });
                    if (responseStripe.data.success) {
                        const { session_url } = responseStripe.data;
                        window.location.replace(session_url);
                    }
                    else {
                        toast.error(responseStripe.data.message);
                    }
                    break;
                }

                case 'razorpay': {
                    const responseRazor = await axios.post(backendUrl + '/api/order/razorpay', orderData, { headers: { token } })
                    if (responseRazor.data.success) {
                        initPay(responseRazor.data.order)
                    }
                    else {
                        toast.error(responseRazor.data.message);
                    }
                    break;
                }
                default: {
                    break;
                }
            }
        }
        catch (error) {
            console.log(error);
            // res.json({success: false, message: error.message});
        }
    }
    return (
        <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">

            {/* -------------------Left Side------------------- */}
            <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">

                <div className="text-xl sm:text-2xl my-3">
                    <Title text1={'My'} text2={'Profile'} />
                </div>
                <div className="flex justify-center border-gray-700 rounded-full background-gray-700">
                <label htmlFor="ProfileImage">
                    <img className="w-20" src={assets.profile_icon} alt="" />
                    <input type="file" id="image2" hidden />
                </label>
                </div>
                <div className="flex gap-3">
                    <input required onChange={onChangeHandler} name="firstName" value={fromData.firstName} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="First name..." />
                    <input required onChange={onChangeHandler} name="lastName" value={fromData.lastName} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Last name..." />
                </div>
                <input required onChange={onChangeHandler} name="email" value={fromData.email} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="email" placeholder="Email Address..." />
                <input required onChange={onChangeHandler} name="street" value={fromData.street} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Street..." />
                <div className="flex gap-3">
                    <input required onChange={onChangeHandler} name="city" value={fromData.city} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="City..." />
                    <input required onChange={onChangeHandler} name="state" value={fromData.state} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="State..." />
                </div>
                <div className="flex gap-3">
                    <input required onChange={onChangeHandler} name="zipCode" value={fromData.zipCode} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="number" placeholder="ZipCode..." />
                    <input required onChange={onChangeHandler} name="country" value={fromData.country} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Country..." />
                </div>
                <input required onChange={onChangeHandler} name="phone" value={fromData.phone} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="number" placeholder="Phone Number..." />
            </div>

        </form>
    )
}

export default Profile