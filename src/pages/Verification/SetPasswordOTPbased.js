import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams, withRouter } from "react-router-dom";
import Scrollbars from "react-custom-scrollbars";

import { showToast } from "../../state/ducks/utils/operations";
import { get } from "lodash";
import HookForm from "../../components/HookForm/HookForm";
import TextField from "../../components/UI/TextField/TextField";
import CustomButton from "../../components/UI/CustomButton/CustomButton";
import Message from "../../util/message";
import Constant from "../../util/constant";

import "./SetPasswordOTPbased.scss";
import {
    verifySetPasswordLink,
    setPassword,
} from "../../state/ducks/auth/operations";

const multiErrorFields = [
    { length: "Your password must be at least 8 characters long and contain:" },
    { hasUppercase: "1 upper case character" },
    { hasLowercase: "1 lower case character " },
    { hasSpecialChar: "1 Special Character" },
    { hasNumbers: "1 Number" },
    { hasName: "Password should not contain first and last name" },
];

const setPasswordWithOTP = {
    varificationCode: {
        name: "varificationCode",
        validate: {
            required: {
                value: true,
                message: Message.ERRORMESSAGE.EMPTYFIELD,
            },
            minLength: { value: 6, message: "Verification code must be 6 digits." },
        },
    },
    password: {
        name: "password",
        validate: {
            required: {
                value: true,
                message: Message.ERRORMESSAGE.NEWPASSOWRD,
            },
            validate: {
                length: (value) =>
                    (value && value.length >= 8) ||
                    "Password must be minimum of 8 characters",
                hasUppercase: (value) =>
                    (value &&
                        value.match(
                            Constant.REGEX.UPPERCASE
                        )) ||
                    "1 upper case character",
                hasLowercase: (value) =>
                    (value &&
                        value.match(
                            Constant.REGEX.LOWERCASE
                        )) ||
                    "1 lower case character",
                hasSpecialChar: (value) =>
                    (value &&
                        value.match(Constant.REGEX.SPECIAL_CHAR)) ||
                    "1 Special Character",
                hasNumbers: (value) =>
                    (value && value.match(Constant.REGEX.NUMBER)) ||
                    "1 Number",
            },
        },
    },
    confirmPassword: {
        name: "confirmPassword",
        validate: {
            required: {
                value: true,
                message: Message.ERRORMESSAGE.CONFIRMPASSWORD,
            },
        },
    },
};

function SetPasswordWithOTP(props) {
    const [dimensions, setDimensions] = React.useState({
        height: window.innerHeight,
        width: window.innerWidth,
    });

    const [form, setLoginForm] = React.useState();
    const [showPass, setShowPass] = React.useState(false);
    const [showConfirmPass, setShowConfirmPass] = React.useState(false);
    const [busy, setBusy] = React.useState(false);
    const [tokenValid, setTokenValid] = React.useState("");
    const [userDetails, setuserDetails] = React.useState();
    let token;
    React.useEffect(() => {
        function handleResize() {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth,
            });
        }

        window.addEventListener("resize", handleResize);

        return (_) => {
            window.removeEventListener("resize", handleResize);
        };
    });

    const onKeyDown = (e) => {
        e.keyCode === 13 && onFormSubmit();
    };
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search); // eslint-disable-next-line
        token = urlParams.get("token");

        props.verifySetPasswordLink(token).then((res) => {

            setTokenValid(token);
            setuserDetails(get(res, 'payload'))
        });
    }, []);
    const onFormSubmit = async (data) => {
        // const param = { password: data.password };
        setBusy(true);

        data && props
            .setPassword({ password: data.password, otp: data.varificationCode }, tokenValid)
            .then((response) => {
                props.showToast({
                    message: response.message,
                    type: "success",
                });
                setTimeout(() => {
                    setBusy(false);
                    props.history.push("/admin/login");
                }, 1000);
            })
            .catch((error) => {
                props.showToast({
                    message: error?.response?.data?.message,
                    type: "error",
                });
                setTimeout(() => {
                    setBusy(false);
                }, 1000);
            });

        // setTimeout(() => {
        //   props.showToast({
        //     message: "You have successfully reset your password",
        //     type: "success",
        //   });
        //   props.history.push("/dashboard");
        // }, 1000);
    };

    return (
        <div className="resetPage" style={{ height: dimensions.height + "px" }}>
            <Scrollbars className="resetScroll">
                <div className="resetCenter">
                    <div className="resetBox">
                        <div className="logo">
                            {/* <img width="66" height="93" src={logo} alt="image" /> */}
                            <span className="icon-yatapay-brand"></span>
                        </div>
                        <h1>Set password</h1>
                        <p>Please enter a varification code and new password below</p>
                        <div className="formSection">
                            <HookForm
                                defaultForm={{}}
                                init={(form) => setLoginForm(form)}
                                onSubmit={onFormSubmit}
                            >
                                {(formMethod) => {
                                    return (
                                        <div className="form">
                                            <TextField
                                                formMethod={formMethod}
                                                redStar={true}
                                                noTextfield={true}
                                                maskType="999999"
                                                rules={setPasswordWithOTP.varificationCode.validate}
                                                name={setPasswordWithOTP.varificationCode.name}
                                                errors={formMethod?.errors}
                                                placeholder="Verifiation code"
                                            // onKeyDown={onKeyDown}    
                                            />
                                            <TextField
                                                formMethod={formMethod}
                                                type={showPass ? "text" : "password"}
                                                rules={{
                                                    validate: {
                                                        length: (value) =>
                                                            (value && value.length >= 8) ||
                                                            "Password must be minimum of 8 characters",
                                                        hasUppercase: (value) =>
                                                            (value &&
                                                                value.match(
                                                                    Constant.REGEX.LOWERCASE_UPPERCASE
                                                                )) ||
                                                            "1 Lower and Uppercase",
                                                        hasSpecialChar: (value) =>
                                                            (value &&
                                                                value.match(
                                                                    Constant.REGEX.SPECIAL_CHAR
                                                                )) ||
                                                            "1 Special Character",
                                                        hasNumbers: (value) =>
                                                            (value &&
                                                                value.match(Constant.REGEX.NUMBER)) ||
                                                            "1 Number",
                                                        hasName: (value) =>
                                                            (value &&
                                                                value.indexOf(
                                                                    userDetails?.firstName
                                                                ) === -1 &&
                                                                value.indexOf(
                                                                    userDetails?.lastName
                                                                ) === -1) ||
                                                            "Password should not contain first and last name",
                                                    },
                                                }}
                                                multiErrorFields={multiErrorFields}
                                                name={setPasswordWithOTP.password.name}
                                                errors={formMethod?.errors}
                                                showHidePasswordNew={() => this.showHidePasswordNew()}
                                                placeholder="New password"
                                                iconClass={showPass ? "eye-hide" : "eye-show"}
                                                onChange={() =>
                                                    formMethod.watch("confirmPassword") &&
                                                    formMethod.trigger("confirmPassword")
                                                }
                                                onKeyDown={onKeyDown}
                                                onIconClick={() => setShowPass(!showPass)}
                                            />

                                            <TextField
                                                formMethod={formMethod}
                                                rules={{
                                                    required: {
                                                        value: true,
                                                        message: Message.ERRORMESSAGE.CONFIRMPASSWORD,
                                                    },
                                                    validate: {
                                                        matchPassword: (value) =>
                                                            (value &&
                                                                value === formMethod.watch("password")) ||
                                                            Message.ERRORMESSAGE.CONFIRMINVALID,
                                                    },
                                                }}
                                                name={setPasswordWithOTP.confirmPassword.name}
                                                errors={formMethod?.errors}
                                                type={showConfirmPass ? "text" : "password"}
                                                showHidePasswordConf={() => this.showHidePasswordConf()}
                                                placeholder="Confirm password"
                                                iconClass={showConfirmPass ? "eye-hide" : "eye-show"}
                                                onChange={() =>
                                                    formMethod.watch("password") &&
                                                    formMethod.trigger("password")
                                                }
                                                onKeyDown={onKeyDown}
                                                onIconClick={() => setShowConfirmPass(!showConfirmPass)}
                                            />
                                            <div className="custombtnfield">
                                                <CustomButton
                                                    type="submit"
                                                    title="Set password"
                                                    disabled={!formMethod?.formState.isValid}
                                                    loading={busy}
                                                />
                                            </div>
                                        </div>
                                    );
                                }}
                            </HookForm>
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
    showToast,
    verifySetPasswordLink,
    setPassword,
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(SetPasswordWithOTP)
);
