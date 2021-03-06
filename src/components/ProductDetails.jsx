import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { connect } from "react-redux";
import { getProductById } from '../services/api';
import { setLoading, setAmountItensCart }  from '../redux/actions';
import Loading from "./Loading";
import Header from "./Header";
// import EvaluationForm from "./EvaluationForm";
import StarRatings from 'react-star-ratings';
import "../style/ProductDetails.css"
import FreteGratis from '../FreteGratis.png';
import { useNavigate } from "react-router-dom";

function ProductDetails({ setAmountIten }) {
  
  const { pathname } = useLocation();
  const pageId = pathname.split('/')[2];
  const [loadingPage, setLoadingPage] = useState(false);
  const [produto, setProduto] = useState({
    title:[], 
    attributes:[], 
    shipping: [], 
    price: 0, 
    seller_address: { state: [] },
    pictures: [],
  });
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  
  async function fetchProducts(){
    setLoadingPage(true);
    const product =  await getProductById(pageId);
    setProduto(product.body);
    setLoadingPage(false);
  }

  useEffect(() => {
   fetchProducts();
   handleStarChange();
  }, []);

  async function handleClick() {
    const product = await getProductById(pageId);
    const exist = localStorage.getItem('cart');
    if (exist) {
      const json = JSON.parse(exist);
      localStorage.setItem('cart',JSON.stringify([...json,product]))
      setAmountIten(json.length + 1);
      console.log(json.length);
      return;
    }
    localStorage.setItem('cart',JSON.stringify([product]));
    setAmountIten(1);
  }
  

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

  if (loadingPage) {
    return <Loading/>;
  }

  return (
    <>    
        { loadingPage ?  '' : <Header/>}
        <div className="title-details">
          {<h2>{title.length < 100 ? produto.title : produto.title.substr(0,100) + "..." }</h2>}
        </div>
        <div className="container-product-card-details">

          <div className="card-product-detail">
              { pictures.slice(0,1).map((product) => (
                <img className="image-card-product-detail" alt="imagem-produto" src={product.secure_url}></img>
              ))}

            {/* <img className="image-card-product-detail" src={ produto.thumbnail } alt={ produto.title } /> */}

            <div className="fotos-produto">
              { pictures.slice(0,4).map((product) => (
                <img alt="imagem-produto" src={product.secure_url}></img>
              ))}
            </div>

            <div className="evaluation-star">
              <h5>Avalia????o: nota {rating}</h5>
            <StarRatings
              rating= {rating}
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
              <h4>Especifica????es T??cnicas</h4>
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
                <button
                  className="button-add-cart-details"
                  onClick={ ()=> navigate('/finalizar-compras')}
                >
                  Comprar agora
                </button>
                <button
                  className="button-buy-details" 
                  onClick={ (e) =>handleClick(e) }
                >Adicionar ao Carrinho
                </button>

              </div>
                <div className="frete-gratis">
                { (shipping.free_shipping === true)
                  ? <img src={ FreteGratis } alt="frete-gratis" />
                  : '' }
                  <p>{`Localiza????o do Produto: ${seller_address.state.id} - ${seller_address.state.name} `}</p>
                </div>
            </div>
           
        </div>
           
        {/* <EvaluationForm /> */}
    </>
  );
}


function mapStateToProps(state) {
  return {
    categories: state.productReducer.categories,
    intensCategory: state.productReducer.productsByCategory,
    isLoading: state.productReducer.loading,
  }
}

function mapDispatchToProps(dispatch){
  return {
    loading: (isloading) => dispatch(setLoading(isloading)),
    setAmountIten: (amount) => dispatch(setAmountItensCart(amount)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductDetails);
