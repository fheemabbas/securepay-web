import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PhoneInput from 'react-phone-input-2';
import { Controller, get } from 'react-hook-form';
import HookForm from '../../../../components/HookForm/HookForm';
import TextField from '../../../../components/UI/TextField/TextField';
import Label from '../../../../components/UI/Label/Label';
import CustomButton from '../../../../components/UI/CustomButton/CustomButton';
// import FileUpload from "../../../../components/FileUpload/FileUpload";
import { showToast } from "../../../../state/ducks/utils/operations";

import Message from '../../../../util/message';
import Constant from "../../../../util/constant";
import 'react-phone-input-2/lib/style.css';

import './StaffMemberForm.scss';
import { addStaffMember, editStaffMember } from "../../../../state/ducks/Job/actions";
const staffForm = {
    firstName: {
        name: 'firstName',
        validate: {
            required: {
                value: true,
                message: ((Message.ERRORMESSAGE.EMPTYFIELD))
            }, pattern: {
                value: Constant.REGEX.ALPHANUMERIC,
                message: ((Message.ERRORMESSAGE.ALFANUMINVALID))
            }
        },
    },
    lastName: {
        name: 'lastName',
        validate: {
            required: {
                value: true,
                message: ((Message.ERRORMESSAGE.EMPTYFIELD))
            }, pattern: {
                value: Constant.REGEX.ALPHANUMERIC,
                message: ((Message.ERRORMESSAGE.ALFANUMINVALID))
            }
        },
    },
    email: {
        name: 'email',
        validate: {
            required: {
                value: true,
                message: ((Message.ERRORMESSAGE.EMPTYFIELD))
            }, pattern: {
                value: Constant.REGEX.email,
                message: ((Message.ERRORMESSAGE.EMAILINVALID))
            }
        },
    },

    phoneNumber: {
        name: 'phoneNumber',
        validate: {
            required: {
                value: true,
                message: ((Message.ERRORMESSAGE.EMPTYFIELD))
            },
            maxLength: { value: 13, message: ((Message.ERRORMESSAGE.PHONEVALID)) },
            minLength: { value: 10, message: ((Message.ERRORMESSAGE.PHONEVALID)) }
        },
    },
    cunrtyCode: {
        name: 'cunrtyCode',
        validate: {
        },
    },
}

const StaffMemberForm = (props) => {
    // let [showImageName, setShowImageName] = useState()
    const { isEdit, EditStaffMember } = props
    const [form, setLoginForm] = React.useState()
    const [busy, setBusy] = React.useState(false)
    const number = isEdit && EditStaffMember?.contactNumber?.split(")")[1];
    const countryCode = isEdit && EditStaffMember?.contactNumber?.split("(")[1].split(")")[0]
    const onFormSubmit = async (data) => {
        let param = {
            dialCode: data.cunrtyCode.includes('+') ? data.cunrtyCode : `+${data.cunrtyCode}`,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            number: data.phoneNumber
        }
        setBusy(true)
        try {
            const res = isEdit ? await props.editStaffMember(EditStaffMember._id, param) : await props.addStaffMember(param)
            setBusy(false)
            props.onHide()
            props.isAPIcall()
            props.showToast({ message: res.message, type: 'success' })
        } catch (error) {
            setBusy(false)
            props.onHide()
            props.showToast({ message: error?.response?.data?.message, type: 'success' })
        }
    }
    return (
        <div className='StaffMemberForm' >
            <HookForm
                defaultForm={{}}
                init={form => setLoginForm(form)}
                onSubmit={onFormSubmit}>
                {(formMethod) => {
                    return (
                        <div className="form">
                            <Label title='Add Staff Member'></Label>
                            <TextField
                                formMethod={formMethod}
                                rules={staffForm.firstName.validate}
                                name={staffForm.firstName.name}
                                errors={formMethod?.errors}
                                autoFocus={true}
                                type="text"
                                placeholder="First name*"
                                defaultValue={isEdit && EditStaffMember?.firstName}
                            />
                            <TextField
                                formMethod={formMethod}
                                rules={staffForm.lastName.validate}
                                name={staffForm.lastName.name}
                                errors={formMethod?.errors}
                                autoFocus={true}
                                type="text"
                                placeholder="Last name*"
                                defaultValue={isEdit && EditStaffMember?.lastName}
                            />
                            <TextField
                                formMethod={formMethod}
                                rules={staffForm.email.validate}
                                name={staffForm.email.name}
                                errors={formMethod?.errors}
                                type="text"
                                placeholder="Email address*"
                                defaultValue={isEdit && EditStaffMember?.email}
                            // disabled
                            />
                            <div className="countryPhoneGroup">
                                <Controller
                                    defaultValue={isEdit ? countryCode : "+44"}
                                    control={formMethod?.control}
                                    name={staffForm.cunrtyCode.name}
                                    rules={staffForm.cunrtyCode.validate}
                                    render={(props) => (
                                        <PhoneInput
                                            country={"gb"}
                                            disableSearchIcon="false"
                                            placeholder="+44"
                                            enableSearch="true"
                                            value={formMethod.watch(
                                                staffForm.cunrtyCode.name
                                            )}
                                            onChange={props.onChange}
                                        />
                                    )} />
                                <TextField
                                    redStar={true}
                                    noTextfield={true}
                                    onChange={(e) => this.onPhoneChange(formMethod, e)}
                                    maskType="9999999999999"
                                    formMethod={formMethod}
                                    rules={staffForm.phoneNumber.validate}
                                    name={staffForm.phoneNumber.name}
                                    errors={formMethod?.errors}
                                    placeholder="Phone Number*"
                                    defaultValue={isEdit && number}
                                />
                            </div>


                            <div className="custombtnfield">
                                <CustomButton type="submit" title={isEdit ? "Update" : "Submit"} disabled={!formMethod?.formState.isValid} loading={busy} />
                                <CustomButton type="button" title="Cancel" onClick={() => props.onHide()} />
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
    showToast, addStaffMember, editStaffMember
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StaffMemberForm));


