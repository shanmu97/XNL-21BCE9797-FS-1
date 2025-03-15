import { useEffect, useState } from "react";
import { useSelector ,useDispatch} from "react-redux";
import TransactionForm from "./TransactionForm";
import Home from "./Home"; // Import Home component

const UserDetails = ({ activeSection }) => {
  const { user: reduxUser, loading, error } = useSelector((state) => state.auth);
  const [user, setUser] = useState(reduxUser);

  useEffect(() => {
    if (!reduxUser) {
      const storedUser = JSON.parse(localStorage.getItem("user"))?.user;
      if (storedUser) setUser(storedUser);
    }
  }, [reduxUser]);

  if (loading) return <p className="text-center">Loading user data...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!user) return <p className="text-center">No user data available.</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {activeSection === "Home" ? (
        <Home />
      ) : activeSection === "Transactions" ? (
        <TransactionForm />
      ) : (
        <>
      
        </>
      )}
    </div>
  );
};

export default UserDetails;
