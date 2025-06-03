import { assets } from "../assets/assets"

const Navbar = ({setToken}) => {
  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
      <img className="w-[max(10%,80px)]" src={assets.logo} alt="logo" />
      <h1 className="text-2xl font-bold text-blue-700">Admin Panel</h1>
        <button onClick={() => setToken("")} className="bg-blue-700 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm">Logout</button>
    </div>
  )
}

export default Navbar