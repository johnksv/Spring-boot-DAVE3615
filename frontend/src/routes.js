import * as React from "react";
import { Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { DisplayTable } from "./components/DisplayTable"


export const routes = <Layout>
    <Route exact path="/" component={ Home } />
    <Route exact path="/buildings" render={() => <DisplayTable type="Buildings" />}  />
    <Route exact path="/rooms" render={() => <DisplayTable type="Rooms" /> }/>

</Layout>;
