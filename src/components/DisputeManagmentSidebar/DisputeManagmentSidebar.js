import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { withRouter, useHistory } from "react-router-dom"
// import { hideLoader, showLoader, showToast } from "../../../../state/ducks/utils/operations";
import ChatView from '../ChatView/ChatView';
import CustomSideBar from './../CustomSideBar/CustomSideBar';
import StorageService from "../../services/localstorage.service";
import "./DisputeManagmentSidebar.scss"
import { getMessages, publishMessage, pubnub } from '../../config/pubnub';
import useWindowDimension from "../../hooks/useWindowDimension";
const DisputeManagmentSidebar = (props) => {
    const history = useHistory();
    let currentUser = StorageService.getItem("user")
    const dimensions = useWindowDimension()
    const [chatViewHeight, setchatViewHeight] = useState()
    const [message, setMessage] = useState([])
    // let spaceId = "613f2e95f2302c1868961c6c"
    useEffect(() => {
        setchatViewHeight(dimensions.height - document.getElementsByClassName('messageChatView')[0].offsetHeight)
        // setHeaderHeight(document.getElementsByClassName('managementStstem')[0].offsetHeight);
    })
    const { showDisputeSystemSidebar, setShowDisputeSystemSidebar, jobTitle, disputeStatus, milestoneAmount, customerName, clientName, yatapayStaffName } = props
    useEffect(() => {
        let channels = [props.spaceId];
        pubnub.subscribe({ channels });
        return () => {
            let channels = [props.spaceId];
            pubnub.unsubscribe({
                channels
            });
        };
    }, [props.spaceId])


    useEffect(() => {
        pubnub.addListener({
            message: messageEvent => {
                let obj = {
                    position: messageEvent.message.sender === currentUser.id ? 'right' : 'left',
                    title: messageEvent.message.senderName,
                    text: messageEvent.message.text,
                    date: messageEvent.message.date,
                    type: 'text',
                }
                setMessage(pre => [...pre, obj])

            },
        });

    }, [])
    const getPreviousMessages = async (id) => {
        await getMessages(id, (result) => {
            let arr = [];
            if (result) {
                result.map((value) => {
                    arr.push({
                        position: value.message.sender === currentUser.id ? 'right' : 'left',
                        title: value.message.senderName,
                        text: value.message.text,
                        date: value.message.date,
                        type: 'text',
                    })
                });
                setMessage(arr)
            }
        });
    }
    const onClickSend = async (value) => {
        publishMessage(props.spaceId, { text: value, sender: currentUser._id, date: new Date(), senderName: currentUser.firstName, type: 'text' });
    }
    useEffect(() => {
        getPreviousMessages(props.spaceId)
    }, [props.spaceId])
    const removeDuplicates = (data, key) => {
        return [
            ...new Map(data.map(item => [key(item), item])).values()
        ]
    };
    return (
        <CustomSideBar
            showSidebar={showDisputeSystemSidebar}
            onHide={() => setShowDisputeSystemSidebar(false)}
        >
            <div className="managementStstem">
                <div className="disputeTitle">Query Management System</div>
                <ul>
                    <li>
                        <div className="ListTitle">Transaction Title</div>
                        <div className="ListTxt">{jobTitle ?? "-"}</div>
                    </li>
                    <li>
                        <div className="ListTitle">Query Status</div>
                        <div className="ListTxt">{disputeStatus ?? '-'}</div>
                    </li>
                    <li>
                        <div className="ListTitle">Interim Amount</div>
                        <div className="ListTxt">£{milestoneAmount ?? '-'}</div>
                    </li>
                    <li>
                        <div className="ListTitle">Customer Name</div>
                        <div className="ListTxt">{customerName ?? '-'}</div>
                    </li>
                    <li>
                        <div className="ListTitle">Yatapay Staff Name</div>
                        <div className="ListTxt">{yatapayStaffName ?? '-'}</div>
                    </li>
                    <li>
                        <div className="ListTitle">Client Name</div>
                        <div className="ListTxt">{clientName ?? '-'}</div>
                    </li>
                </ul>
            </div>
            <div className="messageChatView">

                <div className="ChatContent">
                    <ChatView
                        className='message-list'
                        lockable={true}
                        toBottomHeight={'100%'}
                        onClickSend={(value) => onClickSend(value)}
                        dataSource={message}
                        // dataSource={removeDuplicates(message, item => item.date)}
                        chatViewHeight={chatViewHeight}
                    />
                </div>
            </div>
        </CustomSideBar>

    )
}
const mapStateToProps = (state) => {
    return {

    }
};
const mapDispatchToProps = {
    // showToast, showLoader, hideLoader
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DisputeManagmentSidebar));


