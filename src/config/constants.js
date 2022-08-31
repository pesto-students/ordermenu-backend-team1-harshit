module.exports = {
    orderStatusOptions: {
        PENDING: "PENDING",
        ACCEPTED: "ACCEPTED",
        COMPLETED: "COMPLETED",
        CANCELE: "CANCELED",
    },
    userTypes: {
        USER: "USER",
        OWNER: "OWNER",
        ADMIN: "ADMIN",
    },
    tokenTypes: {
        ACCESS: 'access',
        REFRESH: 'refresh',
    },
    otp: {
        OTP_LENGTH: 6,
        OTP_CONFIG: {
            digits: true,
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false,
        }
    }
}