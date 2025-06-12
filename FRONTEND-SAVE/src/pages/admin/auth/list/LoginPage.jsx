import { FaUser, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="h-[100vh] w-[100vw] max-w-[100vw] max-h-[100vh] fixed bg-white">
      <div className="bg-white h-full  shadow-2xl w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        <div className="bg-gradient-to-br w-full rounded-tr-9xl rounded-br-full h-[70vh] from-blue-400 to-blue-700 text-white p-10 relative flex flex-col justify-center">
          <div className=" w-3/4 translate-x-30 -translate-y-15">
            <h2 className="text-4xl font-bold mb-4">Welcome to Shoephoria</h2>
            <h4 className="text-xl mb-6 tracking-widest">Your Destination Shoes</h4>
            <p className="text-sm opacity-80 leading-relaxed max-w-sm">
              Connect to access your account and discover our latest collections of men, women and children's shoes.
            </p>
          </div>
          <div className="absolute bottom-10 left-150 w-60 h-60 bg-gradient-to-br from-blue-400 to-blue-700 rounded-full z-10" />
        </div>
        <div className="p-10 w-full flex flex-col justify-center">
          <div className="p-10 w-full md:w-1/2">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">AUTHENTIFICATION</h2>
          <form className="space-y-4 w-3/2">
            <div className="flex items-center bg-gray-100 px-4 py-2 rounded">
              <FaUser className="text-gray-400 mr-3" />
              <input type="text" placeholder="Username" className="bg-transparent text-gray-600 focus:outline-none w-full"/>
            </div>
            <div className="flex items-center bg-gray-100 px-4 py-2 rounded">
              <FaLock className="text-gray-400 mr-3" />
              <input type="password" placeholder="Password" className="bg-transparent text-gray-600 focus:outline-none w-full" />
            </div>
            <button type="submit" className="w-full py-2 rounded text-white font-semibold bg-gradient-to-r from-blue-400 to-blue-700 hover:from-blue-700 cursor-pointer hover:to-blue-400 transition">
              <Link to="/product/List">
                LOGIN
              </Link>
            </button> 
            <div className="flex justify-between text-sm text-gray-500">
              <a href="#" className="hover:underline"> 
                Forgot Username
              </a>
              <a href="#" className="hover:underline">
                Password?
              </a>
            </div>
          </form>
          </div>
          <div className="absolute bottom-0 right-0 rounded-tl-full rounded-bt-0 w-45 h-45 bg-blue-600 opacity-90" />
        </div>
        <div className="absolute bottom-0 translate-y-20 -translate-x-30 left-0 w-130 h-130 bg-blue-600  rounded-full opacity-100 z-10" />
      </div>
    </div>
  );
}
