import React from 'react';
import { Route, Redirect } from 'react-router-dom';


// here we pass state in redirect   this state contains { pathname : "/Postmessage"} so that after login we push to postMessage component

function PrivateRoute({ component: Component, authenticated, ...rest }) {
    return (
      <Route
        {...rest}
        render={(props) => authenticated === true
          ? <Component {...props} />
          :  <Redirect  to={{ pathname: '/login', state: { from: props.location } } }/>

        }
      />
    )
  }

export default PrivateRoute