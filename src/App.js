import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import PageProductDetails from './pages/PageProductDetails';

function App() {
  return (
  <Routes>
    <Route path="/login" element={<Login/>}/>
    <Route path="/details/:id" element={<PageProductDetails/>}/>
    <Route exact path="/" element={<Home/>}/>
  </Routes>
  );
}

export default App;
