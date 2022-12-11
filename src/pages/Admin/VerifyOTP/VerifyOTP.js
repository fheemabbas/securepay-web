import React from "react";
import { connect } from "react-redux";
import Scrollbars from "react-custom-scrollbars";
import { withRouter, Link } from "react-router-dom";
import Message from "../../../util/message";
import Constant from "../../../util/constant";
import { showToast, showLoader, hideLoader } from "../../../state/ducks/utils/operations";
import HookForm from "../../../components/HookForm/HookForm";
import TextField from "../../../components/UI/TextField/TextField";
import CustomButton from "../../../components/UI/CustomButton/CustomButton";
import useWindowDimension from "../../../hooks/useWindowDimension";
import {
    verifyAuthOTP,
} from "./../../../state/ducks/auth/operations";
import "./VerifyOTP.scss";
import { get } from "lodash";
import MetaTags from 'react-meta-tags';

const loginForm = {
    OTP: {
        name: "OTP",
        validate: {
            required: {
                value: true,
                message: Message.ERRORMESSAGE.OTPEMPTY,
            },
        }
    }
};

function AdminVerifyOTP(props) {
    const dimensions = useWindowDimension();
    const [form, setLoginForm] = React.useState();
    const [busy, setBusy] = React.useState(false);

    const onFormSubmit = async (data) => {
        console.log('Data : ', data);
        try {
            setBusy(true);
            let param = {
                "verifyOtp": data.OTP
            }
            let response = await props.verifyAuthOTP(param);
            const { message } = response;
            props.history.push("/admin/dashboard");
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


    };

    return (
        <div className="verifyPage">
            <MetaTags>
                <title>Welcome Back To YataPay - Sign In To Your Account</title>
                <meta name="description" content="Sign in to YataPay to track the progress of your recent transactions, access our customer support system, and more. Don't have an account? Sign up today." />
                <meta property="og:title" content="Welcome Back To YataPay - Sign In To Your Account" />
                <meta property="og:image" content="https://res.cloudinary.com/zudu/image/upload/v1624874576/Yatapay/yatapay.png" />
            </MetaTags>
            <Scrollbars
                className="loginScroll"
                style={{ height: dimensions.height + "px" }}
            >
                <div className="loginCenter">
                    <div className="loginBox">
                        <div className="logo">
                            <span className="icon-yatapay-brand"></span>
                        </div>
                        <h1>Verify OTP</h1>
                        <div className="tabMain">
                            <div className="formSection">
                                <div className="form">
                                    <HookForm
                                        defaultForm={{
                                            // email: StorageService.getSessionItem("YataPay_email"),
                                            // password: StorageService.getSessionItem("YataPay_password"),
                                        }}
                                        init={(form) => {
                                            // setLoginForm(form);
                                            // StorageService.getSessionItem("YataPay_email") && form.trigger();
                                        }}
                                        onSubmit={(e) => onFormSubmit(e)}
                                    >
                                        {(formMethod) => {
                                            console.log('Valid : ', formMethod ?.formState.isValid, formMethod ?.watch(loginForm.OTP.name) ?.toString().length)

                                            const validateNumber = (value, name) => {
                                                value = value.replace(/\D/g, "");
                                                let temp = parseInt(value);

                                                if (!isNaN(temp)) {
                                                    formMethod.setValue(name, temp);
                                                    if (!temp > 0) {
                                                        formMethod.setValue(name, "");
                                                    }
                                                } else {
                                                    formMethod.setValue(name, "");
                                                }
                                            };

                                            return (
                                                <>
                                                    <TextField
                                                        formMethod={formMethod}
                                                        rules={loginForm.OTP.validate}
                                                        name={loginForm.OTP.name}
                                                        errors={formMethod ?.errors}
                                                        autoFocus={true}
                                                        // type="number"
                                                        maxLength={6}
                                                        // minLength={6}
                                                        placeholder="Enter 6 digit OTP"
                                                        onChange={(e) => {
                                                            validateNumber(e.target.value, loginForm.OTP.name);
                                                        }}
                                                    />
                                                    <div className="custombtnfield">
                                                        <CustomButton
                                                            type="submit"
                                                            title="Verify OTP"
                                                            disabled={!(formMethod ?.formState.isValid && formMethod ?.watch(loginForm.OTP.name) ?.toString().length === 6)}
                                                            loading={busy}
                                                        />
                                                    </div>
                                                </>
                                            );
                                        }}
                                    </HookForm>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Scrollbars>
        </div>
    );
}
const mapStateToProps = (state) => {
    return {};
};
const mapDispatchToProps = {
    showToast, verifyAuthOTP, showLoader, hideLoader
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminVerifyOTP));
