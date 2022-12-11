import React, { useState, useEffect, } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Nav, Navbar, } from 'react-bootstrap';
import Scrollbars from 'react-custom-scrollbars';

import logo from '../../../assets/images/trustpay1.png';
import Notification from '../../../components/UI/Notification/Notification';
import CustomSideBar from "../../../components/CustomSideBar/CustomSideBar";
import useKeyPress from '../../../hooks/useKeyPress';
import StorageService from "../../../services/localstorage.service";
import Dropdown from 'react-bootstrap/Dropdown';
import { getKycStatus } from "../../../state/ducks/Job/actions";
import { showNotificationCount } from "../../../state/ducks/notification/actions";
import './Header.scss';
import { connect } from "react-redux";


const Header = (props) => {
  let [showNotificationModal, setShowNotificationModal] = useState(false)
  // let [showNavExpanded, setShowNavExpanded] = useState(false)
  const [expanded, setExpanded] = useState(false);
  const [userData, setUserData] = useState('');
  const [tooltipShow, setTooltipShow] = useState(false);

  // useEffect(() => {
  //   let userData = JSON.parse(localStorage.getItem('user'));
  //   console.log(userData)
  //   if (userData.kycDocsId) {
  //     props.getKycStatus();
  //   }
  //   console.log(localStorage.getItem('notificationCount'))
  // }, [])

  // useEffect(() => {

  //   setUserData(JSON.parse(localStorage.getItem('user')));

  // }, [props.kycStatus])

  // useKeyPress('Escape', () => {
  //   setShowNotificationModal(false)
  // });
  const onClickAdd = () => {
    props.history.push('/profile');
    setTooltipShow(false);
  }
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
  else if (props.location.pathname.indexOf('Profile') !== -2) {
    activeMenu = 'profile'
  }
  return (
    <div className="headerClient">
      <div className="container">
        <div className="row">
          <Navbar expanded={expanded} collapseOnSelect >
            <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")} />
            <Navbar.Brand href={StorageService.getItem('isAuthenticated') ? "/dashboard" : "/"} >
              <img src={logo} alt="logo" className='headerLogo' />
              {/* < span className="icon-yatapay-brand" ></span> */}
            </Navbar.Brand>
            {expanded && <div className='overLayMenu' onClick={() => setExpanded(false)}></div>}
            <Navbar.Collapse id="basic-navbar-nav">
              <div className="descriptionContent">
                <Nav className="menuItem" activeKey={activeMenu} >
                  <div className="link_menu_row">
                    <Nav.Link eventKey="dashboard" as={Link} to="/dashboard" onClick={() => setExpanded(false)}>Dashboard</Nav.Link>
                    <Nav.Link eventKey="payments" as={Link} to="/payments" onClick={() => { setExpanded(false); StorageService.setItem('activeTab', "Client") }}>Transaction Management</Nav.Link>
                    {/* <Nav.Link eventKey="jobs" as={Link} to="/jobs" onClick={() => setExpanded(false)}>Job Management</Nav.Link>
                  <Nav.Link eventKey="disputes" as={Link} to="/disputes" onClick={() => setExpanded(false)}>Dispute Management</Nav.Link> */}
                    {/* <Nav.Link eventKey="tickets" as={Link} to="/tickets" onClick={() => setExpanded(false)}>Support & Ticket Management</Nav.Link> */}
                  </div>
                  {/* <div className="icon_menu_row">
                    <Nav.Link eventKey="tickets" as={Link} to="/tickets" onClick={() => setExpanded(false)}><span className="header_icon icon-call"></span></Nav.Link>
                    <Nav.Link onClick={() => {
                      setShowNotificationModal(true)
                      setExpanded(false)
                    }}><span className="header_icon icon-bell"></span></Nav.Link>
                    <Nav.Link eventKey="profile" as={Link} to="/profile" onClick={() => setExpanded(false)}><span className="header_icon icon-user"></span></Nav.Link>
                  </div> */}
                </Nav>
              </div>
            </Navbar.Collapse>
            <div className="icon_menu_row">
              {
                (userData.bankId === undefined || userData.kycDocsId === undefined) ?
                  <>
                    <Dropdown>
                      <Dropdown.Toggle variant="success" className='count_cricle'>
                        {userData.bankId === undefined && userData.kycDocsId === undefined ? 2 : 1}
                      </Dropdown.Toggle>

                      <Dropdown.Menu className="tooltip_dropdown">
                        {userData.bankId === undefined &&
                          <Dropdown.Item href="#/action-1" className='tooltip_btn_row'>
                            <>
                              <div className="txt_tooltip">Provide identity verification details for KYC.</div>
                              <button className="btn_custom_tooltip" onClick={onClickAdd}>Add</button>
                            </>
                          </Dropdown.Item>
                        }
                        {userData.kycDocsId === undefined &&
                          <Dropdown.Item href="#/action-2" className='tooltip_btn_row'>
                            <>
                              <div className="txt_tooltip">Provide identity verification details for KYC.</div>
                              <button className="btn_custom_tooltip" onClick={onClickAdd}>Add</button>
                            </>
                          </Dropdown.Item>
                        }
                      </Dropdown.Menu>
                    </Dropdown>
                  </>
                  :

                  props.kycStatus !== "VALIDATED" &&
                  <>
                    <Dropdown>
                      <Dropdown.Toggle variant="success" className='count_cricle'>
                        {1}
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="tooltip_dropdown">
                        {userData.kycDocsId &&
                          <Dropdown.Item href="#/action-2" className='tooltip_btn_row'>
                            <>
                              <div className="txt_tooltip"
                                style={{ color: props.kycStatus === "VALIDATION_ASKED" ? '#ffab00' : props.kycStatus === "VALIDATED" ? 'green' : 'red' }}>
                                {props.kycStatus === "VALIDATION_ASKED" ? 'Your KYC Document Approval Pending' : props.kycStatus === "VALIDATED" ? 'Approved' : 'Your KYC Document Rejected'}
                              </div>
                            </>
                          </Dropdown.Item>
                        }
                      </Dropdown.Menu>
                    </Dropdown>
                  </>
              }
              {/* <Nav.Link eventKey="tickets" as={Link} to="/tickets" onClick={() => setExpanded(false)}><span>1</span></Nav.Link> */}
              <Nav.Link eventKey="tickets" as={Link} to="/tickets" onClick={() => setExpanded(false)}><span className="header_icon icon-call"></span></Nav.Link>

              <Nav.Link onClick={() => {
                localStorage.setItem('notificationCount', 0);
                props.showNotificationCount(0)
                setShowNotificationModal(true)
                setExpanded(false)
              }}><span className="header_icon icon-bell"></span>{props.notificationCount > 0 && <div className="round-badge">{props.notificationCount}</div>}</Nav.Link>
              <Nav.Link eventKey="profile" as={Link} to="/profile" onClick={() => setExpanded(false)}><span className="header_icon icon-user"></span></Nav.Link>
            </div>
          </Navbar>
          <CustomSideBar
            title='Notification'
            showSidebar={showNotificationModal}
            onHide={() => setShowNotificationModal(false)}
            outerdivClassname="notificationMain" >
            <Notification />
          </CustomSideBar>
        </div>
      </div >
    </div >
  );
}


const mapStateToProps = (state) => {
  return {
    kycStatus: state.job?.kycStatus?.Status,
    notificationCount: state.notification?.total

  };
};

const mapDispatchToProps = {
  getKycStatus,
  showNotificationCount
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Header)
);