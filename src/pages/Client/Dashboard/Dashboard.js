import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom"

import ProgressBar from '../../../components/UI/ProgressBar/ProgressBar';
import Label from '../../../components/UI/Label/Label';
import CustomCard from '../../../components/CustomCard/CustomCard';
import Scrollbars from "react-custom-scrollbars";
import TableHeader from '../../../components/TableHeader/TableHeader';
import TableListing from '../../../components/TableListing/TableListing';
import Status from '../../../components/Status/Status';
import NoData from '../../../components/NoData/NoData';
import MoreRecord from '../../../components/MoreRecord/MoreRecord';
import FilterSorting from '../DisputeManagement/Form/FilterSorting';
import useWindowDimension from "../../../hooks/useWindowDimension";
import './Dashboard.scss';
import CustomButton from '../../../components/UI/CustomButton/CustomButton';
import Constant from '../../../util/constant';
import { getJobCount, getOngoingJob, getSupportAndTicket } from '../../../state/ducks/Job/actions';
import { connect } from 'react-redux';
import { get } from "lodash";
import moment from 'moment';
import ModalPopup from '../../../components/ModalPopup/ModalPopup';
import CreateTransactionForm from '../../../components/CreateTransaction/CreateTransactionForm';
import { capitalizeFirstLetter, dateFormat } from '../../../services/helper.service';


const sortingData = [
  {
    id: "1",
    jobDetail: 'Job details'
  },
  {
    id: "2",
    jobDetail: 'Milestoone details'
  },
  {
    id: "3",
    jobDetail: 'Completion date'
  },
]

const headingSupportTicketsData = [
  {
    title: 'Ticket Id',
    key: 'ticket-id',
  },
  {
    title: 'Transaction Title',
    key: 'payment-tile',
  },
  {
    title: 'Created On',
    key: 'created-on',
  },

  {
    title: 'Assigned to',
    key: 'assigned-to',
  },
  {
    title: 'Status',
    key: 'status',

  },
];

const supportTicketsListing = [
  {
    id: "#123",
    paymentTitle: 'Amet minim mollit non deserunt ullamco ',
    createdOn: '7 July 2020 03:00 pm',
    asignedTo: 'Courtney Henry',
    disputeStatus: 'Pending',
    statusFlag: 'pending',
  },
  {
    id: "#145",
    paymentTitle: 'Amet minim mollit non deserunt ullamco ',
    createdOn: '7 July 2020 03:00 pm',
    asignedTo: 'John Doe',
    disputeStatus: 'Resolved',
    statusFlag: 'resolved',
  },
  {
    id: "#153",
    paymentTitle: 'Amet minim mollit non deserunt ullamco ',
    createdOn: '7 July 2020 03:00 pm',
    asignedTo: 'Courtney Henry',
    disputeStatus: 'Pending',
    statusFlag: 'pending',
  },

];

const headingOngoingPaymentData = [
  {
    title: 'Transaction Title',
    key: 'payment-tile',
  },
  {
    title: 'Transaction Amount',
    key: 'payment-amount',
  },
  {
    title: 'Created On',
    key: 'created-on',
  },
  {
    title: 'Customer Name',
    key: 'customer-name',
  },
  {
    title: 'Total/Completed \n Interim Transactions',
    key: 'total-completed-payment',
  },
  {
    title: 'Completion Date',
    key: 'completion-date',
  },
];
const ongoingPaymentListing = [
  {
    paymentTitle: 'Amet minim mollit non deserunt ullamco ',
    amount: '£3670',
    createdOn: '7 July 2020 03:00 pm',
    customerName: 'Eleanor Pena',
    totalCompletedPayment: '5/4',
    completionDate: '7 July 2020 03:00 pm'
  },
  {
    paymentTitle: 'Amet minim mollit non deserunt ullamco ',
    amount: '£3670',
    createdOn: '7 July 2020 03:00 pm',
    customerName: 'Ralph Edwards',
    totalCompletedPayment: '4/3',
    completionDate: '7 July 2020 03:00 pm'
  },
  {
    paymentTitle: 'Amet minim mollit non deserunt ullamco ',
    amount: '£3670',
    createdOn: '7 July 2020 03:00 pm',
    customerName: 'Dianne Russell',
    totalCompletedPayment: '5/2',
    completionDate: '7 July 2020 03:00 pm'
  },

];

const Dashboard = (props) => {
  const { allcounts, onGoingJob } = props
  const dimensions = useWindowDimension()
  let [showIsNoData, setShowIsNoData] = useState(false)
  let [showSortDropdown, setShowSortDropdown] = useState(false)
  const [headerHeight, setHeaderHeight] = useState(0)
  const [role, setRole] = useState(localStorage.getItem('loginRole'))
  let [showTicketModal, setShowTicketModal] = useState(false);
  const [addInterimPayments, setAddInterimPayments] = useState(false);
  const [totalTicket, setTotalTicket] = useState()
  const [ticket, setTicket] = useState([])
  useEffect(() => {
    setHeaderHeight(document.getElementsByClassName('headerClient')[0].offsetHeight);
  })
  const getTickitListing = () => {

    props.getSupportAndTicket(`support/ticket?page=${1}&limit=${3}`).then((response) => {
      let res = response.data || response
      setTicket(res.payload.ticketData)
      setTotalTicket(res.payload.totalRecord)
    })
  }
  const getCount = () => {

  }
  useEffect(() => {
    props.getJobCount(`/dashboard/getcount`)
    props.getOngoingJob(`/dashboard/ongoingjob`)
    getTickitListing()
  }, [])

  return (
    <div>
      <Scrollbars className="dashboardScroll" style={{ height: (dimensions.height - headerHeight) + 'px', marginTop: (headerHeight + 'px') }} >
        <div className='dashboardMain'>
          <div className="page_title">
            <Label title='Dashboard'></Label>
            <div className="ticketRaise">
              <CustomButton onClick={(e) => {
                e.preventDefault();
                setShowTicketModal(!showTicketModal)
              }} type="submit" title="Create Transaction" />
            </div></div>
          <div className="revenue_row">
            <ul>
              {allcounts && allcounts.milestoneCount > 0 &&
                <>
                  < li >
                    <div className="revenue_box">
                      <div className="title">Total Revenue</div>
                      <div className="amount">£ {get(allcounts, 'mileStoneData[0].totalRevenue', 0).toFixed(2)}</div>
                    </div>
                  </li>
                  <li>
                    <div className="revenue_box">
                      <div className="title">Revenue this month</div>
                      <div className="amount">£ {get(allcounts, 'mileStoneData[0].monthWise', 0).toFixed(2)}</div>
                    </div>
                  </li>
                  <li>
                    <div className="revenue_box">
                      <div className="title">Revenue this year</div>
                      <div className="amount">£ {get(allcounts, 'mileStoneData[0].yearWise', 0).toFixed(2)}</div>
                    </div>
                  </li>
                </>}
              <li>
                <div className="revenue_box">
                  <div className="title">Amount due at next interim transaction</div>
                  <div className="amount">£ {get(allcounts, 'mileStoneData[0].nextInterimPayment', 0).toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="revenue_box">
                  <div className="title">Highest transaction amount to date</div>
                  <div className="amount">£ {get(allcounts, 'mileStoneData[0].BiggestPayment', 0).toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="revenue_box">
                  <div className="title">Total amount of transactions outstanding</div>
                  <div className="amount">£ {get(allcounts, 'mileStoneData[0].outstandingPayment', 0).toFixed(2)}</div>
                </div>
              </li>
            </ul>
          </div>
          <div className='progressBarSection'>
            <CustomCard>
              <div className='progressSection'>
                <Label title='Ongoing Transactions'></Label>
                <ProgressBar
                  value={get(allcounts, 'jobData[0].ongoingPayment', 0)}
                  percentageNo={get(allcounts, 'jobData[0].ongoingPayment', 0)}
                  maxValue={get(allcounts, 'jobData[0].totalRecord', 1)}
                  status="Ongoing Transactions"
                  className='noColor'
                  classNameText='textColor'
                  trailColor={'#f3f6f9'}
                  // pathColor={'#0F4C81'}
                  pathColor={'#00232C'}
                >
                </ProgressBar>
                <div className='jobsNo'>
                  <p className='txt'>Total Number of Transactions</p>
                  <p className='no'>{get(allcounts, 'jobData[0].totalRecord', 0)}</p>
                </div>
              </div>
            </CustomCard>
            <CustomCard className='completedJobs'>
              <div className='progressSection'>
                <Label className='colorGreen' title='Completed Transactions'></Label>
                <ProgressBar
                  value={get(allcounts, 'jobData[0].completedPayment', 0)}
                  percentageNo={get(allcounts, 'jobData[0].completedPayment', 0)}
                  maxValue={get(allcounts, 'jobData[0].totalRecord', 1)}
                  status="Completed Transactions"
                  className='noColor'
                  classNameText='textColor'
                  trailColor={'#f4f7f7'}
                  pathColor={'#2d5f5d'}
                >
                </ProgressBar>
                <div className='jobsNo'>
                  <p className='txt'>Total Number of Transactions</p>
                  <p className='no'>{get(allcounts, 'jobData[0].totalRecord', 0)}</p>
                </div>
              </div>
            </CustomCard>
            {
              get(allcounts, 'jobData[0].paymentinDispute', 0) > 0 &&
              <CustomCard className='disputeJobs'>
                <div className='progressSection'>
                  <Label className='colorRed' title='Payments Awaiting Query Resolution'></Label>
                  <ProgressBar
                    value={get(allcounts, 'jobData[0].paymentinDispute', 0)}
                    percentageNo={get(allcounts, 'jobData[0].paymentinDispute', 0)}
                    maxValue={get(allcounts, 'jobData[0].totalRecord', 0)}
                    status="Awaiting Query Resolution"
                    className='noColor'
                    classNameText='textColor'
                    trailColor={'#fef4f5'}
                    pathColor={'#ee2737'}
                  >
                  </ProgressBar>
                  <div className='jobsNo'>
                    <p className='txt'>Total Number of Transactions</p>
                    <p className='no'>{get(allcounts, 'jobData[0].totalRecord', 0)}</p>
                  </div>
                </div>
              </CustomCard>
            }
          </div>
          <div className='jobSection ongoingPayments'>
            <div className='innerSection'>
              <Label className='listingTitle' title='Latest Ongoing Transactions'></Label>
              <div className='tableSection'>
                <div className='header'>
                  <div className="headerItems">
                    <TableHeader>
                      {
                        headingOngoingPaymentData.map((header, index) => {
                          return <li key={index} data-content="Latest Support Tickets" className='headingItem'>
                            <div className='headerTitle'>{header.title} </div>

                          </li>

                        })
                      }
                      <div className='sortingIcon'>
                        <i className='icon-sort' onClick={() => setShowSortDropdown(!showSortDropdown)}></i>
                        {showSortDropdown &&
                          <>
                            <div className='overLay' onClick={() => setShowSortDropdown(false)} ></div>
                            <FilterSorting >

                              {
                                sortingData.map((sortingData, index) => {

                                  return <li key={index} className='headingItem'>{sortingData.jobDetail}</li>


                                })
                              }

                            </FilterSorting>
                          </>
                        }
                      </div>
                    </TableHeader>
                  </div>
                </div>
                <div className='dataListing'>

                  {
                    onGoingJob && onGoingJob.onGoingData && onGoingJob.onGoingData.length >= 1 ? onGoingJob.onGoingData.map((ongoingPaymentListing, index) => {
                      return <TableListing key={index} >
                        <li className='headingItem'>{ongoingPaymentListing.name}</li>
                        <li className='headingItem'>£  {ongoingPaymentListing.totalAmount && ongoingPaymentListing.totalAmount.toFixed(2)}</li>
                        <li className='headingItem'>{moment(ongoingPaymentListing.createdAt).format('DD MMM yyyy hh:mm a')}</li>
                        <li className='headingItem'>{ongoingPaymentListing.customerName}</li>
                        <li className='headingItem'>{ongoingPaymentListing.totalMilestone}/{ongoingPaymentListing.CompletedMilestone}</li>
                        <li className='headingItem'>-
                          {/* {moment(ongoingPaymentListing.updatedAt).format('DD MMM yyyy hh:mm a')} */}
                        </li>
                      </TableListing>

                    }) : <NoData title="No record found" />
                  }
                </div>
              </div>
              {onGoingJob && onGoingJob.totalJob > 3 &&
                <MoreRecord title={`More ${onGoingJob.totalJob - 3} Records`} onClick={() => {
                  props.history.push({
                    pathname: '/payments',
                  })
                }}></MoreRecord>}

              {/* <MoreRecord title='More 4 Records'></MoreRecord> */}
              {/* {onGoingJob && onGoingJob.onGoingData && onGoingJob.onGoingData.length >= 3 && <MoreRecord title={`More ${onGoingJob.onGoingData.length - 3} Records`}></MoreRecord>} */}

            </div>
          </div>

          <div className='jobSection supportTickets'>
            <div className='innerSection'>
              <Label className='listingTitle' title='Latest Support Tickets'></Label>
              <div className='tableSection'>
                <div className='header'>
                  <div className="headerItems">
                    <TableHeader>
                      {
                        headingSupportTicketsData.map((header, index) => {
                          return <li key={index} data-content="Latest Support Tickets" className='headingItem'>
                            <div className='headerTitle'>{header.title} </div>

                          </li>

                        })
                      }
                      <div className='sortingIcon'>
                        <i className='icon-sort' onClick={() => setShowSortDropdown(!showSortDropdown)}></i>
                        {showSortDropdown &&
                          <>
                            <div className='overLay' onClick={() => setShowSortDropdown(false)} ></div>
                            <FilterSorting >

                              {
                                sortingData.map((sortingData, index) => {

                                  return <li key={index} className='headingItem'>{sortingData.jobDetail}</li>


                                })
                              }

                            </FilterSorting>
                          </>
                        }
                      </div>
                    </TableHeader>
                  </div>
                </div>
                <div className='dataListing'>
                  {ticket.length < 1 ?
                    <NoData title='No record found'></NoData>
                    :
                    ticket.map((supportTicketsListing, i) => {
                      return <TableListing key={i}>
                        <li className='headingItem'>#{supportTicketsListing.ticketId}</li>
                        <li className='headingItem'>{supportTicketsListing.title}</li>
                        <li className='headingItem'>{dateFormat(supportTicketsListing.createdAt, 'DD MMM yyyy')}</li>
                        <li className='headingItem'>{supportTicketsListing.assignTo}</li>
                        <li className='headingItem'>{supportTicketsListing.status ? <Status className={supportTicketsListing.status.toLowerCase()} title={capitalizeFirstLetter(supportTicketsListing.status)}></Status> : supportTicketsListing.disputeStatus}</li>
                      </TableListing>

                    })
                  }
                </div>
              </div>
              {totalTicket > 3 && <MoreRecord title={`More ${totalTicket - 3} Records`} onClick={() => props.history.push('/tickets')} ></MoreRecord>}
            </div>
          </div>
        </div >
      </Scrollbars >

      <ModalPopup
        showModal={showTicketModal}
        onHide={() => setShowTicketModal(false)}
        className={
          addInterimPayments
            ? "CreateTransaction addInterimPayments"
            : "CreateTransaction and"
        }
        closeIcon={false}
      >
        <CreateTransactionForm
          classCall={(value) => setAddInterimPayments(value)}
          onHide={() => { setShowTicketModal(false); }}
        />
      </ModalPopup>

    </div>
  )
}



const mapStateToProps = (state) => {
  return {
    allcounts: state.job.allCounts,
    onGoingJob: state.job.onGoingJob
  }
};

const mapDispatchToProps = {
  getJobCount, getOngoingJob, getSupportAndTicket
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));


