import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './comps/Login';
import Profile from './comps/Profile';
import Dashboard from './comps/Dashboard';
import ProtectedRoute from './ProtectedRoute'
import {useDispatch, useSelector} from "react-redux";
import { getObj } from './redux/userSlice';
import axios from 'axios';

function App() {
  
  return (
    <>
      <Router>
        <Switch>
          <Route exact path={"/"} component={Login} />
          <ProtectedRoute exact path='/profile' component={Profile}/>
          <ProtectedRoute path='/profile/dashboard' component={Dashboard}/>
        </Switch>
      </Router>
    </>
  );
}

export default App;
