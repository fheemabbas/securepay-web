import React, { useEffect } from "react";
import { connect } from "react-redux";
import Scrollbars from "react-custom-scrollbars";
import { withRouter, Link } from "react-router-dom";
import Message from "../../../util/message";
import Constant from "../../../util/constant";
import { showToast, showLoader, hideLoader } from "../../../state/ducks/utils/operations";
import HookForm from "../../../components/HookForm/HookForm";
import CheckBox from "../../../components/UI/CheckBox/CheckBox";
import TextField from "../../../components/UI/TextField/TextField";
import CustomButton from "../../../components/UI/CustomButton/CustomButton";
import useWindowDimension from "../../../hooks/useWindowDimension";
import {
  login,
  initializeSession,
  setUser,
  loginWithGoogleSocial, loginWithFaceBookSocial
} from "./../../../state/ducks/auth/operations";
import "./Login.scss";
import StorageService from "../../../services/localstorage.service";
import { createUserForNotification } from "../../../config/pubnub";
import { get } from "lodash";
import "./Login.scss";
import SocialButton from "../../../components/IndividualForm/SociaButton/SociaButton";
import MetaTags from 'react-meta-tags';
import logo from '../../../assets/images/trustpay1.png';

const loginForm = {
  email: {
    name: "email",
    validate: {
      required: {
        value: true,
        message: Message.ERRORMESSAGE.EMAILEMPTY,
      },
      pattern: {
        value: Constant.REGEX.email,
        message: Message.ERRORMESSAGE.EMAILINVALID,
      },
    },
  },
  password: {
    name: "password",
    validate: {
      required: {
        value: true,
        message: Message.ERRORMESSAGE.PASSWORDEMPTY,
      },
    },
  },
};

function Login(props) {
  const dimensions = useWindowDimension();
  const [form, setLoginForm] = React.useState();
  const [showPass, setShowPass] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const handleGoogleLogin = async (Socialuser, err, provider) => {
    if (Socialuser) {
      let param = { email: Socialuser._profile.email }
      let res;
      props.showLoader();
      param = provider === 'gmailId' ? { ...param, gmailId: Socialuser._profile.id } : { ...param, facebookId: Socialuser._profile.id }
      try {
        res = provider === 'gmailId' ? await props.loginWithGoogleSocial(param) : await props.loginWithFaceBookSocial(param)
        const { user, register_status, tokens } = res.payload
        if (register_status && user.registerComplete) {
          props.initializeSession({ user, tokens });
          StorageService.setItem('activeTab', "Client")
          props.history.push("/verifyotp")
          // props.history.push("/payments")
          createUserForNotification(user)
          props.showToast({
            message: res.message,
            type: "success",
          });

        } else if (register_status && !user.registerComplete) {
          props.history.push({
            pathname: '/signup-with-social',
            state: { user: user, step: user.registerStep === 1 ? 2 : user.registerStep === 3 ? 4 : user.registerStep, isLogin: true }
          })
        } else {
          props.history.push({
            pathname: '/signup-with-social',
            state: { user: Socialuser._profile, provider: provider }
          })
          props.hideLoader()
          props.showToast({
            message: "We will need additional information to register your account.",
            type: "success",
          });
        }
        props.hideLoader()
      } catch (error) {
        props.hideLoader()
        props.showToast({
          message: error?.response?.data?.message,
          type: "error",
        });
      }
    } else {
    }
  }
  useEffect(() => {
    setRememberMe(StorageService.getSessionItem("YataPay_remember_me"));
  }, []);
  const onFormSubmit = async (data) => {
    try {
      let param = {
        email: data.email,
        password: data.password,
        role: 3,
      };
      setBusy(true);
      let response = await props.login(param);
      const { payload, message } = response;
      const { user, tokens } = payload;
      setBusy(true);
      props.initializeSession({ user, tokens });
      if (rememberMe) {
        StorageService.setSessionItem("YataPay_email", data.email);
        StorageService.setSessionItem("YataPay_password", data.password);
        StorageService.setSessionItem("loginRole", "CUSTOMER");
      } else {
        StorageService.removeSessionItem("YataPay_email");
        StorageService.removeSessionItem("YataPay_password");
      }
      StorageService.setSessionItem("YataPay_remember_me", rememberMe);
      if (user.registerComplete) {
        StorageService.setItem('activeTab', "Client")
        props.history.push("/verifyotp");
        // props.history.push("/payments");
        createUserForNotification(user)
      } else {
        let userRidirect = user.accountType === 1 ? "/signup-individual" : "/signup-organisation"
        // props.history.push(userRidirect, state: { user: user, step: user.registerStep + 1 });
        props.setUser(user._id)
        props.history.push({
          pathname: userRidirect,
          state: { user: user, step: user.registerStep === 4 ? 5 : user.registerStep, isLogin: true }
        })
      }
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
    <div className="loginPage">
      <MetaTags>
        <title>Welcome Back To Securepay - Sign In To Your Account</title>
        <meta
          name="description"
          content="Sign in to Securepay to track the progress of your recent transactions, access our customer support system, and more. Don't have an account? Sign up today."
        />
      </MetaTags>
      <Scrollbars
        className="loginScroll"
        style={{ height: dimensions.height + "px" }}
      >
        <div className="loginCenter">
          <div className="loginBox">
            <div className="logo">
              <img src={logo} alt="logo" width='100' />
              {/* <span className="icon-yatapay-brand"></span> */}
            </div>
            <h1>Welcome back!</h1>
            <div className="tabMain">
              <div className="formSection">
                <div className="form">
                  <HookForm
                    defaultForm={{
                      email: StorageService.getSessionItem("YataPay_email"),
                      password: StorageService.getSessionItem("YataPay_password"),
                    }}
                    init={(form) => {
                      setLoginForm(form);
                      StorageService.getSessionItem("YataPay_email") && form.trigger();
                    }}
                    onSubmit={(e) => onFormSubmit(e)}
                  >
                    {(formMethod) => {
                      return (
                        <>
                          <TextField
                            formMethod={formMethod}
                            rules={loginForm.email.validate}
                            name={loginForm.email.name}
                            errors={formMethod?.errors}
                            autoFocus={true}
                            type="text"
                            placeholder="Email address"
                          />
                          <TextField
                            formMethod={formMethod}
                            rules={loginForm.password.validate}
                            name={loginForm.password.name}
                            errors={formMethod?.errors}
                            type={showPass ? "text" : "password"}
                            placeholder="Password"
                            iconClass={showPass ? "eye-hide" : "eye-show"}
                            // onKeyDown={onKeyDown}
                            onIconClick={() => setShowPass(!showPass)}
                          />
                          <div className="custombtnfield">
                            <CustomButton
                              type="submit"
                              title="Sign in"
                              disabled={!formMethod?.formState.isValid}
                              loading={busy}
                            />
                          </div>
                        </>
                      );
                    }}
                  </HookForm>
                  <div className="checkboxRow">
                    <CheckBox
                      id="remember"
                      labelTitle="Remember me"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked)}
                    ></CheckBox>
                    <div className="forgotLink">
                      <Link to="/forgot-password">Forgot password?</Link>
                    </div>
                  </div>
                  <div className="loginwithgoogle">
                    <p>Or</p>
                    <SocialButton icon="icon-google" className="loginwith" appId={process.env.REACT_APP_GOOGLE_KEY} handleSocialLogin={(user, err) => handleGoogleLogin(user, err, 'gmailId')} lable="Sign in using Google" provider="google" />
                    <SocialButton icon="icon-facebook" className="loginwith" appId={process.env.REACT_APP_FACEBOOK_KEY} handleSocialLogin={(user, err) => handleGoogleLogin(user, err, 'facebookId')} lable="Sign in using Facebook" provider="facebook" />
                  </div>
                  <Link className="newuser" to="/sign-up">
                    New to SecurePay?
                  </Link>
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
  showToast,
  login,
  initializeSession, setUser, loginWithGoogleSocial, loginWithFaceBookSocial, showLoader, hideLoader
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
