import React, {useState,useEffect} from 'react';
import Header from '../components/Header';
import "../style/BuyProducts.css"

function BuyProducts() {
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
    <>
    <div className='page-buy'>
      <Header/>
      <div className="pay-buy">
      <div>
        { cartVoid ?<div>Seu Carrinho Está Vazio!</div> : 
        shoppingCart.map(({ body :{title, price,thumbnail}})=>( 
          <div className="card-product-cart-buy">
          <div className="container-product-buy">
            <div className='product-name-buy'>
              <p>Produto</p>
            </div>
            <div className='product-qtd-buy'>
              <p>Quantidade</p>
            </div>
            <div className='product-price-buy'>
              <p>Preço</p>
            </div>
          </div>
          <hr/>
          <div className='container-image-qtd-price-buy'>
              <div className='product-image-title-buy'>
                <img className="product-image-buy" src={thumbnail} alt={title} />
                <h3>{title}</h3>
              </div>
              <div className='product-qtd-logic-buy'>
                <h5>1</h5>
              </div>
              <div className='product-price-logic-buy'>
                <h4>{`R$ ${price}`}</h4>
              </div>
          </div>
        </div>
        ))
        }
      </div>
      <div className="resumo-pedido">
        <h3>Resumo do pedido</h3>
        <ul>
          <li>
            <p>{`Subtotal(${shoppingCart.length} itens)`}</p>
            <h5>{`R$ 10.000`}</h5>
          </li>
          <li>
            <p>Total</p>
            <h5>{`R$ 20.000`}</h5>
          </li>
        </ul>
        <div>
          <h3>Endereço de Entrega</h3>
          <p>Bairro:</p>
          <p>Cidade:</p>
          <p>CEP:</p>
        </div>
      </div>
      </div>
    </div>
    <div className='payment'>
      <div className='pay-card-ticket'>
      <h2>Pague com Cartão de crédito</h2>
      <form>
        <div>
          Número do Cartão
          <input
            id="card-number"
            type="text"
          />
          Nome do Titular(como está gravado no cartão)
          <input
            id="name-holder"
            type="text"
          />
          Código de Segurança
            <input
              id="security-code"
              type="text"
            />
          <div class="mes-ano">
            Data de Validade
            <select>
              <option>Mês</option>
              <option>01</option>
              <option>02</option>
              <option>03</option>
              <option>04</option>
              <option>05</option>
              <option>06</option>
              <option>07</option>
              <option>08</option>
              <option>09</option>
              <option>10</option>
              <option>11</option>
              <option>12</option>
            </select>
            <select>
              <option>Ano</option>
              <option>22</option>
              <option>23</option>
              <option>24</option>
              <option>25</option>
              <option>26</option>
              <option>27</option>
              <option>28</option>
              <option>29</option>
              <option>30</option>
            </select>
            <div className='parcelamento'>
            Opções de Parcelamento
            <select>
              <option>1X</option>
              <option>2X</option>
              <option>3X</option>
              <option>4X</option>
              <option>5X</option>
              <option>6X</option>
            </select>
            </div>
          </div>
        <button className="button-concluir-compra">Concluir Pedido com Cartão de Crédito</button>
      </div>
        <hr></hr>
      </form>
      <div className='payment-ticket'>
        <h2>Pague com Boleto Bancário</h2>
        <h6>Você poderá visualizar ou imprimir após a finalização do pedido. A data de vencimento é de 2 dias corridos após a conclusão do pedido. Após esta data, ele perderá a validade.</h6>
        <button className="button-concluir-compra">Concluir Pedido com Boleto Bancário</button>
      </div>
      </div>

    </div>
 </>
  )
}

export default BuyProducts;