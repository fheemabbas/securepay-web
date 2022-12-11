import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Tab, Tabs, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import { withRouter, useHistory } from "react-router-dom"
import Scrollbars from "react-custom-scrollbars";
import ModalPopup from '../../../../components/ModalPopup/ModalPopup';
import CustomButton from '../../../../components/UI/CustomButton/CustomButton';
import { hideLoader, showLoader, showToast } from "../../../../state/ducks/utils/operations";
import useWindowDimension from "../../../../hooks/useWindowDimension";
import like from '../../../../assets/images/like.png';
import active from '../../../../assets/images/active.png';
import processinactive1 from '../../../../assets/images/process-inactive1.png';
import processinactive from '../../../../assets/images/process-inactive.png';
import chattwo from '../../../../assets/images/chat-two.png';
import disputeR from '../../../../assets/images/dispute-r.png';
import activeDispute from '../../../../assets/images/dispute-active.png';
import bothactiveDispute from '../../../../assets/images/dispute-active(1).png';
import bothinActiveDispute from '../../../../assets/images/dispute-inactive(1).png';
import groupActiveDispute from '../../../../assets/images/judgement-active.png';
import './DisputeDetails.scss';
import AnnounceForm from '../Form/AnnounceForm';
import { capitalizeFirstLetter, getStoredData } from '../../../../services/helper.service';
import { getDisputeByMilestone, getOneDisputeDetails } from '../../../../state/ducks/Job/actions';
import { get, size } from "lodash"
import DisputeManagmentSidebar from '../../../../components/DisputeManagmentSidebar/DisputeManagmentSidebar';
import AnnounceSection from '../../../../components/AnnounceSection/AnnounceSection';

const DisputeDetails = (props) => {
  const history = useHistory();
  const { disputeDetails } = props
  let [showAnnounce, setShowAnnounce] = useState(false)
  let [showDisputeSystemSidebar, setShowDisputeSystemSidebar] = useState(false)
  const dimensions = useWindowDimension()
  const [headerHeight, setHeaderHeight] = useState(0)
  const [backHeight, setBackHeight] = useState(0)
  const [mileStoneIndex, setMileStoneIndex] = useState(0)
  const [spaceId, setSpaceId] = useState('');
  useEffect(() => {
    setHeaderHeight(document.getElementsByClassName('headerAdmin')[0].offsetHeight);
    setBackHeight(document.getElementsByClassName('backTo')[0].offsetHeight);
  })
  const customerName = `${get(disputeDetails, 'customerDetails.firstName', '-')}  ${get(disputeDetails, 'customerDetails.lastName', '-')}`
  const clientName = `${get(disputeDetails, 'clientDetails.firstName', '-')}  ${get(disputeDetails, 'clientDetails.lastName', '-')}`
  // page redirect //
  const routeBack = () => {
    let path = `/admin/disputes`;
    history.push(path);
    localStorage.removeItem("disputeID")
  }
  const getDisputeDetails = () => {
    getStoredData("disputeID")
    props.showLoader()
    props.getOneDisputeDetails(getStoredData("disputeID")).then((res) => {
      setSpaceId(res ?.payload ?.[0] ?.channelId)
      props.hideLoader()
    })
  }
  useEffect(() => {
    getDisputeDetails()
  }, [])

  return (
    <div className='disputedetailMain' style={{ height: (dimensions.height - headerHeight) + 'px', marginTop: (headerHeight + 'px') }}>
      <div className="innerContainer">
        <div className='backTo' onClick={() => routeBack()} >
          <i className='icon-back'></i>
          <p className='backTxt'>Back</p>
        </div>
      </div>

      <Scrollbars className="listingScroll" style={{ height: (dimensions.height - headerHeight - backHeight) + 'px' }} >
        <div className="innerContainer">
          <div className='paddingInner'>
            <div className='firstTopSection'>
              <div className="leftside">
                <div className="innerBox">
                  {/* ************Job Details Started ****************** */}
                  <div className="titleleft">{get(disputeDetails, 'jobDetails.name', '-')}</div>
                  <p>{get(disputeDetails, 'jobDetails.description', '-')}</p>
                  <div className="custom_row">
                    <div className="custom_column">
                      <div className="sub_title">Client Details:</div>
                      <div className="subDetails">{`${get(disputeDetails, 'clientDetails.firstName', '-')}  ${get(disputeDetails, 'clientDetails.lastName', '-')}`}</div>
                      <div className="subDetails">{get(disputeDetails, 'clientDetails.email', '-')}</div>
                      {/* <div className="subDetails">1902 Timber Oak Drive Amarillo, TX 79106</div> */}
                      <div className="subDetails">+{get(disputeDetails, 'clientDetails.dialCode', '-')} {get(disputeDetails, 'clientDetails.number', '-')}</div>
                    </div>
                    <div className="custom_column">
                      <div className="sub_title">Customer Details:</div>
                      <div className="subDetails">{`${get(disputeDetails, 'customerDetails.firstName', '-')}  ${get(disputeDetails, 'customerDetails.lastName', '-')}`}</div>
                      <div className="subDetails">{get(disputeDetails, 'customerDetails.email', '-')}</div>
                      <div className="subDetails">+{get(disputeDetails, 'customerDetails.dialCode')} {get(disputeDetails, 'customerDetails.number')}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rightside">
                <div className="innerBox">
                  <div className="right_sub_details">Admin Commission:<strong>£{get(disputeDetails, 'jobDetails.adminFess', 0)}</strong></div>
                  <div className="right_sub_details">Total Transaction Amount:<strong>£{get(disputeDetails, 'jobDetails.totalAmount', 0)}</strong></div>
                  <div className="right_sub_details">Dispute Status:<strong>{capitalizeFirstLetter(get(disputeDetails, 'status', '-'))}</strong></div>
                  {/* <div className="right_sub_details">Business Category:<strong>{'-'}</strong></div> */}
                  <div className="right_sub_details">Disputed by:<strong>{capitalizeFirstLetter(get(disputeDetails, 'disputedBy', '-'))}</strong></div>
                  <div className='btnRight'>
                    {/* <CustomButton type='button' title='Raise a Dispute' onClick={() => setShowRaiseDispute(!showRaiseDispute)}></CustomButton> */}
                    {disputeDetails ?.milestone ?.[mileStoneIndex]._id === disputeDetails ?.milestoneId && <CustomButton onClick={() => setShowDisputeSystemSidebar(!showDisputeSystemSidebar)} title="Query Management System" />}
                  </div>
                </div>
              </div>
              {/* ************Job Details Ended ****************** */}

            </div>
            {
              //  ***************************** Milestone listing with multiple milestione Started *************************************
              disputeDetails && disputeDetails.milestone && disputeDetails.milestone.length > 1 ?
                <div className={"tabbar_main"}>
                  <Tabs activeKey={mileStoneIndex} defaultActiveKey={mileStoneIndex} onSelect={(e) => setMileStoneIndex(Number(e))} id="uncontrolled-tab-example">
                    {disputeDetails && disputeDetails.milestone && disputeDetails.milestone.map((milestone, index) =>

                      <Tab tabClassName={milestone ?.status === "PAYMENT_RELEASE" ? "complate" : milestone ?.status === "DISPUTE" ? "dispute_miletone_red" : ""} eventKey={index} title={milestone.title} id={index}>
                        <div className="tab_box_main">

                          <div className="tab_heading">
                            <div className="column_left">
                              <div className="text">{milestone.title}</div>
                              <div className="text">Cost: £ {get(milestone, 'amount').toFixed(2)}</div>
                            </div>
                            <div className="column_middle">{get(milestone, 'description')}</div>

                          </div>
                          <div className="tab_listing">
                            <div className="box_title_inner">Transaction Stage</div>
                            <div className="listColumn">
                              <ul>
                                <li>
                                  {
                                    milestone.status === "WAITING_ACCEPT" || milestone.status === "REJECTED" ?
                                      <>
                                        <img width="90" height="90" src={processinactive} alt='process_inactive' />
                                        <div className="title" >
                                          {`Waiting for ${get(disputeDetails, 'customerDetails.firstName', '-')}  ${get(disputeDetails, 'customerDetails.lastName', '-')} to Accept The Transaction`}
                                        </div>
                                      </>
                                      : milestone.status === "DISPUTE" ?
                                        <>
                                          <img width="90" height="90" src={disputeR} alt='process_inactive' />
                                          <div className="title" >
                                            A dispute has been raised
                                          </div>
                                        </>
                                        :
                                        <>
                                          <img width="90" height="90" src={like} alt='process_inactive' />
                                          <div className="title_blue" >
                                            {`${get(disputeDetails, 'customerDetails.firstName', '-')}  ${get(disputeDetails, 'customerDetails.lastName', '-')} has accepted the transaction`}
                                          </div>
                                          <div className="custom_tooltip">
                                            {['top'].map((placement) => (
                                              <OverlayTrigger

                                                key={placement}
                                                placement={placement}
                                                overlay={
                                                  <Tooltip id={`custom_tooltip-top`}>
                                                    {`${get(disputeDetails, 'customerDetails.firstName', '-')}  ${get(disputeDetails, 'customerDetails.lastName', '-')}  has received and approved the job proposal`}

                                                  </Tooltip>
                                                }
                                              >
                                                <Button className="tooltip_custom"><span className="icon-question"></span></Button>
                                              </OverlayTrigger>
                                            ))}
                                          </div>
                                        </>
                                  }
                                </li>
                                <li>
                                  <span className="icon-arrow"></span>
                                </li>
                                <li>
                                  {
                                    milestone.status === "WAITING_ACCEPT" || milestone.status === "REJECTED" || milestone.status === "WAITING_FUND_DEPOSITE" || milestone.status === "PAYMENT_REJECTED" ?
                                      <>
                                        <img width="90" height="85" src={processinactive1} alt='process_inactive1' />
                                        <div className="title">Funds Not Yet In Deposit Box</div>
                                      </>
                                      : milestone.status === "DISPUTE" ?
                                        <>
                                          <img width="90" height="90" src={groupActiveDispute} alt='process_inactive' />
                                          <div className="title" >
                                            Dispute in Process
                                          </div>
                                        </>
                                        :
                                        <>
                                          <img width="90" height="85" src={processinactive1} alt='process_inactive1' />
                                          <div className="title">Funds In Deposit Box</div>

                                          <div className="custom_tooltip">
                                            {['top'].map((placement) => (
                                              <OverlayTrigger

                                                key={placement}
                                                placement={placement}
                                                overlay={
                                                  <Tooltip id={`custom_tooltip-top`}>
                                                    {"The transaction has been processed successfully and is in the deposit box."}

                                                  </Tooltip>
                                                }
                                              >
                                                <Button className="tooltip_custom"><span className="icon-question"></span></Button>
                                              </OverlayTrigger>
                                            ))}
                                          </div>
                                        </>
                                  }
                                </li>
                                <li>
                                  <span className="icon-arrow"></span>
                                </li>
                                <li>
                                  {milestone.status === "PAYMENT_COMPLETE" ?
                                    <>
                                      <img width="90" height="90" src={active} alt='active' />
                                      <div className="title">Milestone Completed</div>
                                      <div className="custom_tooltip">
                                        {['top'].map((placement) => (
                                          <OverlayTrigger

                                            key={placement}
                                            placement={placement}
                                            overlay={
                                              <Tooltip id={`custom_tooltip-top`}>
                                                {`Success! Your Customer has released the funds. transactions are processed each day at 10:00am and 4:00pm Mon-Fri. `}
                                              </Tooltip>
                                            }
                                          >
                                            <Button className="tooltip_custom"><span className="icon-question"></span></Button>
                                          </OverlayTrigger>
                                        ))}
                                      </div>
                                    </>
                                    : milestone.status === "DISPUTE" ?
                                      <>
                                        <img width="90" height="90"
                                          src={disputeDetails.conclusion === "ARBITRATION" ? activeDispute : disputeDetails ?.clientResponse === "ACCEPT" && disputeDetails ?.customerResponse === "ACCEPT" ? bothactiveDispute :
                                            disputeDetails ?.clientResponse === "ACCEPT" && disputeDetails ?.customerResponse === "REJECTED" ? activeDispute :
                                              bothinActiveDispute} alt='active' />
                                        <div className="title">
                                          {disputeDetails.conclusion === "ARBITRATION" ? "Dispute has sent for arbitration" : disputeDetails ?.clientResponse === "PENDING" || disputeDetails ?.customerResponse === "PENDING" ? "Waiting for client or customer response" :
                                            disputeDetails ?.clientResponse === "ACCEPT" && disputeDetails ?.customerResponse === "ACCEPT" ? "Conclusion accpeted by both" :
                                              disputeDetails ?.clientResponse === "REJECTED" && disputeDetails ?.customerResponse === "REJECTED" ? "Conclusion rejected" :
                                                disputeDetails ?.clientResponse === "ACCEPT" && disputeDetails ?.customerResponse === "REJECTED" ? `Conclusion accepted by ${clientName} and rejected by ${customerName} ` :
                                                  disputeDetails ?.clientResponse === "REJECTED" && disputeDetails ?.customerResponse === "ACCEPT" ? `Conclusion rejected by ${clientName} and accepted by ${customerName}` : ""}
                                        </div>
                                      </>
                                      :
                                      <>
                                        <img width="90" height="90" src={chattwo} alt='active' />
                                        <div className="title"> Transaction Requested </div>
                                      </>}
                                </li>
                              </ul>
                            </div>
                          </div>

                        </div>
                      </Tab>

                    )}

                  </Tabs>
                  <div className={mileStoneIndex === 0 ? "tab_footer_btn nextbtn" : "tab_footer_btn"}>
                    {mileStoneIndex !== 0 && <button className="btn_milestone" onClick={() => setMileStoneIndex(mileStoneIndex - 1)}><span className="icon-back"></span>Previous Milestone</button>
                    }{size(get(disputeDetails, 'milestone')) > mileStoneIndex + 1 && <button className={"btn_milestone"} onClick={() => setMileStoneIndex(mileStoneIndex + 1)}>Next Milestone<span className="icon-back right"></span></button>
                    }</div>
                </div>
                //  ***************************** Milestone listing with multiple milestione Ended *************************************
                :
                //  ***************************** Milestone listing with Single milestione Started *************************************
                <div className="tabbar_main">
                  {disputeDetails && disputeDetails.milestone && disputeDetails.milestone.map((milestone, index) =>
                    <div className="tab_box_main" key={index}>

                      <div className="tab_heading">
                        <div className="column_left">
                          <div className="text">{milestone.title}</div>
                          <div className="text">Cost: £ {get(milestone, 'amount')}</div>
                        </div>
                        <div className="column_middle">{get(milestone, 'description')}</div>
                      </div>
                      <div className="tab_listing">
                        <div className="box_title_inner">Transaction Stage</div>
                        <div className="listColumn">
                          <ul>
                            <li>
                              {
                                milestone.status === "WAITING_ACCEPT" || milestone.status === "REJECTED" ?
                                  <>
                                    <img width="90" height="90" src={processinactive} alt='process_inactive' />
                                    <div className="title" >
                                      {`Waiting for ${get(disputeDetails, 'customerDetails.firstName', '-')}  ${get(disputeDetails, 'customerDetails.lastName', '-')} to Accept The Transaction`}
                                    </div>
                                  </>
                                  : milestone.status === "DISPUTE" ?
                                    <>
                                      <img width="90" height="90" src={disputeR} alt='process_inactive' />
                                      <div className="title" >
                                        A dispute has been raised
                                      </div>
                                    </>
                                    :
                                    <>
                                      <img width="90" height="90" src={like} alt='process_inactive' />
                                      <div className="title_blue" >
                                        {`${get(disputeDetails, 'customerDetails.firstName', '-')}  ${get(disputeDetails, 'customerDetails.lastName', '-')} has accepted the transaction`}
                                      </div>
                                      <div className="custom_tooltip">
                                        {['top'].map((placement) => (
                                          <OverlayTrigger

                                            key={placement}
                                            show={true}
                                            placement={placement}
                                            overlay={
                                              <Tooltip id={`custom_tooltip-top`}>
                                                {`${get(disputeDetails, 'customerDetails.firstName', '-')}  ${get(disputeDetails, 'customerDetails.lastName', '-')}  has received and approved the job proposal`}

                                              </Tooltip>
                                            }
                                          >
                                            <Button className="tooltip_custom"><span className="icon-question"></span></Button>
                                          </OverlayTrigger>
                                        ))}
                                      </div>
                                    </>
                              }
                            </li>
                            <li>
                              <span className="icon-arrow"></span>
                            </li>
                            <li>
                              {
                                milestone.status === "WAITING_ACCEPT" || milestone.status === "REJECTED" || milestone.status === "WAITING_FUND_DEPOSITE" || milestone.status === "PAYMENT_REJECTED" ?
                                  <>
                                    <img width="90" height="85" src={processinactive1} alt='process_inactive1' />
                                    <div className="title">Funds Not Yet In Deposit Box</div>
                                  </>
                                  : milestone.status === "DISPUTE" ?
                                    <>
                                      <img width="90" height="90" src={groupActiveDispute} alt='process_inactive' />
                                      <div className="title" >
                                        Dispute in Process
                                      </div>
                                    </>
                                    :
                                    <>
                                      <img width="90" height="85" src={processinactive1} alt='process_inactive1' />
                                      <div className="title">Funds In Deposit Box</div>

                                      <div className="custom_tooltip">
                                        {['top'].map((placement) => (
                                          <OverlayTrigger

                                            key={placement}
                                            placement={placement}
                                            overlay={
                                              <Tooltip id={`custom_tooltip-top`}>
                                                {"The transaction has been processed successfully and is in the deposit box."}

                                              </Tooltip>
                                            }
                                          >
                                            <Button className="tooltip_custom"><span className="icon-question"></span></Button>
                                          </OverlayTrigger>
                                        ))}
                                      </div>
                                    </>
                              }
                            </li>
                            <li>
                              <span className="icon-arrow"></span>
                            </li>
                            <li>
                              {milestone.status === "PAYMENT_COMPLETE" ?
                                <>
                                  <img width="90" height="90" src={active} alt='active' />
                                  <div className="title">Milestone Completed</div>
                                  <div className="custom_tooltip">
                                    {['top'].map((placement) => (
                                      <OverlayTrigger

                                        key={placement}
                                        placement={placement}
                                        overlay={
                                          <Tooltip id={`custom_tooltip-top`}>
                                            {`Success! Your Customer has released the funds. Transactions are processed each day at 10:00am and 4:00pm Mon-Fri. `}
                                          </Tooltip>
                                        }
                                      >
                                        <Button className="tooltip_custom"><span className="icon-question"></span></Button>
                                      </OverlayTrigger>
                                    ))}
                                  </div>
                                </>
                                : milestone.status === "DISPUTE" ?
                                  <>
                                    <img width="90" height="90"
                                      src={disputeDetails.conclusion === "ARBITRATION" ? activeDispute : disputeDetails ?.clientResponse === "ACCEPT" && disputeDetails ?.customerResponse === "ACCEPT" ? bothactiveDispute :
                                        disputeDetails ?.clientResponse === "ACCEPT" && disputeDetails ?.customerResponse === "REJECTED" ? activeDispute :
                                          bothinActiveDispute} alt='active' />
                                    <div className="title">
                                      {disputeDetails.conclusion === "ARBITRATION" ? "Dispute has sent for arbitration" : disputeDetails ?.clientResponse === "PENDING" || disputeDetails ?.customerResponse === "PENDING" ? "Waiting for client or customer response" :
                                        disputeDetails ?.clientResponse === "ACCEPT" && disputeDetails ?.customerResponse === "ACCEPT" ? "Conclusion accpeted by both" :
                                          disputeDetails ?.clientResponse === "REJECTED" && disputeDetails ?.customerResponse === "REJECTED" ? "Conclusion rejected" :
                                            disputeDetails ?.clientResponse === "ACCEPT" && disputeDetails ?.customerResponse === "REJECTED" ? `Conclusion accepted by ${clientName} and rejected by ${customerName} ` :
                                              disputeDetails ?.clientResponse === "REJECTED" && disputeDetails ?.customerResponse === "ACCEPT" ? `Conclusion rejected by ${clientName} and accepted by ${customerName}` : ""}
                                    </div>
                                  </>
                                  :
                                  <>
                                    <img width="90" height="90" src={chattwo} alt='active' />
                                    <div className="title"> Transaction Requested </div>
                                  </>}
                            </li>
                          </ul>
                        </div>
                      </div>

                    </div>

                  )}
                </div>
              //  ***************************** Milestone listing with Single milestione Ended *************************************
            }
            {/* **************** Announce section started****************** */}
            {disputeDetails ?.milestone ?.[mileStoneIndex].status === "DISPUTE" &&
              <AnnounceSection
                milestoneAmount={disputeDetails ?.milestone ?.[mileStoneIndex] ?.amount}
                mileStoneId={disputeDetails ?.milestone ?.[mileStoneIndex] ?._id}
                disputeDetails={props ?.disputeDetails}
                setShowAnnounce={(flag) => setShowAnnounce(flag)}
                showAnnounce={showAnnounce}
                isAnnounce={disputeDetails ?.milestone ?.[mileStoneIndex] ?._id === disputeDetails ?.milestoneId}
              />
            }
            {/* **************** Announce section Ended****************** */}
          </div>
        </div>
      </Scrollbars>
      {/* **************** Announce Form started****************** */}
      <ModalPopup
        showModal={showAnnounce}
        onHide={() => setShowAnnounce(false)}
        className='announce_modal'
        closeIcon={false}
      >
        <AnnounceForm
          onHide={() => setShowAnnounce(false)}
          EscrowedAmount={disputeDetails ?.milestone ?.[mileStoneIndex] ?.amount}
          disputeID={disputeDetails ?._id}

        ></AnnounceForm>
      </ModalPopup>
      {/* **************** Announce form ended****************** */}
      {/* **************** Dispute Managment Sidebar  started****************** */}
      <DisputeManagmentSidebar
        setShowDisputeSystemSidebar={(flag) => setShowDisputeSystemSidebar(flag)}
        showDisputeSystemSidebar={showDisputeSystemSidebar}
        jobTitle={get(disputeDetails, 'jobDetails.name', '-')}
        spaceId={spaceId}
        disputeStatus={capitalizeFirstLetter(get(disputeDetails, 'status', '-'))}
        milestoneAmount={disputeDetails ?.milestone ?.[mileStoneIndex] ?.amount}
        customerName={`${get(disputeDetails, 'customerDetails.firstName', '-')}  ${get(disputeDetails, 'customerDetails.lastName', '-')}`}
        clientName={`${get(disputeDetails, 'clientDetails.firstName', '-')}  ${get(disputeDetails, 'clientDetails.lastName', '-')}`}
        yatapayStaffName={get(disputeDetails, 'staffMember', '-')}
      />
      {/* **************** Dispute Managment Sidebar  ended****************** */}
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    disputeDetails: state.job.disputeDetails
  }
};

const mapDispatchToProps = {
  showToast, getOneDisputeDetails, showLoader, hideLoader, getDisputeByMilestone
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DisputeDetails));