import React from "react";
import { get } from 'lodash';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Constants from "./../../util/constant";

export default function withoutAuthentication(WrappedComponent) {
    const WithoutAuthentication = (props) => {
        if (props.isAuthenticated) {
            if (get(props, 'session.user.userRole', '') === Constants.ROLES.ADMIN)
                return <Redirect to="/admin/dashboard" />;
            if (get(props, 'session.user.userRole', '') === Constants.ROLES.RETIREE)
                return <Redirect to="/" />;
        }
        return (<WrappedComponent {...props} />);
    };

    const { bool } = PropTypes;

    WithoutAuthentication.propTypes = {
        isAuthenticated: bool.isRequired,
    };

    const mapStateToProps = (state) => ({
        isAuthenticated: state.auth.isAuthenticated,
        session: state.auth.session
    });

    return connect(mapStateToProps)(WithoutAuthentication);
}
