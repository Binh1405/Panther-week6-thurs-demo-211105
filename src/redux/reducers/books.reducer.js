import * as types from "../constants/books.constant"

const initialState = {
    books: [], 
    loading: false, 
    errorMessage: "",
    selectedBook: null, 
    favoriteBooks: [], 
}

const booksReducer = (state = initialState, action) => {
    const {type, payload} = action
    switch (type) {
        case types.GET_BOOKS_REQUEST:
          return { ...state, loading: true, errorMessage: ""};
        case types.GET_SINGLE_BOOK_REQUEST:
        case types.ADD_FAVORITE_BOOK_REQUEST:
        case types.GET_FAVORITE_REQUEST:
        case types.DELETE_FAVORITE_REQUEST:
          return {...state, loading: true}
        case types.GET_BOOKS_SUCCESS:
          return { ...state, books: payload, loading: false };
        case types.GET_SINGLE_BOOK_SUCCESS:
          return {...state, loading: false, selectedBook: payload}
        case types.GET_FAVORITE_SUCCESS:
          return {...state, favoriteBooks: payload, loading: false}
        case types.GET_BOOKS_FAILURE:
          return {...state, errorMessage: payload, loading: false}
        case types.ADD_FAVORITE_BOOK_SUCCESS:
        case types.GET_SINGLE_BOOK_FAILURE:
        case types.ADD_FAVORITE_BOOK_FAILURE:
        case types.GET_FAVORITE_FAILURE:
        case types.DELETE_FAVORITE_SUCCESS:
          return {...state, loading: false}
        default:
          return state;
      }
    };

export default booksReducer