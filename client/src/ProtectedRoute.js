import React, {useEffect, useState} from 'react'
import { Redirect, Route } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import { getObj, loggedin } from './redux/userSlice';
import axios from 'axios'

axios.defaults.withCredentials = true;

const ProtectedRoute = ({component:Component, ...rest}) => {
  
  /*if(!access){
    return <Redirect to={"/"}/>
  }*/
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