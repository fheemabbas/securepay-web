import { createChannelSpace } from "../state/ducks/Job/actions";
import { createPubnubSpace, addMemberToSpace } from "./pubnub";


export const createChatEnvironment = async (userData, usersArr, requestID, fn) => {
    createPubnubSpace(requestID, async (space) => {
        // set response into db
        var count = 0;
        addMemberToSpace(usersArr, space.id, async (res) => {
            if (res.status) {
                count++;
                try {
                    let request = {
                        channelId: space.id,
                    };
                    fn && fn(request)
                   
                } catch (error) {
                    fn && fn({ status: false })
                }
            }

        })
    })
}