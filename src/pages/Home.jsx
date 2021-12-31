import React, { useEffect} from "react";
import { connect } from 'react-redux';
import Header from "../components/Header";
import { resultApiCategories,setAmountItensCart } from "../redux/actions";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";
import "../style/ProducCard.css";

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
        <div className="product-card-container">
        { loading ? <Loading/> :
        intensCategory.map((product)=> <ProductCard price={product.price} thumbnail={product.thumbnail} title={product.title} id={product.id}/>)
        }
        </div>
    </div>
    )
}

function mapDispatchToProps(dispacth) {
    return {
        saveProducts: () => dispacth(resultApiCategories()),
        setAmountIten: (amount) => dispacth(setAmountItensCart(amount)),
    }
}

function mapStateToProps(state) {
    return {
        intensCategory: state.productReducer.productsByCategory,
        loading: state.productReducer.loading,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
