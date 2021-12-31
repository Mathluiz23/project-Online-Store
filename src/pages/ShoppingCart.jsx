import React, {useState,useEffect} from 'react';
import Header from '../components/Header';
import "../style/ShoppingCart.css"

function ShoppingCart() {
  const [shoppingCart, setShoppingCart] = useState([]);
  const [cartVoid, setCartVoid] = useState(true);


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
      <div className="all-product-cart">
        { cartVoid ?<div>Seu Carrinho Está Vazio!</div> : 
        shoppingCart.map(({ body :{title, price,thumbnail}})=>( 
          <div className="card-product-cart">
            <div className="container-product">
                <p>Produto</p>
                <hr />
                <div className="product-img-title">
                    <img src={thumbnail} alt={title} />
                    <h3>{title}</h3>
                </div>
            </div>
            <div className="container-qtd">
                <p>qtd</p>
                <hr />
                <div>- 1 +</div>
            </div>
            <div className="container-price">
                <p>preço</p>
                <hr />
                <div>{`R$ ${price}`}</div>
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
        <button className="button-finalizar-compra">Finalizar Compra</button>
        <button className="button-mais-produtos">Escolher Mais Produtos</button>
      </div>
      </div>
    </div>
  )
}

export default ShoppingCart;