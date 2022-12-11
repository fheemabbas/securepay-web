import React, { useEffect, useState } from 'react';
import { withRouter } from "react-router-dom"
import Label from '../../../../components/UI/Label/Label';
import ModalPopup from '../../../../components/ModalPopup/ModalPopup';
import SearchBox from '../../../../components/UI/SearchBox/SearchBox';
import CustomButton from '../../../../components/UI/CustomButton/CustomButton';
import FilterForm from '../Form/FilterForm';
import RaiseTicketForm from '../Form/RaiseTicketForm';
import './TicketListing.scss';
import { isCheckValueAndSetParams } from '../../PaymentManagement/PaymentListing/PaymentListing';
import { getSupportAndTicket } from '../../../../state/ducks/Job/actions';
import { connect } from 'react-redux';
import TickitListingTable from './TickitListingTable';
import { dateFormat } from '../../../../services/helper.service';

const TicketListing = (props) => {
  const [headerHeight, setHeaderHeight] = useState(0);
  const [titleHeight, setTitleHeight] = useState(0);
  const [searchHeight, setSearchHeight] = useState(0);
  // const [headingListHeight, setHeadingListHeight] = useState(0);
  let [showTicketModal, setShowTicketModal] = useState(false)
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
  const [IsapiCall, setIsapiCall] = useState(false)
  useEffect(() => {
    setHeaderHeight(
      document.getElementsByClassName("headerClient")[0].offsetHeight
    );
    setTitleHeight(
      document.getElementsByClassName("titleText")[0].offsetHeight
    );
    setSearchHeight(
      document.getElementsByClassName("searchFilter")[0].offsetHeight
    );
    // setHeadingListHeight(
    //   document.getElementsByClassName("header")[0].offsetHeight
    // );
  });
  // ******* Get Support Tickit for User started *************
  const getTickitListing = () => {
    let link
    if (sortBy && sortBy.by === "asc") {
      link = `support/ticket?page=${page}&limit=${10}${isCheckValueAndSetParams('&startDate=', dateFormat(startDate, 'yyyy-MM-DD'))}${isCheckValueAndSetParams('&endDate=', dateFormat(endDate, 'yyyy-MM-DD'))}${isCheckValueAndSetParams('&status=', tickitStatus)}&sortBy=${sortBy.filter}:${sortBy.by}${isCheckValueAndSetParams('&search=', tickitSearch)}`
    } else if (sortBy && sortBy.by === "desc") {
      link = `support/ticket?page=${page}&limit=${10}${isCheckValueAndSetParams('&startDate=', dateFormat(startDate, 'yyyy-MM-DD'))}${isCheckValueAndSetParams('&endDate=', dateFormat(endDate, 'yyyy-MM-DD'))}${isCheckValueAndSetParams('&status=', tickitStatus)}&sortBy=${sortBy.filter}:${sortBy.by}${isCheckValueAndSetParams('&search=', tickitSearch)}`
    } else {
      link = `support/ticket?page=${page}&limit=${10}${isCheckValueAndSetParams('&startDate=', dateFormat(startDate, 'yyyy-MM-DD'))}${isCheckValueAndSetParams('&endDate=', dateFormat(endDate, 'yyyy-MM-DD'))}${isCheckValueAndSetParams('&status=', tickitStatus)}${isCheckValueAndSetParams('&search=', tickitSearch)}`
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
  // ******* Get Support Tickit for user ended *************
  useEffect(() => {
    getTickitListing()
  }, [isTickitfilter, tickitSearch, page, sortBy, IsapiCall])
  return (
    <div className='supportTicketMain'>
      <div className='supportTicketInner'>
        <Label title='Support and Ticket Management'></Label>
        <Label
          className='form-title'
          title="If you would like to raise an issue or ask a question raise a support ticket here. We will get back to you as soon as we return to the office. In the meantime check out our FAQ's, you might find the answer there. "
        />
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
                    IsapiCall={IsapiCall}
                    setIsapiCall={(flag) => setIsapiCall(flag)}
                    setpage={(page) => setPage(page)}
                  ></FilterForm>
                </>
              }
              {/* *************  Filter Support & Tickit end  **************** */}
            </div>
          </div>
          <div className='ticketRaise'>
            <CustomButton type="submit" title="Get Support" onClick={() => setShowTicketModal(!showTicketModal)} />
          </div>
        </div>
        {/* *************  List of  Support & Tickit Started  **************** */}
        <TickitListingTable
          type="user"
          setpage={(page) => setPage(page)}
          page={page}
          setSortBy={(i) => setSortBy(i)}
          sortBy={sortBy}
          headerHeight={headerHeight}
          titleHeight={titleHeight}
          searchHeight={searchHeight}
          listingdata={tickitlistingData} />
        {/* *************  List of  Support & Tickit end  **************** */}

      </div>
      {/* *************  Raised  Support & Tickit Model Started  **************** */}

      <ModalPopup
        showModal={showTicketModal}
        onHide={() => setShowTicketModal(false)}
        className='raiseTicket'
        closeIcon={true}
      >
        <RaiseTicketForm onHide={() => {
          setShowTicketModal(false)
          getTickitListing()
        }}></RaiseTicketForm>
      </ModalPopup>
      {/* *************  Raised  Support & Tickit end  **************** */}
    </div>
  )
}
const mapStateToProps = (state) => {
  return {}
};
const mapDispatchToProps = {
  getSupportAndTicket
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TicketListing));


