import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Ring from "./Components/Ring";
import Line from "./Components/Line";
import Home from "./Components/Home";
import Header from "./Components/Header";

const Router = () => (
  <HashRouter>
    <div>
      {/* <Header /> */}
      <Switch>
        <Route path="/" component={Home} exact={true} />
        <Route path="/Ring" component={Ring} />
        <Route path="/Line" component={Line} />
        {/* <Route path="/add-role" component={AddRole} /> */}
      </Switch>

    </div>
  </HashRouter>
);

export default Router;