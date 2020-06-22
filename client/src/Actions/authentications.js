import axios from 'axios';
import { GET_ERRORS , SET_CURRENT_USER ,LOGIN_SUCCESS,LOGOUT_SUCCESS ,RESET_ERRORS} from './types';



if(process.env.NODE_ENV === 'production')
   { axios.defaults.baseURL = "https://mernchat7599.herokuapp.com" }


export const registerUser = (user, history) => dispatch => {

    // Headers
  const headers = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  // Request body
  const body = JSON.stringify(user);
    axios.post("/api/user/register", body,headers)
            .then(res =>  history.push('/login'))
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
}

export const loginUser = (user) => dispatch => {
    // Headers
  const headers = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  // Request body
  const body = JSON.stringify(user);
    axios.post("/api/user/login", body,headers)
            .then(res => {
               
                console.log("login success")
                dispatch({
                    type:LOGIN_SUCCESS,
                    payload:res.data
                })
               
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
}



export const logoutUser=(history)=>(dispatch)=>{
    axios.delete("/api/user/logout", { withCredentials: true })
    .then(res=> {
        dispatch({
            type:LOGOUT_SUCCESS,
            payload:res.data
        })
       history.push('/')
    })
    .catch(err => console.log(err))
}


export const setCurrentUser=()=>(dispatch)=>{
    return axios.get("/api/user/authchecker", { withCredentials: true }) 
    .then(res=>{                                                        
       
        dispatch({
            type:SET_CURRENT_USER,
            payload:res.data
        })
        return res.data
    })
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    });
}

export const clearStatus = () =>(dispatch)=> {
    dispatch({
        type: RESET_ERRORS
    })
      
    
  };