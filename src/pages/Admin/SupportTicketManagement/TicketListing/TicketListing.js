import React, { useState, useEffect, useRef } from 'react';
import { connect } from "react-redux";
import Scrollbars from 'react-custom-scrollbars';
import { withRouter, useHistory } from 'react-router-dom';
import FilterForm from '../Form/FilterForm';
import Label from '../../../../components/UI/Label/Label';
import { showToast } from "../../../../state/ducks/utils/operations";
import useWindowDimension from "../../../../hooks/useWindowDimension";
import SearchBox from '../../../../components/UI/SearchBox/SearchBox';
import Status from '../../../../components/Status/Status';
import './TicketListing.scss';
import { capitalizeFirstLetter, dateFormat, isCheckValueAndSetParams } from '../../../../services/helper.service';
import { getStaffMember, getSupportAndTicket } from '../../../../state/ducks/Job/actions';
import NoData from '../../../../components/NoData/NoData';
import { getIterator } from 'core-js';
import { getItem } from '../../../../services/localstorage.service';
function AdminTicketListing(props) {
  const userRole = getItem('loginRole')
  const user = getItem('user')

  const scrollBarForSupport_Ticket = useRef()
  const dimensions = useWindowDimension()
  const [headerHeight, setHeaderHeight] = useState(0)
  const [titleHeight, setTitleHeight] = useState(0)
  const [searchHeight, setSearchHeight] = useState(0)
  const [tableHeadingHeight, setTableHeadingHeight] = useState(0)
  let [showFilterDropdown, setShowFilterDropdown] = useState(false)
  const [tickitSearch, setTickitSearch] = useState("")
  const [sortBy, setSortBy] = useState()
  const [page, setPage] = useState(1)
  const [isTickitfilter, setisTickitfilter] = useState(false)
  const [timer, setTimer] = useState()
  const [tickitlistingData, setTickitlistingData] = useState([])
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [tickitStatus, setTickitStatus] = useState("")
  const [sort, setSort] = useState(false)
  const [IsapiCall, setIsapiCall] = useState(false)
  const [staffMember, setStaffMember] = React.useState([])
  const [selectedStaffMember, setSelectedStaffMember] = React.useState(userRole === 1 ? '' : user._id)
  useEffect(() => {
    setHeaderHeight(document.getElementsByClassName('headerAdmin')[0].offsetHeight);
    setTitleHeight(document.getElementsByClassName('titleText')[0].offsetHeight);
    setSearchHeight(document.getElementsByClassName('searchFilter')[0].offsetHeight);
    setTableHeadingHeight(document.getElementsByClassName('Table-header')[0].offsetHeight);

  })
  useEffect(() => {
    GetStaffMember()
  }, [])
  const GetStaffMember = () => {

    props.getStaffMember(`admin/getList`).then((response) => {
      let res = response.data || response
      // setStaffMember(res.payload)
      // res.payload.map((member) => {
      //     retuen { value: `${member.firstName} ${member.lastName}`, id: member._id }
      // })
      var result = res.payload.map(member => ({ value: `${member.firstName} ${member.lastName}`, id: member._id }));
      setStaffMember(result)
    }
    )
  }
  const history = useHistory();
  // const routeChange = () => {
  //   let path = `jobs/create`;
  //   history.push(path);
  // }
  const routeDetails = (id) => {
    window.localStorage.setItem("TicketID", id)
    let path = `tickets/details`;
    history.push(path);
  }
  // ******* Get Support Tickit for Admin started *************
  const getTickitListing = () => {

    let link
    if (sortBy && sortBy.by === "asc") {
      link = `support/ticket?page=${page}&limit=${10}${isCheckValueAndSetParams('&startDate=', dateFormat(startDate, 'yyyy-MM-DD'))}${isCheckValueAndSetParams('&endDate=', dateFormat(endDate, 'yyyy-MM-DD'))}${isCheckValueAndSetParams('&status=', tickitStatus)}&sortBy=${sortBy.filter}:${sortBy.by}${isCheckValueAndSetParams('&search=', tickitSearch)}${isCheckValueAndSetParams('&staff=', selectedStaffMember)}`
    } else if (sortBy && sortBy.by === "desc") {
      link = `support/ticket?page=${page}&limit=${10}${isCheckValueAndSetParams('&startDate=', dateFormat(startDate, 'yyyy-MM-DD'))}${isCheckValueAndSetParams('&endDate=', dateFormat(endDate, 'yyyy-MM-DD'))}${isCheckValueAndSetParams('&status=', tickitStatus)}&sortBy=${sortBy.filter}:${sortBy.by}${isCheckValueAndSetParams('&search=', tickitSearch)}${isCheckValueAndSetParams('&staff=', selectedStaffMember)}`
    } else {
      link = `support/ticket?page=${page}&limit=${11}${isCheckValueAndSetParams('&startDate=', dateFormat(startDate, 'yyyy-MM-DD'))}${isCheckValueAndSetParams('&endDate=', dateFormat(endDate, 'yyyy-MM-DD'))}${isCheckValueAndSetParams('&status=', tickitStatus)}${isCheckValueAndSetParams('&search=', tickitSearch)}${isCheckValueAndSetParams('&staff=', selectedStaffMember)}`
    }
    props.getSupportAndTicket(link).then((response) => {
      let res = response.data || response
      if (page === 1 && tickitSearch !== "") {
        setTickitlistingData(res.payload.ticketData)
      } else if (page === 1 && isTickitfilter) {
        setTickitlistingData(res.payload.ticketData)
      } else if (page === 1 && sortBy) {
        setTickitlistingData(res.payload.ticketData)
      } else {
        if (page === 1) {
          setTickitlistingData(res.payload.ticketData)
        } else {
          setTickitlistingData(tickitlistingData.concat(res.payload.ticketData))
        }
      }
    })
  }
  // ******* Get Support Tickit for Admin end *************
  const filterOperation = (filterby) => {
    if (sort && filterby === sortBy.filter) {
      setPage(1)
      setSortBy({ filter: filterby, by: "asc" });
      setSort(false);
    } else {
      setPage(1)
      setSortBy({ filter: filterby, by: "desc" });
      setSort(true);
    }
  };
  useEffect(() => {
    getTickitListing()
  }, [isTickitfilter, IsapiCall, tickitSearch, sortBy, page])
  return (
    <div style={{ height: (dimensions.height - headerHeight) + 'px', marginTop: (headerHeight + 'px') }}>
      <div className='admin_ticket_main'>
        <div className='jobInnerSection'>
          <Label title='Support & Ticket Management'></Label>
          <div className='searchFilter'>
            <div className='searchSection'>
              {/* *************  Search Support & Tickit Started  **************** */}
              <SearchBox placeholder='Ticket Id, Subject, Users Name'
                onClear={() => {
                  setPage(1)
                  setTickitSearch("")
                }}
                onSearch={(value) => {
                  clearTimeout(timer);
                  let temp = setTimeout(function () {
                    setTickitSearch(value)
                    setPage(1)
                  }, 500);
                  setTimer(temp)
                }}
              ></SearchBox>
              {/* *************  Search Support & Tickit end  **************** */}
              <div className='filterBtn'>
                <button className='filterIcon' onClick={() => setShowFilterDropdown(!showFilterDropdown)}>
                  <i className='icon-filter'></i>
                  {isTickitfilter && <span className="dot_filter"></span>}
                </button>
                {/* *************  Filter Support & Tickit Started  **************** */}
                {showFilterDropdown &&
                  <>
                    <div className='overLay' onClick={() => setShowFilterDropdown(false)} ></div>
                    <FilterForm
                      startDate={startDate}
                      endDate={endDate}
                      setStartDate={(date) => { setStartDate(date) }}
                      setEndDate={(date) => { setEndDate(date) }}
                      isfilter={(flag) => { setisTickitfilter(flag) }}
                      setShowFilterDropdown={(flag) => { setShowFilterDropdown(flag) }}
                      setTickitStatus={(status) => { setTickitStatus(status) }}
                      status={tickitStatus}
                      setpage={(page) => setPage(page)}
                      setIsapiCall={(flag) => setIsapiCall(flag)}
                      IsapiCall={IsapiCall}
                      staffMembers={staffMember}
                      userRole={userRole}
                      setSelectedStaffMember={(id) => setSelectedStaffMember(id)}
                      selectedStaffMember={selectedStaffMember}
                    ></FilterForm>
                  </>
                }
                {/* *************  Filter Support & Tickit End  **************** */}
              </div>
            </div>
          </div>
          <div className="table_list_Main">
            <div className="Table-row Table-header">
              <div className="table-row-inline">
                <div className="Table-row-item">Ticket Id <button className="icon-sort" onClick={() => filterOperation('ticketId')}></button></div>
                <div className="Table-row-item">Subject <button className="icon-sort" onClick={() => filterOperation('title')}></button></div>
                <div className="Table-row-item">Assigned To <button className="icon-sort" onClick={() => filterOperation('assignTo')}></button></div>
                <div className="Table-row-item">Created By <button className="icon-sort" onClick={() => filterOperation('createdBy')}></button></div>
                <div className="Table-row-item">Created On <button className="icon-sort" onClick={() => filterOperation('createdAt')}></button></div>
                <div className="Table-row-item">Status</div>
              </div>
            </div>
            <Scrollbars
              onScroll={(e) => {
                const { scrollTop, scrollHeight, clientHeight } = scrollBarForSupport_Ticket.current.getValues();
                if (Math.round(scrollTop + clientHeight) === scrollHeight) {
                  setPage(page + 1);
                }
              }}
              ref={scrollBarForSupport_Ticket}
              style={{ height: (dimensions.height - headerHeight - titleHeight - searchHeight - tableHeadingHeight - 15) + 'px' }}>
              {tickitlistingData.length < 1 &&
                <NoData title='No record found'></NoData>
              }
              {
                tickitlistingData.map((listing, i) => {
                  return (
                    <div className="Table-row" key={i}>
                      <div className="table-row-inline cursurpointer" onClick={() => routeDetails(listing._id)}>
                        <div className="Table-row-item" data-header="Header1">#{listing.ticketId}</div>
                        <div className="Table-row-item" data-header="Header2">{listing.title}</div>
                        <div className="Table-row-item" data-header="Header3">{listing.assignTo}</div>
                        <div className="Table-row-item" data-header="Header4">{listing.createdBy}</div>
                        <div className="Table-row-item" data-header="Header3">{dateFormat(listing.createdAt, 'DD MMM yyyy')}</div>
                        <div className="Table-row-item" data-header="Header4">{listing.status ? <Status className={listing.status.toLowerCase()} title={capitalizeFirstLetter(listing.status)}></Status> : listing.status}</div>
                      </div>
                    </div>
                  )
                })
              }
            </Scrollbars>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {}
};
const mapDispatchToProps = {
  showToast, getSupportAndTicket, getStaffMember
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminTicketListing));
