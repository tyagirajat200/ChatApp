import React from 'react'
import { Route, Redirect, useHistory} from 'react-router-dom';


function PublicRoute({ component: Component, authenticated, ...rest }) {

  var history = useHistory()
  
  const { from } = history.location.state || {
    from: { pathname: '/' }
 }
    return (
      <Route
        {...rest}
        render={(props) => authenticated === false
          ? <Component {...props} />
          : <Redirect  to={ from }/>
          
        }
      />
    )
  }

  export default PublicRoute;