import * as React from "react";
import { Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import Wrapper from "./components/Wrapper";


export const routes = <Layout>
    <Route exact path="/" component={ Home } />
    <Route exact path="/details" component={Wrapper}  />
    <Route exact path="/details/:buildingId" component={Wrapper}  />

</Layout>;
