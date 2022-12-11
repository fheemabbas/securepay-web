import React from 'react';
import { Toast } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './ToastComponent.scss';

const ToastComponent = (props) => {
  const { message, type, show, onClose, time } = props;

  //let iconClass, toastClass;
  let toastClass;
  if (type === 'success') {
    toastClass = 'success-txt';
  } else if (type === 'error') {
    toastClass = 'error-txt';
  } else if (type === 'warning') {
    toastClass = 'warning-txt';
  }

  return (
    <Toast onClose={() => onClose && onClose()} className={toastClass} show={show} delay={type === 'error' ? 15000 : time} autohide>
      <div className="tostcenter">
        <p>{message} {message === "This email address is already in use!" && <span className="backtologin" onClick={() => document.location.href = "/"
        }>Please go back to login</span>}</p>
      </div>
    </Toast>
  )
}

export default ToastComponent;
