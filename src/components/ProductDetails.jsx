import React, { useState, useEffect } from "react";
import "../style/ProducCard.css"
import { useLocation } from 'react-router-dom';
import { connect } from "react-redux";
import { getProductById } from '../services/api';
import { setLoading }  from '../redux/actions';
import Loading from "./Loading";

function ProductDetails({ loading, isLoading }) {
  const { pathname } = useLocation();
  const pageId = pathname.split('/')[2];
  const [produto, setProduto] = useState({title:[], attributes:[]});
 ;
  

  async function fetchProducts(){
    loading(true);
    const product =  await getProductById(pageId);
    console.log(product);
    setProduto(product.body);
    loading(false);
  }

  useEffect(() => {
   fetchProducts();
  }, [])
  
  const {title , attributes } = produto;

  if (isLoading) {
    return <Loading/>;
  }
  return (
    <div>
        <h1>{title.length}</h1>
          {<h2>{title.length < 100 ? produto.title : produto.title.substr(0,100) + "..." }</h2>}
          <img src={ produto.thumbnail } alt={ produto.title } />
        <div>
          <p>{`R$ ${produto.price}`}</p>
          <button>Adicionar</button>
        </div>
        { <div>
            <h4>Especificações Técnicas</h4>
            <ul>
                { attributes.map((attribute) => (
                  <li key={ attribute.id }>{ `${attribute.name}: ${attribute.value_name}` }</li>)) }
            </ul>
        </div>}
        </div>
  );
}




function mapStateToProps(state) {
  return {
    intensCategory: state.productReducer.productsByCategory,
    isLoading: state.productReducer.loading,
  }
}

function mapDispatchToProps(dispatch){
  return {
      loading: (isloading) => dispatch(setLoading(isloading))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductDetails);
