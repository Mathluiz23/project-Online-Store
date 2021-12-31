import { Link } from "react-router-dom";
import {connect} from 'react-redux';
import {getProductById} from '../services/api';
import {setAmountItensCart} from '../redux/actions'
import "../style/ProducCard.css"

function ProductCard({title,price,thumbnail, id, setAmountIten}) {

 async function handleClick() {
    const product = await getProductById(id);
    const exist = localStorage.getItem('cart');
    if (exist) {
      const json = JSON.parse(exist);
      localStorage.setItem('cart',JSON.stringify([...json,product]))
      setAmountIten(json.length + 1)
      console.log(json.length);
      return;
    }
    localStorage.setItem('cart',JSON.stringify([product]));
    setAmountIten(1);
  }

  return (
    <div className="card">
        <Link className="Link" to={ { pathname: `/details/${id}`}}>
        <div className="product-card">
          <h2>{ title.length < 60 ? title : title.substr(0,50) + "..." }</h2>
          <img src={ thumbnail } alt={ title } />
        </div>
        </Link>
        <div className="price-and-add-to-cart">
          <p>{`R$ ${price}`}</p>
          <button className="add-to-cart" onClick={ (e) =>handleClick(e) }>Adicionar</button>
        </div>
    </div>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    setAmountIten: (amount) => dispatch(setAmountItensCart(amount)),
  }
}

export default connect(null, mapDispatchToProps)(ProductCard);