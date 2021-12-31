import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import ShoppingCart from './pages/ShoppingCart';
import PageProductDetails from './pages/PageProductDetails';

function App() {
  return (
  <Routes>
    <Route path="/details/:id" element={<PageProductDetails/>}/>
    <Route path="/compras" element={<ShoppingCart/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route exact path="/" element={<Home/>}/>
  </Routes>
  );
}

export default App;
