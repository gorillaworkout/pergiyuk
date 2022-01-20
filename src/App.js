import logo from './logo.svg';
import './App.css';
import Home from './Pages/Home/Home'
import {Routes,Route} from 'react-router-dom'
// import initFontAwesome from "./Helpers/iniFontAwesome";
// import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react'
import Face from './Pages/Face/Face';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  // initFontAwesome();

  return (
    <Routes>
      <Route exact path = '/' element={<Home new_params={"testing"}/>}/>
      <Route exact path = '/face' element={<Face new_params={"testing"}/>}/>
    </Routes>
  );
}

export default App;
