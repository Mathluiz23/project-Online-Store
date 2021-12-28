import "../style/ProducCard.css"
import {BsCartPlus} from 'react-icons/bs'
function ProductCard({title,price,thumbnail}) {
  return (
    <div className="card">
        <div className="product-card">
          <h2>{ title }</h2>
          <img src={ thumbnail } alt={ title } />
        </div>
        <div className="price-and-add-to-cart">
          <p>{`R$ ${price}`}</p>
          <button className="add-to-cart">Adicionar</button>
        </div>
    </div>
  )
}

export default ProductCard;