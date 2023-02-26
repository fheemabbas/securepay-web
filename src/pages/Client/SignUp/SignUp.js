import React from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { withRouter, Link } from 'react-router-dom';
import HookForm from '../../../components/HookForm/HookForm';
import useWindowDimension from "../../../hooks/useWindowDimension";
import './SignUp.scss';
import SocialButton from '../../../components/IndividualForm/SociaButton/SociaButton';
import {
  login,
  initializeSession,
  setUser,
  loginWithGoogleSocial, loginWithFaceBookSocial
} from "./../../../state/ducks/auth/operations";
import { connect } from 'react-redux';
import { hideLoader, showLoader, showToast } from '../../../state/ducks/utils/actions';
import MetaTags from 'react-meta-tags';
import logo from '../../../assets/images/trustpay1.png';


function SignUp(props) {
  const dimensions = useWindowDimension()
  const [form, setLoginForm] = React.useState()
  const onFormSubmit = () => { }

  const handleGoogleLogin = async (Socialuser, err, provider) => {
    if (Socialuser) {
      let param = { email: Socialuser._profile.email }
      let res;
      props.showLoader();
      param = provider === 'gmailId' ? { ...param, gmailId: Socialuser._profile.id } : { ...param, facebookId: Socialuser._profile.id }
      try {
        if (Socialuser._profile.email) {
          res = provider === 'gmailId' ? await props.loginWithGoogleSocial(param) : await props.loginWithFaceBookSocial(param)
          const { user, register_status, tokens } = res.payload
          if (register_status && user.registerComplete) {
            props.initializeSession({ user, tokens });
            props.history.push("/dashboard")
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
            setTimeout(() => {
              props.hideLoader()
            }, 2000);
          }
        } else {
          props.history.push({
            pathname: '/signup-with-social',
            state: { user: Socialuser._profile, provider: provider }
          })
          setTimeout(() => {
            props.hideLoader()
          }, 2000);
        }
        setTimeout(() => {
          props.hideLoader()
        }, 2000);
      } catch (error) {
        setTimeout(() => {
          props.hideLoader()
        }, 2000);
        props.showToast({
          message: error?.response?.data?.message,
          type: "error",
        });
      }
    } else {
      console.log("error :", err);
    }
  }
  return (
    <div className="signupPage" >
      <MetaTags>
        <title>Welcome To Securepay - Sign Up Today</title>
        <meta
          name="description"
          content="Securepay is a simple and secure payment management platform, providing solutions for SMEs, corporations, and legal and financial firms."
        />
      </MetaTags>
      <Scrollbars className="loginScroll" style={{ height: dimensions.height + 'px' }}>
        <div className="signupCenter">
          <div className="signupBox">
            <div className='logo'>
              {/* <span className="icon-yatapay-brand"></span> */}
              <img src={logo} alt="logo" width='100' />

            </div>
            <h1>Let's get started</h1>
            <p>Sign up to protect your transaction, prevent fraud and safeguard your business.</p>
            <div className="formSection">
              <HookForm
                defaultForm={{}}
                init={form => setLoginForm(form)}
                onSubmit={onFormSubmit}>
                {() => {
                  return (
                    <div className="form">
                      <div className="loginwithgoogle">
                        <Link className="loginwith" to="/signup-email"><span className="icon-email"></span>Sign up using Email</Link>
                        <SocialButton icon="icon-google" appId={process.env.REACT_APP_GOOGLE_KEY} handleSocialLogin={(user, err) => handleGoogleLogin(user, err, 'gmailId')} lable="Sign up using Google" provider="google" />
                        <SocialButton icon="icon-facebook" appId={process.env.REACT_APP_FACEBOOK_KEY} handleSocialLogin={(user, err) => handleGoogleLogin(user, err, 'facebookId')} lable="Sign up using Facebook" provider="facebook" />

                      </div>

                      <div className="back">
                        <p><Link className="newuser" to="/login">I’m an existing user</Link></p>
                      </div>
                    </div>
                  )
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
  login,
  initializeSession, setUser, loginWithGoogleSocial, loginWithFaceBookSocial, showLoader, hideLoader
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp));