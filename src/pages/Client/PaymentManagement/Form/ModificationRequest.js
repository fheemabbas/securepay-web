import React from "react";
import { Controller } from 'react-hook-form';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import HookForm from '../../../../components/HookForm/HookForm';
import TextField from '../../../../components/UI/TextField/TextField';
import Label from '../../../../components/UI/Label/Label';
import CustomButton from '../../../../components/UI/CustomButton/CustomButton';

import { jobModificationRequest } from "../../../../state/ducks/Job/actions";
import { showToast, hideLoader, showLoader } from "../../../../state/ducks/utils/operations";
// import Calender from "../../../../components/UI/Calender/Calender";

import Message from '../../../../util/message';
// import Constant from "../../../../util/constant";
import { get } from "lodash";
import './ModificationRequest.scss';

const requestForm = {
    message: {
        name: 'message',
        validate: {
            required: {
                value: true,
                message: ((Message.ERRORMESSAGE.MESSAGEEMPTY))
            },
        },
    }
}

const ModificationRequest = (props) => {
    const [form, setForm] = React.useState()
    const [busy, setBusy] = React.useState(false)

    const onFormSubmit = (data) => {

        props.showLoader()
        props.jobModificationRequest({ jobId: props.jobId, note: data.message }).then((res) => {
            props.hideLoader()
            props.onHide()
            setTimeout(() => {
                props.showToast({
                    message: res.message,
                    type: "success",
                });
            }, 1000);

        }).catch((error) => {
            props.hideLoader()
            props.showToast({
                message: get(error, "response.data.message", "somthing want wrong!!!"),
                type: "error",
            });
        });

    }

    return (
        <div className='rejection_note' >
            <HookForm
                defaultForm={{}}
                init={form => setForm(form)}
                onSubmit={onFormSubmit}>
                {(formMethod) => {
                    return (
                        <div className="form">
                            <Label title='Transaction Modification Request'></Label>
                            <div className='filterItem'>
                                <TextField
                                    formMethod={formMethod}
                                    rules={requestForm.message.validate}
                                    name={requestForm.message.name}
                                    errors={formMethod?.errors}
                                    autoFocus={true}
                                    type="text"
                                    placeholder="Please enter transaction modification note"
                                    textarea="textarea"
                                />
                                <div className="custombtnfield">
                                    <CustomButton className="" type="submit" title="Submit" disabled={!formMethod?.formState.isValid} loading={busy} />
                                </div>
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
    jobModificationRequest,
    hideLoader,
    showLoader,
    showToast
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ModificationRequest));


