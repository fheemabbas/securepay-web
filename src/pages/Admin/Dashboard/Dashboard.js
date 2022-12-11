import React, { useState, useEffect, forwardRef } from 'react'
import { withRouter } from 'react-router-dom'
import ReactHighcharts from 'react-highcharts'

import ReactHighstock from 'react-highcharts/ReactHighstock.src'

import ProgressBar from '../../../components/UI/ProgressBar/ProgressBar'
import Label from '../../../components/UI/Label/Label'
import CustomCard from '../../../components/CustomCard/CustomCard'
import Scrollbars from 'react-custom-scrollbars'
import TableHeader from '../../../components/TableHeader/TableHeader'
import TableListing from '../../../components/TableListing/TableListing'
import Status from '../../../components/Status/Status'
import NoData from '../../../components/NoData/NoData'
import MoreRecord from '../../../components/MoreRecord/MoreRecord'
import FilterSorting from '../Dashboard/Form/FilterSorting'
import useWindowDimension from '../../../hooks/useWindowDimension'
import './Dashboard.scss'
import CustomButton from '../../../components/UI/CustomButton/CustomButton'
import Constant from '../../../util/constant'
// import Calender from '../../../components/UI/Calender/Calender'
import CalenderCustom from '../../../components/UI/CalenderCustom/CalenderCustom'
import { Controller } from 'react-hook-form'
import HookForm from '../../../components/HookForm/HookForm'
import {
  getJobCount,
  getOneuserDetails,
  getOngoingJob,
  getSupportAndTicket,
} from '../../../state/ducks/Job/actions'
import {
  getTotalRevenue,
  getAdminFees,
  getTotalJobs,
} from '../../../state/ducks/graph/action'
import { connect } from 'react-redux'
import { get } from 'lodash'
import moment from 'moment'
import {
  capitalizeFirstLetter,
  dateFormat,
  getYear,
  getMonth,
} from '../../../services/helper.service'

const calenderForm = {
  startdate: {
    name: 'startdate',
    validate: {
      required: {
        value: true,
      },
    },
  },
  enddate: {
    name: 'enddate',
    validate: {
      required: {
        value: true,
      },
    },
  },
}

const sortingData = [
  {
    id: '1',
    jobDetail: 'Job details',
  },
  {
    id: '2',
    jobDetail: 'Milestoone details',
  },
  {
    id: '3',
    jobDetail: 'Completion date',
  },
]

const headingSupportTicketsData = [
  {
    title: 'Ticket Id',
    key: 'ticket-id',
  },
  {
    title: 'Job Title',
    key: 'payment-tile',
  },
  {
    title: 'Assigned to',
    key: 'created-on',
  },

  {
    title: 'Created on',
    key: 'assigned-to',
  },
  {
    title: 'Status',
    key: 'status',
  },
]

const supportTicketsListing = [
  {
    id: '#123',
    paymentTitle: 'Amet minim mollit non deserunt ullamco ',
    createdOn: '7 July 2020 03:00 pm',
    asignedTo: 'Courtney Henry',
    disputeStatus: 'Pending',
    statusFlag: 'pending',
  },
  {
    id: '#145',
    paymentTitle: 'Amet minim mollit non deserunt ullamco ',
    createdOn: '7 July 2020 03:00 pm',
    asignedTo: 'John Doe',
    disputeStatus: 'Resolved',
    statusFlag: 'resolved',
  },
  {
    id: '#153',
    paymentTitle: 'Amet minim mollit non deserunt ullamco ',
    createdOn: '7 July 2020 03:00 pm',
    asignedTo: 'Courtney Henry',
    disputeStatus: 'Pending',
    statusFlag: 'pending',
  },
]

const headingOngoingData = [
  {
    title: 'Job Title',
    key: 'title',
  },
  {
    title: 'Job Amount',
    key: 'amount',
  },
  {
    title: 'Created By',
    key: 'created-by',
  },
  {
    title: 'Created On',
    key: 'created-on',
  },
  {
    title: 'Business Name',
    key: 'business-name',
  },
  {
    title: 'Total Milestone',
    key: 'total-milestone',
  },
  {
    title: 'Completed Milestone',
    key: 'completed-milestone',
  }
]
const ongoingJobsListing = [
  {
    title: 'Amet minim mollit non deserunt ullamco',
    amount: '£3670',
    createdBy: 'Studio Blue',
    createdOn: '7 July 2020 03:00 pm',
    businessName: 'Eleanor Pena',
    totalMilestone: '5',
    completedMilestone: '4',
    completionDate: '7 July 2020 03:00 pm',
  },
  {
    title: 'Amet minim mollit non deserunt ullamco ',
    amount: '£3670',
    createdBy: 'Studio Blue',
    createdOn: '7 July 2020 03:00 pm',
    businessName: 'Eleanor Pena',
    totalMilestone: '5',
    completedMilestone: '4',
    completionDate: '7 July 2020 03:00 pm',
  },
  {
    title: 'Amet minim mollit non deserunt ullamco ',
    amount: '£3670',
    createdBy: 'Studio Blue',
    createdOn: '7 July 2020 03:00 pm',
    businessName: 'Eleanor Pena',
    totalMilestone: '5',
    completedMilestone: '4',
    completionDate: '7 July 2020 03:00 pm',
  },
]

const AdminDashboard = (props) => {
  var revenueconfig = {
    chart: {
      type: 'line',
    },
    title: {
      text: '',
    },
    subtitle: {
      text: '',
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: {
        day: '%m %b, %Y', //ex- 01 Jan 2016
      },
      title: {
        text: '',
      },
      categories: [new Date(), new Date() + 1],
    },
    yAxis: {
      title: {
        text: 'Total Revenue',
      },
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: false,
        },
        enableMouseTracking: false,
      },
    },
    series: [
      {
        name: 'Total Revenue',
        data: [1, 10, 5, 15, 3, 20, 15, 40, 25, 10, 30, 16],
        // data: totalRevenue?.totalEarning,
        color: '#2D5F5D',
      },
    ],
  }
  var adminfeesconfig = {
    chart: {
      type: 'line',
    },
    title: {
      text: '',
    },
    subtitle: {
      text: '',
    },
    xAxis: {
      categories: [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
        '16',
        '17',
        '18',
        '19',
        '20',
        '21',
        '22',
        '23',
        '24',
      ],
    },
    yAxis: {
      title: {
        text: 'Total Admin Fees',
      },
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: false,
        },
        enableMouseTracking: false,
      },
    },
    series: [
      {
        name: 'Total Admin Fees',
        data: [1, 10, 5, 15, 3, 20, 15, 40, 25, 10, 30, 16],
        color: '#0F4C81',
      },
    ],
  }

  var jobsconfig = {
    chart: {
      type: 'line',
    },
    title: {
      text: '',
    },
    subtitle: {
      text: '',
    },
    xAxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
    },
    yAxis: {
      title: {
        text: 'Total Jobs',
      },
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true,
        },
        enableMouseTracking: false,
      },
    },
    series: [
      {
        name: 'Ongoing Jobs',
        data: [5, 10, 5, 15, 3, 20, 15, 40, 25, 10, 30, 16],
        color: '#EE2737',
      },
      {
        name: 'Completed Jobs',
        data: [10, 20, 5, 40, 10, 50, 15, 60, 20, 70, 25, 80],
        color: '#2D5F5D',
      },
      {
        name: 'Disputed Jobs',
        data: [15, 40, 20, 60, 25, 80, 30, 100, 35, 120, 40, 140],
        color: '#0F4C81',
      },
    ],
  }
  const yearData = [
    '2014',
    '2015',
    '2016',
    '2017',
    '2018',
    '2019',
    '2020',
    '2021',
    '2022',
  ]

  let [totalRevenueYear, setTotalRevenueYear] = useState(
    new Date().getFullYear(),
  )
  let [adminYear, setAdminYear] = useState(new Date().getFullYear())
  let [totalJobsYear, setTotalJobsYear] = useState(new Date().getFullYear())

  const dimensions = useWindowDimension()
  let [showIsNoData, setShowIsNoData] = useState(false)
  let [showSortDropdown, setShowSortDropdown] = useState(false)
  const [headerHeight, setHeaderHeight] = useState(0)
  const [role, setRole] = useState(localStorage.getItem('loginRole'))
  const [isYearly, setIsYearly] = useState(true)
  const [isRevenueYearly, setIsRevenueYearly] = useState(true)
  const [isAdminYearly, setIsAdminYearly] = useState(true)
  const [isJobYearly, setJobYearly] = useState(true)
  const [totalTicket, setTotalTicket] = useState()
  const [ticket, setTicket] = useState([])

  const [totalRevenue, setTotalRevenue] = useState()
  const [totalAdminFees, setTotalAdminFees] = useState()
  const [totalJobs, setTotalJobs] = useState()

  const [startDate, setStartDate] = useState()
  const [adminStartDate, setAdminStartDate] = useState()
  const [adminEndDate, setAdminEndDate] = useState()
  const [jobStartDate, setJobStartDate] = useState()
  const [jobEndDate, setJobEndDate] = useState()
  const currentDate = new Date().getDate();
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const [endDate, setEndDate] = useState()
  const { allcounts, onGoingJob } = props
  useEffect(() => {
    setHeaderHeight(
      document.getElementsByClassName('headerAdmin')[0].offsetHeight,
    )
  })
  const [form, setFilterForm] = React.useState()
  const onFormSubmit = () => { }
  const CustomStartDate = forwardRef((props, ref) => (
    <button
      type="button"
      ref={ref}
      className="custom-input"
      onClick={props.onClick}
    >
      {props.value ? (
        props.value
      ) : (
        <span className="birth_Placeholder">Start Date</span>
      )}
    </button>
  ))
  const CustomEndDate = forwardRef((props, ref) => (
    <button
      type="button"
      ref={ref}
      className="custom-input"
      onClick={props.onClick}
    >
      {props.value ? (
        props.value
      ) : (
        <span className="birth_Placeholder">End Date</span>
      )}
    </button>
  ))

  const submitDate = (endDate) => {
    //console.log('startDate--', startDate)
    //console.log('endDate--', endDate)
    if (startDate && endDate) {
      props.getTotalRevenue(null, null, startDate, endDate).then((response) => {
        const revenueueData = response.payload.map((item) => item.totalEarning)
        revenueconfig.series[0].data = [...revenueueData]
        const revenueueCate = response.payload.map(
          (item) =>
            `${getMonth(item._id.month)}  ${item._id.day} ${item._id.year}`,
        )
        revenueconfig.xAxis.categories = [...revenueueCate]
        setTotalRevenue(revenueconfig)

        //console.log('response for date---->', response.payload)
      })
    }
  }

  const submitAdminDate = (endDate) => {
    //console.log('startDate--', adminStartDate)
    //console.log('endDate--', endDate)
    if (adminStartDate && endDate) {
      props
        .getAdminFees(null, null, adminStartDate, endDate)
        .then((response) => {
          const adminFeesData = response.payload.map(
            (item) => item.totalEarning,
          )
          adminfeesconfig.series[0].data = [...adminFeesData]

          const adminCate = response.payload.map(
            (item) =>
              `${getMonth(item._id.month)}  ${item._id.day} ${item._id.year}`,
          )
          adminfeesconfig.xAxis.categories = [...adminCate]
          setTotalAdminFees(adminfeesconfig)
          //console.log('response for date Admin---->', response.payload)
        })
    }
  }

  const submitJobDate = (endDate) => {
    if (jobStartDate && endDate) {
      props.getTotalJobs(null, null, jobStartDate, endDate).then((response) => {
        let totalOngoing = []
        let totalcompleted = []
        let totalpayment = []
        response.payload.forEach((item) => {
          totalOngoing = [...totalOngoing, item.totalOngoing]
          totalcompleted = [...totalcompleted, item.totalcompleted]
          totalpayment = [...totalpayment, item.totalpayment]
        })
        jobsconfig.series[0].data = [...totalOngoing]
        jobsconfig.series[1].data = [...totalcompleted]
        jobsconfig.series[2].data = [...totalpayment]

        const jobsCate = response.payload.map(
          (item) =>
            `${getMonth(item._id.month)} ${item._id.day} ${item._id.year}`,
        )
        jobsconfig.xAxis.categories = [...jobsCate]
        setTotalJobs(jobsconfig)
        //console.log('response for date jobs---->', jobsconfig)
      })
    }
  }

  const getTickitListing = () => {
    props
      .getSupportAndTicket(`support/ticket?page=${1}&limit=${3}`)
      .then((response) => {
        let res = response.data || response
        setTicket(res.payload.ticketData)
        setTotalTicket(res.payload.totalRecord)
      })
  }

  const getTotalRevenueData = (year, month, startDate, endDate) => {
    // const month, year, startDate, endDate
    props.getTotalRevenue(year, month, startDate, endDate).then((response) => {
      const revenueueData = response.payload.map((item) => item.totalEarning)
      revenueconfig.series[0].data = [...revenueueData]
      const revenueueCate = response.payload.map(
        (item) => !isRevenueYearly ? `${getMonth(item._id.month)}  ${item._id.day} ${item._id.year}` : `${getMonth(item._id.month)} ${item._id.year}`,
      )
      revenueconfig.xAxis.categories = [...revenueueCate]
      setTotalRevenue(revenueconfig)

      //console.log('res---->>>', response.payload, revenueueCate)
    })
  }

  const getTotalAdminFeesData = (year, month, startDate, endDate) => {
    props.getAdminFees(year, month, startDate, endDate).then((response) => {
      const adminFeesData = response.payload.map((item) => item.totalEarning)
      adminfeesconfig.series[0].data = [...adminFeesData]
      const adminCate = response.payload.map(
        (item) => !isAdminYearly ? `${getMonth(item._id.month)}  ${item._id.day} ${item._id.year}` : `${getMonth(item._id.month)} ${item._id.year}`,
      )
      adminfeesconfig.xAxis.categories = [...adminCate]
      setTotalAdminFees(adminfeesconfig)
      //console.log('totalAdminFees===>>>', response.payload, adminCate)
    })
  }

  const getJobs = (year, month, startDate, endDate) => {
    props.getTotalJobs(year, month, startDate, endDate).then((response) => {
      let totalOngoing = []
      let totalcompleted = []
      let totalpayment = []
      response.payload.forEach((item) => {
        totalOngoing = [...totalOngoing, item.totalOngoing]
        totalcompleted = [...totalcompleted, item.totalcompleted]
        totalpayment = [...totalpayment, item.totalpayment]
      })
      jobsconfig.series[0].data = [...totalOngoing]
      jobsconfig.series[1].data = [...totalcompleted]
      jobsconfig.series[2].data = [...totalpayment]

      const jobsCate = response.payload.map(
        (item) => !isJobYearly ? `${getMonth(item._id.month)}  ${item._id.day} ${item._id.year}` : `${getMonth(item._id.month)} ${item._id.year}`,
      )
      jobsconfig.xAxis.categories = [...jobsCate]
      setTotalJobs(jobsconfig)
      //console.log('totalJobs===>>>', response.payload)
    })
  }

  useEffect(() => {
    props.getJobCount(`/dashboard/admin-getcount`)
    props.getOngoingJob(`/dashboard/ongoingjob`)

    getTickitListing()
  }, [])

  // useEffect(() => {
  //   getTotalRevenueData(totalRevenueYear)
  //   //console.log('totalRevenueYear-----', totalRevenueYear)
  // }, [totalRevenueYear])

  // useEffect(() => {
  //   getTotalAdminFeesData(adminYear)
  //   //console.log('adminYear-----', adminYear)
  // }, [adminYear])

  // useEffect(() => {
  //   getJobs(totalJobsYear)
  //   //console.log('totalJobsYear--->', totalJobsYear)
  // }, [totalJobsYear])

  useEffect(() => {
    if (!isRevenueYearly) {
      getTotalRevenueData(totalRevenueYear, new Date().getMonth() + 1);
    } else {
      getTotalRevenueData(totalRevenueYear)
    }
  }, [isRevenueYearly, totalRevenueYear])

  useEffect(() => {
    if (!isAdminYearly) {
      getTotalAdminFeesData(adminYear, new Date().getMonth() + 1);
    } else {
      getTotalAdminFeesData(adminYear)
    }
  }, [isAdminYearly, adminYear])

  useEffect(() => {
    if (!isJobYearly) {
      getJobs(totalJobsYear, new Date().getMonth() + 1);
    } else {
      getJobs(totalJobsYear)
    }
  }, [isJobYearly, totalJobsYear])

  return (
    <Scrollbars
      className="admin_dashboard_scroll"
      style={{
        height: dimensions.height - headerHeight + 'px',
        marginTop: headerHeight + 'px',
      }}
    >
      <div className="dashboardMain">
        <div className="page_title">
          <Label title="Dashboard"></Label>
        </div>
        <div className="revenue_row">
          <ul>
            <li>
              <div className="revenue_box blue_light">
                <div className="title">
                  Total<br></br> Users
                </div>
                <div className="amount">{get(allcounts, 'clientCount', 0)}</div>
              </div>
            </li>
            {/* <li>
              <div className="revenue_box grey_light">
                <div className="title">Total<br></br> Customers</div>
                <div className="amount">0</div>
              </div>
            </li> */}
            {role === Constant.ROLE.ADMIN && (
              <li>
                <div className="revenue_box grey_light">
                  <div className="title">
                    Revneue <br></br> Generated
                  </div>
                  <div className="amount">0</div>
                </div>
              </li>
            )}
          </ul>
        </div>
        <div className="progressBarSection">
          <CustomCard>
            <div className="progressSection">
              <Label title="Ongoing Jobs"></Label>
              <ProgressBar
                value={get(allcounts, 'adminData[0].ongoingPayment', 0)}
                percentageNo={get(allcounts, 'adminData[0].ongoingPayment', 0)}
                maxValue={get(allcounts, 'adminData[0].totalRecord', 1)}
                status="Ongoing Jobs"
                className="noColor"
                classNameText="textColor"
                trailColor={'#f3f6f9'}
                // pathColor={'#0F4C81'}
                pathColor={'#00232C'}
              ></ProgressBar>
              <div className="jobsNo">
                <p className="txt">Total Number of Jobs</p>
                <p className="no">
                  {get(allcounts, 'adminData[0].totalRecord', 0)}
                </p>
              </div>
            </div>
          </CustomCard>
          <CustomCard className="completedJobs">
            <div className="progressSection">
              <Label className="colorGreen" title="Completed Jobs"></Label>
              <ProgressBar
                value={get(allcounts, 'adminData[0].completedPayment', 0)}
                percentageNo={get(
                  allcounts,
                  'adminData[0].completedPayment',
                  0,
                )}
                maxValue={get(allcounts, 'adminData[0].totalRecord', 1)}
                status="Completed Jobs"
                className="noColor"
                classNameText="textColor"
                trailColor={'#f4f7f7'}
                pathColor={'#2d5f5d'}
              ></ProgressBar>
              <div className="jobsNo">
                <p className="txt">Total Number of Jobs</p>
                <p className="no">
                  {get(allcounts, 'adminData[0].totalRecord', 0)}
                </p>
              </div>
            </div>
          </CustomCard>
          {get(allcounts, 'adminData[0].paymentinDispute', 0) > 0 && (
            <CustomCard className="disputeJobs">
              <div className="progressSection">
                <Label className="colorRed" title="Jobs in Dispute"></Label>
                <ProgressBar
                  value={get(allcounts, 'adminData[0].paymentinDispute', 0)}
                  percentageNo={get(
                    allcounts,
                    'adminData[0].paymentinDispute',
                    0,
                  )}
                  maxValue={get(allcounts, 'adminData[0].totalRecord', 1)}
                  status="Jobs in Dispute"
                  className="noColor"
                  classNameText="textColor"
                  trailColor={'#fef4f5'}
                  pathColor={'#ee2737'}
                ></ProgressBar>
                <div className="jobsNo">
                  <p className="txt">Total Number of Jobs</p>
                  <p className="no">
                    {get(allcounts, 'adminData[0].totalRecord', 0)}
                  </p>
                </div>
              </div>
            </CustomCard>
          )}
        </div>

        <div className="graphmain">
          {Number(role) === 1 && (
            <div className="tow_Row">
              <div className="column">
                <div className="title_bx">Total Revenue</div>
                <div className={totalRevenue && totalRevenue.xAxis.categories.length === 0 ? "box_bg no_data" : "box_bg"}>
                  <HookForm
                    defaultForm={{}}
                    init={(form) => setFilterForm(form)}
                    onSubmit={onFormSubmit}
                  >
                    {(formMethod) => {
                      return (
                        <div className="form">
                          <div className="graph_header">
                            <div className="monthyearly_row">
                              <button
                                className={
                                  isRevenueYearly
                                    ? 'btn_custom'
                                    : 'btn_custom filter_active'
                                }
                                onClick={() => {
                                  setIsRevenueYearly(false)
                                }}
                              >
                                Monthly
                              </button>
                              <button
                                className={
                                  isRevenueYearly
                                    ? 'btn_custom filter_active'
                                    : 'btn_custom'
                                }
                                onClick={() => {
                                  setIsRevenueYearly(true)
                                }}
                              >
                                Yearly
                              </button>
                            </div>
                            <div className="year_row">
                              <button
                                className="btn_mins"
                                onClick={() => {
                                  totalRevenueYear === 0
                                    ? setTotalRevenueYear(
                                      totalRevenueYear.length - 1,
                                    )
                                    : setTotalRevenueYear(totalRevenueYear - 1)
                                }}
                              >
                                {/* {//console.log('year------>', totalRevenueYear)} */}
                              </button>
                              <div className="txt_velue">
                                {totalRevenueYear}
                              </div>
                              <button
                                className="btn_plus"
                                onClick={() => {
                                  totalRevenueYear ===
                                    totalRevenueYear.length - 1
                                    ? setTotalRevenueYear(0)
                                    : setTotalRevenueYear(totalRevenueYear + 1)
                                }}
                              ></button>
                            </div>
                            <div className="calenderMain">
                              <div className="dateSection">
                                <Controller
                                  control={formMethod.control}
                                  name={calenderForm.startdate.name}
                                  rules={calenderForm.startdate.validate}
                                  defaultValue={''}
                                  render={(props) => (
                                    <CalenderCustom
                                      selected={startDate}
                                      onChange={(e) => {
                                        props.onChange(e)
                                        setStartDate(e)
                                      }}
                                      dateFormat="dd/MM/yyyy"
                                      placeholderText="Start Date"
                                      customInput={<CustomStartDate />}
                                      currantYear={currentYear}
                                      maxDate={
                                        new Date(
                                          currentYear +
                                          "/" +
                                          currentMonth +
                                          "/" +
                                          currentDate
                                        )
                                      }
                                    />
                                  )}
                                />
                              </div>
                              <div className="dateSection">
                                <Controller
                                  control={formMethod.control}
                                  name={calenderForm.enddate.name}
                                  rules={calenderForm.startdate.validate}
                                  defaultValue={''}
                                  render={(props) => (
                                    <CalenderCustom
                                      selected={endDate}
                                      onChange={(e) => {
                                        props.onChange(e)
                                        setEndDate(e)
                                        submitDate(e)
                                      }}
                                      dateFormat="dd/MM/yyyy"
                                      placeholderText="Date of Birth*"
                                      customInput={<CustomEndDate />}
                                      currantYear={currentYear}
                                      minDate={startDate}
                                      maxDate={
                                        new Date(
                                          currentYear +
                                          "/" +
                                          currentMonth +
                                          "/" +
                                          currentDate
                                        )
                                      }
                                    />
                                  )}
                                />
                              </div>
                            </div>
                          </div>
                          {startDate && <CustomButton title="Clear" className="clearButton" onClick={() => {
                            setStartDate('');
                            setEndDate('');
                            if (!isRevenueYearly) {
                              getTotalRevenueData(totalRevenueYear, new Date().getMonth() + 1);
                            } else {
                              getTotalRevenueData(totalRevenueYear)
                            }
                          }}></CustomButton>}
                        </div>
                      )
                    }}
                  </HookForm>
                  {totalRevenue && totalRevenue.xAxis.categories.length === 0 && <div className='noDataContainer'>
                    <div className='imageContainer'><img src='https://res.cloudinary.com/zudu/image/upload/v1640847407/Pose/Pose-web/Project-files/NoData.svg' className='pieNoData' alt='No data yet' /></div>
                    <span className='noDataYet'>No Data Yet</span>
                    <span className='noGraphData'>Currently there is no enogh data to show this graph</span>
                  </div>}
                  {totalRevenue && <ReactHighcharts config={totalRevenue}></ReactHighcharts>}
                </div>
              </div>
              <div className="column">
                <div className="title_bx">Total Admin Fees</div>
                <div className={totalAdminFees && totalAdminFees.xAxis.categories.length === 0 ? "box_bg no_data" : "box_bg"} >
                  <HookForm
                    defaultForm={{}}
                    init={(form) => setFilterForm(form)}
                    onSubmit={onFormSubmit}
                  >
                    {(formMethod) => {
                      return (
                        <div className="form">
                          <div className="graph_header">
                            <div className="monthyearly_row">
                              <button
                                className={
                                  isAdminYearly
                                    ? 'btn_custom'
                                    : 'btn_custom filter_active'
                                }
                                onClick={() => {
                                  setIsAdminYearly(false)
                                }}
                              >
                                Monthly
                              </button>
                              <button
                                className={
                                  isAdminYearly
                                    ? 'btn_custom filter_active'
                                    : 'btn_custom'
                                }
                                onClick={() => {
                                  setIsAdminYearly(true)
                                }}
                              >
                                Yearly
                              </button>
                            </div>
                            <div className="year_row">
                              <button
                                className="btn_mins"
                                onClick={() => {
                                  adminYear === 0
                                    ? setAdminYear(adminYear.length - 1)
                                    : setAdminYear(adminYear - 1)
                                }}
                              ></button>
                              <div className="txt_velue">{adminYear}</div>
                              <button
                                className="btn_plus"
                                onClick={() => {
                                  adminYear === adminYear.length - 1
                                    ? setAdminYear(0)
                                    : setAdminYear(adminYear + 1)
                                }}
                              ></button>
                            </div>
                            <div className="calenderMain">
                              <div className="dateSection">
                                <Controller
                                  control={formMethod.control}
                                  name={calenderForm.startdate.name}
                                  rules={calenderForm.startdate.validate}
                                  defaultValue={''}
                                  render={(props) => (
                                    <CalenderCustom
                                      selected={adminStartDate}
                                      onChange={(e) => {
                                        props.onChange(e)
                                        setAdminStartDate(e)
                                        //console.log('e startDate--->', e)
                                      }}
                                      dateFormat="dd/MM/yyyy"
                                      placeholderText="Date of Birth*"
                                      customInput={<CustomStartDate />}
                                      currantYear={currentYear}
                                      maxDate={
                                        new Date(
                                          currentYear +
                                          "/" +
                                          currentMonth +
                                          "/" +
                                          currentDate
                                        )
                                      }
                                    />
                                  )}
                                />
                              </div>
                              <div className="dateSection">
                                <Controller
                                  control={formMethod.control}
                                  name={calenderForm.enddate.name}
                                  rules={calenderForm.startdate.validate}
                                  defaultValue={''}
                                  render={(props) => (
                                    <CalenderCustom
                                      selected={adminEndDate}
                                      onChange={(e) => {
                                        props.onChange(e)
                                        setAdminEndDate(e);
                                        submitAdminDate(e)
                                        //console.log('adminDate------>>>', e)
                                      }}
                                      dateFormat="dd/MM/yyyy"
                                      placeholderText="Date of Birth*"
                                      customInput={<CustomEndDate />}
                                      currantYear={currentYear}
                                      maxDate={
                                        new Date(
                                          currentYear +
                                          "/" +
                                          currentMonth +
                                          "/" +
                                          currentDate
                                        )
                                      }
                                      minDate={adminStartDate}
                                    />
                                  )}
                                />
                              </div>
                            </div>
                          </div>
                          {adminStartDate && <CustomButton title="Clear" className="clearButton" onClick={() => {
                            setAdminStartDate('')
                            setAdminEndDate('');
                            if (!isAdminYearly) {
                              getTotalAdminFeesData(adminYear, new Date().getMonth() + 1);
                            } else {
                              getTotalAdminFeesData(adminYear)
                            }
                          }}></CustomButton>}
                        </div>
                      )
                    }}
                  </HookForm>
                  {totalAdminFees && totalAdminFees.xAxis.categories.length === 0 && <div className='noDataContainer'>
                    <div className='imageContainer'><img src='https://res.cloudinary.com/zudu/image/upload/v1640847407/Pose/Pose-web/Project-files/NoData.svg' className='pieNoData' alt='No data yet' /></div>
                    <span className='noDataYet'>No Data Yet</span>
                    <span className='noGraphData'>Currently there is no enogh data to show this graph</span>
                  </div>}
                  {totalAdminFees && <ReactHighcharts config={totalAdminFees}></ReactHighcharts>}
                </div>
              </div>
            </div>
          )}
          <div className="tow_Row">
            <div className="columnfull">
              <div className={totalJobs && totalJobs.xAxis.categories.length === 0 ? "box_bg no_data" : "box_bg"}>
                <HookForm
                  defaultForm={{}}
                  init={(form) => setFilterForm(form)}
                  onSubmit={onFormSubmit}
                >
                  {(formMethod) => {
                    return (
                      <div className="form">
                        <div className="graph_header">
                          <div className="monthyearly_row">
                            <button
                              className={
                                isJobYearly
                                  ? 'btn_custom'
                                  : 'btn_custom filter_active'
                              }
                              onClick={() => {
                                setJobYearly(false)
                              }}
                            >
                              Monthly
                            </button>
                            <button
                              className={
                                isJobYearly
                                  ? 'btn_custom filter_active'
                                  : 'btn_custom'
                              }
                              onClick={() => {
                                setJobYearly(true)
                              }}
                            >
                              Yearly
                            </button>
                          </div>
                          <div className="year_row">
                            <button
                              className="btn_mins"
                              onClick={() => {
                                totalJobsYear === 0
                                  ? setTotalJobsYear(totalJobsYear.length - 1)
                                  : setTotalJobsYear(totalJobsYear - 1)
                              }}
                            ></button>
                            <div className="txt_velue">{totalJobsYear}</div>
                            <button
                              className="btn_plus"
                              onClick={() => {
                                totalJobsYear === totalJobsYear.length - 1
                                  ? setTotalJobsYear(0)
                                  : setTotalJobsYear(totalJobsYear + 1)
                              }}
                            ></button>
                          </div>
                          <div className="calenderMain">
                            <div className="dateSection">
                              <Controller
                                control={formMethod.control}
                                name={calenderForm.startdate.name}
                                rules={calenderForm.startdate.validate}
                                defaultValue={''}
                                render={(props) => (
                                  <CalenderCustom
                                    selected={jobStartDate}
                                    onChange={(e) => {
                                      props.onChange(e)
                                      setJobStartDate(e)
                                    }}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Date of Birth*"
                                    customInput={<CustomStartDate />}
                                    currantYear={currentYear}
                                    maxDate={
                                      new Date(
                                        currentYear +
                                        "/" +
                                        currentMonth +
                                        "/" +
                                        currentDate
                                      )
                                    }
                                  />
                                )}
                              />
                            </div>
                            <div className="dateSection">
                              <Controller
                                control={formMethod.control}
                                name={calenderForm.enddate.name}
                                rules={calenderForm.startdate.validate}
                                defaultValue={''}
                                render={(props) => (
                                  <CalenderCustom
                                    selected={jobEndDate}
                                    onChange={(e) => {
                                      props.onChange(e)
                                      setJobEndDate(e)
                                      submitJobDate(e)
                                    }}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Date of Birth*"
                                    customInput={<CustomEndDate />}
                                    currantYear={currentYear}
                                    maxDate={
                                      new Date(
                                        currentYear +
                                        "/" +
                                        currentMonth +
                                        "/" +
                                        currentDate
                                      )
                                    }
                                    minDate={jobStartDate}
                                  />
                                )}
                              />
                            </div>
                          </div>
                        </div>
                        {jobStartDate && <CustomButton title="Clear" className="clearButton" onClick={() => {
                          setJobStartDate('')
                          setJobEndDate('');
                          if (!isJobYearly) {
                            getJobs(totalJobsYear, new Date().getMonth() + 1);
                          } else {
                            getJobs(totalJobsYear)
                          }
                        }}></CustomButton>}
                      </div>
                    )
                  }}
                </HookForm>
                {totalJobs && totalJobs.xAxis.categories.length === 0 && <div className='noDataContainer'>
                  <div className='imageContainer'><img src='https://res.cloudinary.com/zudu/image/upload/v1640847407/Pose/Pose-web/Project-files/NoData.svg' className='pieNoData' alt='No data yet' /></div>
                  <span className='noDataYet'>No Data Yet</span>
                  <span className='noGraphData'>Currently there is no enogh data to show this graph</span>
                </div>}
                <ReactHighcharts
                  config={totalJobs ? totalJobs : jobsconfig}
                ></ReactHighcharts>
              </div>
            </div>
          </div>
        </div>

        <div className="jobSection ongoingPayments">
          <div className="innerSection">
            <Label className="listingTitle" title="Latest Ongoing Jobs"></Label>
            <div className="tableSection">
              <div className="header">
                <div className="headerItems">
                  <TableHeader>
                    {headingOngoingData.map((header, i) => {
                      return (
                        <li
                          key={i}
                          data-content="Latest Support Tickets"
                          className="headingItem"
                        >
                          <div className="headerTitle">{header.title} </div>
                        </li>
                      )
                    })}
                    <div className="sortingIcon">
                      <i
                        className="icon-sort"
                        onClick={() => setShowSortDropdown(!showSortDropdown)}
                      ></i>
                      {showSortDropdown && (
                        <>
                          <div
                            className="overLay"
                            onClick={() => setShowSortDropdown(false)}
                          ></div>
                          <FilterSorting>
                            {sortingData.map((sortingData) => {
                              return (
                                <li className="headingItem">
                                  {sortingData.jobDetail}
                                </li>
                              )
                            })}
                          </FilterSorting>
                        </>
                      )}
                    </div>
                  </TableHeader>
                </div>
              </div>
              <div className="dataListing">
                {showIsNoData && <NoData title="No Record found"></NoData>}
                {onGoingJob &&
                  onGoingJob.onGoingData &&
                  onGoingJob.onGoingData.length >= 1 ? (
                  onGoingJob.onGoingData.map((ongoingJobsListing, i) => {
                    return (
                      <TableListing key={i}>
                        <li className="headingItem">
                          {ongoingJobsListing.name}
                        </li>
                        <li className="headingItem">
                          £{' '}
                          {ongoingJobsListing.totalAmount &&
                            ongoingJobsListing.totalAmount.toFixed(2)}
                        </li>
                        <li className="headingItem">
                          {ongoingJobsListing.createdby}
                        </li>
                        <li className="headingItem">
                          {moment(ongoingJobsListing.createdAt).format(
                            'DD MMM yyyy hh:mm a',
                          )}
                        </li>
                        <li className="headingItem">
                          {get(ongoingJobsListing, 'businessName', '-')}
                        </li>
                        <li className="headingItem">
                          {ongoingJobsListing.totalMilestone}
                        </li>
                        <li className="headingItem">
                          {ongoingJobsListing.CompletedMilestone}
                        </li>
                        {/* <li className="headingItem">
                          -
                        </li> */}
                      </TableListing>
                    )
                  })
                ) : (
                  <NoData title="No record found" />
                )}
              </div>
            </div>
            {onGoingJob && onGoingJob.totalJob > 3 && (
              <MoreRecord
                title={`Show All Jobs`}
                onClick={() => props.history.push('/admin/jobs')}
              ></MoreRecord>
            )}
          </div>
        </div>
        <div className="jobSection supportTickets">
          <div className="innerSection">
            <Label
              className="listingTitle"
              title="Latest Support Tickets"
            ></Label>
            <div className="tableSection">
              <div className="header">
                <div className="headerItems">
                  <TableHeader>
                    {headingSupportTicketsData.map((header, i) => {
                      return (
                        <li
                          key={i}
                          data-content="Latest Support Tickets"
                          className="headingItem"
                        >
                          <div className="headerTitle">
                            {header.title}{' '}
                            {header.key && <i className="icon-sort"></i>}
                          </div>
                        </li>
                      )
                    })}
                    <div className="sortingIcon">
                      <i
                        className="icon-sort"
                        onClick={() => setShowSortDropdown(!showSortDropdown)}
                      ></i>
                      {showSortDropdown && (
                        <>
                          <div
                            className="overLay"
                            onClick={() => setShowSortDropdown(false)}
                          ></div>
                          <FilterSorting>
                            {sortingData.map((sortingData) => {
                              return (
                                <li className="headingItem">
                                  {sortingData.jobDetail}
                                </li>
                              )
                            })}
                          </FilterSorting>
                        </>
                      )}
                    </div>
                  </TableHeader>
                </div>
              </div>
              <div className="dataListing">
                {ticket.length < 1 ? (
                  <NoData title="No ecord found"></NoData>
                ) : (
                  ticket.map((supportTicketsListing, i) => {
                    return (
                      <TableListing key={i}>
                        <li className="headingItem">
                          #{supportTicketsListing.ticketId}
                        </li>
                        <li className="headingItem">
                          {supportTicketsListing.title}
                        </li>
                        <li className="headingItem">
                          {supportTicketsListing.assignTo}
                        </li>
                        <li className="headingItem">
                          {dateFormat(
                            supportTicketsListing.createdAt,
                            'DD MMM yyyy',
                          )}
                        </li>
                        <li className="headingItem">
                          {supportTicketsListing.status ? (
                            <Status
                              className={supportTicketsListing.status.toLowerCase()}
                              title={capitalizeFirstLetter(
                                supportTicketsListing.status,
                              )}
                            ></Status>
                          ) : (
                            supportTicketsListing.disputeStatus
                          )}
                        </li>
                      </TableListing>
                    )
                  })
                )}
              </div>
            </div>
            {totalTicket > 3 && (
              <MoreRecord
                title={`Show All Tickets`}
                onClick={() => props.history.push('/admin/tickets')}
              ></MoreRecord>
            )}
          </div>
        </div>
      </div>
    </Scrollbars >
  )
}

const mapStateToProps = (state) => {
  return {
    allcounts: state.job.allCounts,
    onGoingJob: state.job.onGoingJob,
  }
}

const mapDispatchToProps = {
  getJobCount,
  getOngoingJob,
  getSupportAndTicket,
  getTotalRevenue,
  getAdminFees,
  getTotalJobs,
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdminDashboard),
)
