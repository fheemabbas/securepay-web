import React from "react";
import { get } from 'lodash'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Constants from "./../../util/constant";

export default function withAdminAuthentication(WrappedComponent) {
    const WithAdminAuthentication = (props) => {
        if (!props.isAuthenticated || get(props, 'session.user.userRole', '') !== Constants.ROLES.ADMIN) {
            return <Redirect to="/admin/login" />;
        }
        return (<WrappedComponent {...props} />);
    };

    const { bool } = PropTypes;

    WithAdminAuthentication.propTypes = {
        isAuthenticated: bool.isRequired,
    };

    const mapStateToProps = (state) => ({
        isAuthenticated: state.auth.isAuthenticated,
        session: state.auth.session
    });

    return connect(mapStateToProps)(WithAdminAuthentication);
}
