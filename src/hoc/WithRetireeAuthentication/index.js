import React from "react";
import { get } from 'lodash';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Constants from "./../../util/constant";

export default function withRetireeAuthentication(WrappedComponent) {
    const WithRetireeAuthentication = (props) => {
        if (!props.isAuthenticated || get(props, 'session.user.userRole', '') !== Constants.ROLES.RETIREE) {
            return <Redirect to="/" />;
        }
        return (<WrappedComponent {...props} />);
    };

    const { bool } = PropTypes;

    WithRetireeAuthentication.propTypes = {
        isAuthenticated: bool.isRequired,
    };

    const mapStateToProps = (state) => ({
        isAuthenticated: state.auth.isAuthenticated,
        session: state.auth.session
    });

    return connect(mapStateToProps)(WithRetireeAuthentication);
}
