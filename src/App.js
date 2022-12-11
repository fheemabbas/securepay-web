import React, { Suspense, lazy } from 'react';
import { connect } from "react-redux";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import routes from "./routes";
import { hideToast } from "./state/ducks/utils/operations"

import Loader from "./components/Loading/Loading"
import ToastComponent from "./components/UI/ToastComponent"

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';


const Login = lazy(() =>
  import(
    /* webpackChunkName: "login" */ /* webpackPreload: true */ "./pages/Client/Login"
  )
);

function App(props) {
  const { toast, hideToast, loader } = props;
  const loggedInUserBaseRoute = "/dashboard";
  const baseRoute = {
    path: "/",
    component: Login,
  };
  const isLoggedIn = () => {
    let user_id = localStorage.getItem('user');
    let token = localStorage.getItem('access_token');
    if (!user_id || !token) return false;
    else return true;
  }

  const authenticateRoute = (props) => {
    let { path } = props.match;

    let isLoggedIn = isLoggedIn();
    let routeIndex = routes.findIndex(route => route.path === path);

    if (path === "/" && isLoggedIn) {
      return <Redirect to={loggedInUserBaseRoute} />;
    }
    else if (path !== "/" && routeIndex !== -1) {
      const Component = routes[routeIndex].component;
      return isLoggedIn ? <Component {...props} /> : <Redirect to="/" />;
    }
    else {
      const Component = baseRoute.component;
      return <Component {...props} />;
    }
  }
  return (
    <div className="App" >
      <Suspense fallback={<h1></h1>}>
        <ToastComponent show={toast.show} message={toast.message} time={toast.time} type={toast.type} onClose={hideToast} />
        <Loader show={loader} />
        <BrowserRouter>
          <Switch>
            {routes.map((route, index) => {
              return route.authenticate ? (
                <Route
                  key={index}
                  exact={route.exact}
                  path={route.path}
                  render={authenticateRoute.bind(props)}
                />
              ) : (
                <Route
                  key={index}
                  exact={route.exact}
                  path={route.path}
                  component={route.component}
                />
              );
            })}
          </Switch>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    toast: state.utils.toast,
    loader: state.utils.loader
  }
};

const mapDispatchToProps = {
  hideToast
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
