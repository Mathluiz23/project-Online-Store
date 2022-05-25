import React, {useState,useEffect} from 'react';
import Header from '../components/Header';
import "../style/ShoppingCart.css"
import { useNavigate } from "react-router-dom";

function ShoppingCart() {
  const [shoppingCart, setShoppingCart] = useState([]);
  const [cartVoid, setCartVoid] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    const exists = localStorage.getItem('cart');
    if (exists) {
      const json = JSON.parse(exists);
      setShoppingCart(json)
      setCartVoid(false)
    }
  }, [])

  return (
    <div>
      <Header/>
      <div className="shopping-cart">
      <div>
        { cartVoid ? <div>Seu Carrinho Está Vazio!</div> : 
        shoppingCart.map(({ body :{title, price,thumbnail}})=>( 
          <div className="card-product-cart">
            <div className="container-product">
              <div className='product-name'>
                <h5>Produto</h5>
              </div>
              <div className='product-qtd'>
                <h5>Quantidade</h5>
              </div>
              <div className='product-price'>
                <h5>Preço</h5>
              </div>
            </div>
            <hr></hr>
            <div className='container-image-qtd-price'>
                <div className='product-image-title'>
                  <img className="product-image" src={thumbnail} alt={title} />
                  <h3>{title}</h3>
                </div>
                <div className='product-qtd-logic'>
                  <button>-</button>
                  <h3>1</h3>
                  <button>+</button>
                </div>
                <div className='product-price-logic'>
                  <h3>{`R$ ${price}`}</h3>
                </div>
            </div>
          </div>
          )) 
        }
      </div>
      <div className="resumo-pedido">
        <p>Resumo do pedido</p>
        <ul>
          <li>
            <div>{`Subtotal(${shoppingCart.length} itens)`}</div>
            <div>{`R$ 10.000`}</div>
          </li>
          <li>
            <div>Total</div>
            <div>R$ 10.000</div>
          </li>
        </ul>
        <button className="button-finalizar-compra" onClick={ ()=> navigate('/finalizar-compras')} >Finalizar Compra</button>
        <button className="button-mais-produtos">Escolher Mais Produtos</button>
      </div>
      </div>
    </div>
  )
}

export default ShoppingCart;