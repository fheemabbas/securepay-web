import React, { useState } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import CustomButton from '../UI/CustomButton/CustomButton';
import HookForm from '../HookForm/HookForm';
import RadioButton from '../UI/RadioButton/RadioButton';
import { showToast } from "../../state/ducks/utils/operations";

import './ConfirmModal.scss';



const ConfirmModal = (props) => {
  let { titleConfirm = 'Yes' } = props
  const [form, setFilterForm] = React.useState()
  const [confirmType, setConfirmType] = useState('Yes');
  const [busy, setBusy] = React.useState(false)
  const onFormSubmit = () => {
    setBusy(true)
    setTimeout(() => {
      setBusy(false)
      props.onHide()
      props.showToast({ message: 'Transaction release request for this milestone is sent successfully!', type: 'success' })
    },
      1000)

  }

  const radioChangeHandler = (event) => {
    setConfirmType(event.target.value);
  }

  return (

    <div className='messageSection'>
      <p className='mainTitle'>{props.title}</p>
      <HookForm
        defaultForm={{}}
        init={form => setFilterForm(form)}
        onSubmit={onFormSubmit}>
        {(formMethod) => {
          return (
            <div className='innerSection'>
              <div className="confirmRadio">
                <RadioButton
                  changed={radioChangeHandler}
                  id="1"
                  isSelected={confirmType === "Yes"}
                  label="Yes"
                  value="Yes"
                />
                <RadioButton
                  changed={radioChangeHandler}
                  id="2"
                  isSelected={confirmType === "No"}
                  label="No"
                  value="No"
                />
              </div>
              <div className='custBtn'>
                <CustomButton title={titleConfirm} onClick={onFormSubmit} loading={busy}></CustomButton>
              </div>
            </div>
          )
        }}
      </HookForm>
    </div>
  )
}


const mapStateToProps = (state) => {
  return {}
};

const mapDispatchToProps = {

  showToast
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ConfirmModal));
