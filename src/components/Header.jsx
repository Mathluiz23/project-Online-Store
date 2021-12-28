import React, { useState,useEffect,useCallback} from "react";
import { connect } from "react-redux";
import '../style/header.css'
import { BiSearchAlt } from 'react-icons/bi';
import { getFilterCategory, setLoading } from "../redux/actions";

function Header({categories, getCategory,loading }){
    const [category, setCategory] = useState('Mais Categorias');
    const [searchName, setSearchName] = useState('')

    function handleChange(e) {
        setCategory(e.target.value);
    }

    async function handleClick(){
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

    useEffect(() => {
      callback();
    }, [callback]);

    
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
    }
}

function mapDispatchToProps(dispatch){
    return {
        getCategory: (itemCategory) => dispatch(getFilterCategory(itemCategory)),
        loading: (isloading) => dispatch(setLoading(isloading))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
