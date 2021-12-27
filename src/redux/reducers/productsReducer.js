import { SAVE_DATA_CATEGORIES, GET_CATEGORY,SET_LOADING} from '../actions/index';

const INITIAL_STATE = {
   categories:[],
   productsByCategory:[],
   loading: false,
};

const productReducer = (state = INITIAL_STATE, action ) => {
    switch (action.type) {
        case SAVE_DATA_CATEGORIES:
            return { ...state, categories: action.payload };
        case GET_CATEGORY:
            return { ...state, productsByCategory: action.payload};
        case SET_LOADING:
            return {...state, loading: action.payload}
        default:
            return state;
    }
}

export default productReducer;
