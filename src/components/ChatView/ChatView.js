import React, { useState, Component } from 'react';
import './ChatView.scss';
import classNames from 'classnames';
import FaChevronDown from 'react-icons/lib/fa/chevron-down';
import { MessageBox } from 'react-chat-elements';
import { Input } from 'react-chat-elements';
import { Button } from 'react-chat-elements';
// import { MessageList } from 'react-chat-elements'
import StorageService from "../../services/localstorage.service";

import Scrollbars from 'react-custom-scrollbars'; export class ChatView extends Component {
  scrollbars = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      scrollBottom: 0,
      setShowText: false,
      showText: false,
      downButton: false,
      message: '',
      inputRef: '',
      mounted: false,
      inputBoxheight: 100,
    };
  }

  setShowText = (show) => {
    this.setState({
      showText: !this.state.showText
    })
  }
  onKeyDown = (e) => {
    if (!e.shiftKey && e.keyCode === 13) {
      if (e.keyCode === 13) {
        this.onSendMessage()
        e.preventDefault()
      }
    } else {
      // e.preventDefault()
    }
  };
  onSendMessage = () => {
    if (this.state.message) {
      this.props.onClickSend(this.state.message);
      this.state.inputRef.clear();
      this.setState({ message: '' })
    }
  }
  componentDidMount() {
    this.setState({ mounted: true });
  }

  componentDidUpdate() {
    this.state.mounted && this.scrollbars.current.scrollToBottom();
  }
  user = StorageService.getItem("user")
  render() {
    const { showText } = this.state
    return (
      <div className="chatbox">
        <Scrollbars ref={this.scrollbars} style={{ height: this.user.role === 1 ? (this.props.chatViewHeight + 20) + 'px' : (this.props.chatViewHeight - 130 + 20) + 'px' }}>
          <div className={classNames(['rce-container-mlist-q', this.props.className])}>

            <div
              ref={this.loadRef}
              // onScroll={this.onScroll}
              className='rce-mlist-q'>
              {
                this.props.dataSource.map((x, i) => (
                  <MessageBox
                    position={x.position}
                    type={x.type}
                    title={x.title}
                    text={x.text}
                    date={new Date(x.date)}
                  />
                ))
              }
            </div>
            {
              this.props.downButton === true &&
              true &&
              this.props.toBottomHeight !== '100%' &&
              <div
                className='rce-mlist-down-button'
                onClick={this.toBottom.bind(this)}>
                <FaChevronDown />
                {
                  this.props.downButtonBadge &&
                  <span
                    className='rce-mlist-down-button--badge'>
                    {this.props.downButtonBadge}
                  </span>
                }
              </div>
            }
          </div>
        </Scrollbars>
        {this.user.role !== 1 && < Input

          // leftButtons={
          //   <span className="icon-attachment" onClick={() => this.setShowText()}></span>
          // }
          placeholder="Message goes here.."
          multiline={true}
          ref={(el) => {
            if (el) {
              this.state.inputRef = el;
            }
            // setTimeout(() => {
            //   this.setState({ inputRef: el })
            // }, 1000)
          }}
          value={this.state.message}
          onKeyDown={(e) => this.onKeyDown(e)}
          defaultValue={this.state.message}
          onChange={(e) => {
            const message = e.target.value.trimStart();
            this.setState({ message })
          }}
          rightButtons={
            <Button type="button"
              onClick={() => {
                this.onSendMessage();
                // this.refs.input.clear();
              }}
              className="send-btn"
              text='Send'
              disabled={!this.state.message}
            />
          }
        />}
      </div >
    );
    // }
  }
}
ChatView.defaultProps = {
  onClick: null,
  onTitleClick: null,
  onForwardClick: null,
  onDownButtonClick: null,
  onOpen: null,
  onPhotoError: null,
  onDownload: null,
  dataSource: [],
  lockable: false,
  toBottomHeight: 300,
  downButton: true,
  downButtonBadge: null,

  position: 'left',
  type: 'text',
  text: '',
  title: null,
  titleColor: null,
  onTitleClick: null,
  onForwardClick: null,
  date: new Date(),
  data: {},
  onLoad: null,
  forwarded: false,
  status: null,
  dateString: null,
  notch: true,
  avatar: null,
  renderAddCmp: null,
  copiableDate: false,
  onContextMenu: null,
  focus: false,
  onMessageFocused: null,

  target: '_blank',
  apiKey: '',
  zoom: 14,
  markerColor: 'red',
  onError: () => void (0),

  uri: '',
  theme: 'black',
  view: 'list',
  width: 300,
  height: 380,
};
export default ChatView;


