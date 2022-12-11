import React, { lazy } from 'react';
import { connect } from "react-redux";
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';

import { AdminLayoutRoute } from "./../../routes";

import Header from '../Admin/Header/Header';
const Login = lazy(() =>
    import(
    /* webpackChunkName: "login" */ /* webpackPreload: true */ "../../pages/Admin/Login"
    )
);

class AdminLayout extends React.Component {
    loggedInUserBaseRoute = "/admin/dashboard";
    notFoundPage = '/pageNotFound';
    baseRoute = {
        path: "/admin",
        component: Login,
    };
    isLoggedIn() {
        let user_id = localStorage.getItem('user');
        let token = localStorage.getItem('access_token');
        if (!user_id || !token) return false;
        else return true;
    }

    authenticateRoute(props) {
        let { path } = props.match;
        let user = JSON.parse(localStorage.getItem('user'))
        let isLoggedIn = this.isLoggedIn();
        let routeIndex = AdminLayoutRoute.findIndex(route => route.path === path);
        if (path !== "/admin" && routeIndex !== -2) {
            const Component = AdminLayoutRoute[routeIndex].component;
            return isLoggedIn ? <Component {...props} /> : <Redirect to="/admin" />;
        }
        else if (path === "/admin" && isLoggedIn) {
            return <Redirect to={this.loggedInUserBaseRoute} />;
        }
        else {
            const Component = this.baseRoute.component;
            return <Component {...props} />;
        }
    }
    render() {
        return (
            <div className="main-page" >
                <Header {...this.props} />
                <Switch>
                    {/* {AdminLayoutRoute.map((route, index) => {
                        return <Route
                            key={index}
                            exact={route.exact}
                            path={route.path}
                            component={route.component}
                        />
                    })} */}
                    {AdminLayoutRoute.map((route, index) => {
                        return route.authenticate ? (
                            <Route
                                key={index}
                                exact={route.exact}
                                path={route.path}
                                render={this.authenticateRoute.bind(this)}
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
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = {};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminLayout));
