import React from 'react';
import { Fade, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';


import './ModalPopup.scss';

const ModalPopup = (props) => {
  return (
    <Modal
      className={'modalPopup ' + props.className}
      show={props.showModal}
      animation={Fade}
      onHide={() => props.onHide()}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >

      <div className="modalInner">
        <Modal.Body>
          {props.closeIcon &&
            <Link to="#" onClick={() => { props.onHide() }} className="closeBtn"><i className="icon-close"></i></Link>
          }
          {props ?.children}
        </Modal.Body>
      </div>

    </Modal >
  )

}
ModalPopup.defaultProps = {
  className: 'modalPopup',
}

export default (ModalPopup);