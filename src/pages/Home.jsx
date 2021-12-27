import React, { useEffect} from "react";
import { connect } from 'react-redux';
import Header from "../components/Header";
import { resultApiCategories } from "../redux/actions";

function Home({saveProducts}) {

    useEffect(() => {
       saveProducts();
    }, [])


    return(
        <div>
          <Header/>
        </div>
    )
}

function mapDispatchToProps(dispacth) {
    return {
        saveProducts: () => dispacth(resultApiCategories()),
    }
}

export default connect(null, mapDispatchToProps)(Home);
