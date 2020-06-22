import React from 'react'
import { MDBContainer} from 'mdbreact'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'


function Home() {

    const auth = useSelector((state) => {
        return state.auth.isAuthenticated
      })
    return (
        <MDBContainer>
            {
                auth ? <Redirect  to={ "/Postmessage" }/> :  <Redirect  to={ "/login" }/>
            }
       </MDBContainer>
    )
}

export default Home
