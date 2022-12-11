import React from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import CustomButton from '../../components/UI/CustomButton/CustomButton';
import { showToast } from "../../state/ducks/utils/operations";
import './AlertModal.scss';

const AlertModal = (props) => {
  let { titleConfirm = 'Yes', titleCancel = 'No' } = props
  const [busy, setBusy] = React.useState(false)

  const onFormSubmit = () => {
    setBusy(true)

    setTimeout(() => {
      setBusy(false)
      props.onHide()
      props.showToast({ message: props.message || 'Staff member have been deleted successfully', type: 'success' })
    },
      1000)

  }
  return (

    <div className='messageSection'>
      <p className='title'>{props.title}</p>
      <p className='innerTxt'>{props.innerTxt}</p>
      <div className='customBtn'>
        <CustomButton title={titleConfirm} onClick={() => props.onConfirmClick() || onFormSubmit} loading={busy} ></CustomButton>
        <CustomButton title={titleCancel} onClick={() => props.onHide()}></CustomButton>
      </div>
    </div >
  )

}


const mapStateToProps = (state) => {
  return {}
};

const mapDispatchToProps = {

  showToast
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AlertModal));

