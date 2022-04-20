import React from 'react';
import {Route, Switch} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Errorpage from "./components/Errorpage";

const App=()=> {
  return (
    <div>
      <Navbar/>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>

          <Route path="/about">
            <About/>
          </Route>

          <Route path="/contact">
            <Contact/>
          </Route>

          <Route path="/login">
            <Login/>
          </Route>

          <Route path="/register">
            <Signup/>
          </Route>

          <Route>
            <Errorpage/>
          </Route>

      </Switch>
    </div>
  );
}

export default App;