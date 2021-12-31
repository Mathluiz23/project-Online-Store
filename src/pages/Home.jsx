import React, { useEffect} from "react";
import { connect } from 'react-redux';
import Header from "../components/Header";
import { resultApiCategories,setAmountItensCart } from "../redux/actions";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";
import frete from '../frete.gif'
import promocao from '../promocao.gif'
import "../style/ProducCard.css";
import "../style/Home.css";

function Home({saveProducts, intensCategory,loading,setAmountIten}) {

    useEffect(() => {
    saveProducts();
    }, [saveProducts])
    
    useEffect(() => {
        const exist = localStorage.getItem('cart');
        if (exist) {
            const json = JSON.parse(exist);
            setAmountIten(json.length);
            return;
        }
        setAmountIten(0);
    }, []);
    
    return(
    
    <div>
        <Header/>
        <div className="folders-home">
            <img className="gifs" src={frete} alt="imagem-frete-gratis"></img>
            <img className="gifs" src={promocao} alt="imagem-promocao"></img>
        </div>

        <div className="product-card-container">
        { loading ? <Loading/> :
        intensCategory.map((product)=> <ProductCard price={product.price} thumbnail={product.thumbnail} title={product.title} id={product.id}/>)
        }
        </div>
    </div>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        saveProducts: () => dispatch(resultApiCategories()),
        setAmountIten: (amount) => dispatch(setAmountItensCart(amount)),
    }
}

function mapStateToProps(state) {
    return {
        intensCategory: state.productReducer.productsByCategory,
        loading: state.productReducer.loading,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
