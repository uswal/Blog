import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import "./index.css";
import "./buttons.css";

import MyProvider from "./components/myProvider";

import Fonts from "./components/fonts";
import TopNav from "./components/topNav";

import Home from "./pages/home";
import Article from "./pages/article";

ReactDOM.render(
  <Router>
    <MyProvider>
      <TopNav />
      <div className="content">
        <Switch>
          <Route path="/article" component={Article} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
      <Fonts />
    </MyProvider>
  </Router>,
  document.getElementById("root")
);
