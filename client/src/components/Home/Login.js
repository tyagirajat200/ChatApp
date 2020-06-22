
import React, { useState, useEffect } from "react";
import { MDBContainer, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBLink, MDBAlert } from 'mdbreact';
import { loginUser, clearStatus } from "../../Actions/authentications";
import { useSelector, useDispatch } from "react-redux";



const initialFieldValues = {
  email: "",
  password: "",
}

const Login = () => {

  const dispatch = useDispatch()

  const [values, setValues] = useState(initialFieldValues);
  const [error1, setError1] = useState("")

  const error = useSelector((state) => {
    return state.errors.error

  })


  const handleInputChange = e => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value
    })
  }


  const handleSubmit = (event) => {

    event.preventDefault()

    dispatch(loginUser(values))

  }



  useEffect(() => {

    setError1(error)

    // eslint-disable-next-line   
  }, [error])   //    it runs for every rendering and  when value of error changed


  useEffect(() => {
    console.log("DidMount Login Page")
    return () => {
      console.log("UnMount  Login Page")
      dispatch(clearStatus())          // it runs for every rendering as did mount and  return function runs only when we leave the page 
    }
    // eslint-disable-next-line 
  }, [])





  return (
    <MDBContainer>

      <MDBCol md="6" style={{ margin: "10% auto" }}>
        <MDBCard color="" >
          <MDBCardBody>
            <form onSubmit={handleSubmit}>
              <p className="h4 text-center py-4">Login</p>
              {error1 ? (<MDBAlert color="danger" >  {error1}  </MDBAlert>) : null}
              <div className="grey-text" >

                <MDBInput
                  label="Your email"
                  icon="envelope"
                  group
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleInputChange}

                />

                <MDBInput
                  label="Your password"
                  name="password"
                  icon="lock"
                  group
                  type="password"
                  value={values.password}
                  onChange={handleInputChange}

                />
              </div>

              <div className="text-center py-4 mt-3">
                <MDBBtn color="cyan" type="submit">
                  Login
                  </MDBBtn>
              </div>

              <div style={{ textAlign: "right" }}>

                <MDBLink to='/register' >
                  Don't have an account? Sign Up
                   </MDBLink>
              </div>
            </form>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>

    </MDBContainer>
  );
};

export default Login;