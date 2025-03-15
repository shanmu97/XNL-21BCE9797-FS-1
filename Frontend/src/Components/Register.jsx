import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register} from "../Features/Auth/AuthSlice";
import loginImage from "../../Assessts/login.jpg";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      return "All fields are required.";
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      return "Invalid email format.";
    }
    if (formData.password.length < 6) {
      return "Password must be at least 6 characters.";
    }
    if (formData.password !== formData.confirmPassword) {
      return "Passwords do not match.";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) return;

    dispatch(register(formData)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        navigate("/login");
      }
    });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center "
      style={{ backgroundImage: `url(${loginImage})` }}
    >
      <div className="bg-white p-8 rounded-xl shadow-lg w-115 ml-14">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">Sign Up</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-gray-600 font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="text-gray-600 font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="example@email.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="text-gray-600 font-medium">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter a strong password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="text-gray-600 font-medium">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 transition duration-300"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-sm mt-4 text-center text-gray-600">
          Already have an account? <Link to="/login" className="text-blue-600 font-medium">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
