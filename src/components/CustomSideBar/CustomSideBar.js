import React from 'react';
import { Link } from 'react-router-dom';
import './CustomSideBar.scss';

const CustomSideBar = (props) => {
  return (
    <div className={(props.showSidebar ? "CustomSideBar show" : "CustomSideBar")}>
      <div className="sidebarInner">
        <div className="headerBar">
          <span className="title">{props.title}</span>
          <Link onClick={() => props.onHide()} to="#" className="iconClose">
            <i className="icon-close"></i>
          </Link>
        </div>
        <div className="centerContentBox">
          {props.children}
        </div>
      </div>
    </div >
  )
}

export default (CustomSideBar);
