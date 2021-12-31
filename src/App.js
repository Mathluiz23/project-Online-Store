import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import ProductDetails from './components/ProductDetails';
import ShoppingCart from './pages/ShoppingCart';

function App() {
  return (
  <Routes>
    <Route path="/details/:id" element={<ProductDetails/>}/>
    <Route path="/compras" element={<ShoppingCart/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route exact path="/" element={<Home/>}/>
  </Routes>
  );
}

export default App;
