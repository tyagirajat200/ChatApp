
import React, { useEffect, useState } from 'react'
import { BrowserRouter , Route, Switch } from 'react-router-dom'
import Navbar from '../components/Home/Navbar'
import Register from '../components/Home/Register'
import Login from '../components/Home/Login'
import Home from '../components/Home/Home'

import Postmessage from "../components/Postmessage";

import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../Actions/authentications";

import PublicRoute from './PublicRoute'
import PrivateRoute from './PrivateRoute'



export default function Routes() {
    const[loading ,setLoading]=useState(true)

    const auth = useSelector((state) => {
        return state.auth.isAuthenticated
      })
    const dispatch = useDispatch()
    

    useEffect( ()=>{
         dispatch(setCurrentUser()).then(res=>{
             
                setLoading(false)
            
        })
        console.log("Setting Up Current User")

        // eslint-disable-next-line                 
    },[])

    return (
        loading === true ?<div className="loader"></div> :
        
      
        <div>
            <BrowserRouter >
            
                <Navbar /> 
                <Switch>
                    <Route exact path="/"><Home /></Route>
                    <PrivateRoute path="/Postmessage" authenticated={auth} component={Postmessage} />
                    <PublicRoute path="/login"  authenticated={auth} component={Login}/>
                    <PublicRoute path="/register"  authenticated={auth} component={Register}/>  
                </Switch>
              
            </BrowserRouter>


        </div>
    )
}
