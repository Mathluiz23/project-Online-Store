import React, { useState,useEffect,useCallback} from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import '../style/header.css'
import { BiSearchAlt,BiCart } from 'react-icons/bi';
import {AiOutlineUser} from 'react-icons/ai'
import { getFilterCategory, setLoading } from "../redux/actions";

function Header({categories, getCategory,loading,itensCart }){
    const [category, setCategory] = useState('Mais Categorias');
    const [searchName, setSearchName] = useState('');
    const [logado, setLogado] = useState('Logar');
    const [userName, setUserName] = useState();

    const navigate = useNavigate();

    function handleChange(e) {
        setCategory(e.target.value);
    }

    async function handleClick(){
      navigate('/');
      loading(true)
      await getCategory(searchName);
      loading(false);
    }

    const callback = useCallback(
      async() => {
        loading(true)
        await getCategory(category);
        loading(false);
      },
      [category,loading,getCategory],
    );
  
    function handleLogin() {
      if(logado === 'Sair'){
        localStorage.removeItem('user');
        navigate(0);
        return;
      }
      navigate('/login')
    }
    

    useEffect(() => {
      callback();
    }, [callback]);

    useEffect(()=>{
      const exists = localStorage.getItem('user')
        if(exists) {
          const jsonSurName = JSON.parse(exists);
          setUserName(jsonSurName.surName);
          setLogado('Sair');
        }
    },[]);

    // console.log(itensCart);
    return(
      <header className="header-container">
        <div className='form-container'>
        <form>
          <input
          className="header-search"
          type="text"
          placeholder="   O que você está procurando?"
          value={ searchName }
          onChange={ (e)=> setSearchName(e.target.value)}
          />
          <button
          className="header-button-search"
          type="button"
          onClick={ handleClick }
          >
          <BiSearchAlt  size={30}/>
          </button>
        </form>
        <button className="button-login" onClick={ handleLogin }><AiOutlineUser size={35}/>{logado}</button>
        { userName ? <div className="userName">{userName}</div> : ""}
        <button className="button-login" onClick={ ()=> navigate('/compras')} ><BiCart size={35}/>{itensCart}</button>
        </div>
        <div className='nav-bar'>
        <select class="form-select" onmousedown={ categories.lengh } onChange={(e) => handleChange(e)} value={category}>
        { categories.map((category) => <option className="form-options" key={category.id}>{category.name}</option>)}
        </select>
        </div>
      </header>

    );
}

function mapStateToProps(state) {
    return {
        categories: state.productReducer.categories,
        itensCart: state.productReducer.amountItensCart,
    }
}

function mapDispatchToProps(dispatch){
    return {
        getCategory: (itemCategory) => dispatch(getFilterCategory(itemCategory)),
        loading: (isloading) => dispatch(setLoading(isloading))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);