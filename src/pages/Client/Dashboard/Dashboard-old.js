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
    title: 'Payment Title',
    key: 'payment-tile',
  },
  {
    title: 'Created on',
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
]

const supportTicketsListing = [
  {
    id: "1",
    paymentTitle: 'Amet minim mollit non deserunt ullamco  lorem ipsum solor dim amet',
    createdOn: '£670',
    asignedTo: '7 July 2020 03:00 pm',
    disputeStatus: 'Dispute Started',
    statusFlag: 'cancel',
  },
  {
    id: "2",
    jobTitle: 'Amet minim mollit non deserunt ullamco',
    amount: '£670',
    date: '7 July 2020 03:00 pm',
    customerName: 'Ralph Edwards',
    totalMilestone: '5',
    completeMilestone: '8',
    completedDate: '7 July 2020 03:00 pm',
  },
  {
    id: "3",
    jobTitle: 'Amet minim mollit non deserunt ullamco  lorem ipsum solor dim amet',
    amount: '£670',
    date: '7 July 2020 03:00 pm',
    customerName: 'Dianne Russell',
    totalMilestone: '5',
    completeMilestone: '8',
    completedDate: '7 July 2020 03:00 pm',
  },
];

const headerDisputeData = [
  {
    title: 'Job Title',
    key: 'job-tile',
    RespTitle: 'Job Details',
  },
  {
    title: 'Job Amount',
    key: 'job-amount',
  },

  {
    title: 'Date',
    key: 'date',
  },
  {
    title: 'Customer Name',
    key: 'customer-name',
  },
  {
    title: 'Disputed By',
    key: 'total-milestone',
  },
  {
    title: 'Dispute Status',
    key: 'completed-milestone',

  },

]
const disputeListing = [
  {
    id: "1",
    jobTitle: 'Amet minim mollit non deserunt ullamco  lorem ipsum solor dim amet',
    amount: '£670',
    date: '7 July 2020 03:00 pm',
    customerName: 'Annette Black',
    disputeBy: 'Courtney Henry',
    fees: '£670',
    milestone: '5',
    disputeStatus: 'Dispute Started',
    statusFlag: 'cancel',
  },
  {
    id: "2",
    jobTitle: 'Amet minim mollit non deserunt ullamco  lorem ipsum solor dim amet',
    amount: '£670',
    date: '7 July 2020 03:00 pm',
    customerName: 'Kristin Watson',
    disputeBy: 'John Doe',
    fees: '£670',
    milestone: '5',
    disputeStatus: 'Dispute Resolved',
    statusFlag: 'complete',
  },
  {
    id: "1",
    jobTitle: 'Amet minim mollit non deserunt ullamco  lorem ipsum solor dim amet',
    amount: '£670',
    date: '7 July 2020 03:00 pm',
    customerName: 'Jenny Wilson',
    disputeBy: 'Jane Cooper',
    fees: '£670',
    milestone: '5',
    disputeStatus: 'Arbitration Suggested',
    statusFlag: 'suggested',
  },
];
const Dashboard = (props) => {
  const dimensions = useWindowDimension()
  let [showIsNoData, setShowIsNoData] = useState(false)
  let [showSortDropdown, setShowSortDropdown] = useState(false)
  const [headerHeight, setHeaderHeight] = useState(0)
  useEffect(() => {
    setHeaderHeight(document.getElementsByClassName('headerClient')[0].offsetHeight);
  })

  return (
    <Scrollbars className="dashboardScroll" style={{ height: (dimensions.height - headerHeight) + 'px', marginTop: (headerHeight + 'px') }} >
      <div className='dashboardMain'>
        <div className="page_title">
          <Label title='Dashboard'></Label>
          <CustomButton type="submit" title="Create Transaction" />
        </div>
        <div className="revenue_row">
          <ul>
            <li>
              <div className="revenue_box">
                <div className="title">Total Revenue</div>
                <div className="amount">£35,000</div>
              </div>
            </li>
            <li>
              <div className="revenue_box">
                <div className="title">Revenue this month</div>
                <div className="amount">£5,000</div>
              </div>
            </li>
            <li>
              <div className="revenue_box">
                <div className="title">Revenue this year</div>
                <div className="amount">£15,000</div>
              </div>
            </li>
            <li>
              <div className="revenue_box">
                <div className="title">Amount to Next Interim Transaction</div>
                <div className="amount">£25,000</div>
              </div>
            </li>
            <li>
              <div className="revenue_box">
                <div className="title">Biggest Transaction Till Date</div>
                <div className="amount">£35,000</div>
              </div>
            </li>
            <li>
              <div className="revenue_box">
                <div className="title">Total Outstanding Transaction</div>
                <div className="amount">£35,000</div>
              </div>
            </li>
          </ul>
        </div>
        <div className='progressBarSection'>
          <CustomCard>
            <div className='progressSection'>
              <Label title='Ongoing Payments'></Label>
              <ProgressBar
                value={40}
                percentageNo='40'
                status="Ongoing Payments"
                className='noColor'
                classNameText='textColor'
                trailColor={'#f3f6f9'}
                pathColor={'#0F4C81'}
              >
              </ProgressBar>
              <div className='jobsNo'>
                <p className='txt'>Total Number of Payments</p>
                <p className='no'>100</p>
              </div>
            </div>
          </CustomCard>
          <CustomCard className='completedJobs'>
            <div className='progressSection'>
              <Label className='colorGreen' title='Completed Payments'></Label>
              <ProgressBar
                value={25}
                percentageNo='25'
                status="Completed Payments"
                className='noColor'
                classNameText='textColor'
                trailColor={'#f4f7f7'}
                pathColor={'#2d5f5d'}
              >
              </ProgressBar>
              <div className='jobsNo'>
                <p className='txt'>Total Number of Payments</p>
                <p className='no'>100</p>
              </div>
            </div>
          </CustomCard>
          <CustomCard className='disputeJobs'>
            <div className='progressSection'>
              <Label className='colorRed' title='Payments in Dispute'></Label>
              <ProgressBar
                value={15}
                percentageNo='15'
                status="Payments in Dsipute"
                className='noColor'
                classNameText='textColor'
                trailColor={'#fef4f5'}
                pathColor={'#ee2737'}
              >
              </ProgressBar>
              <div className='jobsNo'>
                <p className='txt'>Total Number of Payments</p>
                <p className='no'>100</p>
              </div>
            </div>
          </CustomCard>
        </div>
        <div className='jobSection supportTickets'>
          <div className='innerSection'>
            <Label className='listingTitle' title='Latest Support Tickets'></Label>
            <div className='tableSection'>
              <div className='header'>
                <div className="headerItems">
                  <TableHeader>
                    {
                      headingSupportTicketsData.map((header) => {
                        return <li data-content="Latest Support Tickets" className='headingItem'>
                          <div className='headerTitle'>{header.title} {header.key && <i className='icon-sort'></i>}</div>

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
                              sortingData.map((sortingData) => {

                                return <li className='headingItem'>{sortingData.jobDetail}</li>


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
                {showIsNoData &&
                  <NoData title='No Record found'></NoData>
                }
                {
                  supportTicketsListing.map((supportTicketsListing) => {
                    return <TableListing>
                      <li className='headingItem'>{supportTicketsListing.id}</li>
                      <li className='headingItem'>{supportTicketsListing.paymentTitle}</li>
                      <li className='headingItem'>{supportTicketsListing.createdOn}</li>
                      <li className='headingItem'>{supportTicketsListing.asignedTo}</li>
                      <li className='headingItem'>{supportTicketsListing.statusFlag ? <Status className={supportTicketsListing.statusFlag} title={supportTicketsListing.disputeStatus}></Status> : supportTicketsListing.disputeStatus}</li>
                    </TableListing>

                  })
                }
              </div>
            </div>
            <MoreRecord title='More 4 Records'></MoreRecord>
          </div>
        </div>
        {/* <div className='jobSection disputeJobs'>
          <div className='innerSection'>
            <Label className='listingTitle' title='Latest Ongoing Payments'></Label>
            <div className='tableSection'>
              <div className='header'>
                <div className="headerItems">
                  <TableHeader>
                    {
                      headerDisputeData.map((header) => {
                        return <li data-content="Latest Ongoing Payments" className='headingItem'><div className='headerTitle'>{header.title} {header.key && <i className='icon-sort'></i>}</div></li>

                      })
                    }
                    <div className='sortingIcon'>
                      <i className='icon-sort' onClick={() => setShowSortDropdown(!showSortDropdown)}></i>
                      {showSortDropdown &&
                        <>


                          {
                            sortingData.map((sortingData) => {
                              return <FilterSorting >
                                {/* <div className='overLay' onClick={() => setShowFilterDropdown(false)} ></div> */}
        <li className='headingItem'>{sortingData.jobDetail}</li>
        <li className='headingItem'>{sortingData.jobDetail}</li>
        <li className='headingItem'>{sortingData.jobDetail}</li>

                              </FilterSorting>
                            })
                          }
                        </>
                      }
                    </div >
                  </TableHeader >
                </div >
              </div >
  <div className='dataListing'>
    {showIsNoData &&
      <NoData title='No Record found'></NoData>
    }
    {
      disputeListing.map((disputeListing) => {
        return <TableListing>
          <li className='headingItem'>
            <p className='detailLI'>
              {disputeListing.jobTitle}
            </p>
            <p data-content="Job Amount :" className='amountLi'>
              {disputeListing.amount}
            </p>
            <p data-content="Date :" className='dateLi'>
              {disputeListing.date}
            </p>
          </li>
          <li data-content="Customer Name" className='headingItem'>{disputeListing.customerName}</li>
          <li data-content="Disputed By" className='headingItem'>{disputeListing.disputeBy}</li>
          <li data-content="Dispute Status" className='headingItem'>{disputeListing.statusFlag ? <Status className={disputeListing.statusFlag} title={disputeListing.disputeStatus}></Status> : disputeListing.disputeStatus}</li>
        </TableListing>

      })
    }
  </div>
            </div >
  <MoreRecord title='More 4 Records'></MoreRecord>
          </div >
        </div > * /}
      </div >
    </Scrollbars >

  )
}



export default withRouter(Dashboard);


