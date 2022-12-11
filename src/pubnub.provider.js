import React, { useState } from 'react';
import { PubNubProvider, PubNubConsumer } from 'pubnub-react';
import Notification from "react-web-notification";

import App from './App';
import { pubnub, addListener, subscribe } from "./config/pubnub";
import { showNotificationCount } from "./state/ducks/notification/operations";
import { connect } from "react-redux";


function PubnubProvider(props) {
  let [notification, setNotification] = useState({
    title: '',
    options: {}
  })

  const notificationOptions = (description) => {
    return {
      tag: Date.now(),
      body: description,
      lang: "en",
      dir: "ltr"
    }
  }

  const setNotificationEnvironment = (client) => {

    addListener(client, (message) => {
      console.log(message);

      let count = localStorage.getItem('notificationCount') ? (1 + parseInt(localStorage.getItem('notificationCount'))) : 1;
      localStorage.setItem('notificationCount', count)
      props.showNotificationCount(count)

      setNotification({
        title: message.message.title,
        options: notificationOptions(message.message.description)
      });
    })
    subscribe(client)
  };

  return (
    <div>
      <Notification
        timeout={5000}
        title={notification.title}
        options={notification.options}
      />
      <PubNubProvider client={pubnub}>
        <PubNubConsumer>
          {client => notification.title == '' && setNotificationEnvironment(client)}
        </PubNubConsumer>

        <App />
      </PubNubProvider >
    </div>
  );
}

const mapStateToProps = (state) => {
  return {}
};

const mapDispatchToProps = {
  showNotificationCount
};

export default connect(mapStateToProps, mapDispatchToProps)(PubnubProvider);
