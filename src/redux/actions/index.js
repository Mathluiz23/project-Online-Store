import { getCategories, getProductsFromCategoryAndQuery } from "../../services/api";


export const SAVE_DATA_CATEGORIES = 'SAVE_DATA_CATEGORIES';

export const saveDataCategories = (payload) => ({
    type: SAVE_DATA_CATEGORIES,
    payload,
});

export const resultApiCategories = () => async (dispatch) => {
    const result = await getCategories();
    dispatch(saveDataCategories(result));
}


export const GET_CATEGORY = 'GET_CATEGORY';

export const filterCategory = (payload) => ({
    type: GET_CATEGORY,
    payload,
});

export const getFilterCategory = (query) => async (dispatch) => {
    const result = await getProductsFromCategoryAndQuery('', query);
    dispatch(filterCategory(result));
}
