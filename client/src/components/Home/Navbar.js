import React, { useState } from "react";
import {
  MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBLink, MDBNavbarToggler, MDBCollapse
} from "mdbreact";
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../Actions/authentications'
import { useHistory } from 'react-router-dom'
import { Avatar } from "@material-ui/core";


const Navbar = () => {

  const [isOpen, setIsopen] = useState(false)


  const history = useHistory()

  const auth = useSelector((state) => {
    return state.auth.isAuthenticated;
  })

  const user = useSelector((state) => {
    return state.auth.user;
  })

  const dispatch = useDispatch()

  const onLogOut = (e) => {
    e.preventDefault();
    dispatch(logoutUser(history))
  }

  const toggleCollapse = () => {
    setIsopen(!isOpen);
  };

  return (

    <MDBNavbar color="default-color" dark expand="md">
      <MDBNavbarBrand>
        <strong className="white-text">Chat</strong>
      </MDBNavbarBrand>
      <MDBNavbarToggler onClick={toggleCollapse} />
      <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
        
        <MDBNavbarNav right>

          {
            !auth &&
            <React.Fragment>
              <MDBNavItem>
                <MDBLink to="/login" link>Login</MDBLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBLink to="/register">Rgister</MDBLink>
              </MDBNavItem>

            </React.Fragment>
          }

          {auth && <React.Fragment>


            <MDBNavItem>
              <Avatar style={{ marginRight: "0.5rem" }} src="https://www.w3schools.com/howto/img_avatar.png"></Avatar>
            </MDBNavItem>
            <MDBNavbarBrand>
              <strong className="white-text">{user.name}</strong>
            </MDBNavbarBrand>
            <MDBNavItem>
              <MDBLink to="/" onClick={onLogOut}>Logout</MDBLink>
            </MDBNavItem>
          </React.Fragment>
          }

        </MDBNavbarNav>
      </MDBCollapse>
    </MDBNavbar>

  );
}


export default (Navbar);