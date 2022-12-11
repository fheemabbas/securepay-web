import React, { useState } from 'react';
import { connect } from "react-redux";
import { withRouter, useHistory } from "react-router-dom"
import './AnnounceSection.scss';
import { capitalizeFirstLetter, dateFormat } from '../../services/helper.service';
import { get } from "lodash"
import Constant from '../../util/constant';
import { disputeAcceptReject, getDisputeByMilestone } from '../../state/ducks/Job/actions';
import { hideLoader, showLoader, showToast } from '../../state/ducks/utils/actions';
import { getItem } from '../../services/localstorage.service';
import { Carousel } from 'react-bootstrap';
import ModalPopup from '../ModalPopup/ModalPopup';
import ZoomImgModal from '../../components/ZoomImgModal/ZoomImgModal';


const AnnounceSection = (props) => {
    // const history = useHistory();
    const { disputeDetails, mileStoneId, setShowAnnounce, showAnnounce, milestoneAmount } = props;
    let [resonAttachedimageModal, setResonAttachedimageModal] = useState(false);
    let [showImageZoom, setShowImageZoom] = useState(false)
    const [zoomImgIndex, setZoomImgIndex] = useState()
    const [showImage, setShowImage] = useState()
    const role = localStorage.getItem("loginRole")
    const user_type_role = Number(localStorage.getItem("roletype"))
    const user = getItem("user")
    const onDisputeAcceptReject = (result, type) => {
        let param = {
            userType: type,
            response: result
        }
        props.showLoader()

        props.disputeAcceptReject(disputeDetails._id, param).then((res) => {
            props.getDisputeByMilestone(mileStoneId)
            props.hideLoader()
            props.showToast({ message: res.message, type: 'success' })
        })
    }
    return (
        <div className="dispute_results_section">
            <div className="dispute_results_title">Query Resolution</div>
            <div className="dispute_results_box">
                <ul className="disputelist_row">
                    <li>
                        <div className="dispute_contain_column">
                            <div className="dispute_column_title">Conclusion:</div>
                            <div className="dispute_column_txt">{disputeDetails?.conclusion && "Dispute is in favour of"} {capitalizeFirstLetter(get(disputeDetails, 'conclusion', 'Conclusion pending'))}</div>
                        </div>
                        <div className="dispute_contain_column">
                            <div className="dispute_column_title">Amount pay to client:</div>
                            <div className="dispute_column_txt">{disputeDetails?.amountPayClient || disputeDetails?.amountPayClient === 0 ? `${disputeDetails?.amountPayClient.toFixed(2)}` : '-'}</div>
                        </div>
                        <div className="dispute_contain_column">
                            <div className="dispute_column_title">Query Description:</div>
                            <div className="dispute_column_txt">{disputeDetails?.description}</div>
                        </div>
                    </li>
                    <li>
                        <div className="dispute_contain_column">
                            <div className="dispute_column_title">Conclusion Statement:</div>
                            <div className="dispute_column_txt">{get(disputeDetails, 'conclusionStatement', 'Conclusion Statement pending')}</div>
                        </div>
                        <div className="dispute_contain_column">
                            <div className="dispute_column_title">Amount refund to customer:</div>
                            <div className="dispute_column_txt">{disputeDetails?.amountRefundCustomer || disputeDetails?.amountRefundCustomer === 0 ? `${disputeDetails?.amountRefundCustomer.toFixed(2)}` : '-'}</div>
                        </div>
                    </li>
                    <li>
                        <div className="dispute_contain_column">
                            <div className="dispute_column_title">Resolved on:</div>
                            <div className="dispute_column_txt">{disputeDetails?.resolvedDate ? dateFormat(get(disputeDetails, 'resolvedDate', '-'), 'DD MMM yyyy') : '-'}</div>
                        </div>
                        <div className="dispute_contain_column">
                            <div className="dispute_column_title">Client Response: </div>
                            <div className={disputeDetails?.clientResponse === "REJECTED" ? "dispute_column_txt reject" : "dispute_column_txt accept"}>{capitalizeFirstLetter(get(disputeDetails, 'clientResponse', 'Response pending'))}</div>
                        </div>
                    </li>
                    <li>
                        <div className="dispute_contain_column">
                            <div className="dispute_column_title">Customer Response:</div>
                            <div className={disputeDetails?.customerResponse === "REJECTED" ? "dispute_column_txt reject" : "dispute_column_txt accept"}>{capitalizeFirstLetter(get(disputeDetails, 'customerResponse', 'Response pending'))}</div>
                        </div>
                        <div className="dispute_contain_column">
                            <div className="dispute_column_title">Total Escrow Amount:</div>
                            <div className="dispute_column_txt">£ {milestoneAmount && milestoneAmount.toFixed(2)}</div>
                        </div>
                    </li>
                    <li>
                        {Number(role) === Constant.ROLE.STAFF && disputeDetails?.status === "RAISED" && props.isAnnounce && <button className="announce_btn" onClick={() => setShowAnnounce(!showAnnounce)}>Announce</button>}

                        {user_type_role === 3 && user.role === 3 && disputeDetails?.status === "RESOLVED" && Number(role) !== Constant.ROLE.STAFF && disputeDetails?.clientResponse === "PENDING" && <>
                            <button className="accept_btn" onClick={() => onDisputeAcceptReject("ACCEPT", "CLIENT")}>Accept Query Resolution</button>
                            <button className="reject_btn" onClick={() => onDisputeAcceptReject("REJECTED", "CLIENT")}>Reject Query Resolution</button>

                        </>}
                        {user_type_role === 4 && user.role === 3 && disputeDetails?.status === "RESOLVED" && Number(role) !== Constant.ROLE.STAFF && disputeDetails?.customerResponse === "PENDING" && <>
                            <button className="accept_btn" onClick={() => onDisputeAcceptReject("ACCEPT", "CUSTOMER")}>Accept Query Resolution</button>
                            <button className="reject_btn" onClick={() => onDisputeAcceptReject("REJECTED", "CUSTOMER")}>Reject Query Resolution</button>

                        </>}
                    </li>
                </ul>
                {disputeDetails?.images.length > 0 &&
                    <ul className='imgUl' >
                        {disputeDetails?.images.map((image, index) => {
                            return <>
                                {
                                    <li className='imgLi' key={index} onClick={() => {
                                        setShowImageZoom(true)
                                        setZoomImgIndex(index)
                                        setShowImage(image)
                                    }}>
                                        <img src={process.env.REACT_APP_CLOUDINARY_URL + '/w_148,h_150/' + image} alt='img' className='imgClass'></img>
                                    </li>
                                }
                            </>
                        })}
                    </ul>
                }
            </div>

            <ModalPopup
                showModal={showImageZoom}
                onHide={() => setShowImageZoom(false)}
                className='zoomImg'
                closeIcon={true}
            >
                <ZoomImgModal
                    indexZoom={zoomImgIndex}
                    ZoomImg={disputeDetails}
                    title='Photos'
                    ShowImage={showImage}
                    onHide={() => setShowImageZoom(false)}></ZoomImgModal>
            </ModalPopup>

        </div>
    )
}
const mapStateToProps = (state) => {
    return {
    }
};
const mapDispatchToProps = {
    showToast, showLoader, hideLoader, getDisputeByMilestone, disputeAcceptReject
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AnnounceSection));


