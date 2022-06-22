import React, {useEffect, useState} from 'react'
import { Redirect, Route } from 'react-router-dom'
import axios from 'axios'

axios.defaults.withCredentials = true;

const ProtectedRoute = ({component:Component, ...rest}) => {
  
  return (
    <Route
    {...rest}
    render={(props)=>{    
        return <Component />
    }}
    />
  )
}

export default ProtectedRoute
