
const NewsletterBox = () => {
    const onSubmitHandler = (event) => {
        event.preventDefault;
    }
  return (
    <>
    <div className="text-center">
        <p className="text-2xl font-medium text-gray-800">Subscribe now & get 20% off</p>
        <p className="text-gray-400 mt-3">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, unde?
        </p>
        <form onSubmit={onSubmitHandler} className="w-full sm:w-1/2 flex items-center border border-gray-800 gap-3 mx-auto mt-5 shadow-2xs">
        <input className="w-full sm:flex-1 outline-none pl-2" type="email" placeholder="Enter your Email..."/>
        <button type="submit" className="bg-black text-white text-xs px-10 py-4">SUBSCRIBE</button>
        </form>
    </div>
    </>
  )
}

export default NewsletterBox