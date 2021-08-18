import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Ring from "./Components/Ring";
import Line from "./Components/Line";
import Home from "./Components/Home";


const Router = () => (
  <BrowserRouter>
    <div>
      {/* <Header /> */}
      <Switch>
        <Route path="/Final-Project-" component={Home} exact={true} />
        <Route path="/Final-Project-/Ring" component={Ring} />
        <Route path="/Final-Project-/Line" component={Line} />
        {/* <Route path="/add-role" component={AddRole} /> */}
      </Switch>

    </div>
  </BrowserRouter>
);

export default Router;