import React from "react";
import './RejectionComments.scss';
import Scrollbars from "react-custom-scrollbars";

const RejectionComments = (props) => {
    return (
        <div className='rejectionComments' >
            <div className="headerTitle">Transaction Rejection Comments</div>
            <Scrollbars className="popupScroll">
                <div className="boxContain">
                    <div className="cardlist">
                        <div className="countNumber">(1)</div>
                        <div className="containRow">
                            <div className="leftPart">Transaction Requested on:</div>
                            <div className="rightPart">15 July 2020 </div>
                        </div>
                        <div className="containRow">
                            <div className="leftPart">Request Rejected on:</div>
                            <div className="rightPart">20 July 2020</div>
                        </div>
                        <div className="subTitle">Reason:</div>
                        <div className="disTxt">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. </div>
                    </div>
                    <div className="cardlist">
                        <div className="countNumber">(2)</div>
                        <div className="containRow">
                            <div className="leftPart">Previous Milestone Amount:</div>
                            <div className="rightPart">£1000</div>
                        </div>
                        <div className="containRow">
                            <div className="leftPart">Updated Milestone Amount:</div>
                            <div className="rightPart">£1100</div>
                        </div>
                        <div className="containRow">
                            <div className="leftPart">Updated On:</div>
                            <div className="rightPart">12 July 2020</div>
                        </div>
                        <div className="containRow">
                            <div className="leftPart">Status:</div>
                            <div className="rightPart">Approved</div>
                        </div>
                        <div className="subTitle">Reason:</div>
                        <div className="disTxt">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. </div>
                    </div>
                    <div className="cardlist">
                        <div className="countNumber">(3)</div>
                        <div className="containRow">
                            <div className="leftPart">Previous Milestone Amount:</div>
                            <div className="rightPart">£1000</div>
                        </div>
                        <div className="containRow">
                            <div className="leftPart">Updated Milestone Amount:</div>
                            <div className="rightPart">£1100</div>
                        </div>
                        <div className="containRow">
                            <div className="leftPart">Updated On:</div>
                            <div className="rightPart">12 July 2020</div>
                        </div>
                        <div className="containRow">
                            <div className="leftPart">Status:</div>
                            <div className="rightPart">Approved</div>
                        </div>
                        <div className="subTitle">Reason:</div>
                        <div className="disTxt">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. </div>
                    </div>
                    <div className="cardlist">
                        <div className="countNumber">(4)</div>
                        <div className="containRow">
                            <div className="leftPart">Previous Milestone Amount:</div>
                            <div className="rightPart">£1000</div>
                        </div>
                        <div className="containRow">
                            <div className="leftPart">Updated Milestone Amount:</div>
                            <div className="rightPart">£1100</div>
                        </div>
                        <div className="containRow">
                            <div className="leftPart">Updated On:</div>
                            <div className="rightPart">12 July 2020</div>
                        </div>
                        <div className="containRow">
                            <div className="leftPart">Status:</div>
                            <div className="rightPart">Approved</div>
                        </div>
                        <div className="subTitle">Reason:</div>
                        <div className="disTxt">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. </div>
                    </div>
                    <div className="cardlist">
                        <div className="countNumber">(5)</div>
                        <div className="containRow">
                            <div className="leftPart">Previous Milestone Amount:</div>
                            <div className="rightPart">£1000</div>
                        </div>
                        <div className="containRow">
                            <div className="leftPart">Updated Milestone Amount:</div>
                            <div className="rightPart">£1100</div>
                        </div>
                        <div className="containRow">
                            <div className="leftPart">Updated On:</div>
                            <div className="rightPart">12 July 2020</div>
                        </div>
                        <div className="containRow">
                            <div className="leftPart">Status:</div>
                            <div className="rightPart">Approved</div>
                        </div>
                        <div className="subTitle">Reason:</div>
                        <div className="disTxt">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. </div>
                    </div>
                </div>
            </Scrollbars>
        </div>


    )
}




export default RejectionComments;