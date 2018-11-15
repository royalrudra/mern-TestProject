// REGISTER USER
import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER} from './types';
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from 'jwt-decode';





export const registerUser=(userDate,history)=> dispatch => {
    axios
    .post('/api/users/register', userDate)
    .then(res=> history.push('/login'))
    .catch(err=>
    dispatch({
        type:GET_ERRORS,
        payload:err.response.data
    })
    )
};

//Login - get user token

export const loginUser =(userData) =>dispatch =>{
    axios
    .post('/api/users/login',userData)
    .then(res =>{
//save to local Storage
const{token } = res.data;
//Set token to ls
localStorage.setItem("jwtToken",token);
// set to the auth header
    setAuthToken(token);
    //Decode token to get user data
    const decoded = jwt_decode(token);
    //Set Current user
    dispatch(setCurrentUser(decoded))
    })
    .catch(err =>{
        dispatch({
            type:GET_ERRORS,
            payload:err.response.data

        })
    })
};


// set logged in user
export const setCurrentUser = (decoded) =>{
    return {
        type: SET_CURRENT_USER,
        payload:decoded
    }
}
