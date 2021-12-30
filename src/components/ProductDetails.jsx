import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { connect } from "react-redux";
import { getProductById } from '../services/api';
import { setLoading }  from '../redux/actions';
import Loading from "./Loading";
// import EvaluationForm from "./EvaluationForm";
import StarRatings from 'react-star-ratings';
import "../style/ProductDetails.css"
import FreteGratis from '../FreteGratis.png';

function ProductDetails({ loading, isLoading }) {
  const { pathname } = useLocation();
  const pageId = pathname.split('/')[2];

  const [produto, setProduto] = useState({title:[], attributes:[]});
  const [rating, setRating] = useState(0);

  

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
  

  function handleStarChange(rating) {
    setRating(rating)
  };


  const {title , attributes } = produto;

  if (isLoading) {
    return <Loading/>;
  }

  return (
    <>
      <div className="container-product-card-details">

        <div className="image-evaluation-details">
          {<h2>{title.length < 100 ? produto.title : produto.title.substr(0,100) + "..." }</h2>}
          <img src={ produto.thumbnail } alt={ produto.title } />

          <div className="evaluation-star">
            <h5>Avaliações</h5>
          <StarRatings
            rating={rating}
            starRatedColor="rgb(255, 194, 25)"
            starHoverColor="rgb(255, 194, 25)"
            changeRating={ (e) => handleStarChange(e) }
            numberOfStars={5}
            name="rating"
            starDimension="2em"
            starSpacing="0.5em"
            
          />
          </div>
        </div>

         
            <div className="container-buttons-details">
            <h3>{`R$ ${produto.price}`}</h3>
            
              <button className="button-buy-details">Adicionar</button>
              <button className="button-add-cart-details">Comprar agora</button>

            </div>
            <div className="image-frete">
              { (produto.shipping.free_shipping === true)
                ? <img src={ FreteGratis } alt="frete-gratis" />
                : '' }
            </div>
            
          
      </div>
        { <div className="espec-tec-details">
            <h4>Especificações Técnicas</h4>
            <ul>
              { attributes.map((attribute) => (
              <li key={ attribute.id }>{ `${attribute.name}: ${attribute.value_name}` }</li>)) }
            </ul>
          </div>
        }
          
        {/* <EvaluationForm /> */}
    </>
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
