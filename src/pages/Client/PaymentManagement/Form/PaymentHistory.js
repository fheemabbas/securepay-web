import React from "react";
import './PaymentHistory.scss';
import Scrollbars from "react-custom-scrollbars";

const PaymentHistory = (props) => {
    return (
        <div className='payment_history_modal' >
            <div className="headerTitle">Transaction Rejection Comments</div>
            <Scrollbars className="popupScroll">
                <div className="boxContain">
                    <div className="cardlist">
                        {
                            props.jobId.map((value, i) => {
                                return <div className="disTxt"><b>{i + 1}.</b> {value}</div>
                            })
                        }

                        {/* <div className="dateTxt">Ask for the Milestone Modification on <span>12 July 2020</span></div> */}
                    </div>
                </div>
            </Scrollbars>
        </div>
    )
}

export default PaymentHistory;