import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../Features/Auth/AuthSlice";
import loginImage from "../../Assessts/login.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { isLoading, isError, message } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("All fields are required");
      return;
    }

    try {
      const res = await dispatch(login({ email, password })).unwrap();
      console.log("Login Successful:", res);
      dispatch(reset());
      navigate("/dashboard");
    } catch (err) {
      console.error("Login Error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${loginImage})` }}>
      <div className="bg-white p-6 rounded-lg shadow-md w-130 bg-opacity-80">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        {isError && <p className="text-red-500 text-sm text-center">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm mt-4 text-center">
          Don't have an account? <Link to="/register" className="text-blue-600">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
