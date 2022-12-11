import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PhoneInput from 'react-phone-input-2';
import { Controller } from 'react-hook-form';
import HookForm from '../../../../components/HookForm/HookForm';
import TextField from '../../../../components/UI/TextField/TextField';
import Label from '../../../../components/UI/Label/Label';
import ModalPopup from '../../../../components/ModalPopup/ModalPopup';
import { showToast } from "../../../../state/ducks/utils/operations";
import Message from '../../../../util/message';
import Constant from "../../../../util/constant";

import './UpateCommissionRate.scss';
import { Link } from "react-router-dom";


const UpateCommissionRate = (props) => {
    const [busy, setBusy] = React.useState(false)
    return (
        <div className='update_commission' >
            <Label title='Commission Rate'></Label>
            <div className="txt_row"><span>15%</span> of Payments under  <span>£1,100</span></div>
            <div className="txt_row"><span>10%</span> of Payments under  <span>£5,100</span></div>
            <div className="txt_row"><span>5%</span> of Payments under  <span>£50,000</span></div>
            <div className="btn_row">
                <button className="edit_btn">Edit</button>
            </div>
        </div>
    )
}



const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = {

    showToast
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UpateCommissionRate));


