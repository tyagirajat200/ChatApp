import React, { useState, useEffect } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBLink, MDBAlert } from 'mdbreact';
import { registerUser, clearStatus } from "../../Actions/authentications";
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'


const initialFieldValues = {
  name: "",
  email: "",
  password: "",
  cpassword: "",

}


function Register(props) {

  const history = useHistory()

  const [values, setValues] = useState(initialFieldValues)
  const [error1, setError1] = useState("")

  const error = useSelector((state) => {
    return state.errors.error

  })

  const dispatch = useDispatch()

  useEffect(() => {

    setError1(error)

    // eslint-disable-next-line   
  }, [error])


  useEffect(() => {
    console.log("DidMount Register Page")
    return () => {
      console.log("UnMount Register Page")
      dispatch(clearStatus())
    }
    // eslint-disable-next-line 
  }, [])



  const handleInputChange = e => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value
    })
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(registerUser(values, history))

  }





  return (


    <MDBContainer>
      <MDBRow>
        <MDBCol md="6" style={{ margin: "5% auto", height: "500px" }}>

          <MDBCard>

            <MDBCardBody>
              <form onSubmit={handleSubmit}>
                <p className="h4 text-center" style={{ padding: "0rem" }}>Sign up</p>
                {error1 ? (<MDBAlert color="danger" >  {error1}  </MDBAlert>) : null}
                <div className="grey-text">
                  <MDBInput
                    label="Your name"
                    icon="user"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    name="name"
                    value={values.name}
                    onChange={handleInputChange}
                  />
                  <MDBInput
                    label="Your email"
                    icon="envelope"
                    group
                    type="email"
                    validate
                    error="wrong"
                    success="right"
                    name="email"
                    value={values.email}
                    onChange={handleInputChange}
                  />

                  <MDBInput
                    label="Your password"
                    icon="lock"
                    group
                    type="password"
                    validate
                    name="password"
                    value={values.password}
                    onChange={handleInputChange}
                  />
                  <MDBInput
                    label="Confirm your password"
                    icon="exclamation-triangle"
                    group
                    type="password"
                    validate
                    error="wrong"
                    success="right"
                    name="cpassword"
                    value={values.cpassword}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="text-center mt-3" style={{ padding: "0rem" }}>
                  <MDBBtn color="cyan" type="submit">
                    Register
                  </MDBBtn>
                </div>
                <div style={{ textAlign: "right" }}>


                  <MDBLink to="/login">
                    Already Have a Account ? Click Here
                   </MDBLink>


                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default (Register);