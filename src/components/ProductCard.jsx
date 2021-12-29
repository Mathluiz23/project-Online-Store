import { Link } from "react-router-dom";
import "../style/ProducCard.css"

function ProductCard({title,price,thumbnail, id}) {

  return (
    <div className="card">
        <Link className="Link" to={ { pathname: `/details/${id}`}}>
        <div className="product-card">
          <h2>{ title.length < 60 ? title : title.substr(0,50) + "..." }</h2>
          <img src={ thumbnail } alt={ title } />
        </div>
        <div className="price-and-add-to-cart">
          <p>{`R$ ${price}`}</p>
          <button className="add-to-cart">Adicionar</button>
        </div>
        </Link>


    </div>
  )
}

export default ProductCard;