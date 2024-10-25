import { useNavigate } from "react-router-dom";
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'; 
import { useSelector } from "react-redux";

const Logout = () => {
  const navigate = useNavigate();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/"); 
  };

  return (
    <div className={`flex flex-col h-screen items-center justify-center pb-32 ${ isDarkMode ? "bg-gray-950 text-red-600" : "bg-gray-100 text-red-700"}`}>
       <ArrowRightOnRectangleIcon className="h-16 w-16 mb-4" /> 
      <h1 className="text-4xl font-bold mb-4">Anda telah logout</h1>
      <p className={`mb-8 ${ isDarkMode ? "text-white" : "text-black"}`}>Terima kasih telah menggunakan aplikasi kami.</p>
      <button
        onClick={handleLogout}
        className="bg-blue-800 text-white font-semibold py-2 px-4 rounded hover:bg-gray-300 hover:text-blue-800"
      >
        Masuk
      </button>
    </div>
  );
};

export default Logout;
