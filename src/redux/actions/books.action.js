import * as types from "../constants/books.constant"
import { toast } from "react-toastify";
import api from "../../apiService";

const bookActions = {}

bookActions.getBooks = ({pageNum, limit, query}) => async (dispatch) => {
    dispatch({ type: types.GET_BOOKS_REQUEST, payload: null });
    try {
      let url = `${process.env.REACT_APP_BACKEND_API}/books?_page=${pageNum}&_limit=${limit}`;
      if (query) url += `&q=${query}`;
        //with axios
        const data = await api.get(url);
        //---------------
        dispatch({ type: types.GET_BOOKS_SUCCESS, payload: data.data });
        } catch (error) {
        toast.error(error.message);
        dispatch({ type: types.GET_BOOKS_FAILURE, payload: error });
        }
        };
        
bookActions.getDetail = ({bookId}) => async (dispatch) => {
            dispatch({type: types.GET_SINGLE_BOOK_REQUEST, payload: null})
            try {
                let url = `/books/${bookId}`
                const data = await api.get(url)
                // console.log("data", data)
                dispatch ({type: types.GET_SINGLE_BOOK_SUCCESS, payload: data.data})
            } catch (error) {
                toast.error(error.message);
                dispatch({ type: types.GET_SINGLE_BOOK_FAILURE, payload: error });
            }
        }        

bookActions.addToFavorite = ({addingBook}) => async (dispatch) =>{
    dispatch({type: types.ADD_FAVORITE_BOOK_REQUEST})
    try {
        let url = `/favorites`
        const data = await api.post(url, addingBook)
        // console.log("data", data)
        toast.success("The book has been added to the reading list")
        dispatch ({type: types.ADD_FAVORITE_BOOK_SUCCESS})
    } catch (error) {
        toast.error(error.message)
        dispatch({type: types.ADD_FAVORITE_BOOK_FAILURE})
    }
}

bookActions.getFavorite = () => async (dispatch) => {
    try{
        dispatch({type: types.GET_FAVORITE_REQUEST})
        let url = `/favorites`
        const data = await api.get(url)
        dispatch({type: types.GET_FAVORITE_SUCCESS, payload: data.data})
    }
    catch (error){
        dispatch({type: types.GET_FAVORITE_FAILURE, payload: error.message})
    }
    }

bookActions.deleteFavorite = ({removedBookId}) => async (dispatch) => {
    dispatch({type: types.DELETE_FAVORITE_REQUEST})
    try{
        let url = `/favorites/${removedBookId}`
        const data = await api.delete(url)
        console.log("data", data)
        toast.success("The book has been removed");
        dispatch({type: types.DELETE_FAVORITE_SUCCESS})
        dispatch(bookActions.getFavorite())
    }
    catch (error){
        toast.error(error.message)
        dispatch({type: types.DELETE_FAVORITE_FAILURE, payload: error.message})
    }
    }

export default bookActions