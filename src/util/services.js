import moment from "moment";
import { isEmpty } from "lodash"

import Message from "./message";
import Constant from "./constant";





export const onPhoneChange = (formMethod, e, mask, name) => {
    const value = e.target.value;
    !value || value === mask ? formMethod.setError(
        name,
        {
            type: "manual",
            message: ((Message.ErrorMessage.PhoneNumberEmpty))
        }
    ) : formMethod.clearErrors(['mobnumber'])
}

export const getParams = (params) => {
    if (isEmpty(params)) return ''
    let query = []
    Object.keys(params).forEach(key => {
        if (params[key] !== '') {
            query.push(`${key}=${params[key]}`)
        }
    })
    return query.join('&')
}

export const getDisableClass = (status) => {
    return status === Constant.USER_STATUS.ENABLED ? '' : 'disable'
    // return Object.keys(params).map(key => `${key}=${params[key]}`).join('&')
}

export const getTimeFromDate = (date) => {
    if (!date) return date
    return moment(date).format("HH:mm")
}

export const getDateFromTime = (time) => {
    if (!time) return time
    const dt = new Date();
    const [hours, min] = time.split(':')
    dt.setHours(hours)
    dt.setMinutes(min)
    return dt
}