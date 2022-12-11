import React, { useEffect, useState } from 'react'
import './Notification.scss'
import { Scrollbars } from 'react-custom-scrollbars'
import SearchBox from '../SearchBox/SearchBox'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import useWindowDimension from '../../../hooks/useWindowDimension'
import { getNotificationList } from '../../../state/ducks/notification/actions'
import moment from 'moment'
import { isCheckValueAndSetParams } from '../../../services/helper.service'

const Notification = (props) => {
  // let [filters, setFilters] = useState(initFilters)
  // let { notifications, filterParams } = props
  const dimensions = useWindowDimension()
  const [headerHeight, setHeaderHeight] = useState(0)
  const [headerBarHeight, setHeaderBarHeight] = useState(0)
  const [searchHeight, setSearchHeight] = useState(0)
  const [listing, setListing] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (document.getElementsByClassName('headerClient')[0]) {
      setHeaderHeight(
        document.getElementsByClassName('headerClient')[0].offsetHeight,
      )
    } else {
      setHeaderHeight(
        document.getElementsByClassName('headerAdmin')[0].offsetHeight,
      )
    }

    setHeaderBarHeight(
      document.getElementsByClassName('headerBar')[0].offsetHeight,
    )
    setSearchHeight(
      document.getElementsByClassName('actionHeader')[0].offsetHeight,
    )
  }, [])

  useEffect(() => {
    getNotificationList()
  }, [search, props.notificationCount])
  const getNotificationList = () => {
    let actions = `notification?${isCheckValueAndSetParams('&search=', search)}`

    props.getNotificationList(actions).then((response) => {
      setListing(response.payload)
    })
  }
  const onSearch = (value) => {
    setSearch(value)
    // getNotificationList()
  }
  return (
    <div className="NotificationPageMain">
      <div className="NotificationInner">
        <div className="actionHeader">
          <SearchBox
            placeholder="Notification Title"
            onSearch={(value) => onSearch(value)}
          />
        </div>
        <Scrollbars
          className="descriptionContent"
          style={{
            height:
              dimensions.height -
              headerHeight -
              headerBarHeight -
              searchHeight -
              15 +
              'px',
          }}
        >
          <div className="FrameContent">
            <ul>
              {listing.length > 0 &&
                listing.map((listing, i) => {
                  return (
                    <li key={i}>
                      <div className="innerBox">
                        <div className="title">{listing.title}</div>
                        <div className="txt">{listing.description}</div>
                        <div className="dateTime">
                          {moment(listing.createdAt).format(
                            'Do MMMM  YYYY, h:mm a',
                          )}
                        </div>
                      </div>
                    </li>
                  )
                })}
            </ul>
          </div>
        </Scrollbars>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notificationCount: state.notification?.total,
  }
}

const mapDispatchToProps = {
  getNotificationList,
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Notification),
)
