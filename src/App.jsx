import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgetPassword from "./components/ForgetPassword";
import Dashboard from "./Dashboard";
import Receipt from "./components/Receipt";
import OrderPayment from "./components/OrderPayment";
import EditProductForm from "./components/EditProductForm";
import AddProductForm from "./components/AddProduct";
import ChangePassword from "./components/ChangePassword";
import AdminProfile from "./components/AdminProfile";
import Refund from "./components/Refund";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/admin-profile" element={<AdminProfile />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/payment" element={<OrderPayment />} />
          <Route path="/receipt" element={<Receipt />} />
          <Route path="/edit-product" element={<EditProductForm />} />
          <Route path="/add-product" element={<AddProductForm />} />
          <Route path="/refund" element={<Refund />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
