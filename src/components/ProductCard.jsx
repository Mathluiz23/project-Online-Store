import "../style/ProducCard.css"
function ProductCard({title,price,thumbnail}) {
  return (
    <div className="produc-card">
        <p>{ title }</p>
        <img className="product-card-img" src={ thumbnail } alt={ title } />
        <p>{ price }</p>
    </div>
  )
}

export default ProductCard;