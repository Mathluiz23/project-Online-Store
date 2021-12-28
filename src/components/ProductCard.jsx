import "../style/ProducCard.css"
function ProductCard({title,price,thumbnail}) {

  return (
    <div className="card">
        <div className="product-card">
          <h2>{ title.length < 60 ? title : title.substr(0,50) + "..." }</h2>
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