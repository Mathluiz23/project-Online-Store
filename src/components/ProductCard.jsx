import "../style/ProducCard.css"
function ProductCard({title,price,thumbnail}) {
  return (
    <div className="card">
        <div className="product-card">
          <h2>{ title }</h2>
          <img src={ thumbnail } alt={ title } />
          <p>{ price }</p>
        </div>
        <div className="add-cart">
        <button>Adicionar ao Carrinho</button>
        </div>
    </div>
  )
}

export default ProductCard;