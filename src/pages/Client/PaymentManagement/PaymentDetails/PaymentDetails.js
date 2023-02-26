import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Tab, Tabs, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import { withRouter, useHistory } from "react-router-dom";
import { get, size, isEmpty } from "lodash";
import CreditCardInput from 'react-credit-card-input';
import Scrollbars from "react-custom-scrollbars";
import HookForm from '../../../../components/HookForm/HookForm';
import ModalPopup from '../../../../components/ModalPopup/ModalPopup';
import AlertModal from '../../../../components/AlertModal/AlertModal';
import CustomButton from '../../../../components/UI/CustomButton/CustomButton';
import { hideLoader, showToast, showLoader } from "../../../../state/ducks/utils/operations";
import useWindowDimension from "../../../../hooks/useWindowDimension";
import processinactive from '../../../../assets/images/process-inactive.png';
import processinactive1 from '../../../../assets/images/process-inactive1.png';
import processactive from '../../../../assets/images/process-active.png';
import like from '../../../../assets/images/like.png';
// import inactive from '../../../../assets/images/inactive.png';
import active from '../../../../assets/images/active.png';
import chattwo from '../../../../assets/images/chat-two.png';
import disputeR from '../../../../assets/images/dispute-r.png';
import Bank from '../../../../assets/images/bank.svg';
import Card from '../../../../assets/images/card.svg';
// import Message from '../../../../util/message';

// import ChatView from '../../../../components/ChatView/ChatView';
// import CustomSideBar from '../../../../components/CustomSideBar/CustomSideBar';
import './PaymentDetails.scss';
import CreateMilestoneForm from '../Form/CreateMilestoneForm';
import RaiseDisputeForm from '../Form/RaiseDisputeForm';
import StorageService from "./../../../../services/localstorage.service";
import { getOneuserDetails, deleteMilestone, saveJob, escrowPaymentWithBank, checkTrueLayerStatus, escrowPaymentWithCard, paymentRealeaseRequest, paymentRelease, getDisputeByMilestone, createChannelspace } from '../../../../state/ducks/Job/actions';
import Constant from '../../../../util/constant';
import Label from '../../../../components/UI/Label/Label';
import PaymentHistory from '../Form/PaymentHistory';
import ModificationRequest from '../Form/ModificationRequest';
import ViewModificationRequests from '../Form/ViewModificationRequest';
import RadioButton from '../../../../components/UI/RadioButton/RadioButton';
import PubNub from "pubnub";
import { getMessages, subscribe, publishMessage, addListener, createPubnubSpace, addMemberToSpace, pubnub } from "../../../../config/pubnub"
import Mangopay from '../../../../config/mangopay';
import DisputeManagmentSidebar from '../../../../components/DisputeManagmentSidebar/DisputeManagmentSidebar';
import AnnounceSection from '../../../../components/AnnounceSection/AnnounceSection';
import { createChatEnvironment } from '../../../../config/chat';
import { capitalizeFirstLetter } from '../../../../services/helper.service';
import activeDispute from '../../../../assets/images/dispute-active.png';
import bothactiveDispute from '../../../../assets/images/dispute-active(1).png';
// import bothinActiveDispute from '../../../../assets/images/dispute-inactive(1).png';
const uuid = PubNub.generateUUID();
// export const pubnub = new PubNub({
//   publishKey: process.env.REACT_APP_PUBNUB_PUBLISH_KEY,
//   subscribeKey: process.env.REACT_APP_PUBNUB_SUBSCRIBE_KEY,
//   uuid: uuid
// });
const PaymentDetails = (props) => {
  let roletype = StorageService.getItem("roletype")
  const { jobDetails, disputeDetails } = props
  const history = useHistory();
  // let [showIsNoData, setShowIsNoData] = useState(false)
  // let [showDownloadPdf, setShowDownloadPdf] = useState(false)
  const [isEdit, setIsedit] = useState(false)
  let [showAddInterimPayment, setShowAddInterimPayment] = useState(false)
  let [selectedMilestone, setselectedMilestone] = useState()
  let [showRaiseDispute, setShowRaiseDispute] = useState(false) // eslint-disable-next-line
  const [spaceId, setSpaceId] = useState('');
  let [showDeleteModal, setShowDeleteModal] = useState(false) // eslint-disable-next-line
  let [selectedMilestoneID, setselectedMilestoneID] = useState()
  let [isSave, setIsSave] = useState(false)
  const [form, setFilterForm] = React.useState() // eslint-disable-next-line
  const [busy, setBusy] = React.useState(false)
  const [mileStoneIndex, setMileStoneIndex] = useState(0)
  const dimensions = useWindowDimension()
  const [headerHeight, setHeaderHeight] = useState(0)
  const [backHeight, setBackHeight] = useState(0)
  let [totalMilestoneAmount, settotalMilestoneAmount] = useState()
  const [showSaveModel, setshowSaveModel] = useState(false)
  const [showPaymentHistory, setShowPaymentHistory] = useState(false)
  const [rejectionComment, setRejectionComment] = useState()
  const [serviseChargesRate, setserviseChargesRate] = useState(15)
  const [showPaymentCard, setShowPaymentCard] = useState(false)
  const [showModificationRequest, setShowModificationRequest] = useState(false)
  const [showViewModification, setShowViewModification] = useState(false)
  const [isModified, setIsModified] = useState(false)
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvc, setCvc] = useState('')
  let [showDisputeSystemSidebar, setShowDisputeSystemSidebar] = useState(false)
  const [milestoneTempdata, setMilestoneTempdata] = useState([])
  const customerName = `${get(disputeDetails, 'customerDetails.firstName', '-')}  ${get(disputeDetails, 'customerDetails.lastName', '-')}`
  const clientName = `${get(disputeDetails, 'clientDetails.firstName', '-')}  ${get(disputeDetails, 'clientDetails.lastName', '-')}`
  const [message, setMessage] = useState([])
  let currentUser = StorageService.getItem("user")

  let { titleConfirm = 'Yes' } = props

  const [confirmType, setConfirmType] = useState('BANK');
  // useEffect(() => {
  //   let channels = [spaceId];
  //   pubnub.subscribe({ channels });
  //   return () => {
  //     let channels = [spaceId];
  //     pubnub.unsubscribe({
  //       channels
  //     });
  //   };
  // }, [spaceId])

  const createChannelSpace = async (item) => {
    const members = [item.clientId, item.customerId, item.staffId];
    const usersArray = [].concat(
      members.map((user) => {
        return { id: user };
      })
    );
    // let currentUser = StorageService.getItem('user')._id
    // let usersArr = [{ id: '60c8328f3020173284c5fe7f' }]
    createChatEnvironment(usersArray, usersArray, item._id, res => {
      props.createChannelspace(item._id, res).then((res) => {
        setSpaceId(res?.payload?.channelId);
        getPreviousMessages(res?.payload?.channelId)
      }).catch(() => {
        props.showToast({
          message: "Something is wrong with your chat environment!!",
          type: "error",
        });
      })
    }

      //   {
      //   if (!res.status) {
      //     props.showToast({
      //       message: "Something is wrong with your chat environment!!",
      //       type: "error",
      //     });
      //   } else {
      //     setSpaceId(res.spaceId);
      //     // getPreviousMessages(res.spaceId)
      //   }
      // }
    );
  }
  const radioChangeHandler = (event) => {
    setConfirmType(event.target.value);
  }
  useEffect(() => {

    setHeaderHeight(document.getElementsByClassName('headerClient')[0].offsetHeight);
    setBackHeight(document.getElementsByClassName('backTo')[0].offsetHeight);
  })

  useEffect(() => {
    let paymentId = history.location.search.replace('?payment_id=', '');
    if (paymentId) {
      let JobId = StorageService.getItem("JobId")
      let mileStoneId = StorageService.getItem("selectedMilestone")

      getTrueLayerStatus(paymentId, mileStoneId, JobId)

    }
  }, [])

  // page redirect //
  const routeBack = () => {
    let path = `/payments`;
    history.push(path);
    StorageService.removeItem("JobId")
    StorageService.removeItem("roletype")
  }
  useEffect(() => {
    let JobId = StorageService.getItem("JobId")
    if (props.jobDetails === null) {
      if (JobId) {
        props.showLoader()
        props.getOneuserDetails(JobId).then((res) => {
          props.hideLoader()
          // setMilestoneTempdata(res.payload[0].mileStoneData)
          // getDisputebymilestone()
          // createChannelSpace()
        })
      } else {
        routeBack()
      }
    }
  }, [])
  // const getDisputebymilestone = () => {
  //   if (jobDetails?.mileStoneData.length >= 1 && jobDetails?.mileStoneData[0]?.status === "DISPUTE" || jobDetails?.[mileStoneIndex]?.status === "DISPUTE") {
  //     jobDetails?.mileStoneData.length > 1 ? props.getDisputeByMilestone(jobDetails?.[0]?._id) : props.getDisputeByMilestone(jobDetails?.[mileStoneIndex]?._id)
  //   }
  // }

  const onDeleteMilestone = () => {
    props.showLoader()
    let JobId = StorageService.getItem("JobId")
    props.deleteMilestone(selectedMilestoneID).then((res) => {
      setShowDeleteModal(false)
      props.getOneuserDetails(JobId)
      setMileStoneIndex(mileStoneIndex - 1)
      props.hideLoader()
      props.showToast({
        message: res.message,
        type: "success"
      })
    }).catch((err) => {
      props.hideLoader()
    })
  }
  useEffect(() => {
    if (jobDetails) {
      let totalMilestoneAmount = 0
      jobDetails.mileStoneData && jobDetails.mileStoneData.map((milestoneAmount) => {
        totalMilestoneAmount = totalMilestoneAmount + milestoneAmount.amount
      })
      settotalMilestoneAmount(totalMilestoneAmount)
      if (Number(totalMilestoneAmount) <= 1100) {
        setserviseChargesRate(15)
      } else if (Number(totalMilestoneAmount) > 1100 && Number(totalMilestoneAmount) <= 5100) {
        setserviseChargesRate(10)
      } else if (Number(totalMilestoneAmount) > 5100) {
        setserviseChargesRate(5)
      }
      if (totalMilestoneAmount !== jobDetails.totalAmount) {
        // setIsSave(true)

        StorageService.setItem('isSave', { id: jobDetails._id, save: true })
      }
    }
  }, [props.jobDetails])
  useEffect(() => {
    if (StorageService.getItem("isSave") && StorageService.getItem("JobId") === StorageService.getItem("isSave").id) {
      setIsSave(true)
    }
  }, [isSave, jobDetails])
  const getPreviousMessages = async (id) => {
    await getMessages(id, (result) => {
      let arr = [];
      if (result) {
        result.map((value) => {
          arr.push({
            position: value.message.sender === currentUser.id ? 'right' : 'left',
            title: value.message.senderName,
            text: value.message.text,
            date: value.message.date,
            type: 'text',
          })
        });
        setMessage(arr)
      }
    });
  }
  const onSave = () => {
    props.showLoader()
    let JobId = StorageService.getItem("JobId")

    props.saveJob(JobId, { totalAmount: totalMilestoneAmount, servicePercentage: serviseChargesRate, isModification: isModified }).then((res) => {
      setshowSaveModel(false)
      props.getOneuserDetails(JobId)
      setIsSave(false)
      if (StorageService.getItem("JobId") === StorageService.getItem("isSave").id) {
        StorageService.removeItem('isSave')
      }
      props.hideLoader()
      props.showToast({
        message: res.message,
        type: "success"
      })
    }).catch((err) => {
      props.hideLoader()
    })
  }
  const GetDisputeByMilestone = (milestoneID) => {
    props.getDisputeByMilestone(milestoneID).then((res) => {
      setSpaceId(res?.payload?.[0]?.channelId)
      getPreviousMessages(res?.payload?.[0]?.channelId)
    })
  }
  useEffect(() => {
    if (jobDetails?.mileStoneData?.[mileStoneIndex]?.status === "DISPUTE") {

      jobDetails?.mileStoneData.length <= 1 ? GetDisputeByMilestone(jobDetails?.mileStoneData?.[0]?._id) : GetDisputeByMilestone(jobDetails?.mileStoneData?.[mileStoneIndex]?._id)
    }
    if (jobDetails?.mileStoneData.length <= 1 && jobDetails?.mileStoneData?.[0]?.status === "DISPUTE") {

      jobDetails?.mileStoneData.length <= 1 ? GetDisputeByMilestone(jobDetails?.mileStoneData?.[0]?._id) : GetDisputeByMilestone(jobDetails?.mileStoneData?.[mileStoneIndex]?._id)
    }
  }, [mileStoneIndex, jobDetails])
  // ****************************  Payment escrow with Bank & Card ****************************
  const onPayNow = async () => {
    if (confirmType === 'BANK') {
      props.showLoader()

      props.escrowPaymentWithBank({ mileStoneId: selectedMilestoneID, paymentType: confirmType }).then((res) => {
        // window.open(res.link)
        console.log(res);
        window.open(res.payload, '_self')
        setShowPaymentCard(false)
        props.hideLoader()
        // props.showToast({
        //   message: res.message,
        //   type: "success"
        // })
      }).catch((error) => {
        props.hideLoader()
        console.log("error");
        props.showToast({
          message: error?.response?.data?.message,
          type: "error"
        })
      })
    } else {
      // payWithCardId({ CardId: '116108225' })
      registrationCard()
    }
  }
  // **************************** Register card for customer ******************************
  const registrationCard = async () => {
    props.showLoader()
    try {
      let cardRequest = {
        UserId: jobDetails.mangoPayCustomerId,
        Currency: 'GBP',
      };
      let cardInfo = await Mangopay.createCard(cardRequest);

      try {
        let card = {
          data: cardInfo.data.PreregistrationData,
          accessKeyRef: cardInfo.data.AccessKey,
          cardNumber: cardNumber.replace(/ /g, ''),
          cardExpirationDate: expiry.replace('/', '').replace(/ /g, ''),
          cardCvx: cvc,
          returnURL: '',
        };

        let cardToken = await Mangopay.getCardToken(cardInfo.data.CardRegistrationURL, card);

        if (cardToken.data.includes('data')) {
          let tokenRequest = {
            RegistrationData: cardToken.data.toString(),
          };
          try {
            let updateCard = await Mangopay.updateCard(cardInfo.data.Id, tokenRequest);
            if (updateCard.data.hasOwnProperty('Id')) {
              payWithCardId(updateCard.data);
            } else {
              props.hideLoader()
              props.showToast({
                message: `Your card id is not getting.Please try again`,
                type: "error"
              })
            }
          } catch (error) {
            props.hideLoader()
            props.showToast({
              message: `Your card id is not getting.Please try again`,
              type: "error"
            })
          }
        } else {
          if (cardToken.includes('09101')) {
            props.hideLoader()
            props.showToast({
              message: `Please check your card details.`,
              type: "error"
            })
          } else {
            props.hideLoader()
            props.showToast({
              message: `Your maximum trial completed.Please try to another card details`,
              type: "error"
            })
          }
        }
      } catch (err) {
        props.hideLoader()
        props.showToast({
          message: `Please check your card details.`,
          type: "error"
        })
      }
    } catch (err) {
      props.hideLoader()
      props.showToast({
        message: `Your card is not registered.Your transaction is Rejected`,
        type: "error"
      })
    }
  }

  // **************************** Payment with bank after register card **********************************
  const payWithCardId = async (cardData) => {
    // props.showLoader()
    let JobId = StorageService.getItem("JobId")
    props.escrowPaymentWithCard({ mileStoneId: selectedMilestoneID, paymentType: confirmType, cardId: cardData.CardId }).then((res) => {

      props.hideLoader()
      setShowPaymentCard(false)
      props.getOneuserDetails(JobId)
      localStorage.setItem('selectedMilestone', '');
      props.showToast({
        message: res.message,
        type: "success"
      })
    }).catch((error) => {
      props.hideLoader()
      setShowPaymentCard(false)
      props.getOneuserDetails(JobId)
      localStorage.setItem('selectedMilestone', '');
      props.showToast({
        message: error?.response?.data?.message,
        type: "error"
      })
    })
  }
  // ****************************  Check Payment Status failed & success ****************************
  const getTrueLayerStatus = async (paymentId, mileStoneId, JobId) => {
    props.showLoader()
    props.checkTrueLayerStatus(paymentId, mileStoneId, JobId).then((res) => {
      localStorage.setItem('selectedMilestone', '');
      history.push('/payments/details');
      props.hideLoader()
      props.showToast({
        message: res.message,
        type: "success"
      })
      props.getOneuserDetails(JobId)
    }).catch((error) => {
      props.hideLoader()
      props.getOneuserDetails(JobId)
      localStorage.setItem('selectedMilestone', '');
      history.push('/payments/details');
      props.showToast({
        message: error?.response?.data?.message,
        type: "error"
      })
    })
  }
  const onPaymentReleaseRequest = (id) => {
    let JobId = StorageService.getItem("JobId")
    props.paymentRealeaseRequest(id).then((res) => {
      props.getOneuserDetails(JobId)
      props.showToast({ message: res.message, type: "success", time: 45000 })

    }).catch((error) => {
      props.showToast({ message: error?.response?.data?.message, time: 45000, type: "error" })
    })
  }

  const onPaymentRelease = (id) => {
    let JobId = StorageService.getItem("JobId")
    props.paymentRelease({ mileStoneId: id }).then((res) => {
      props.getOneuserDetails(JobId)
      props.showToast({ message: res.message, type: "success", time: 45000 })
    }).catch((error) => {
      props.showToast({ message: error?.response?.data?.message, type: "error", time: 45000 })
    })
  }
  const getMilestonePaymentStatus = () => {
    return props.jobDetails && jobDetails.mileStoneData.length > 1 && jobDetails.mileStoneData.findIndex((milestone) =>
      milestone?.status === "PAYMENT_RELEASE"
    )
  }

  useEffect(() => {
    if (props.jobDetails?.mileStoneData?.length !== 1) {
      setMileStoneIndex(getMilestonePaymentStatus() + 1)
    }
  }, [props.jobDetails])

  return (
    <div className='paymentdetailMain' style={{ height: (dimensions.height - headerHeight) + 'px', marginTop: (headerHeight + 'px') }}>
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
                  <div className="titleleft">{get(jobDetails, 'name')}</div>
                  <p>{get(jobDetails, 'description')}.</p>
                  <div className="sub_title">Customer Details:</div>
                  <div className="subDetails">{get(jobDetails, 'customerName')}</div>
                  <div className="subDetails">{get(jobDetails, 'customerEmail')}</div>
                  <div className="subDetails">+{get(jobDetails, 'dialCode')} {get(jobDetails, 'phoneNumber')}</div>
                </div>
              </div>
              <div className="rightside">
                <div className="innerBox">
                  <div className="right_sub_details">Total Transaction Amount:<strong>£ {get(jobDetails, 'totalAmount', 0).toFixed(2)}</strong></div>
                  <div className="right_sub_details">Transaction Status:<strong>{roletype === 3 ? jobDetails && Constant.JOBSTATUSCLIENT[`${jobDetails?.status}`] : jobDetails && Constant.JOBSTATUSCUSTOMER[`${jobDetails?.status}`]}</strong></div>
                  {/* <div className="right_sub_details">Business Category:<strong>Architect</strong></div> */}
                  <div className='btnRight'>

                    {roletype === 3 && jobDetails && jobDetails?.status !== "WAITING_ACCEPT" && < CustomButton className="success" onClick={() => { setIsedit(false); setShowAddInterimPayment(!showAddInterimPayment) }} title="Add Interim Transaction" />}
                    {jobDetails && jobDetails?.status === "REJECTED" && jobDetails.rejectHistory && jobDetails.rejectHistory.length > 0 && < CustomButton className="succerroress" title="Rejection Comment" onClick={() => { setRejectionComment(jobDetails.rejectHistory); setShowPaymentHistory(true) }} />}
                    {(jobDetails?.mileStoneData?.length > 1 ?
                      jobDetails?.mileStoneData?.[mileStoneIndex]?.status === "PAYMENT_IN_DEPOSITE" || jobDetails?.mileStoneData[mileStoneIndex]?.status === "RELEASE_REQUESTED" :
                      jobDetails?.mileStoneData?.[0]?.status === "PAYMENT_IN_DEPOSITE" || jobDetails?.mileStoneData[0]?.status === "RELEASE_REQUESTED") &&
                      <CustomButton type='button' title='Query Transaction' onClick={() => setShowRaiseDispute(!showRaiseDispute)}></CustomButton>
                    }
                    {roletype === 4 && jobDetails && jobDetails?.status !== "WAITING_ACCEPT" && < CustomButton className="success" onClick={() => { setShowModificationRequest(true) }} title="Modification Request" />}
                    {roletype === 3 && jobDetails && jobDetails.modificationRequestHistory && jobDetails.modificationRequestHistory.length > 0 && < CustomButton className="success" onClick={() => { setShowViewModification(true) }} title="View Modification Request" />}
                    {roletype === 3 && jobDetails && jobDetails?.status === "REJECTED" && jobDetails.isUpdate && <CustomButton className="success savebtn" title="Save" onClick={() => { setIsModified(false); setshowSaveModel(true) }} />}
                    {roletype === 3 && jobDetails && jobDetails?.status !== "REJECTED" && jobDetails.isUpdate && <CustomButton className="success savebtn" title="Save" onClick={() => { setIsModified(true); setshowSaveModel(true) }} />}
                    {(jobDetails?.mileStoneData?.length > 1 ? jobDetails?.mileStoneData?.[mileStoneIndex]?.status === "DISPUTE" : jobDetails?.mileStoneData?.[0]?.status === "DISPUTE") && <CustomButton onClick={() => setShowDisputeSystemSidebar(!showDisputeSystemSidebar)} title="Query Management System" />}

                  </div>
                </div>
              </div>
            </div>

            {
              //  ***************************** Milestone listing with multiple milestione Started *************************************
              jobDetails && jobDetails.mileStoneData && jobDetails.mileStoneData.length > 1 ?
                <div className={"tabbar_main"}>
                  <Tabs activeKey={mileStoneIndex} defaultActiveKey={mileStoneIndex} onSelect={(e) => setMileStoneIndex(Number(e))} id="uncontrolled-tab-example">
                    {jobDetails && jobDetails.mileStoneData && jobDetails.mileStoneData.map((milestone, index) =>

                      <Tab tabClassName={milestone?.status === "PAYMENT_RELEASE" ? "complate" : milestone?.status === "DISPUTE" ? "dispute_miletone_red" : ""} eventKey={index} title={milestone.title} id={index}>
                        <div className="tab_box_main">

                          <div className="tab_heading">
                            <div className="column_left">
                              <div className="text">{milestone.title}</div>
                              <div className="text">Cost: £ {get(milestone, 'amount').toFixed(2)}</div>
                            </div>
                            <div className="column_middle">{get(milestone, 'description')}</div>
                            <div className="column_right">
                              {roletype === 4 && (milestone?.status == "RELEASE_REQUESTED") && <button className="btn_custom pay_btn" onClick={() => { setselectedMilestoneID(milestone._id); onPaymentRelease(milestone._id); localStorage.setItem('selectedMilestone', milestone._id) }}>Request transaction</button>}
                              {roletype === 3 && (milestone?.status == "PAYMENT_IN_DEPOSITE") &&
                                <button type="button" className={StorageService.getItem("user").bankInfo ? "btn_custom release_request" : "btn_custom release_request_btn"}
                                  onClick={() => {
                                    // if (StorageService.getItem("user").bankInfo && StorageService.getItem("user").kycDocsId) {
                                    setselectedMilestoneID(milestone._id);
                                    onPaymentReleaseRequest(milestone._id);
                                    localStorage.setItem('selectedMilestone', milestone._id)
                                    // } else {
                                    //   props.history.push("/profile", { showFinancialModal: true })
                                    // }
                                  }}>
                                  Release request
                                  {/* {!StorageService.getItem("user").bankInfo || !StorageService.getItem("user").kycDocsId && <span className="custom_tooltip">
                                    {['top'].map((placement) => (
                                      <OverlayTrigger

                                        key={placement}
                                        placement={placement}
                                        overlay={
                                          <Tooltip id={`custom_tooltip-top`}>
                                            We couldn't find a your bank account or KYC. Please added your bank details or upload KYC after try to release request
                                          </Tooltip>
                                        }
                                      >
                                        <span className="icon-warning" />
                                      </OverlayTrigger>
                                    ))}
                                  </span>} */}
                                </button>}
                              {roletype === 4 && (milestone?.status == "WAITING_FUND_DEPOSITE" || milestone?.status == "PAYMENT_REJECTED") && <button className="btn_custom pay_btn" onClick={() => { setselectedMilestoneID(milestone._id); localStorage.setItem('selectedMilestone', milestone._id); setShowPaymentCard(!showPaymentCard) }}>FUND ESCROW </button>}
                              {roletype === 3 && milestone?.status !== "WAITING_ACCEPT" && (milestone?.status === "WAITING_ACCEPT" || milestone?.status === "WAITING_FUND_DEPOSITE" || milestone?.status === "REJECTED") && <button className="btn_custom"
                                onClick={() => {
                                  setselectedMilestone(milestone);
                                  setIsedit(true)
                                  setShowAddInterimPayment(!showAddInterimPayment)
                                }}>
                                Edit
                              </button>}
                              {roletype === 3 && jobDetails.mileStoneData.length > 1 && milestone?.status !== "WAITING_ACCEPT" && (milestone?.status === "WAITING_ACCEPT" || milestone?.status === "WAITING_FUND_DEPOSITE" || milestone?.status === "REJECTED") && <button className="btn_custom delete" onClick={() => { setselectedMilestoneID(milestone._id); setShowDeleteModal(!showDeleteModal) }}>Delete</button>}
                            </div>
                          </div>
                          <div className="tab_listing">
                            <div className="box_title_inner">Transaction Stage</div>
                            <div className="listColumn">
                              <ul>
                                <li>
                                  {
                                    milestone?.status === "WAITING_ACCEPT" || milestone?.status === "REJECTED" ?
                                      <>
                                        <img width="90" height="90" src={processinactive} alt='process_inactive' />
                                        <div className="title" >
                                          {roletype === 3 && `Waiting for ${get(jobDetails, 'customerName')} to Accept The Transaction`}
                                          {roletype === 4 && "Waiting for You to Accept The Transaction"}

                                        </div>
                                      </>
                                      :
                                      <>
                                        <img width="90" height="90" src={like} alt='process_inactive' />
                                        <div className="title_blue" >
                                          {roletype === 3 && `${get(jobDetails, 'customerName')} has accepted the transaction`}
                                          {roletype === 4 && "You Accepted The Transaction"}
                                        </div>
                                        <div className="custom_tooltip">
                                          {['top'].map((placement) => (
                                            <OverlayTrigger

                                              key={placement}
                                              placement={placement}
                                              overlay={
                                                <Tooltip id={`custom_tooltip-top`}>
                                                  {roletype === 3 && `${get(jobDetails, 'customerName')}  has received and approved the job proposal`}
                                                  {roletype === 4 && "We have informed everyone that you accepted the conditions of the transaction. The next step is to fund the escrow account. The funds will remain in the escrow account until you authorise their release. "}
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
                                    milestone?.status === "WAITING_ACCEPT" || milestone?.status === "REJECTED" || milestone?.status === "WAITING_FUND_DEPOSITE" || milestone?.status === "PAYMENT_REJECTED" ?
                                      <>
                                        <img width="90" height="85" src={processinactive1} alt='process_inactive1' />
                                        <div className="title">Funds Not Yet In Deposit Box</div>
                                      </>
                                      :
                                      <>
                                        <img width="90" height="85" src={processactive} alt='process_inactive1' />
                                        <div className="title">Funds In Deposit Box</div>

                                        <div className="custom_tooltip">
                                          {['top'].map((placement) => (
                                            <OverlayTrigger

                                              key={placement}
                                              placement={placement}
                                              overlay={
                                                <Tooltip id={`custom_tooltip-top`}>
                                                  {roletype === 3 ? "The funds are being held securely in an electronic escrow account managed by our banking partner MangoPay." : "The funds are being held securely in an electronic escrow account managed by our banking partner MangoPay."}

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
                                {/* <li>
                                  {milestone.PAYMENT_COMPLETE === "PAYMENT_COMPLETE"?
                                </li> */}
                                <li>
                                  {milestone?.status === "PAYMENT_COMPLETE" ?
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
                                                {roletype === 3 && `Success! Your Customer has released the funds. transactions are processed each day at 10:00am and 4:00pm Mon-Fri. `}
                                                {roletype === 4 && "Transaction has now been released. "}
                                              </Tooltip>
                                            }
                                          >
                                            <Button className="tooltip_custom"><span className="icon-question"></span></Button>
                                          </OverlayTrigger>
                                        ))}
                                      </div>
                                    </>
                                    : milestone?.status === "DISPUTE" ?
                                      <>
                                        <img width="90" height="90"
                                          src={disputeDetails?.conclusion === "ARBITRATION" ? activeDispute : disputeDetails?.clientResponse === "PENDING" || disputeDetails?.customerResponse === "PENDING" ? disputeR :
                                            disputeDetails?.clientResponse === "ACCEPT" && disputeDetails?.customerResponse === "ACCEPT" ? bothactiveDispute :
                                              disputeDetails?.clientResponse === "REJECTED" && disputeDetails?.customerResponse === "REJECTED" ? disputeR :
                                                disputeDetails?.clientResponse === "ACCEPT" && disputeDetails?.customerResponse === "REJECTED" ? activeDispute :
                                                  disputeDetails?.clientResponse === "REJECTED" && disputeDetails?.customerResponse === "ACCEPT" ? activeDispute : disputeR} />
                                        < div className="title">
                                          {disputeDetails?.conclusion === "ARBITRATION" ? "Dispute has sent for arbitration" : disputeDetails?.clientResponse === "PENDING" || disputeDetails?.customerResponse === "PENDING" ? "Waiting for client or customer response" :
                                            disputeDetails?.clientResponse === "ACCEPT" && disputeDetails?.customerResponse === "ACCEPT" ? "Conclusion accpeted by both" :
                                              disputeDetails?.clientResponse === "REJECTED" && disputeDetails?.customerResponse === "REJECTED" ? "Conclusion rejected" :
                                                disputeDetails?.clientResponse === "ACCEPT" && disputeDetails?.customerResponse === "REJECTED" ? `Conclusion accepted by ${clientName} and rejected by ${customerName} ` :
                                                  disputeDetails?.clientResponse === "REJECTED" && disputeDetails?.customerResponse === "ACCEPT" ? `Conclusion rejected by ${clientName} and accepted by ${customerName}` : "A member of the Securepay team will be in touch to assist."}
                                        </div>
                                        <div className="custom_tooltip">
                                          {['top'].map((placement) => (
                                            <OverlayTrigger

                                              key={placement}
                                              placement={placement}
                                              overlay={
                                                <Tooltip id={`custom_tooltip-top`}>
                                                  {disputeDetails?.conclusion === "ARBITRATION" ? "Dispute has sent for arbitration" : disputeDetails?.clientResponse === "PENDING" || disputeDetails?.customerResponse === "PENDING" ? "Waiting for client or customer response" :
                                                    disputeDetails?.clientResponse === "ACCEPT" && disputeDetails?.customerResponse === "ACCEPT" ? "Conclusion accpeted by both" :
                                                      disputeDetails?.clientResponse === "REJECTED" && disputeDetails?.customerResponse === "REJECTED" ? "Conclusion rejected" :
                                                        disputeDetails?.clientResponse === "ACCEPT" && disputeDetails?.customerResponse === "REJECTED" ? `Conclusion accepted by ${clientName} and rejected by ${customerName} ` :
                                                          disputeDetails?.clientResponse === "REJECTED" && disputeDetails?.customerResponse === "ACCEPT" ? `Conclusion rejected by ${clientName} and accepted by ${customerName}` : "A member of the Securepay team will be in touch to assist."}
                                                </Tooltip>
                                              }
                                            >
                                              <Button className="tooltip_custom"><span className="icon-question"></span></Button>
                                            </OverlayTrigger>
                                          ))}
                                        </div>
                                        {/* <div className="title">{`A dispute has been raised by ${get(jobDetails, 'customerName')}. The milestone will now be in a disputed state until this is resolved. Please see the Dispute Management page for more information.`}</div> */}
                                      </>
                                      :
                                      <>
                                        <img width="90" height="90" src={chattwo} alt='active' />
                                        <div className="title"> Transaction Requested </div>
                                        {
                                          roletype === 3 &&
                                          ['top'].map((placement) => (
                                            <OverlayTrigger

                                              key={placement}
                                              placement={placement}
                                              overlay={
                                                <Tooltip id={`custom_tooltip-top`}>
                                                  When the transaction is complete you will be sent a request to release the funds. If you are happy that all conditions have been met you should release the funds. In the rare event something goes wrong let us know and we will mediate for you.
                                                  {/* {roletype === 4 && "Transaction has now been released. "} */}
                                                </Tooltip>
                                              }
                                            >
                                              <Button className="tooltip_custom"><span className="icon-question"></span></Button>
                                            </OverlayTrigger>
                                          ))
                                        }

                                      </>
                                  }
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
                    }{size(get(jobDetails, 'mileStoneData')) > mileStoneIndex + 1 && <button className={"btn_milestone"} onClick={() => setMileStoneIndex(mileStoneIndex + 1)}>Next Milestone<span className="icon-back right"></span></button>
                    }</div>
                </div>
                //  ***************************** Milestone listing with multiple milestione Ended *************************************
                :
                //  ***************************** Milestone listing with Single milestione Started *************************************
                <div className="tabbar_main">
                  {jobDetails && jobDetails.mileStoneData && jobDetails.mileStoneData.map((milestone, index) =>
                    <div className="tab_box_main">

                      <div className="tab_heading">
                        <div className="column_left">
                          <div className="text">{milestone.title}</div>
                          <div className="text">Cost: £ {get(milestone, 'amount')}</div>
                        </div>
                        <div className="column_middle">{get(milestone, 'description')}</div>


                        <div className="column_right">
                          {roletype === 4 && (milestone?.status == "RELEASE_REQUESTED") && <button className="btn_custom pay_btn" onClick={() => { setselectedMilestoneID(milestone._id); onPaymentRelease(milestone._id); localStorage.setItem('selectedMilestone', milestone._id) }}>Request Transaction</button>}
                          {roletype === 3 && (milestone?.status == "PAYMENT_IN_DEPOSITE") && <button className={StorageService.getItem("user").bankInfo ? "btn_custom release_request" : "btn_custom release_request_btn"}
                            onClick={() => {
                              // if (StorageService.getItem("user").bankInfo) {
                              setselectedMilestoneID(milestone._id);
                              onPaymentReleaseRequest(milestone._id);
                              localStorage.setItem('selectedMilestone', milestone._id)
                              // } else {
                              //   props.history.push("/profile", { showFinancialModal: true })
                              // }
                            }}>
                            Release request
                            {/* {!StorageService.getItem("user").bankInfo && <span className="custom_tooltip">
                              {['top'].map((placement) => (
                                <OverlayTrigger

                                  key={placement}
                                  placement={placement}
                                  overlay={
                                    <Tooltip id={'custom_tooltip-top'}>
                                      We couldn't find a your bank account.Please added your bank details after try to release request
                                    </Tooltip>
                                  }
                                >
                                  <span className="icon-warning" />
                                </OverlayTrigger>
                              ))}
                            </span>} */}
                          </button>}
                          {roletype === 4 && (milestone?.status == "WAITING_FUND_DEPOSITE" || milestone?.status == "PAYMENT_REJECTED") && <button className="btn_custom pay_btn" onClick={() => { setselectedMilestoneID(milestone._id); localStorage.setItem('selectedMilestone', milestone._id); setShowPaymentCard(!showPaymentCard) }}>FUND ESCROW</button>}
                          {roletype === 3 && jobDetails?.status !== "WAITING_ACCEPT" && (milestone?.status === "WAITING_ACCEPT" || milestone?.status === "WAITING_FUND_DEPOSITE" || milestone?.status === "REJECTED") && <button className="btn_custom" onClick={() => { setIsedit(true); setselectedMilestone(milestone); setShowAddInterimPayment(!showAddInterimPayment) }}>edit</button>}
                          {/* {jobDetails.mileStoneData.length > 1 && <button className="btn_custom delete" onClick={() => { setselectedMilestoneID(milestone._id); setShowDeleteModal(!showDeleteModal) }}>Delete</button>} */}
                        </div>

                      </div>
                      <div className="tab_listing">
                        <div className="box_title_inner">Transaction Stage</div>
                        <div className="listColumn">
                          <ul>
                            <li>
                              {
                                milestone?.status === "WAITING_ACCEPT" || milestone?.status === "REJECTED" ?
                                  <>
                                    <img width="90" height="90" src={processinactive} alt='process_inactive' />
                                    <div className="title" >
                                      {roletype === 3 && `Waiting for ${get(jobDetails, 'customerName')} to Accept The Transaction`}
                                      {roletype === 4 && "Waiting for You to Accept The Transaction"}
                                    </div>
                                  </>
                                  :
                                  <>
                                    <img width="90" height="90" src={like} alt='process_inactive' />
                                    <div className="title_blue" >
                                      {roletype === 3 && `${get(jobDetails, 'customerName')} has accepted the transaction`}
                                      {roletype === 4 && "You Accepted The Transaction"}

                                    </div>
                                    <div className="custom_tooltip">
                                      {['top'].map((placement) => (
                                        <OverlayTrigger
                                          key={placement}
                                          placement={placement}
                                          overlay={
                                            <Tooltip id={`custom_tooltip-${placement}`}>
                                              {roletype === 3 && `${get(jobDetails, 'customerName')}  has received and approved the job proposal`}
                                              {roletype === 4 && "You Accepted The Transaction"}
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
                                milestone?.status === "WAITING_ACCEPT" || milestone?.status === "REJECTED" || milestone?.status === "WAITING_FUND_DEPOSITE" || milestone?.status === "PAYMENT_REJECTED" ?
                                  <>
                                    <img width="90" height="85" src={processinactive1} alt='process_inactive1' />
                                    <div className="title">Funds Not Yet In Deposit Box</div>
                                  </>
                                  :
                                  <>
                                    <img width="90" height="85" src={processactive} alt='process_inactive1' />
                                    <div className="title">Funds In Deposit Box</div>
                                    <div className="custom_tooltip">
                                      {['top'].map((placement) => (
                                        <OverlayTrigger
                                          key={placement}
                                          placement={placement}
                                          overlay={
                                            <Tooltip id={`custom_tooltip-${placement}`}>
                                              {roletype === 3 ? "The transaction has been processed successfully and is in the deposit box. You may now begin the work for this milestone." : "The transaction has been processed successfully and is in the deposit box."}

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
                              {milestone?.status === "PAYMENT_COMPLETE" ?
                                <>
                                  <img width="90" height="90" src={active} alt='active' />
                                  <div className="title">Milestone Completed</div>
                                  <div className="custom_tooltip">
                                    {['top'].map((placement) => (
                                      <OverlayTrigger

                                        key={placement}
                                        placement={placement}
                                        overlay={
                                          <Tooltip id={`custom_tooltip-${placement}`}>
                                            {roletype === 3 && `Success! Your Customer has released the funds. Payments are processed each day at 10:00am and 4:00pm Mon-Fri. `}
                                            {roletype === 4 && "Transaction has now been released. "}
                                          </Tooltip>
                                        }
                                      >
                                        <Button className="tooltip_custom"><span className="icon-question"></span></Button>
                                      </OverlayTrigger>
                                    ))}
                                  </div>
                                </>
                                :
                                milestone?.status === "DISPUTE" ?
                                  <>
                                    <img width="90" height="90"
                                      src={disputeDetails?.conclusion === "ARBITRATION" ? activeDispute : disputeDetails?.clientResponse === "PENDING" || disputeDetails?.customerResponse === "PENDING" ? disputeR :
                                        disputeDetails?.clientResponse === "ACCEPT" && disputeDetails?.customerResponse === "ACCEPT" ? bothactiveDispute :
                                          disputeDetails?.clientResponse === "REJECTED" && disputeDetails?.customerResponse === "REJECTED" ? disputeR :
                                            disputeDetails?.clientResponse === "ACCEPT" && disputeDetails?.customerResponse === "REJECTED" ? activeDispute :
                                              disputeDetails?.clientResponse === "REJECTED" && disputeDetails?.customerResponse === "ACCEPT" ? activeDispute : disputeR} />

                                    <div className="title">
                                      {disputeDetails?.conclusion === "ARBITRATION" ? "Dispute has sent for arbitration" : disputeDetails?.clientResponse === "PENDING" || disputeDetails?.customerResponse === "PENDING" ? "Waiting for client or customer response" :
                                        disputeDetails?.clientResponse === "ACCEPT" && disputeDetails?.customerResponse === "ACCEPT" ? "Conclusion accpeted by both" :
                                          disputeDetails?.clientResponse === "REJECTED" && disputeDetails?.customerResponse === "REJECTED" ? "Conclusion rejected" :
                                            disputeDetails?.clientResponse === "ACCEPT" && disputeDetails?.customerResponse === "REJECTED" ? `Conclusion accepted by ${clientName} and rejected by ${customerName} ` :
                                              disputeDetails?.clientResponse === "REJECTED" && disputeDetails?.customerResponse === "ACCEPT" ? `Conclusion rejected by ${clientName} and accepted by ${customerName}` : "A member of the Securepay team will be in touch to assist."}
                                    </div>
                                    <div className="custom_tooltip">
                                      {['top'].map((placement) => (
                                        <OverlayTrigger

                                          key={placement}
                                          placement={placement}
                                          overlay={
                                            <Tooltip id={`custom_tooltip-top`}>
                                              {disputeDetails?.conclusion === "ARBITRATION" ? "Dispute has sent for arbitration" : disputeDetails?.clientResponse === "PENDING" || disputeDetails?.customerResponse === "PENDING" ? "Waiting for client or customer response" :
                                                disputeDetails?.clientResponse === "ACCEPT" && disputeDetails?.customerResponse === "ACCEPT" ? "Conclusion accpeted by both" :
                                                  disputeDetails?.clientResponse === "REJECTED" && disputeDetails?.customerResponse === "REJECTED" ? "Conclusion rejected" :
                                                    disputeDetails?.clientResponse === "ACCEPT" && disputeDetails?.customerResponse === "REJECTED" ? `Conclusion accepted by ${clientName} and rejected by ${customerName} ` :
                                                      disputeDetails?.clientResponse === "REJECTED" && disputeDetails?.customerResponse === "ACCEPT" ? `Conclusion rejected by ${clientName} and accepted by ${customerName}` : "A member of the Securepay team will be in touch to assist."}
                                            </Tooltip>
                                          }
                                        >
                                          <Button className="tooltip_custom"><span className="icon-question"></span></Button>
                                        </OverlayTrigger>
                                      ))}
                                    </div>
                                    {/* <div className="title">{`A dispute has been raised by ${get(jobDetails, 'customerName')}. The milestone will now be in a disputed state until this is resolved. Please see the Dispute Management page for more information.`}</div> */}
                                  </>
                                  :
                                  <>
                                    <img width="90" height="90" src={chattwo} alt='active' />
                                    <div className="title"> Transaction Requested </div>
                                  </>
                              }

                            </li>
                          </ul>
                        </div>
                      </div>

                    </div>

                  )}
                </div>
              //  ***************************** Milestone listing with Single milestione Ended *************************************
            }
          </div>
          {(jobDetails?.mileStoneData?.length <= 1 ? jobDetails?.mileStoneData[0]?.status === "DISPUTE" : jobDetails?.mileStoneData?.[mileStoneIndex]?.status === "DISPUTE") && !isEmpty(disputeDetails) &&

            <AnnounceSection
              milestoneAmount={jobDetails?.mileStoneData[mileStoneIndex]?.amount}
              mileStoneId={jobDetails?.mileStoneData[mileStoneIndex]?._id}
              disputeDetails={props?.disputeDetails} />}
        </div>
      </Scrollbars>

      {/* ************************  Add Interim Payment Model Started  ************************** */}
      <ModalPopup
        showModal={showAddInterimPayment}
        onHide={() => setShowAddInterimPayment(false)}
        className='addInterimPayment'
        closeIcon={true}
      >
        <CreateMilestoneForm
          setIsSave={(flag) => {
            setIsSave(flag)
          }}
          isEdit={isEdit}
          milestone={selectedMilestone} onHide={() => setShowAddInterimPayment(false)}></CreateMilestoneForm>
      </ModalPopup>
      {/* ************************  Add Interim Payment Model Ended  ************************** */}


      <ModalPopup
        showModal={showRaiseDispute}
        onHide={() => setShowRaiseDispute(false)}
        className='raiseMilestone'
        closeIcon={true}
      >
        <RaiseDisputeForm
          onHide={() => { setShowRaiseDispute(false); }}
          createChannelSpace={(item) => createChannelSpace(item)}
          milestone={jobDetails?.mileStoneData?.[mileStoneIndex] || jobDetails?.mileStoneData[0]}
        />
      </ModalPopup>
      {/* ************************  Delete Milestone confirm Model Started  ************************** */}
      <ModalPopup
        showModal={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        className='deleteModal'
        closeIcon={true}
      >
        <AlertModal title='Alert !' innerTxt='Are you sure, you want to delete interim transaction?'
          titleConfirm='Yes, Delete'
          titleCancel='No, Cancel'
          onConfirmClick={() => onDeleteMilestone()}
          onHide={() => setShowDeleteModal(false)}>
        </AlertModal>
      </ModalPopup>
      {/* ************************  Delete Milestone Confirm Model Ended  ************************** */}
      {/* ************************  Modified Milestone  Save Model Started  ************************** */}
      <ModalPopup
        showModal={showSaveModel}
        onHide={() => setshowSaveModel(false)}
        className='save_preview_payment'
        closeIcon={false}
      >

        <div className="save_preview_pay_main">
          <div className="headermodal">
            <Label title='Preview Transaction'></Label>
            <button type="button"
              onClick={() => { setshowSaveModel(false) }}
              className="closeright"><i className="icon-close-sq"></i></button>
          </div>
          <div className="preview_payment_row">
            <div className="preview_title">Transaction Title</div>
            <div className="preview_txt">
              {get(jobDetails, 'name')}
              {/* {transactionName || ""} */}
            </div>
          </div>
          <div className="preview_payment_row">
            <div className="preview_title">Transaction Description</div>
            <div className="preview_txt">
              {get(jobDetails, 'description', '-')}
              {/* {transactionDescription} */}
            </div>
          </div>
          <div className="preview_payment_row">
            <div className="preview_title">Transaction For</div>
            <div className="preview_txt">
              {/* {customerName || ""} */}
              {get(jobDetails, 'customerEmail', '-')}
            </div>
          </div>
          {
            jobDetails && jobDetails.mileStoneData && jobDetails.mileStoneData.length >= 1
              ?
              <div className="three_row">


                <div className="preview_payment_row">
                  <div className="preview_title">Transaction Amount</div>
                  <div className="preview_txt">
                    {/* £ {transactionAmount || 0} */}
                    {/* {get(jobDetails, 'totalAmount',0)} */}
                    £ {totalMilestoneAmount && totalMilestoneAmount.toFixed(2)}

                  </div>
                </div>
                <div className="preview_payment_row">
                  <div className="preview_title">Total Interim Transactions</div>
                  <div className="preview_txt">
                    {/* {mileStonelength} */}
                    {jobDetails && jobDetails.mileStoneData.length}

                  </div>
                </div>
              </div> : <div className="three_row">
                <div className="preview_payment_row">
                  <div className="preview_title">Transaction For</div>
                  <div className="preview_txt">
                    {/* {customerName} */}
                    {get(jobDetails, 'customerName')}
                  </div>
                </div></div>}
          {jobDetails && jobDetails.mileStoneData && jobDetails.mileStoneData.map((details, index) => {
            return <>
              {details.title !== "" && details.amount !== "" && < div className="preview_payment_row interim_payment">
                <div className="preview_title">Interim Transaction-{index + 1}</div>
                <div className="preview_inner-row">
                  <div className="preview_txt">{details.title}</div>
                  <div className="preview_txt"> {`£ ${get(details, 'amount', 0).toFixed(2)}`}</div>
                </div>
              </div>
              }
            </>
          })}
          <div className={true ? "border-box box_border" : "box_border"}>
            <div className="row-view">
              <div className="txt">Charge to Client</div>
              <div className="title">
                {/* {transactionAmount} */}
                £ {totalMilestoneAmount && totalMilestoneAmount.toFixed(2)}
              </div>
            </div>
            <div className="row-view">
              <div className="txt">Service Fee
                ({`${serviseChargesRate}%`})

                <div className="tooltipMain">
                  {["right"].map((placement) => (
                    <OverlayTrigger
                      key={placement}
                      placement={placement}
                      // show={true}
                      overlay={
                        <Tooltip id={`custom_tooltip-top`} style={{ width: '350px' }}>
                          <span className='title'> What’s included in the fee?</span>

                          <span>We verify the identity of all our customers, giving you
                            piece of mind to carry out your financial transaction.</span>

                          <span>Your money is always protected in the electronic escrow managed by our banking
                            partner MangoPay, until you’re happy to release it.</span>

                          <span>Your money is always protected in the electronic escrow managed
                            by our banking partner MangoPay, until you’re happy to release it.</span>

                          <span>In the rare event that something doesn’t go to plan,
                            we act as a neutral third party to resolve any issues.</span>

                          <span>With no monthly costs or set up fees, you pay a small fee for peace of mind</span>
                        </Tooltip>
                      }
                    >
                      <Button className="tooltipBtn">
                        <i className="icon-info"></i>
                      </Button>
                    </OverlayTrigger>
                  ))}
                </div>
              </div>
              <div className="title">
                {/* £ {((transactionAmount * serviseChargesRate) / 100).toFixed(2)} */}
                £ {(totalMilestoneAmount * serviseChargesRate / 100).toFixed(2)}

              </div>
            </div>
            <div className="row-view">
              <div className="txt">Amount you’ll receive</div>
              <div className="title">
                {/* £ {(transactionAmount - (transactionAmount * serviseChargesRate) / 100).toFixed(2)} */}
                £ {(totalMilestoneAmount - (totalMilestoneAmount * serviseChargesRate / 100)).toFixed(2)}
              </div>
            </div>
          </div>
          <div className="stepthree-row">
            <CustomButton type="button" title="Cancel" onClick={() => setshowSaveModel(false)} />
            <CustomButton type="button"
              onClick={() => { onSave() }}
              title="Save" />
          </div>
        </div>

      </ModalPopup >
      {/* ************************ Modified Milestone  Save Model Ended  ************************** */}


      {/* ************************ View Rejection Comment Note Model Started  ************************** */}
      <ModalPopup
        showModal={showPaymentHistory}
        onHide={() => setShowPaymentHistory(false)}
        className='paymentHistory'
        closeIcon={true}
      >
        <PaymentHistory jobId={rejectionComment}></PaymentHistory>
      </ModalPopup>
      {/* ************************ View Rejection Comment Note Model Ended  ************************** */}


      {/* ************************ View Modification request Note Model Started  ************************** */}
      <ModalPopup
        showModal={showViewModification}
        onHide={() => setShowViewModification(false)}
        className='viewModification'
        closeIcon={true}
      >
        <ViewModificationRequests modificationData={jobDetails && jobDetails.modificationRequestHistory}></ViewModificationRequests>
      </ModalPopup>
      {/* ************************ View Modification request Note Model Ended  ************************** */}


      {/* ************************ Escrow Payment  Model Started  ************************** */}
      <ModalPopup
        showModal={showPaymentCard}
        onHide={() => setShowPaymentCard(false)}
        className='paymentCardModal'
        closeIcon={true}
      >
        <div className="payment_row_card">
          <Label title='Transaction'></Label>
          <p style={{ marginTop: '24px', marginBottom: '24px' }}>It is now time to fund the transaction. Select a payment method to proceed, all parties can follow the progress of this transaction from the dashboard.</p>
          <HookForm
            defaultForm={{}}
            init={form => setFilterForm(form)}
            onSubmit={onPayNow}>
            {(formMethod) => {
              return (
                <div className='innerSection'>
                  <div className="confirmRadio">
                    <RadioButton
                      changed={radioChangeHandler}
                      id="1"
                      isSelected={confirmType === "BANK"}
                      label="Pay via bank transfer"
                      value="BANK"
                    >
                      {/* <p style={{ margin: 0, paddingRight: '10px', fontSize: '13px' }} className='radio-text'>Pay via bank transfer</p> */}
                      <img src={Bank} title="" alt="" />
                    </RadioButton>

                    {/* <RadioButton
                      changed={radioChangeHandler}
                      id="2"
                      isSelected={confirmType === "CARD"}
                      label="Pay via card (Additional 1.6% fee will be applied)"
                      value="CARD"
                    >

                      <img src={Card} title="" alt="" />
                    </RadioButton> */}
                  </div>
                  {/* {confirmType === "CARD" &&
                    <CreditCardInput
                      cardNumberInputProps={{ value: cardNumber, onChange: e => setCardNumber(e.target.value) }}
                      cardExpiryInputProps={{ value: expiry, onChange: e => setExpiry(e.target.value) }}
                      cardCVCInputProps={{ value: cvc, onChange: e => setCvc(e.target.value) }}
                      fieldClassName="inputCustom"
                      containerClassName="inputCustomBox"
                    />
                  } */}

                  <div className='custBtn'>
                    <CustomButton type="submit" title={"Pay now"} disabled={confirmType === "CARD" ? (cardNumber == '' || expiry == '' || cvc == '') : false} loading={busy}></CustomButton>
                  </div>
                  <p style={{ margin: '20px 0', fontSize: '13px' }}>You’ll be redirected through a secure transaction portal. Please note the transaction may appear as Mangopay on your bank statement.</p>
                </div>
              )
            }}
          </HookForm>
        </div>
      </ModalPopup>
      {/* ************************ Escrow Payment  Model Ended  ************************** */}


      {/* ************************ Modification Request Model Started  ************************** */}
      <ModalPopup
        showModal={showModificationRequest}
        onHide={() => setShowModificationRequest(false)}
        className='modificationRequest'
        closeIcon={true}
      >
        <ModificationRequest jobId={StorageService.getItem("JobId")} onHide={() => { setShowModificationRequest(false) }} ></ModificationRequest>
      </ModalPopup>
      {/* ************************ Modification Request Model Ended  ************************** */}
      {
        showDisputeSystemSidebar && spaceId && <DisputeManagmentSidebar
          setShowDisputeSystemSidebar={(flag) => setShowDisputeSystemSidebar(flag)}
          showDisputeSystemSidebar={showDisputeSystemSidebar}
          jobTitle={get(jobDetails, 'name', '-')}
          spaceId={spaceId}
          message={message}
          disputeStatus={capitalizeFirstLetter(get(props, 'disputeDetails.status', '-'))}
          milestoneAmount={jobDetails?.mileStoneData?.[mileStoneIndex]?.amount || jobDetails?.mileStoneData[0]?.amount}
          customerName={jobDetails?.customerName}
          clientName={props?.disputeDetails?.clientDetails?.firstName + " " + props?.disputeDetails?.clientDetails?.lastName}
          yatapayStaffName={props?.disputeDetails?.staffMember}
        />
      }
    </div >

  )
}
const mapStateToProps = (state) => {
  return {
    jobDetails: state.job.userDetails,
    disputeDetails: state.job.disputeDetails
  }
};

const mapDispatchToProps = {
  getDisputeByMilestone,
  showToast, getOneuserDetails, showLoader, hideLoader, deleteMilestone, saveJob, escrowPaymentWithBank, checkTrueLayerStatus, escrowPaymentWithCard, paymentRealeaseRequest, paymentRelease, createChannelspace
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PaymentDetails));


