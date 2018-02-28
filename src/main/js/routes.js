import * as React from "react";
import { Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";


export default routes = <Layout>
    <Route exact path="/" component={ Home } />

</Layout>;