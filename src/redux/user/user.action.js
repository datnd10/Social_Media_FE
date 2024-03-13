import { GET_ALL_USER_FAILURE, GET_ALL_USER_REQUEST, GET_ALL_USER_SUCCESS } from "./user.actionType";
import axios from "axios";
import { API_BASE_URL, api} from "../../config/api";


export const getAllUser = () => async (dispatch) => {
    dispatch({type: GET_ALL_USER_REQUEST});
    try {
        const {data} = await api.get(`/api/users`);
        dispatch({type: GET_ALL_USER_SUCCESS,  payload: data});
    } catch (error) {
        console.log(error);
        dispatch({type: GET_ALL_USER_FAILURE, payload: error});
    }
}