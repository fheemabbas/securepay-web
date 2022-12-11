import React, { useState } from 'react';
import { connect } from "react-redux";
import { withRouter, useHistory } from "react-router-dom"

import { showToast } from "../../../../state/ducks/utils/operations";

import Status from '../../../../components/Status/Status';
import NoData from '../../../../components/NoData/NoData';
import Label from '../../../../components/UI/Label/Label';
import TableHeader from '../../../../components/TableHeader/TableHeader';
import TableListing from '../../../../components/TableListing/TableListing';
import CustomButton from '../../../../components/UI/CustomButton/CustomButton';
import ChatView from '../../../../components/ChatView/ChatView';

import Scrollbars from "react-custom-scrollbars";


import './DisputeDetails.scss';
import ModalPopup from '../../../../components/ModalPopup/ModalPopup';
import MilestoneHistory from '../Form/MilestoneHistory';
import RejectionComments from '../Form/RejectionComments';
import MilestoneModification from '../Form/MilestoneModification';
import CustomSideBar from '../../../../components/CustomSideBar/CustomSideBar';
import useKeyPress from '../../../../hooks/useKeyPress'

const resultListing = [
  {
    conclusionTitle: 'Conclusion',
    conclusionText: 'Dispute is in favour of Client ',
    conclusionStatementTitle: 'Conclusion Statement: ',
    conclusionStatementText: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
    resolvedTitle: 'Resolved on:',
    resolvedDate: '15 July 2020',
    customerResponseTitle: 'Customer Response:',
    responseStatus: 'Accepted',
  },
  {
    conclusionTitle: 'Amount Pay to Client:',
    conclusionText: '£1200',
    conclusionStatementTitle: 'Amount refund to customer',
    conclusionStatementText: '£ 0',
    resolvedTitle: 'Total Escrow Amount',
    resolvedDate: '£ 2500',
    customerResponseTitle: 'Client Response:',
    responseStatus: 'Pending',
  }
]
const headerData = [
  {
    title: 'Milestone Title',
    key: 'milestone-title',
  },
  {
    title: 'Milestone Amount',
    key: 'milestone-amount',
  },
  {
    title: 'Escrowed Amount / Paid Amount ',
    key: 'paid-amount',
  },
  {
    title: 'Milestone Description',
    key: 'milestone-description',
  },
  {
    title: 'Expected Completion Date',
    key: '',
  },
  {
    title: 'Status',
    key: '',
  },
]
const listing = [
  {
    jobTitle: 'Amet minim mollit non deserunt ullamco ',
    amount: '£1200',
    paid: '£1200 / £1200',
    descp: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
    date: '10 July 2020',
    status: 'Completed',
    statusFlag: 'complete',
    action: 'Ask for payment',
    actionFlag: 'suggested',
    isRequest: true,
    request: 'Milestone modification request is pending',
    stickeys: [
      {
        type: 'amountChangePending',
        request: 'Amount change request is pending',
        color: '#64797D',
        backgroundColor: 'rgba(100,121,125,0.1)',
        borderRadius: '0px'

      }, {
        type: 'rejectComment',
        request: 'Rejection Comment',
        color: '#EE2737',
        backgroundColor: 'rgba(238,39,55,0.1)',
        borderRadius: '0 0 8px 8px'
      }
    ]
  },
  {
    jobTitle: 'Est sit aliqua dolor do amet sint.',
    amount: '£1500',
    paid: '£1500 / £0',
    descp: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
    date: '20 July 2020',
    status: 'Disputed',
    statusFlag: 'cancel',
    action: 'Ask for payment',
    actionFlag: 'suggested',
    isRequest: true,
    stickeys: [
      {
        type: 'modificationRequestPending',
        request: 'Milestone modification request is pending',
        color: '#FFAB00',
        backgroundColor: 'rgba(255,171,0,0.1)',
        borderRadius: '0 0 8px 8px'
      }
    ]
  },
  {
    jobTitle: 'Velit officia consequat duis enim velit...',
    amount: '£1000',
    paid: '£0 / £0',
    descp: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
    date: '20 July 2020',
    status: 'Approved',
    statusFlag: 'approved',
    action: 'Ask for payment',
    actionFlag: 'suggested',
    isRequest: true,
    stickeys: [
      {
        type: 'amountChangePending',
        request: 'Amount change request is pending',
        color: '#64797D',
        backgroundColor: 'rgba(100,121,125,0.1)',
        borderRadius: '0px'

      }, {
        type: 'rejectComment',
        request: 'Rejection Comment',
        color: '#EE2737',
        backgroundColor: 'rgba(238,39,55,0.1)',
        borderRadius: '0 0 8px 8px'
      }
    ]
  },
  {
    jobTitle: 'Velit officia consequat duis',
    amount: '£1000',
    paid: '£0 / £0',
    descp: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
    date: '25 July 2020',
    status: 'Pending',
    statusFlag: 'pending',
    action: 'Ask for payment',
    actionFlag: 'suggested',
    isRequest: true,
    stickeys: [
      {
        type: 'modificationRequestPending',
        request: 'Milestone modification request is pending',
        color: '#FFAB00',
        backgroundColor: 'rgba(255,171,0,0.1)',
        borderRadius: '0 0 8px 8px'

      }
    ]
  },
  {
    jobTitle: 'Est sit aliqua dolor do amet sint.',
    amount: '£1000',
    paid: '£1000 / £0',
    descp: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
    date: '25 July 2020',
    status: 'Approved',
    statusFlag: 'approved',
    action: 'Ask for payment',
    actionFlag: 'suggested',
    isRequest: true,
    stickeys: [
      {
        type: 'amountChangePending',
        request: 'Amount change request is pending',
        color: '#64797D',
        backgroundColor: 'rgba(100,121,125,0.1)',
        borderRadius: '0px'

      }, {
        type: 'modificationRequestPending',
        request: 'Milestone modification request is pending',
        color: '#FFAB00',
        backgroundColor: 'rgba(255,171,0,0.1)',
        borderRadius: '0 0 8px 8px'
      }
    ]
  },

];



const DisputeDetails = (props) => {

  let [showIsNoData, setShowIsNoData] = useState(false)
  const history = useHistory();
  let [showDisputeSystemSidebar, setShowDisputeSystemSidebar] = useState(false)
  let [showModificationModal, setShowModificationModal] = useState(false)
  let [showRejectCommentModal, setShowRejectCommentModal] = useState(false)
  let [showMilestoneHistoryModal, setShowMilestoneHistoryModal] = useState(false)
  const [busy, setBusy] = React.useState(false)
  const onStatusChange = (type) => {
    if (type === 'amountChangePending') {
      setShowMilestoneHistoryModal(true)
    } else if (type === 'rejectComment') {
      setShowRejectCommentModal(true)
    } else if (type === 'modificationRequestPending') {
      setShowModificationModal(true)
    }
  }


  useKeyPress('Escape', () => {
    setShowDisputeSystemSidebar(false)
  });


  const onAcceptDispute = () => {
    setBusy(true)
    setTimeout(() => {
      setBusy(false)
      props.showToast({ message: 'Dispute result is accepted by you!', type: 'success' })
    }, 100)
  }
  const onRejectDispute = () => {
    setBusy(true)
    setTimeout(() => {
      setBusy(false)
      props.showToast({ message: 'Dispute result is rejected by you!', type: 'error' })
    }, 1000)
  }

  return (
    <div className='disputedetailMain'>
      <div className="container-row">
        <div className='backTo' onClick={() => history.goBack()}>
          <i className='icon-back'></i>
          <p className='backTxt'>Back</p>
        </div>
      </div>
      <Scrollbars className="listingScroll">
        <div className="container-row">
          <div className='jobDetails'>
            <div className='innerLeft'>
              <div className='txtBtn'>
                <Label title='Excepteur sint occaecat'></Label>
              </div>
              <div className='desc'>
                <p className='txt'>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</p>
              </div>
              <div className='detailsLeft'>
                <p className='title'>Customer Details:</p>
                <div className='innerTxt'>
                  <p className='bold'>Cody Fisher</p>
                  <p className='bold'>cody.fisher@gmail.com</p>
                  <p className='bold'>+1 235 789 4521</p>
                </div>
              </div>
            </div>
            <div className='innerRight'>
              <p className='noTxt'>Admin Commission:<span className='bold'>£670</span></p>
              <p className='noTxt'>Total Job Amount:<span className='bold'>£6700</span></p>
              <p className='noTxt'>Dispute Status:<span className='bold'>Open Dispute</span></p>
              <p className='noTxt'>Business Category:<span className='bold'>Architect</span></p>
              <p className='noTxt'>Assigned Yatapay Staff Member:<span className='bold'>Leslie Alexander</span></p>
              <p className='noTxt'>Disputed By:<span className='bold'>Customer</span></p>
              <div className='btnRight'>
                <CustomButton onClick={() => setShowDisputeSystemSidebar(!showDisputeSystemSidebar)} title='Dispute Management' ></CustomButton>
              </div>
            </div>
          </div>
          <div className='tableSection'>
            <div className='header'>
              <div className="headingItem">
                <TableHeader>
                  {
                    headerData.map((header) => {
                      return <li className='headingItem'><div className="headingTitle">{header.title}</div> {header.key && <i className='icon-sort'></i>}</li>

                    })
                  }
                </TableHeader>
              </div>
            </div>
            <div className='listing'>

              {showIsNoData &&
                <NoData title='No Record found'></NoData>
              }
              {
                listing.map((listing) => {
                  return <TableListing>
                    <div className='liPadding'>
                      <li className="headingItem">
                        <div className='listColumn'>{listing.jobTitle}</div>
                        <div className='listColumn'>{listing.amount}</div>
                      </li>
                      <li className='headingItem'>{listing.paid}</li>
                      <li className='headingItem'>{listing.descp}</li>
                      <li className='headingItem'>{listing.date}</li>
                      <li className='headingItem'>{listing.statusFlag ? <Status className={listing.statusFlag} title={listing.status}></Status> : listing.status}</li>
                    </div>
                    <li className=' headingItem actionLi'>
                      {
                        listing.stickeys.map((status) => {
                          return <Status onClick={() => onStatusChange(status.type)} className={listing.requestFlag} title={status.request} color={status.color} backgroundColor={status.backgroundColor} borderRadius={status.borderRadius}></Status>
                        })
                      }
                    </li>
                  </TableListing>

                })
              }
              <div className="disputeResultsSection">
                <div className="titleResult">Dispute Results</div>
                <div className="innerBox">
                  {
                    resultListing.map((resultListing) => {
                      return <ul>
                        <li>
                          <div className="titleDispute">{resultListing.conclusionTitle}</div>
                          <div className="txtDispute">{resultListing.conclusionText}</div>
                        </li>
                        <li>
                          <div className="titleDispute">{resultListing.conclusionStatementTitle}</div>
                          <div className="txtDispute">{resultListing.conclusionStatementText}</div>
                        </li>
                        <li>
                          <div className="titleDispute">{resultListing.resolvedTitle}</div>
                          <div className="txtDispute">{resultListing.resolvedDate}</div>
                        </li>
                        <li>
                          <div className="titleDispute">{resultListing.customerResponseTitle}</div>
                          <div className={'txtDispute ' + resultListing.responseStatus}>{resultListing.responseStatus}</div>
                        </li>
                      </ul>
                    })
                  }
                </div>
                <div className='btnMain'>
                  <CustomButton onClick={onAcceptDispute} title='Accept Dispute result'></CustomButton>
                  <CustomButton onClick={onRejectDispute} title='Reject Dispute result' ></CustomButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Scrollbars>
      <ModalPopup
        showModal={showMilestoneHistoryModal}
        onHide={() => setShowMilestoneHistoryModal(false)}
        className='MilestoneAmountModal'
        closeIcon={true}
      >
        <MilestoneHistory></MilestoneHistory>
      </ModalPopup>
      <ModalPopup
        showModal={showRejectCommentModal}
        onHide={() => setShowRejectCommentModal(false)}
        className='RejectionCommentsModal'
        closeIcon={true}
      >
        <RejectionComments></RejectionComments>
      </ModalPopup>
      <ModalPopup
        showModal={showModificationModal}
        onHide={() => setShowModificationModal(false)}
        className='ModificationModal'
        closeIcon={true}
      >
        <MilestoneModification></MilestoneModification>
      </ModalPopup>

      <CustomSideBar
        showSidebar={showDisputeSystemSidebar}
        onHide={() => setShowDisputeSystemSidebar(false)}
      >
        <div className="managementStstem">
          <div className="disputeTitle">Dispute Management System</div>
          <ul>
            <li>
              <div className="ListTitle">Job Title</div>
              <div className="ListTxt">Minim sint occumption</div>
            </li>
            <li>
              <div className="ListTitle">Dispute Status</div>
              <div className="ListTxt">Disputed</div>
            </li>
            <li>
              <div className="ListTitle">Milestone Amount</div>
              <div className="ListTxt">£1200</div>
            </li>
            <li>
              <div className="ListTitle">Customer Name</div>
              <div className="ListTxt">Cody Fisher</div>
            </li>
            <li>
              <div className="ListTitle">Yatapay Staff Name</div>
              <div className="ListTxt">Leslie Alexander</div>
            </li>
            <li>
              <div className="ListTitle">Client Name</div>
              <div className="ListTxt">John Doe</div>
            </li>
          </ul>
        </div>
        <div className="messageChatView">

          <div className="ChatContent">
            <ChatView
              className='message-list'
              lockable={true}
              toBottomHeight={'100%'}
              dataSource={[
                {
                  className: "leftPart",
                  position: 'right',
                  type: 'text',
                  text: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
                  title: 'Eleanor Pena',
                },
                {
                  className: "rightPart",
                  position: 'left',
                  type: 'text',
                  title: 'Tudor Prendergast (Property Manager)',
                  text: 'Lorem ipsum dolor sit amet, consectetur csdchnsci uixhasiuxhgsa kc vnm ckci hidcdhschn',
                },
                {
                  position: 'right',
                  type: 'text',
                  title: 'Leslie Alexander',
                  text: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. ',
                },
                {
                  position: 'left',
                  type: 'text',
                  title: 'Leslie Alexander',
                  text: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. ',
                },
                {
                  position: 'left',
                  type: 'text',
                  title: 'Leslie Alexander',
                  text: 'Lorem ipsum dolor consectetur',
                }

              ]}
            />
          </div>
        </div>
      </CustomSideBar>
    </div>

  )
}

const mapStateToProps = (state) => {
  return {}
};

const mapDispatchToProps = {
  showToast
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DisputeDetails));


