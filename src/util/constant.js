const Constant = {
    REGEX: {
        email: /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i,
        SPECIAL_CHAR: /[!@#\$%\^\&*\)\(+=._-]/g,
        NUMBER: /[0-9]/g,
        Name: /^[ a-zA-Z]+$/i,
        ALPHABETCOMMA: /^[a-zA-Z,\-.\s]*$/i,
        ALPHANUMERIC: /^[ a-zA-Z0-9-\u00C0-\u024F\u1E00-\u1EFF']+$/i,
        ALPHANUMER: /^[ a-zA-Z0-9]+$/i,
        LOWERCASE_UPPERCASE: /[a-z].*[A-Z]|[A-Z].*[a-z]/,
        Url: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/i,
        commission: /[1-9]$|^[1-9][0-9]$|^(100)$/i,
        AMOUNT: /^[0-9]*\.?[0-9]*$/,
        NUMERIC: /^\d*\.?\d*$/,
        LOWERCASE: /[a-z].*\d|\d.*[a-z]/,
        UPPERCASE: /[A-Z].*\d|\d.*[A-Z]/,
    },
    ROLE: {
        CLIENT: 3,
        CUSTOMER: 4,
        ADMIN: 1,
        STAFF: 2,
    },
    AUTH: {
        Google: '615596702105-ed3jfv7tqcgg2jibiqb6cnl0et2uq66o.apps.googleusercontent.com',
        FACEBOOK: '663401838000463'
        // FACEBOOK: '352951936229847'
    },
    MILESTONESTATUS_CLIENT: {
        WAITING_ACCEPT: "Waiting For Customer Approval",
        WAITING_FUND_DEPOSITE: "Waiting For Customer To Fund Deposit Box",
        PAYMENT_IN_DEPOSITE: "Transaction In Deposit Box ",
        RELEASE_REQUESTED: "Transaction Release Requested ",
        PAYMENT_RELEASE: "Proccessing Transaction Release",
        PAYMENT_COMPLETE: "Transaction Stage X Paid. Waiting For Customer To Fund Transaction Stage Y.",
        PAYMENT_REJECTED: "Transaction Rejected. Please Contact Us On 01334 806113.",
        DISPUTE: "Waiting on query resolution",
        DISPUTE_RESOLVED: "Dispute resolved",
        PAID: "Paid",
        REJECTED: "Customer has Rejected Your Transaction",
    },
    MILESTONESTATUS_CUSTOMER: {
        WAITING_ACCEPT: "Waiting For Your Approval",
        WAITING_FUND_DEPOSITE: "Waiting For You To Fund Deposit Box",
        PAYMENT_IN_DEPOSITE: "Transaction In Deposit Box ",
        RELEASE_REQUESTED: "Transaction Release Requested ",
        PAYMENT_RELEASE: "Proccessing Transaction Release",
        PAYMENT_COMPLETE: "Transaction Stage X Paid. Waiting For You To Fund Transaction Stage Y.",
        PAYMENT_REJECTED: "Transaction Rejected. Please Contact Us On 01334 806113.",
        DISPUTE: "Waiting on query resolution",
        DISPUTE_RESOLVED: "Dispute resolved",
        PAID: "Paid",
        REJECTED: "You have Rejected Job Request",
    },
    // MILESTONESTATUS: {
    //     WAITING_ACCEPT: "Waiting for You to Accept Job ",//"WAITING_ACCEPT"
    //     WAITING_FUND_DEPOSITE: "Waiting For You To Fund Deposit Box",
    //     PAYMENT_IN_DEPOSITE: "Payment In Deposit Box",
    //     RELEASE_REQUESTED: "Payment Release Requested ",
    //     PAYMENT_RELEASE: "Proccessing Payment Release",
    //     PAYMENT_COMPLETE: "Payment Stage X Paid. Waiting For Client To Fund Payment Stage Y.", // Client & Customer = "Payment Stage X Paid. Waiting For Client To Fund Payment Stage Y."
    //     PAYMENT_REJECTED: "PAYMENT_REJECTED",
    //     DISPUTE: "DISPUTE",
    //     DISPUTE_RESOLVED: "DISPUTE_RESOLVED",
    //     PAID: "PAID",
    //     REJECTED: "You have rejected job request",
    // },
    JOBSTATUS: {
        CREATED: "Incomplete Transaction Stages", //"CREATED"
        WAITING_ACCEPT: "WAITING_ACCEPT",  // Client = Waiting For Client to Accept Job, Customer = Waiting for You to Accept Job
        WAITING_FUND_DEPOSITE: "WAITING_FUND_DEPOSITE", // Client = Waiting For Client To Fund Deposit Box, Customer = Waiting For You To Fund Deposit Box
        PAYMENT_IN_DEPOSITE: "PAYMENT_IN_DEPOSITE", // Client & Customer = Payment In Deposit Box
        RELEASE_REQUESTED: "RELEASE_REQUESTED", // Client & Customer = Payment Release Requested 
        PAYMENT_RELEASE: "PAYMENT_RELEASE", // Client & Customer = Proccessing Payment Release
        PAYMENT_COMPLETE: "PAYMENT_COMPLETE", // Client = Waiting For Client to Fund Next Payment Stage, Customer = Waiting For You to Fund Next Payment Stage
        JOB_COMPLETE: "JOB_COMPLETE",
        PAYMENT_REJECTED: "PAYMENT_REJECTED",
        DISPUTE: "DISPUTE",
        DISPUTE_RESOLVED: "DISPUTE_RESOLVED",
        PAID: "PAID",
        REJECTED: "REJECTED",
    },
    JOBSTATUSCLIENT: {
        CREATED: "Incomplete Transaction stages", //"CREATED"
        WAITING_ACCEPT: "Waiting For Customer to Accept Transaction",
        WAITING_FUND_DEPOSITE: "Waiting For Customer To Fund Deposit Box",
        PAYMENT_IN_DEPOSITE: "Transaction In Deposit Box ",
        RELEASE_REQUESTED: "Transaction Release Requested ",
        PAYMENT_RELEASE: "Proccessing Transaction Release",
        PAYMENT_COMPLETE: "Waiting For Customer to Fund Next Transaction Stage",
        JOB_COMPLETE: "Transaction Complete",
        PAYMENT_REJECTED: "Transaction Rejected",
        DISPUTE: "Waiting on query resolution",
        DISPUTE_RESOLVED: "Dispute resolved",
        PAID: "Paid",
        REJECTED: "Customer has Rejected Your Transaction"
    },
    JOBSTATUSCUSTOMER: {
        CREATED: "Incomplete Transaction stages", //"CREATED"
        WAITING_ACCEPT: "Waiting For You to Accept Transaction",
        WAITING_FUND_DEPOSITE: "Waiting For You To Fund Deposit Box",
        PAYMENT_IN_DEPOSITE: "Transaction In Deposit Box ",
        RELEASE_REQUESTED: "Transaction Release Requested ",
        PAYMENT_RELEASE: "Proccessing Transaction Release",
        PAYMENT_COMPLETE: "Waiting For You to Fund Next Transaction Stage",
        JOB_COMPLETE: "Transaction Complete",
        PAYMENT_REJECTED: "Transaction Rejected",
        DISPUTE: "Waiting on query resolution",
        DISPUTE_RESOLVED: "Dispute resolved",
        PAID: "Paid",
        REJECTED: "You have Rejected Transaction"
    },
    JOBSTATUSADMIN: {
        CREATED: "Incomplete Transaction stages", //"CREATED"
        WAITING_ACCEPT: "Waiting For Customer to Accept Transaction",
        WAITING_FUND_DEPOSITE: "Waiting For Customer to Fund Deposit Box",
        PAYMENT_IN_DEPOSITE: "Transaction In Deposit Box",
        RELEASE_REQUESTED: "Transaction Release Requested",
        PAYMENT_RELEASE: "Proccessing Transaction Release",
        PAYMENT_COMPLETE: "Transaction Completed",
        JOB_COMPLETE: "Transaction Completed",
        PAYMENT_REJECTED: "Transaction Rejected",
        DISPUTE: "Waiting on query resolution",
        DISPUTE_RESOLVED: "Dispute resolved",
        PAID: "Paid",
        REJECTED: "Customer has Rejected Your Transaction"
    },
    JOBSTATUSCLASS: {
        CREATED: "pending", //"CREATED"
        WAITING_ACCEPT: "pending",  // Client = Waiting For Client to Accept Job, Customer = Waiting for You to Accept Job
        WAITING_FUND_DEPOSITE: "amount", // Client = Waiting For Client To Fund Deposit Box, Customer = Waiting For You To Fund Deposit Box
        PAYMENT_IN_DEPOSITE: "amount", // Client & Customer = Payment In Deposit Box
        RELEASE_REQUESTED: "RELEASE_REQUESTED", // Client & Customer = Payment Release Requested 
        PAYMENT_RELEASE: "amount", // Client & Customer = Proccessing Payment Release
        PAYMENT_COMPLETE: "complete", // Client = Waiting For Client to Fund Next Payment Stage, Customer = Waiting For You to Fund Next Payment Stage
        JOB_COMPLETE: "complete",
        PAYMENT_REJECTED: "cancel",
        DISPUTE: "disputed",
        DISPUTE_RESOLVED: "resolved",
        PAID: "complete",
        REJECTED: "cancel",
    },
    FILTERSTATUS: [
        {
            id: "CREATED",
            value: 'Incomplete Transaction stages',
        },
        {
            id: "WAITING_ACCEPT",
            value: 'Waiting accept'

        },
        {
            id: "WAITING_FUND_DEPOSITE",
            value: 'Waiting fund deposit'

        },
        {
            id: "PAYMENT_IN_DEPOSITE",
            value: 'Transaction in deposit'

        },
        {
            id: "RELEASE_REQUESTED",
            value: 'Transaction requested'

        },
        {
            id: "PAYMENT_RELEASE",
            value: 'Transaction release'

        },
        {
            id: "JOB_COMPLETE",
            value: 'Job complete'

        },
        {
            id: "PAYMENT_COMPLETE",
            value: 'Transaction complete'

        },
        {
            id: "REJECTED",
            value: 'Transaction rejected'

        },
        {
            id: "DISPUTE",
            value: 'Dispute'

        },
        {
            id: "DISPUTE_RESOLVED",
            value: 'Dispute resolved'

        },
        {
            id: "PAID",
            value: 'Paid'

        },
    ],
    DISPUTE_RAISED_CLASSNAME: {
        // Resolved: 'complete',
        // RAISED: '',
        // suggested: 'suggested',
        RAISED: '',
        ONGOING: 'ongoing',
        RESOLVED: 'compalte',
        ARBITRATION: ''
    }
}


export default Constant