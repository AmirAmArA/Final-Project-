import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Ring from "./Components/Ring";
import Line from "./Components/Line";
import Home from "./Components/Home";

const Router = () => (
  <HashRouter>
    <div>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/Ring" component={Ring} />
        <Route path="/Line" component={Line} />
      </Switch>
    </div>
  </HashRouter>
);

export default Router;
