import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PhoneInput from 'react-phone-input-2';
import { Controller } from 'react-hook-form';
import HookForm from '../../../../components/HookForm/HookForm';
import TextField from '../../../../components/UI/TextField/TextField';
import Label from '../../../../components/UI/Label/Label';
import CustomButton from '../../../../components/UI/CustomButton/CustomButton';
import FileUpload from "../../../../components/FileUpload/FileUpload";
import { showToast } from "../../../../state/ducks/utils/operations";
import { invitaUser } from "../../../../state/ducks/auth/operations";
import Message from '../../../../util/message';
import Constant from "../../../../util/constant";
import { get } from "lodash";
import './JobInvitationForm.scss';
import { Link } from "react-router-dom";
const jobInvitationForm = {
    firstName: {
        name: 'firstName',
        validate: {
            required: {
                value: true,
                message: ((Message.ERRORMESSAGE.FIRSTNAMEEMPTY))
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
                message: ((Message.ERRORMESSAGE.LASTNAMEEMPTY))
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
                message: ((Message.ERRORMESSAGE.EMAILEMPTY))
            }, pattern: {
                value: Constant.REGEX.email,
                message: ((Message.ERRORMESSAGE.EMAILINVALID))
            }
        },
    },
    phoneNumber: {
        name: "phoneNumber",
        validate: {
            maxLength: {
                value: 13,
                message: "Telephone number must be between 10-13 digits",
            },
            minLength: {
                value: 10,
                message: "Telephone number must be between 10-13 digits",
            },
        },
    },
    countryCode: {
        name: "countryCode",
        value: "44",
        validate: {},
    }
    // commission: {
    //     name: 'commission',
    //     validate: {
    //         required: {
    //             value: true,
    //             message: ((Message.ERRORMESSAGE.COMMISSIONEMPTY))
    //         },
    //         pattern: {
    //             value: Constant.REGEX.AMOUNT,
    //             message: ((Message.ERRORMESSAGE.MAXINVALID))
    //         }
    //     },
    // },
}

const JobInvitationForm = (props) => {
    let [showImageName, setShowImageName] = useState()
    const [form, setLoginForm] = React.useState()
    const [busy, setBusy] = React.useState(false)

    const onFormSubmit = async (data) => {
        try {
            setBusy(true);
            console.log(data)
            let param = {
                "firstName": data.firstName,
                "lastName": data.lastName,
                "email": data.email,
                "number": data.phoneNumber,
                "dialCode": data.countryCode ? data.countryCode : '44'
            }
            let response = await props.invitaUser(param);
            const { message } = response;
            props.isRefresh()
            setTimeout(() => {
                setBusy(false)
                props.showToast({
                    message: message,
                    type: "success",
                });
            }, 1000);
        } catch (err) {
            setBusy(false);
            props.showToast({
                message: get(err, "response.data.message", "somthing want wrong!!!"),
                type: "error",
            });
        }

    }

    return (
        <div className='JobInvitationForm' >
            <HookForm
                defaultForm={{}}
                init={form => setLoginForm(form)}
                onSubmit={onFormSubmit}>
                {(formMethod) => {
                    return (
                        <div className="form">
                            <Label title='User Invitation'></Label>
                            <TextField
                                formMethod={formMethod}
                                rules={jobInvitationForm.firstName.validate}
                                name={jobInvitationForm.firstName.name}
                                errors={formMethod ?.errors}
                                autoFocus={true}
                                type="text"
                                placeholder="First Name*"
                            // defaultValue="John"
                            />
                            <TextField
                                formMethod={formMethod}
                                rules={jobInvitationForm.lastName.validate}
                                name={jobInvitationForm.lastName.name}
                                errors={formMethod ?.errors}
                                autoFocus={true}
                                type="text"
                                placeholder="Last Name*"
                            />
                            <TextField
                                formMethod={formMethod}
                                rules={jobInvitationForm.email.validate}
                                name={jobInvitationForm.email.name}
                                errors={formMethod ?.errors}
                                type="text"
                                placeholder="Email Id*"
                            />
                            {/* <TextField
                                formMethod={formMethod}
                                rules={jobInvitationForm.jobtitle.validate}
                                name={jobInvitationForm.jobtitle.name}
                                errors={formMethod ?.errors}
                                autoFocus={true}
                                type="text"
                                placeholder="Job title*"
                            /> */}
                            <div className="countryPhoneGroup">
                                <Controller
                                    control={formMethod ?.control}
                                    name={jobInvitationForm.countryCode.name}
                                    rules={jobInvitationForm.countryCode.validate}
                                    render={(props) => (
                                        <PhoneInput
                                            country={"gb"}
                                            disableSearchIcon="false"
                                            placeholder="+44"
                                            enableSearch="true"
                                            value={formMethod.watch(
                                                jobInvitationForm.countryCode.name
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
                                    rules={jobInvitationForm.phoneNumber.validate}
                                    name={jobInvitationForm.phoneNumber.name}
                                    errors={formMethod ?.errors}
                                    placeholder="Phone Number"
                                />
                            </div>
                            {/* <TextField
                                formMethod={formMethod}
                                rules={jobInvitationForm.commission.validate}
                                name={jobInvitationForm.commission.name}
                                errors={formMethod?.errors}
                                autoFocus={false}
                                type="text"
                                placeholder="% of admin commission*"
                            /> */}


                            <div className="custombtnfield">
                                <CustomButton type="submit" title="Invite" disabled={!formMethod ?.formState.isValid} loading={busy} />
                                <CustomButton type="button" title="Cancel" />
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
    invitaUser,
    showToast
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(JobInvitationForm));


