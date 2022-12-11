import React, { useState } from 'react';
// import { connect } from "react-redux";
import { withRouter, Link } from 'react-router-dom';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import './Header.scss';
import logo from '../../../assets/images/trustpay1.png';
import Notification from '../../../components/UI/Notification/Notification';
import CustomSideBar from "../../../components/CustomSideBar/CustomSideBar";
import useKeyPress from '../../../hooks/useKeyPress';
import Profile from '../../../components/UI/Profile/Profile';
import Constant from '../../../util/constant';
import StorageService from "../../../services/localstorage.service";
import { showNotificationCount } from "../../../state/ducks/notification/actions";
import { connect } from "react-redux";
const Header = (props) => {
  let [showNotificationModal, setShowNotificationModal] = useState(false)
  let [showProfileModal, setShowProfileModal] = useState(false)
  // let [showNavExpanded, setShowNavExpanded] = useState(false)
  const [expanded, setExpanded] = useState(false);
  const [role, setRole] = useState(localStorage.getItem('loginRole'))

  useKeyPress('Escape', () => {
    setShowNotificationModal(false)
    setShowProfileModal(false)
  });

  let activeMenu = '';

  if (props.location.pathname.indexOf('dashboard') !== -1) {
    activeMenu = 'dashboard'
  }
  else if (props.location.pathname.indexOf('jobs') !== -1) {
    activeMenu = 'jobs'
  }
  else if (props.location.pathname.indexOf('disputes') !== -1) {
    activeMenu = 'disputes'
  }
  else if (props.location.pathname.indexOf('tickets') !== -1) {
    activeMenu = 'tickets'
  }
  else if (props.location.pathname.indexOf('payments') !== -1) {
    activeMenu = 'payments'
  }
  else if (props.location.pathname.indexOf('user-management') !== -1) {
    activeMenu = 'user-management'
  }
  else if (props.location.pathname.indexOf('staff') !== -1) {
    activeMenu = 'staff'
  }
  else if (props.location.pathname.indexOf('business') !== -1) {
    activeMenu = 'business'
  }
  return (
    <div className="headerAdmin">
      <div className="container">
        <div className="row">
          <Navbar>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Brand href={StorageService.getItem('isAuthenticated') ? "/admin/dashboard" : "/admin"}>
              <img src={logo} alt="logo" className='headerLogo' />
              {/* <span className="icon-yatapay-brand"></span> */}
            </Navbar.Brand>
            {expanded && <div className='overLayMenu' onClick={() => setExpanded(false)}></div>}
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="menuItem" activeKey={activeMenu}>
                <Nav.Link eventKey="dashboard" as={Link} to="/admin/dashboard"  >Dashboard</Nav.Link>
                {Number(role) === 1 &&
                  <Nav.Link eventKey="staff" as={Link} to="/admin/staff" >Staff Management</Nav.Link>
                }
                {/* <NavDropdown title="Users Management" as={Link} to="/admin/user-management" id="basic-nav-dropdown">
                </NavDropdown> */}
                <Nav.Link eventKey="user-management" as={Link} to="/admin/user-management" >User Management</Nav.Link>
                {/* {Number(role) === 1 &&
                  <Nav.Link eventKey="business" as={Link} to="/admin/business" > Business Category</Nav.Link>
                } */}
                <Nav.Link eventKey="jobs" as={Link} to="/admin/jobs" >Job Management</Nav.Link>

                <Nav.Link eventKey="disputes" as={Link} to="/admin/disputes">Query Transaction</Nav.Link>
                <Nav.Link eventKey="tickets" as={Link} to="/admin/tickets">Support & Ticket Management</Nav.Link>
                {Number(role) === 1 &&
                  <Nav.Link eventKey="payments" as={Link} to="/admin/payments">Transaction History</Nav.Link>
                }
                <Nav.Link onClick={() => {
                  setShowNotificationModal(true)
                  setExpanded(false)
                }} >Notification{props.notificationCount > 0 && <div className="round-badge">{props.notificationCount}</div>}</Nav.Link>
                <Nav.Link onClick={() => {
                  setShowProfileModal(true)
                  setExpanded(false)
                }}>Profile</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <CustomSideBar
            title='Notification'
            showSidebar={showNotificationModal}
            onHide={() => setShowNotificationModal(false)}
            outerdivClassname="notificationMain" >
            <Notification />
          </CustomSideBar>
          <CustomSideBar
            title='Proifle'
            showSidebar={showProfileModal}
            onHide={() => setShowProfileModal(false)}
            outerdivClassname="profileMain" >
            <Profile />
          </CustomSideBar>
        </div>
      </div >
    </div >
  );
}


const mapStateToProps = (state) => {
  return {
    notificationCount: state.notification?.total

  };
};

const mapDispatchToProps = {
  showNotificationCount
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Header)
);
// export default withRouter(Header);