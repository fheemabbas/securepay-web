const axios = require('axios');
const qs = require('qs');

let MangopayCreds = {
    clientId: process.env.REACT_APP_MANGO_CLIENT_ID,
    clientApiKey: process.env.REACT_APP_MANGO_API_KEY,
    baseUrl: process.env.REACT_APP_MANGO_BASE_URL
}

let MANGOPAY = {
    AUTH: `Basic ${Buffer.from((`${MangopayCreds.clientId}:${MangopayCreds.clientApiKey}`)).toString("base64")}`,
    URL: `${MangopayCreds.baseUrl}/v2.01/${MangopayCreds.clientId}/`
}

export default class WebService {

    static async createCard(params) {
        let url = `${MANGOPAY.URL}CardRegistrations`
        return await axios.post(url, params, { headers: { 'Authorization': MANGOPAY.AUTH } });

    }

    static async getCardToken(url, requestData) {

        return await axios.post(url, qs.stringify(requestData));
    }

    static async updateCard(CardRegistrationId, params) {
        let url = `${MANGOPAY.URL}CardRegistrations/${CardRegistrationId}/`
        return await axios.put(url, params, { headers: { 'Authorization': MANGOPAY.AUTH } });

    }

}