import PubNub from 'pubnub';
import StorageService from "../services/localstorage.service";
const uuid = PubNub.generateUUID();

// export const pubnub = new PubNub({
//     publishKey: 'pub-c-b8b511cf-8584-44b9-9da3-386998af5b67',
//     subscribeKey: 'sub-c-59047088-0a08-11eb-b57f-02bb4b88d936',
//     uuid: uuid
// });
export const pubnub = new PubNub({
    publishKey: process.env.REACT_APP_PUBNUB_PUBLISH_KEY,
    subscribeKey: process.env.REACT_APP_PUBNUB_SUBSCRIBE_KEY,
    uuid: uuid
});
export const addListener = async (client, callback) => {
    client && client.addListener({
        message: messageEvent => {
            callback && callback(messageEvent)
        },
    });
}

export const subscribe = (client) => {
    let user = StorageService.getItem("user")
    if (user) {
        let channel = user.id
        client.unsubscribe({
            channels: []
        });
        client && client.subscribe({ channels: [channel] });
    }
}

export const createPubnubSpace = (spaceId, callback) => {
    pubnub.createSpace(
        {
            id: spaceId,
            name: "dispute"
        }, (status, response) => {
            if (status.error) {
                if (status.error.Data.status === 409) {
                    /* chat instance already created in pubnub */
                    callback && callback({ id: spaceId })
                    return
                }
                return
            }
            if (response) {
                callback && callback(response.data)
            }
        }
    );
}
export const getPubnubSpace = (spaceId, callback) => {
    pubnub.getSpace(
        {
            spaceId: spaceId
        },
        function (status, response) {
            if (status.error) {
                return
            }
            if (response) {
                callback && callback(response.data)
            }
        })
}


export const getMessages = (spaceId, callback) => {
    pubnub.fetchMessages(
        {
            channels: [spaceId],
            count: 25
        }, (status, response) => {
            if (status.error) {
                callback && callback([])
                return
            }
            callback && callback(response.channels[spaceId])
        })
}

export const addMemberToSpace = (usersArr, spaceId, callback) => {
    let response = { status: true }
    usersArr.forEach((user, index) => {
        createPubnubUser(spaceId, user, (res) => {
            if (!res.status) {
                response['status'] = false
            } else {
                pubnub.addMembers(
                    {
                        spaceId: spaceId,
                        users: [usersArr[index]]
                    },
                    function (status, memberRes) {
                        if (status.error) {
                            return
                        }
                        if (memberRes) {
                            response['status'] = true
                        }
                    }
                );
            }


        })
    })
    callback && callback(response)
}
export const createPubnubUser = (spaceId, user, callback) => {
    let userRes = {
        status: true,
        errMsg: ''
    }
    pubnub.getMembers(
        {
            spaceId: spaceId
        }, (status, response) => {
            if (response) {
                let users = response.data
                if (users.length == 0 || !users.some((u) => u.id == user.id)) {
                    pubnub.createUser(
                        {
                            id: user.id,
                            name: user.id
                        }, (status, response) => {
                            if (status.error) {
                                userRes['status'] = false
                                userRes['errMsg'] = status.errorData.error
                            }
                            callback && callback(userRes)
                        })
                } else {
                    userRes['status'] = true
                    userRes['errMsg'] = 'User already created'
                    callback && callback(userRes)
                }
            } else {
                userRes['status'] = false
                userRes['errMsg'] = status.errorData.error.message
                callback && callback(userRes)
            }

        })
}
export const createUserForNotification = async (userData) => {
    pubnub.createUser(
        {
            id: userData._id,
            name: userData.firstName + ' ' + userData.lastName
        }, (status, response) => {
            console.log(response)
            // callback && callback(userRes)
        })
}
export const publishMessage = async (spaceId, msgObj) => {
    try {
        let res = await pubnub.publish({
            channel: spaceId,
            message: msgObj,
        });
    } catch (error) {
    }

}