import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Ring from "./Components/Ring";
import Line from "./Components/Line";
import Home from "./Components/Home";
import Header from "./Components/Header";

export default () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={Home} exact={true} />
        <Route path="/Ring" component={Line} />
        <Route path="/Line" component={Ring} />
        {/* <Route path="/add-role" component={AddRole} /> */}
      </Switch>

    </div>
  </BrowserRouter>
);
