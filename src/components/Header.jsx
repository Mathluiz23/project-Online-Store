import React, { useState,useEffect} from "react";
import { connect } from "react-redux";
import '../style/header.css'
import { BiSearchAlt } from 'react-icons/bi';
import { getFilterCategory, setLoading } from "../redux/actions";

function Header({categories, getCategory,loading }){
    const [category, setCategory] = useState('Mais Categorias');

    function handleChange(e) {
        setCategory(e.target.value);
    }

    useEffect(async () => {
      loading(true)
      const api = await getCategory(category);
      loading(false);
    }, [category])

    
    return(
      <header className="header-container">
        <form>
          <input
          className="header-search"
          type="text"
          placeholder="O que você está procurando?"
          />
          <button
          className="header-button-search"
          type="button"
          >
          <BiSearchAlt  size={30}/>
          </button>
        </form>
        <select onChange={(e) => handleChange(e)} value={category}>
        { categories.map((category) => <option  key={category.id}>{category.name}</option>)}
        </select>
      </header>

    );
}

function mapStateToProps(state) {
    return {
        categories: state.productReducer.categories,
    }
}

function mapDispatchToProps(dispatch){
    return {
        getCategory: (itemCategory) => dispatch(getFilterCategory(itemCategory)),
        loading: (isloading) => dispatch(setLoading(isloading))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
