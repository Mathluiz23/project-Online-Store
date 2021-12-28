import React, { useEffect} from "react";
import { connect } from 'react-redux';
import Header from "../components/Header";
import { resultApiCategories } from "../redux/actions";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";
import "../style/ProducCard.css";

function Home({saveProducts, intensCategory,loading}) {

    useEffect(() => {
    saveProducts();
    }, [saveProducts])

    return(
    
    <div>
        <Header/>
        <div className="product-card-container">
        { loading ? <Loading/> :
        intensCategory.map((product)=> <ProductCard price={product.price} thumbnail={product.thumbnail} title={product.title}/>)
        }
        </div>
    </div>
    )
}

function mapDispatchToProps(dispacth) {
    return {
        saveProducts: () => dispacth(resultApiCategories()),
    }
}

function mapStateToProps(state) {
    return {
        intensCategory: state.productReducer.productsByCategory,
        loading: state.productReducer.loading,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
