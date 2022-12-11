import React from "react";
import './MilestoneModification.scss';
import Scrollbars from "react-custom-scrollbars";

const MilestoneModification = (props) => {
    return (
        <div className='milestoneModification' >
            <div className="headerTitle">Milestone Modification</div>
            <Scrollbars className="popupScroll">
                <div className="boxContain">
                    <div className="cardlist">
                        <div className="disTxt">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</div>
                        <div className="dateTxt">Ask for the Milestone Modification on <span>12 July 2020</span></div>
                    </div>
                </div>
            </Scrollbars>
        </div>


    )
}




export default MilestoneModification;