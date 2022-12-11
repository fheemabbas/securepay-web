import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import Scrollbars from "react-custom-scrollbars";
import { Tab, Tabs } from "react-bootstrap";
import { signupWithEmail, signupWithEmailProcess } from '../../../state/ducks/auth/actions';
import "./SignUpEmail.scss";
import { connect } from "react-redux";
import { hideLoader, showLoader } from "../../../state/ducks/utils/actions";
import CustomButton from "../../../components/UI/CustomButton/CustomButton";
import CheckBox from '../../../components/UI/CheckBox/CheckBox';
import logo from '../../../assets/images/trustpay1.png';

function SignUpEmail(props) {

  const [checked, setChecked] = useState(false);
  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  const { state } = props.location
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

  const onClickFirstStep = async (signupType) => {
    let param = {
      accountType: signupType,
      registerStep: 1
    }
    props.showLoader()
    try {

      const res = state && state.user ? await props.signupWithEmailProcess(param, state.user._id) : await props.signupWithEmail(param)
      if (state && state.user) {
        signupType === 1 ? props.history.push({ pathname: '/signup-individual', state: { user: state.user } }) : props.history.push({ pathname: '/signup-organisation', state: { user: state.user } })
      } else {
        signupType === 1 ? props.history.push('/signup-individual') : props.history.push('/signup-organisation')
      }
      setTimeout(() => {
        props.hideLoader()
      }, 2000);
    } catch (error) {
      setTimeout(() => {
        props.hideLoader()
      }, 2000);

    }
  }
  return (
    <div
      className="signupemailPage"
      style={{ height: dimensions.height + "px" }}
    >
      <Scrollbars className="signupemailScroll">
        <div className="signupemailCenter">
          <div className="signupemailBox">
            <div className="logo">
              <img width="100" src={logo} alt="logo" fluid="true" />
              {/* <span className="icon-yatapay-brand"></span> */}
            </div>
            <h1>Let's get started</h1>
            <p className="welcome_txt">Welcome to TrustPay!</p>
            <span className="subheader">How would you like to sign up?</span>
            <div className="formSection">
              {/* <div className="categoryBtn">
                <Link className="btnCustom individual" to="/signup-individual">Individual</Link>
                <Link className="btnCustom organisation" to="/signup-organisation">Business</Link>
              </div> */}
              <Tabs defaultActiveKey="individual" id="sign-up-tab">
                <Tab eventKey="individual" title="Sole Trader">
                  <div className="title_tab">
                    Suitable for individuals and sole traders/representatives.
                    {/* Suitable for individuals/representatives. */}
                  </div>
                  <div className='terms-condition'>
                    <CheckBox
                      id="remember"
                      labelTitle='by continuing you agree to our '
                      checked={checked}
                      onCheckedChange={(checked) =>
                        setChecked(checked)
                      }
                    />
                    <a href="https://dev.zudu.co.uk/yatapay/privacy-policy/" target="_blank">Terms and Privacy</a>
                  </div>
                  <div className="categoryBtn">
                    <CustomButton
                      disabled={!checked}
                      className="btnCustomStarted"
                      to="/signup-individual"
                      onClick={() => {
                        onClickFirstStep(1)
                      }}>LET’S GET STARTED</CustomButton>
                  </div>
                </Tab>
                <Tab eventKey="organisation" title="Business">
                  <div className="title_tab">
                    Suitable for limited companies. Must have a valid companies house number.
                  </div>

                  <div className='terms-condition'>
                    <CheckBox
                      id="remember"
                      labelTitle="by continuing you agree to our"
                      checked={checked}
                      onCheckedChange={(checked) =>
                        setChecked(checked)
                      }
                    />
                    <a href="#" target="_blank">Terms and Privacy</a>
                  </div>

                  <div className="categoryBtn">
                    <CustomButton
                      disabled={!checked}
                      className="btnCustomStarted" onClick={() => {
                        onClickFirstStep(2)
                      }}
                    // to="/signup-organisation"
                    >
                      LET’S GET STARTED
                    </CustomButton>
                  </div>
                </Tab>
              </Tabs>
            </div>
            <div className="back">
              <p> <Link className="newuser" to="/sign-up">Back</Link></p>
            </div>
          </div>
        </div>
      </Scrollbars>
    </div >
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  signupWithEmail, showLoader, hideLoader, signupWithEmailProcess
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SignUpEmail)
);
