import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import ProductDetails from './components/ProductDetails';

function App() {
  return (
  <Routes>
    <Route path="/login" element={<Login/>}/>
    <Route path="/details/:id" element={<ProductDetails/>}/>
    <Route exact path="/" element={<Home/>}/>
  </Routes>
  );
}

export default App;
