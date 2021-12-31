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

  const [produto, setProduto] = useState({
    title:[], 
    attributes:[], 
    shipping: [], 
    price: 0, 
    seller_address: { state: [] },
    pictures: [],
  });
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
   handleStarChange();
  }, [])
  

  function handleStarChange() {
    if(title.length < 30) {
      setRating(3.5)
    } else if (title.length <= 35) {
      setRating(3.8)
    } else if (title.length <= 50){
      setRating(4.2)
    } else {
      setRating(4.8)
    }
  };


  const {title , attributes, shipping, price, seller_address, pictures } = produto;
  console.log(pictures);

  if (isLoading) {
    return <Loading/>;
  }

  return (
    <>    

        <div className="title-details">
          {<h2>{title.length < 100 ? produto.title : produto.title.substr(0,100) + "..." }</h2>}
        </div>
        <div className="container-product-card-details">

          <div className="card-product-detail">
              {pictures.slice(0,1).map((product) => (
                <img className="image-card-product-detail" alt="imagem-produto" src={product.secure_url}></img>
              ))}

            {/* <img className="image-card-product-detail" src={ produto.thumbnail } alt={ produto.title } /> */}

            <div className="fotos-produto">
              {pictures.slice(0,4).map((product) => (
                <img alt="imagem-produto" src={product.secure_url}></img>
              ))}
            </div>

            <div className="evaluation-star">
              <h5>Avaliação: nota {rating}</h5>
            <StarRatings
              rating={rating}
              starRatedColor="rgb(255, 194, 25)"
              starHoverColor="rgb(255, 194, 25)"
              numberOfStars={5}
              name="rating"
              starDimension="2em"
              starSpacing="0.5em" 
            />
            </div>
            
        
          </div>

          { <div className="espec-tec-details">
              <h4>Especificações Técnicas</h4>
              <ul>
                { attributes.slice(0,15).map((attribute) => (
                <li key={ attribute.id }>{ `${attribute.name}: ${attribute.value_name}` }</li>)) }
              </ul>
            </div>
          }
      
            <div className="container-price-buy">
              <div className="price-detail">
                <h2>{`R$ ${price.toFixed(2)}`}</h2>
              </div>
              <div className="buttons">
                <button className="button-add-cart-details">Comprar agora</button>
                <button className="button-buy-details">Adicionar ao Carrinho</button>
              </div>
                <div className="frete-gratis">
                { (shipping.free_shipping === true)
                  ? <img src={ FreteGratis } alt="frete-gratis" />
                  : '' }
                  <p>{`Localização do Produto: ${seller_address.state.id} - ${seller_address.state.name} `}</p>
                </div>
            </div>
        </div>
           
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
