import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import NavbarAdmin from "./components/NavbarAdmin";
import Dashboard from "./components/Dashboard";
import Pembayaran from "./components/Pembayaran"
import Pemesanan from "./components/Pemesanan";
import Akun from "./components/Akun";
import EditUser from "./components/EditUser";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/dashboard" element={<><Dashboard /></>}/>
        <Route path="/pembayaran" element={<><Pembayaran /></>}/>
        <Route path="/pemesanan" element={<><Pemesanan /></>}/>
        <Route path="/akun" element={<><NavbarAdmin /><Akun /></>}/>
        <Route path="edit/:id" element={<EditUser />}></Route>
      </Routes>
    </BrowserRouter>
  );
}



export default App;
