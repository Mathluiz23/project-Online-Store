import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetails from './components/ProductDetails';

function App() {
  return (
   <Routes>
     <Route path="/" element={<Home/>}/>
     <Route path="/details/:id" element={<ProductDetails/>}/>
   </Routes>
  );
}

export default App;
