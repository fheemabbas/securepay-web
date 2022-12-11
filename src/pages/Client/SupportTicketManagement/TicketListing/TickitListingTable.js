import React, { useEffect, useRef, useState } from 'react';
import { withRouter, useHistory } from "react-router-dom"
import Scrollbars from "react-custom-scrollbars";
import Status from '../../../../components/Status/Status';
import NoData from '../../../../components/NoData/NoData';
import TableHeader from '../../../../components/TableHeader/TableHeader';
import TableListing from '../../../../components/TableListing/TableListing';
import useWindowDimension from "../../../../hooks/useWindowDimension";
import './TickitListingTable.scss';
import { capitalizeFirstLetter, dateFormat } from '../../../../services/helper.service';

const headerData = [
    {
        title: 'Ticket Id',
        key: 'ticketId',
    },
    {
        title: 'Subject',
        key: 'title',
    },
    {
        title: 'Created On',
        key: 'createdAt',
    },
    {
        title: 'Assigned To',
        key: 'assignTo',
    },

    {
        title: 'Status',
        key: '',
    },
]

const TicketListingTable = (props) => {
    const scrollBarForSupport_Ticket = useRef();
    const dimensions = useWindowDimension();
    const { headerHeight, titleHeight, searchHeight } = props
    const [headingListHeight, setHeadingListHeight] = useState(0);
    const history = useHistory();
    const [sort, setSort] = useState(false)
    useEffect(() => {
        setHeadingListHeight(
            document.getElementsByClassName("header")[0].offsetHeight
        );
    });
    useEffect(() => {
        setHeadingListHeight(
            document.getElementsByClassName("header")[0].offsetHeight
        );
    });
    const routeDetails = (id) => {
        window.localStorage.setItem("TicketID", id)
        let path = `tickets/details`;
        history.push(path);
    }
    // **************** sorting for Support & tickit Start  *********************
    const filterOperation = (filterby) => {
        if (sort && filterby === props.sortBy.filter) {
            props.setpage(1)
            props.setSortBy({ filter: filterby, by: "asc" });
            setSort(false);
        } else {
            props.setpage(1)
            props.setSortBy({ filter: filterby, by: "desc" });
            setSort(true);
        }
    };
    // **************** sorting for Support & tickit End  *********************
    return (
        <div className='tableSection'>
            <div className='header'>
                <div className="headingItem">
                    {/* *************  Header For Support & tickit started ******************* */}
                    <TableHeader>
                        {headerData.map((header, i) => {
                            return <li key={i} data-content="Ticket Details" className='headingItem'><div className='headerTitle'>{header.title} {header.key && <i className='icon-sort' onClick={() => filterOperation(header.key)}></i>}</div></li>
                        })
                        }
                    </TableHeader>
                    {/* *************  Header For Support & tickit End ******************* */}

                </div>
            </div>
            <div className='listing'>
                <Scrollbars className="listingScroll"
                    onScroll={(e) => {
                        const { scrollTop, scrollHeight, clientHeight } = scrollBarForSupport_Ticket.current.getValues();
                        if (Math.round(scrollTop + clientHeight) === scrollHeight) {
                            props.setpage(props.page + 1);
                        }
                    }}
                    ref={scrollBarForSupport_Ticket}
                    style={{
                        height: dimensions.height - headerHeight - titleHeight - searchHeight - headingListHeight - 15 + "px",
                    }}>
                    {props.listingdata.length < 1 &&
                        <NoData title='No record found'></NoData>
                    }
                    {/* *************  listing  started ******************* */}
                    {props.listingdata.map((listing, i) => {
                        return <TableListing key={i} onClick={() => routeDetails(listing._id)}>
                            <li className='headingItem'>
                                <p className='ticketNo'>#{listing.ticketId}</p>
                                <p className='subjectTxt'>{listing.title}</p>
                                <p className='createdOn'>{dateFormat(listing.createdAt, 'DD MMM yyyy')}</p>
                            </li>
                            <li data-content="Assigned to" className='headingItem'>{listing.assignTo}</li>
                            <li data-content="Status" className='headingItem'>{listing.status ? <Status className={listing.status.toLowerCase()} title={capitalizeFirstLetter(listing.status)}></Status> : listing.status}</li>
                        </TableListing>
                    })
                    }
                    {/* *************  listing  Ended ******************* */}
                </Scrollbars>
            </div>
        </div>
    )
}

export default withRouter(TicketListingTable)


