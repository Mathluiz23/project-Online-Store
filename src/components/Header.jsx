import React, { useState} from "react";
import { connect } from "react-redux";
import '../style/header.css'
import { BiSearchAlt } from 'react-icons/bi';
import { getFilterCategory } from "../redux/actions";
import { getCategories } from "../services/api";

function Header({categories, getCategory }){
    const [category, setCategory] = useState('')
    const [ categoryApi, setCategoryApi] = useState('')

    async function handleClick(e) {
        console.log(e);
        setCategory(e)
        const result = await getCategory(category)
        setCategoryApi(result);
        console.log("oi")
    }

    console.log(category);
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
          onClick={handleClick}
          >
          <BiSearchAlt  size={30}/>
          </button>
        </form>
        <select onChange={(e) => handleClick(e)} value={category}>
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
