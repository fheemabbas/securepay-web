import React, { useState, useEffect } from 'react';
import { withRouter, useHistory } from "react-router-dom"

import Label from '../../../../components/UI/Label/Label';
import CustomButton from '../../../../components/UI/CustomButton/CustomButton';
import TableHeader from '../../../../components/TableHeader/TableHeader';
import TableListing from '../../../../components/TableListing/TableListing';
import Scrollbars from "react-custom-scrollbars";
import Status from '../../../../components/Status/Status';
import NoData from '../../../../components/NoData/NoData';
import ModalPopup from '../../../../components/ModalPopup/ModalPopup';
import CreateMilestoneForm from '../Form/CreateMilestoneForm';
import RaiseDisputeForm from '../Form/RaiseDisputeForm';
import MilestoneHistory from '../../DisputeManagement/Form/MilestoneHistory';
import RejectionComments from '../../DisputeManagement/Form/RejectionComments';
import MilestoneModification from '../../DisputeManagement/Form/MilestoneModification';
import AlertModal from '../../../../components/AlertModal/AlertModal';
import ConfirmModal from '../../../../components/ConfirmMessage/ConfirmModal';
import useWindowDimension from "../../../../hooks/useWindowDimension";

import './JobDetails.scss';


const headerOnging = [
  {
    title: 'Milestone Title',
    key: 'milestone-title',
  },
  {
    title: 'Milestone Amount',
    key: 'milestone-amount',
  },
  {
    title: 'Milestone Description',
    key: 'milestone-description',
  },
  {
    title: 'Escrowed Amount / Paid Amount ',
    key: 'paid-amount',
  },
  {
    title: 'Expected Completion Date',
    key: '',
  },
  {
    title: 'Status',
    key: '',
  },
  {
    title: '',
    key: '',
  },
]
const listingOnging = [
  {
    id: "1",
    jobTitle: 'Amet minim mollit non deserunt ullamco ',
    amount: '£670',
    paid: '£670',
    descp: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
    date: '10 July 2020',
    status: 'Completed',
    statusFlag: 'complete',
    action: 'Ask for payment',
    actionFlag: 'suggested',
    isActionFlag: false,
    isActionButtonFlag: false,
    isRequest: true,
    request: 'Milestone modification request is pending',
    stickeys: [
      {
        type: 'rejectComment',
        request: 'Rejection Comment',
        color: '#EE2737',
        backgroundColor: 'rgba(238,39,55,0.1)',
        borderRadius: '0 0 0px 0px'
      },
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
    id: "2",
    jobTitle: 'Amet minim mollit non deserunt ullamco ',
    amount: '£670',
    paid: '£670',
    descp: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
    date: '10 July 2020',
    status: 'Modification Requested',
    statusFlag: '',
    action: 'Ask for payment',
    actionFlag: 'suggested',
    isActionFlag: true,
    isActionButtonFlag: true,
    isRequest: true,
    request: 'Milestone modification request is pending',
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
    id: "3",
    jobTitle: 'Amet minim mollit non deserunt ullamco ',
    amount: '£670',
    paid: '£670',
    descp: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
    date: '10 July 2020',
    status: 'Approved',
    statusFlag: '',
    action: 'Ask for payment',
    actionFlag: 'suggested',
    isActionFlag: true,
    isActionButtonFlag: true,
    isRequest: true,
    request: 'Milestone modification request is pending',
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
    id: "4",
    jobTitle: 'Amet minim mollit non deserunt ullamco ',
    amount: '£670',
    paid: '£670',
    descp: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
    date: '10 July 2020',
    status: 'Pending',
    statusFlag: 'pending',
    action: 'Ask for payment',
    actionFlag: 'suggested',
    isActionFlag: false,
    isActionButtonFlag: true,
    isRequest: true,
    request: 'Milestone modification request is pending',
    stickeys: [

    ]
  },
  {
    id: "5",
    jobTitle: 'Amet minim mollit non deserunt ullamco ',
    amount: '£670',
    paid: '£670',
    descp: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
    date: '10 July 2020',
    status: 'Cancellation in Process',
    statusFlag: 'cancel',
    action: 'Ask for payment',
    actionFlag: 'suggested',
    isActionFlag: true,
    isActionButtonFlag: true,
    isRequest: true,
    request: 'Milestone modification request is pending',
    stickeys: [
      {
        type: 'amountChangePending',
        request: 'Amount change request is pending',
        color: '#64797D',
        backgroundColor: 'rgba(100,121,125,0.1)',
        borderRadius: '0px'

      },
      {
        type: 'modificationRequestPending',
        request: 'Milestone modification request is pending',
        color: '#FFAB00',
        backgroundColor: 'rgba(255,171,0,0.1)',
        borderRadius: '0 0 8px 8px'

      }
    ]
  },

];

const headerPending = [
  {
    title: 'Milestone Title',
    key: 'milestone-title',
  },
  {
    title: 'Milestone Description',
    key: 'milestone-description',
  },
  {
    title: 'Milestone Amount',
    key: 'milestone-amount',
  },
  {
    title: 'Admin Commission',
    key: 'admin-comm',
  },
  {
    title: 'Escrowed Amount / Paid Amount ',
    key: 'paid-amount',
  },
  {
    title: 'Expected Completion Date',
    key: '',
  },
  {
    title: 'Status',
    key: '',
  },
  {
    title: '',
    key: '',
  },
]
const listingPending = [
  {
    id: "1",
    jobTitle: 'Amet minim mollit non deserunt ullamco ',
    descp: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
    amount: '£670',
    comm: '£670',
    paid: '£670',
    date: '10 July 2020',
    status: 'Modification Requested',
    statusFlag: '',
    action: 'Ask for payment',
    actionFlag: 'suggested',
    isActionButtonFlag: true,
    isRequest: true,
    request: 'Modification Requested',
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



];

const JobDetails = (props) => {
  const history = useHistory();
  const dimensions = useWindowDimension()
  const [headerHeight, setHeaderHeight] = useState(0)
  const [backHeight, setBackHeight] = useState(0)
  let [showIsNoData, setShowIsNoData] = useState(false)
  let [showCancelModal, setShowCancelModal] = useState(false)
  let [showDeleteModal, setShowDeleteModal] = useState(false)
  let [showActionModal, setShowActionModal] = useState(false)
  let [showCreateMilestone, setShowCreateMilestone] = useState(false)
  let [showRaiseDispute, setShowRaiseDispute] = useState(false)
  let [showModificationModal, setShowModificationModal] = useState(false)
  let [showRejectCommentModal, setShowRejectCommentModal] = useState(false)
  let [showMilestoneHistoryModal, setShowMilestoneHistoryModal] = useState(false)
  const onStatusChange = (type) => {
    if (type === 'amountChangePending') {
      setShowMilestoneHistoryModal(true)
    } else if (type === 'rejectComment') {
      setShowRejectCommentModal(true)
    } else if (type === 'modificationRequestPending') {
      setShowModificationModal(true)
    }
  }

  useEffect(() => {
    setHeaderHeight(document.getElementsByClassName('headerClient')[0].offsetHeight);
    setBackHeight(document.getElementsByClassName('backTo')[0].offsetHeight);
  })
  // page redirect //
  const routeDetails = () => {
    let path = `/jobs`;
    history.push(path);
  }
  // page redirect //

  return (
    <div style={{ height: (dimensions.height - headerHeight) + 'px', marginTop: (headerHeight + 'px') }}>
      <div className='jobdetailMain' >
        <div className='innerSection'>
          <div className='backTo' onClick={() => routeDetails()} >
            <i className='icon-back'></i>
            <p className='backTxt'>Back</p>
          </div>
        </div>
        <Scrollbars className="listingScroll" style={{ height: (dimensions.height - headerHeight - backHeight) + 'px' }}>
          <div className='innerSection'>
            <div className='jobDetialInner'>
              <div className='jobDetails'>
                <div className='innerLeft'>
                  <div className='txtBtn'>
                    <Label title='Excepteur sint occaecat'></Label>
                    <CustomButton title='Cancel Job' onClick={() => setShowCancelModal(!showCancelModal)} ></CustomButton>
                  </div>
                  <div className='desc'>
                    <p className='txt'>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</p>
                  </div>
                </div>
                <div className='innerRight'>
                  <p className='noTxt'>Total Job Amount: <span className='bold'>£6700</span></p>
                  <p className='noTxt'>Job Status: <span className='bold'>Ongoing</span></p>
                  <p className='noTxt'>Business Category: <span className='bold'>Architect</span></p>
                </div>
              </div>
              <div className='customerDetails'>
                <div className='detailsLeft'>
                  <p className='title'>Customer Details:</p>
                  <div className='innerTxt'>
                    <p className='bold'>Cody Fisher</p>
                    <p className='bold'>cody.fisher@gmail.com</p>
                    <p className='bold'>+1 235 789 4521</p>
                  </div>
                </div>
                <div className='btnRight'>
                  <CustomButton type='button' title='Raise a Dispute' onClick={() => setShowRaiseDispute(!showRaiseDispute)}></CustomButton>
                  <CustomButton type='button' title='Create New Milestone' onClick={() => setShowCreateMilestone(!showCreateMilestone)}></CustomButton>
                </div>
              </div>
              <div className='tableSection'>
                <div className='header'>
                  <div className="headItem">
                    {/* Start Pending Table listing */}
                    {/* <TableHeader className='onGoing'>
                    {
                      headerOnging.map((header) => {
                        return <li data-content="Milestone Details" className='headingItem'><div className='headerTitle'>{header.title} {header.key && <i className='icon-sort'></i>}</div></li>

                      })
                    }
                  </TableHeader> */}
                    {/* End Pending Table listing */}


                    {/* Start Ongoing Table listing */}
                    <TableHeader className='pendingHeader'>
                      {
                        headerPending.map((header) => {
                          return <li data-content="Milestone Details" className='headingItem'><div className='headerTitle'>{header.title} {header.key && <i className='icon-sort'></i>}</div></li>

                        })
                      }
                    </TableHeader>
                    {/* Start Ongoing Table listing */}


                  </div>
                </div>
                <div className='listing'>

                  {showIsNoData &&
                    <NoData title='No Record found'></NoData>
                  }
                  {/* {
                  listingOnging.map((listingOnging) => {
                    return <TableListing className='onGoing'>
                      <div className='liPadding'>
                        <li className='headingItem'>
                          <p className='mileTitle'>{listingOnging.jobTitle}</p>
                          <p data-content="Milestone Amount :" className='mileAmt'>{listingOnging.amount}</p>
                          <p data-content="Milestone Description :" className='mileDesp'>{listingOnging.descp}</p>
                          <p data-content="Escrowed/Paid :" className='paidAmt'>{listingOnging.paid}</p>
                        </li>
                        <li className='headingItem' data-content="Expected Date">{listingOnging.date}</li>
                        <li className='headingItem' data-content="Status">{listingOnging.statusFlag ? <Status className={listingOnging.statusFlag} title={listingOnging.status}></Status> : listingOnging.status}</li>
                        {listingOnging.isActionFlag &&
                          <li className='headingItem'>{listingOnging.actionFlag && <div className='actionBtn'> <Status onClick={() => setShowActionModal(!showActionModal)} className={listingOnging.actionFlag} title={listingOnging.action}> </Status>
                            {listingOnging.isActionButtonFlag &&
                              <div className='buttonSection'>
                                <CustomButton type='button' title='Edit' onClick={() => setShowCreateMilestone(!showCreateMilestone)}></CustomButton>
                                <CustomButton type='button' title='Delete' onClick={() => setShowDeleteModal(!showDeleteModal)} ></CustomButton></div>
                            }
                          </div>
                          }
                          </li>
                        }
                      </div>
                      <li className=' headingItem actionLi'>
                        {
                          listingOnging.stickeys.map((status) => {
                            return <Status onClick={() => onStatusChange(status.type)} className={listingOnging.requestFlag} title={status.request} color={status.color} backgroundColor={status.backgroundColor} borderRadius={status.borderRadius}></Status>
                          })
                        }
                      </li>
                    </TableListing>

                  })
                } */}
                  {
                    listingPending.map((listingPending) => {
                      return <TableListing className='pendingListing'>
                        <div className='liPadding'>
                          <li className='headingItem'>
                            <p className='mileTitle'>{listingPending.jobTitle}</p>
                            <p data-content="Milestone Description :" className='mileDesp'>{listingPending.descp}</p>
                            <p data-content="Milestone Amount :" className='mileAmt'>{listingPending.amount}</p>
                            <p data-content="Admin Commission :" className='adminComm'>{listingPending.comm}</p>
                            <p data-content="Escrowed/Paid :" className='paidAmt'>{listingPending.paid}</p>
                          </li>
                          <li className='headingItem' data-content="Expected Date">{listingPending.date}</li>
                          <li className='headingItem' data-content="Status">{listingPending.statusFlag ? <Status className={listingPending.statusFlag} title={listingPending.status}></Status> : listingPending.status}</li>
                          {listingPending.isActionButtonFlag &&
                            <li className='headingItem'>{listingPending.actionFlag && <div className='actionBtn'>
                              <div className='buttonSection'>
                                <CustomButton type='button' title='Edit' onClick={() => setShowCreateMilestone(!showCreateMilestone)}></CustomButton>
                                <CustomButton type='button' title='Delete' onClick={() => setShowDeleteModal(!showDeleteModal)} ></CustomButton></div>

                            </div>
                            }
                            </li>
                          }
                        </div>
                        <li className=' headingItem actionLi'>
                          {
                            listingPending.stickeys.map((status) => {
                              return <Status onClick={() => onStatusChange(status.type)} className={listingPending.requestFlag} title={status.request} color={status.color} backgroundColor={status.backgroundColor} borderRadius={status.borderRadius}></Status>
                            })
                          }
                        </li>
                      </TableListing>

                    })
                  }

                </div>
              </div>
            </div>
          </div>
        </Scrollbars>
      </div>
      <ModalPopup
        showModal={showCreateMilestone}
        onHide={() => setShowCreateMilestone(false)}
        className='createMilestone'
        closeIcon={true}
      >
        <CreateMilestoneForm onHide={() => setShowCreateMilestone(false)}></CreateMilestoneForm>
      </ModalPopup>
      <ModalPopup
        showModal={showRaiseDispute}
        onHide={() => setShowRaiseDispute(false)}
        className='raiseMilestone'
        closeIcon={true}
      >
        <RaiseDisputeForm onHide={() => setShowRaiseDispute(false)}></RaiseDisputeForm>
      </ModalPopup>
      <ModalPopup
        showModal={showCancelModal}
        onHide={() => setShowCancelModal(false)}
        className='cancelJob'
        closeIcon={true}
      >
        <AlertModal title='Alert !' innerTxt='Are you sure you want to cancel the job?' onHide={() => setShowCancelModal(false)}></AlertModal>
      </ModalPopup>
      <ModalPopup
        showModal={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        className='deleteModal'
        closeIcon={true}
      >
        <AlertModal title='Alert !' innerTxt='Are you sure, you want to delete the milestone?'
          titleConfirm='Yes, Delete'
          titleCancel='No, Cancel'
          onHide={() => setShowDeleteModal(false)}>
        </AlertModal>
      </ModalPopup>
      <ModalPopup
        showModal={showActionModal}
        onHide={() => setShowActionModal(false)}
        className='actionModal '
        closeIcon={true}
      >
        <ConfirmModal title='Has the work been completed?'
          titleConfirm='Request Transaction'
          onHide={() => setShowActionModal(false)}>
        </ConfirmModal>
      </ModalPopup>
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
    </div>

  )
}

export default withRouter(JobDetails);


