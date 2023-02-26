import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Scrollbars from "react-custom-scrollbars";
import { withRouter } from "react-router-dom";
import { hideLoader, showLoader, showToast } from "../../state/ducks/utils/operations";
import { resendVerifyLink } from "../../state/ducks/auth/operations";
// import logo from "../../assets/images/trustpay1.png";
import CustomButton from "../../components/UI/CustomButton/CustomButton";
import useWindowDimension from "../../hooks/useWindowDimension";
import "./verify.scss";
import {
  verifyEmailLink
} from "../../state/ducks/auth/operations";

function Verify(props) {
  const dimensions = useWindowDimension();
  let token;
  const [text, setText] = useState()
  const [isExpire, setisExpire] = useState(false)
  const [userId, setuserId] = useState(false)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search); // eslint-disable-next-line
    token = urlParams.get("token");
    props.showLoader()
    props.verifyEmailLink(token).then((res) => {
      setText(res.message.message)
      res.message.data.isExpire && setisExpire(res.message.data.isExpire)
      res.message.data.isExpire && setisExpire(res.message.data.isExpire)
      res.message.data.userId && setuserId(res.message.data.userId)
    });
    setTimeout(() => {
      props.hideLoader()

    }, 2000);
  }, []);
  const onResendLink = () => {
    props.resendVerifyLink(userId).then(() => {
      props.history.push('/login')
    })
  }
  return (
    <div className="VerifyPage">
      <Scrollbars
        className="VerifyScroll"
        style={{ height: dimensions.height + "px" }}
      >
        <div className="VerifyCenter">
          <div className="VerifyBox">
            <div className="logo">
              <span className="icon-yatapay-brand"></span>

            </div>
            {/* <h1>{text ? text : "Your account is verified successfully."}</h1> */}
            <h1>{text}</h1>

            <div className="tabMain">
              <div className="formSection">
                <div className="form">
                  <div className="custombtnfield">
                    {!isExpire && <CustomButton
                      title="Log in"
                      onClick={() => props.history.push('/login')}
                    />}
                    {isExpire && <CustomButton
                      title="Resend Verify Link"
                      onClick={() => onResendLink()}
                    />}
                  </div>

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
  showToast, verifyEmailLink, hideLoader, showLoader, resendVerifyLink
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Verify));
