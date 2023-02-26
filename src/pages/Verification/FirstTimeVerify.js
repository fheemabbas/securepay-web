import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Scrollbars from "react-custom-scrollbars";
import { withRouter } from "react-router-dom";
import { hideLoader, showLoader, showToast } from "../../state/ducks/utils/operations";

// import logo from "../../assets/images/trustpay1.png";
import CustomButton from "../../components/UI/CustomButton/CustomButton";
import useWindowDimension from "../../hooks/useWindowDimension";
import "./verify.scss";
import {
    verifyEmailLink
} from "../../state/ducks/auth/operations";

function FirstTimeVerify(props) {
    const dimensions = useWindowDimension();
    let token;
    const [text, setText] = useState()
    const [user, setUser] = useState()
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search); // eslint-disable-next-line
        token = urlParams.get("token");
        props.showLoader()
        props.verifyEmailLink(token).then((res) => {
            props.history.push({ pathname: '/signup-email', state: { user: res.message.data } })
            // setText(res.message.message)
            // setUser(res.message.data)
        });
        setTimeout(() => {
            props.hideLoader()

        }, 2000);
    }, []);
    return (
        <></>
        // <div className="VerifyPage">
        //     <Scrollbars
        //         className="VerifyScroll"
        //         style={{ height: dimensions.height + "px" }}
        //     >
        //         <div className="VerifyCenter">
        //             <div className="VerifyBox">
        //                 <div className="logo">
        //                     <span className="icon-yatapay-brand"></span>

        //                 </div>
        //                 {/* <h1>{text ? text : "Your account is verified successfully."}</h1> */}
        //                 <h1>{text}</h1>

        //                 <div className="tabMain">
        //                     <div className="formSection">
        //                         <div className="form">
        //                             <div className="custombtnfield">
        //                                 <CustomButton
        //                                     title="Sign up"
        //                                     onClick={() => {
        //                                         props.history.push({ pathname: '/signup-email', state: { user: user } })
        //                                     }}
        //                                 />
        //                             </div>

        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </Scrollbars>
        // </div>
    );
}
const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = {
    showToast, verifyEmailLink, hideLoader, showLoader
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FirstTimeVerify));
