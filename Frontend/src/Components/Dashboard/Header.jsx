import { useDispatch } from "react-redux";
import { logout } from "../../Features/Auth/AuthSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="bg-white p-4 rounded-lg shadow mb-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <button 
        onClick={handleLogout} 
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
