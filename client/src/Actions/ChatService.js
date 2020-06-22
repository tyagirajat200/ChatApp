import axios from 'axios';

if(process.env.NODE_ENV === 'production')
   { axios.defaults.baseURL = "https://mernchat7599.herokuapp.com" }

export const getGlobalMessages = () => (dispatch) => {
   return axios.get('/api/messages/global')
        .then(res => {
           
            return res.data
        })
        .catch(err=>{
            console.log(err.response.data); 
        })

}

export const sendGlobalMessages = (body) => (dispatch) => {
   return  axios.post('/api/messages/global',{ body: body })
        .then(res => {
           
            return res.data
        })
        .catch(err=>{
            console.log(err.response.data); 
        })

}

export const getConversationMessages = (id) => (dispatch) => {
   return axios.get('/api/messages/conversations/query/'+id)
        .then(res => {
           
            return res.data
        })
        .catch(err=>{
            console.log(err.response.data); 
        })

}

export const sendConversationMessage = (id,body) => (dispatch) => {
  return  axios.post('/api/messages',{to:id,body:body})
        .then(res => {
           
            return res.data
        })
        .catch(err=>{
            console.log(err.response.data); 
        })

}

export const getConversations = () => (dispatch) => {
    return  axios.get('api/messages/conversations')
          .then(res => {
             
              return res.data
          })
          .catch(err=>{
              console.log(err.response.data); 
          })
  
  }

export const getUsers  = () => (dispatch) => {
   return axios.get('/api/user')
        .then(res => {
            return res.data.users
        })
        .catch(err=>{
            console.log(err.response.data); 
        })

}

