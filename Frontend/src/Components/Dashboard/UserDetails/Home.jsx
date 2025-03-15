import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAccountDetails } from "../../../Features/Account/AccountSlice";
import TransactionForm from "./TransactionForm";

const Home = ({ activeSection }) => {
  const dispatch = useDispatch();
  
  const { user: reduxUser, loading, error } = useSelector((state) => state.auth);
  const { account } = useSelector((state) => state.account);
  
  const [user, setUser] = useState(reduxUser || null);

  useEffect(() => {
    if (!reduxUser) {
      const storedData = JSON.parse(localStorage.getItem("user"));
      if (storedData?.user) {
        setUser(storedData.user);
      }
    }
    dispatch(getAccountDetails());
  }, [reduxUser, dispatch]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!user) return <p className="text-center">No user data available.</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {activeSection === "Transactions" ? (
        <TransactionForm />
      ) : (
        <>
          <h2 className="text-xl font-bold mb-2">User Details</h2>
          <p><strong className="pr-3">Name:</strong> {user?.user.name || "N/A"}</p>
          <p><strong className="pr-3">Email:</strong> {user?.user.email || "N/A"}</p>
          <p><strong className="pr-4">Role:</strong> {user?.user.role || "N/A"}</p>
          <p><strong className="pr-4">Balance:</strong> ₹{account?.balance ?? "Loading..."}</p>
        </>
      )}
    </div>
  );
};

export default Home;
