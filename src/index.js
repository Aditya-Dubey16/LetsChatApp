import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import firebase from 'firebase/app';
//import App from './App';
import reportWebVitals from './reportWebVitals';
import {Route, Redirect, BrowserRouter as Router } from 'react-router-dom';
import LoginComponent from './login/login';
import SignUpComponent from './signup/signup';
import DashboardComponent from './dashboard/dashboard';
import 'firebase/firestore';


require("firebase/firestore");

 firebase.initializeApp({

  apiKey: "AIzaSyB0RfflpXL7smK4khXgPpMmARoXuxkKo9k",
  authDomain: "lets-talk-84c51.firebaseapp.com",
  databaseURL: "https://lets-talk-84c51.firebaseio.com",
  projectId: "lets-talk-84c51",
  storageBucket: "lets-talk-84c51.appspot.com",
  messagingSenderId: "827237545816",
  appId: "1:827237545816:web:6975e6df56b86adfc4972d",
  measurementId: "G-V2JZ36WJBB"


});




ReactDOM.render(

  <React.StrictMode>
  <Router>
    <div id='router-container'>
      <Route path='/login' component={LoginComponent}></Route>
      <Route path='/signup' component={SignUpComponent}></Route>
      <Route path='/dashboard' component={DashboardComponent}></Route>
      <Redirect  to='/dashboard'  />
    </div>
  </Router>
  </React.StrictMode>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
