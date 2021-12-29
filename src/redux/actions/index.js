import { getCategories, getProductsFromCategoryAndQuery, getProductById} from "../../services/api";
export const GET_CATEGORY = 'GET_CATEGORY';
export const SAVE_DATA_CATEGORIES = 'SAVE_DATA_CATEGORIES';
export const SET_LOADING = 'SET_LOADING';
export const SAVE_DATA_DETAILS = 'SAVE_DATA_DETAILS'; //details

export const saveDataCategories = (payload) => ({
    type: SAVE_DATA_CATEGORIES,
    payload,
});

export const resultApiCategories = () => async (dispatch) => {
    const result = await getCategories();
    dispatch(saveDataCategories(result));
}

export const setLoading= (payload) =>( {
  type: SET_LOADING,
  payload,
})



export const filterCategory = (payload) => ({
    type: GET_CATEGORY,
    payload,
});

export const getFilterCategory = (query) => async (dispatch) => {
    const result = await getProductsFromCategoryAndQuery('', query);
    dispatch(filterCategory(result.results));
}



// details

export const saveDataDetails = (payload) => ({
    type: SAVE_DATA_DETAILS,
    payload,
});

export const resultApiDetails = (id) => async (dispatch) => {
    const result = await getProductById(id);
    dispatch(saveDataDetails(result));
}

//details