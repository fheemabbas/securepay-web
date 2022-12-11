import React from "react";
import './ViewModificationRequest.scss';
import moment from 'moment';
import Scrollbars from "react-custom-scrollbars";

const ViewModificationRequests = (props) => {
    return (
        <div className='payment_history_modal' >
            <div className="headerTitle">Transaction Modification Comments</div>
            <Scrollbars className="popupScroll">
                <div className="boxContain">
                    <div className="cardlist">
                        {
                            props.modificationData.map((value, i) => {
                                return <div className="disTxt">
                                    <p><b>{i + 1}.</b> {value.comment}</p>
                                    <p>Ask for the Transaction Modification on <b>{moment(value.date).format("D MMM YYYY")}</b></p>
                                </div>
                            })
                        }

                        {/* <div className="dateTxt">Ask for the Milestone Modification on <span>12 July 2020</span></div> */}
                    </div>
                </div>
            </Scrollbars>
        </div>
    )
}

export default ViewModificationRequests;