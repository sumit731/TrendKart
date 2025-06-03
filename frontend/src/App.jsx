import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Carts from "./pages/Carts"
import Contact from "./pages/Contact"
import Order from "./pages/Order"
import PlaceOrder from "./pages/PlaceOrder"
import Product from "./pages/Product"
import Collection from "./pages/Collection"
import Login from "./pages/Login"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import SearchBar from "./components/SearchBar"
import { ToastContainer } from 'react-toastify';
import Verify from "./pages/Verify"
import Profile from "./pages/Profile"

const App = () => {
  return (
    <>
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <Navbar />
        <SearchBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Carts />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/order" element={<Order />} />
          <Route path="/placeorder" element={<PlaceOrder />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify" element={<Verify/>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Home />} />
        </Routes >
        <Footer />
        <ToastContainer />
      </div>
    </>
  )
}

export default App