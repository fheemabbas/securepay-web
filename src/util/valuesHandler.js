import { get } from "lodash"

//use this method to check the value is valid or not
export function isValidValue(value) {
    if (typeof (value) === "undefined" || value === null || value === "") {
        return false
    }
    return true
}

export function getValidNumber(value) {
    if (typeof (value) !== "number") {
        value = parseInt(value)
    }

    if (Number.isNaN(value)) {
        return 0
    }
    return value
}

//use this method to check the property exists in object or not
export function hasProperty(object, key) {
    if (Array.isArray(object) || typeof (key) != 'string' || !object) {
        return false
    } else {
        return object.hasOwnProperty(key)
    }
}

//use this method for string output
export function getValue(object, key) {
    return get(object, key, '-')
}


