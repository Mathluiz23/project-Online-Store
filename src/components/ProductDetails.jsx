import React, { useState, useEffect } from "react";
import "../style/ProducCard.css"
import { useLocation } from 'react-router-dom';
import { connect } from "react-redux";
import { getProductById } from '../services/api';

function ProductDetails({ intensCategory,loading }) {
  const { pathname } = useLocation();
  const pageId = pathname.split('/')[2];
  const [produto, setProduto] = useState({ });
  

   async function fetchProducts(){
    const product =  await getProductById(pageId);
    setProduto(product.body);
  }

  useEffect(() => {
   fetchProducts();
  }, [])

  return (
   
      <div className="card-details">
        <h1>{produto.title}</h1>
          {/* <h2>{ produto.title.length < 100 ? produto.title : produto.title.substr(0,100) + "..." }</h2> */}
          <img src={ produto.thumbnail } alt={ produto.title } />
        <div>
          <p>{`R$ ${produto.price}`}</p>
          <button>Adicionar</button>
        </div>
        {/* <div>
            <h4>Especificações Técnicas</h4>
            <ul>
                <li
                  key={ attribute.id }
                >
                  { `${attribute.name}: ${attribute.value_name}` }
                </li>
            </ul>
        </div> */}
      

      </div>
  )
}


function mapStateToProps(state) {
  return {
    intensCategory: state.productReducer.productsByCategory,
    loading: state.productReducer.loading,
  }
}

export default connect(mapStateToProps)(ProductDetails);
