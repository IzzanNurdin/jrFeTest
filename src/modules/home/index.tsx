import * as React from "react";
// import { Route, Switch, RouteComponentProps } from 'react-router';
// import HeroesDemoPage from './heroes-demo';
import HomeSecondPage from "./pages/second";
import { Switch, RouteComponentProps, Route } from "react-router";
import { HeroesDemoPage } from "./heroes-demo/Page";

const HomeModule: React.SFC<RouteComponentProps> = ({ match }) => (
  <Switch>
    <Route exact path={`${match.path}`} component={HeroesDemoPage} />
    <Route exact path={`${match.path}/dummy`} component={HomeSecondPage} />
  </Switch>
);

export default HomeModule;
