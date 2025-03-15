import { Routes, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";
import Login from "./Components/Login";
// import Transactions from "./pages/Transactions";
import Register from "./Components/Register";
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} /> 
      <Route path="/register" element={<Register />} />
      {/* <Route path="/transactions" element={<Transactions />} /> */}
    </Routes>
  );
}

export default App;
