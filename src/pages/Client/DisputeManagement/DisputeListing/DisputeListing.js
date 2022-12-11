import React, { useState } from 'react';
import { connect } from "react-redux";
import Scrollbars from "react-custom-scrollbars";
import { withRouter, useHistory } from "react-router-dom"

import Label from '../../../../components/UI/Label/Label';
import Status from '../../../../components/Status/Status';
import NoData from '../../../../components/NoData/NoData';
import SearchBox from '../../../../components/UI/SearchBox/SearchBox';
import TableHeader from '../../../../components/TableHeader/TableHeader';
import TableListing from '../../../../components/TableListing/TableListing';

import { showToast } from "../../../../state/ducks/utils/operations";

import FilterForm from '../Form/FilterForm';
import FilterSorting from '../Form/FilterSorting';

import './DisputeListing.scss';
// import FilterSorting from '../Form/FilterSorting';

const headerData = [
  {
    title: 'Job Title',
    key: 'job-tile',
  },
  {
    title: 'Job Amount',
    key: 'job-amount',
  },
  {
    title: 'Admin Fees',
    key: 'admin-fees',
  },
  {
    title: 'Staff Member',
    key: 'staff-member',
  },
  {
    title: 'Disputed by',
    key: 'disputed-by',
  },
  {
    title: 'Disputed Milestone',
    key: '',
  },
  {
    title: 'Milestone Amount',
    key: '',
  },
  {
    title: 'Dispute Status',
    key: 'dispute-status',
  },
]
const listing = [
  {
    jobTitle: 'Amet minim mollit akdjn amoud Amet minim mollit akdjn amoud... ',
    amount: '£3670',
    fees: '£670',
    StaffMember: 'Leslie Alexander',
    disputeBy: 'Eleanor Pena',
    disputeMilestone: 'Amet minim mollit non deserunt',
    milestoneAmount: '£ 1500',
    status: 'Ongoing Dispute',
    statusFlag: 'Ongoing',
  },
  {
    jobTitle: 'Amet minim mollit akdjn amoud... ',
    amount: '£3670',
    fees: '£670',
    StaffMember: 'Annette Black',
    disputeBy: 'Leslie Alexander',
    disputeMilestone: 'Amet minim mollit non deserunt ullamco',
    milestoneAmount: '£ 680',
    status: 'Dispute Started',
    statusFlag: 'cancel',
  },
  {
    jobTitle: 'Amet minim mollit akdjn amoud... ',
    amount: '£3670',
    fees: '£670',
    StaffMember: 'Jenny Wilson',
    disputeBy: 'Esther Howard',
    disputeMilestone: 'Amet minim mollit non deserunt ullamco est',
    milestoneAmount: '£ 690',
    status: 'Dispute Resolved',
    statusFlag: 'complete',
  },
  {
    jobTitle: 'Amet minim mollit akdjn amoud... ',
    amount: '£3670',
    fees: '£670',
    StaffMember: 'Courtney Henry',
    disputeBy: 'Courtney Henry',
    disputeMilestone: 'Amet minim mollit non deserunt ullamco est',
    milestoneAmount: '£ 250',
    status: 'Arbitration Suggested',
    statusFlag: 'suggested',
  },
  {
    jobTitle: 'Amet minim mollit akdjn amoud... ',
    amount: '£3670',
    fees: '£670',
    StaffMember: 'Floyd Miles',
    disputeBy: 'Robert Fox',
    disputeMilestone: 'Amet minim mollit non',
    milestoneAmount: '£ 440',
    status: 'Arbitration Suggested',
    statusFlag: 'suggested',
  },
  {
    jobTitle: 'Amet minim mollit akdjn amoud... ',
    amount: '£3670',
    fees: '£670',
    StaffMember: 'Eleanor Pena',
    disputeBy: 'Jacob Jones',
    disputeMilestone: 'Amet minim mollit non deserunt ',
    milestoneAmount: '£ 605',
    status: 'Dispute Started',
    statusFlag: 'cancel',
  },
  {
    jobTitle: 'Amet minim mollit akdjn amoud... ',
    amount: '£3670',
    fees: '£670',
    StaffMember: 'Ronald Richards',
    disputeBy: 'Kathryn Murphy',
    disputeMilestone: 'Amet minim mollit ',
    milestoneAmount: '£ 150',
    status: 'Dispute Resolved',
    statusFlag: 'complete',
  },
  {
    jobTitle: 'Amet minim mollit akdjn amoud... ',
    amount: '£3670',
    fees: '£670',
    StaffMember: 'Kathryn Murphy',
    disputeBy: 'Albert Flores',
    disputeMilestone: 'Amet minim mollit non deserunt ullamco ',
    milestoneAmount: '£ 780',
    status: 'Dispute Resolved',
    statusFlag: 'complete',
  },
  {
    jobTitle: 'Amet minim mollit akdjn amoud... ',
    amount: '£3670',
    fees: '£670',
    StaffMember: 'Darlene Robertson',
    disputeBy: 'Kristin Watson',
    disputeMilestone: 'Amet minim mollit non deserunt ',
    milestoneAmount: '£ 780',
    status: 'Dispute Started',
    statusFlag: 'cancel'
  },
  {
    jobTitle: 'Amet minim mollit akdjn amoud... ',
    amount: '£3670',
    fees: '£670',
    StaffMember: 'Albert Flores',
    disputeBy: 'Annette Black',
    disputeMilestone: 'Amet minim mollit non deserunt ullamco ',
    milestoneAmount: '£ 700',
    status: 'Dispute Resolved',
    statusFlag: 'complete',
  },
];


const DisputeListing = (props) => {

  let [showFilterDropdown, setShowFilterDropdown] = useState(false)
  let [showFilterSorting, setShowFilterSorting] = useState(false)
  let [showIsNoData, setShowIsNoData] = useState(false)
  const history = useHistory();

  // page redirect //
  // const routeChange = () => {
  //   let path = `createjob`;
  //   history.push(path);
  // }
  const routeDetails = () => {
    let path = `disputes/details`;
    history.push(path);
  }
  return (

    <div className='disputeListingMain'>
      <Label title='Dispute Management'></Label>
      <div className='searchFilter'>
        <div className='searchSection'>
          <SearchBox placeholder='Job Title , Customer Details'></SearchBox>
          <div className='filterBtn'>
            <button className='filterIcon' onClick={() => setShowFilterDropdown(!showFilterDropdown)}>
              <i className='icon-filter'></i>
            </button>
            {showFilterDropdown &&
              <>
                <div className='overLay' onClick={() => setShowFilterDropdown(false)} ></div>
                <FilterForm ></FilterForm>
              </>
            }
          </div>
          <div className='filterBtn filterSorting'>
            <button className='filterIcon' onClick={() => setShowFilterSorting(!showFilterSorting)}>
              <i className='icon-sort'></i>
            </button>
            {showFilterSorting &&
              <>
                <div className='overLay' onClick={() => setShowFilterSorting(false)} ></div>
                <FilterSorting></FilterSorting>
              </>
            }
          </div>
        </div>

      </div>
      <div className='tableSection'>
        <div className='header'>
          <div className="headerItem">
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
          <Scrollbars className="listingScroll">
            {showIsNoData &&
              <NoData title='No Record found'></NoData>
            }
            {
              listing.map((listing) => {
                return <TableListing onClick={routeDetails}>
                  <li className="headingItem">
                    <div className='column'>{listing.jobTitle}</div>
                    <div className='column'>{listing.amount}</div>
                    <div className='column'>{listing.fees}</div>
                  </li>
                  <li className='headingItem'>{listing.StaffMember}</li>
                  <li className='headingItem'>{listing.disputeBy}</li>
                  <li className="headingItem">
                    <div className='twoCulomn'>{listing.disputeMilestone}</div>
                    <div className='twoCulomn'>{listing.milestoneAmount}</div>
                  </li>
                  <li className='headingItem'>{listing.statusFlag ? <Status className={listing.statusFlag} title={listing.status}></Status> : listing.status}</li>
                </TableListing>
              })
            }
          </Scrollbars>
        </div>

      </div>
    </div>

  )
}

const mapStateToProps = (state) => {
  return {}
};

const mapDispatchToProps = {
  showToast
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DisputeListing));


