import React from 'react';
import {Routes, Route} from "react-router-dom";
import NewsletterForm from './components/NewsletterForm';
import Agb from './pages/Agb';
import Cart from './pages/Cart';
import CartProtect from './pages/CartProtect';
import Childs from './pages/Childs';
import Datenschutz from './pages/Datenschutz';
import Home from './pages/Home';
import Impressum from './pages/Impressum';
import Login from './pages/Login';
import Marken from './pages/Marken';
import Men from './pages/Men';
import Order from './pages/Order';
import ShowProduct from './pages/products/ShowProduct';
import Register from './pages/Register';
import Reset from './pages/Reset';
import Sale from './pages/Sale';
import Schuhe from './pages/Schuhe';
import Sneaker from './pages/Sneaker';
import Sport from './pages/Sport';
import Checkout from './pages/stripe/Checkout';
import Success from './pages/stripe/Success';
import UserEdit from './pages/userEdit/UserEdit';
import Women from './pages/Women';
import Wunschliste from './pages/Wunschliste';
import DropdownPage from './pages/DropdownPage';
import SecondaryPages from './pages/SecondaryPages';
const App:React.FC =()=> {
  return (
    <div className="App">
      <Routes>
        <Route  path="/" element={<Home/>}/>
        {/* Navlinks */}
        <Route path="/Schuhe" element={<Schuhe/>}/>
        <Route path="/Sale" element={<Sale/>}/>
        <Route path="/Sport" element={<Sport/>}/>
        <Route path="/Marken" element={<Marken/>}/>
        {/* NavIcons and user registration */}
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/reset/:token" element={<Reset/>}/>
        <Route path="/wunschliste" element={<Wunschliste/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/cartProtect" element={<CartProtect/>}/>
        {/* Dropdown */}
        <Route path="/:c" element={<DropdownPage/>}/>
        <Route path="/:c/:sP" element={<SecondaryPages/>}/>
        {/* ShoppingModul */}
        <Route path="/women" element={<Women/>}/>
        <Route path="/men" element={<Men/>}/>
        <Route path="/childs" element={<Childs/>}/>
        {/* Sneaker */}
        <Route path="/sneaker" element={<Sneaker/>}/>
        {/* Produkt Einzelanzeige */}
        <Route path="/showProduct/:id" element={<ShowProduct/>}/>
        {/* Newsletter */}
        <Route path="/newsletterForm" element={<NewsletterForm/>}/>
        {/* Footer */}
        <Route path="/impressum" element={<Impressum/>}/>
        <Route path="/datenschutz" element={<Datenschutz/>}/>
        <Route path="/agb" element={<Agb/>}/>
        {/* Payment */}
        <Route path="/order" element={<Order/>}/>
        <Route path="/showUser/:id" element={<UserEdit/>}/>
        <Route path="/success" element={<Success/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
      </Routes>
    </div>
  );
}

export default App;
