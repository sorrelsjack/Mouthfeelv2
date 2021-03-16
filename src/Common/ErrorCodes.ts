export const ErrorCodes = {
    internalError: 'INTERNAL_ERROR',
    comment: {
        missingBody: 'COMMENT_MISSING_BODY',
        doesNotExist: 'COMMENT_DOES_NOT_EXIST'
    },
    flavor: {
        doesNotExist: 'FLAVOR_DOES_NOT_EXIST'
    },
    miscellaneous: {
        doesNotExist: 'MISCELLANEOUS_DOES_NOT_EXIST'
    },
    texture: {
        doesNotExist: 'TEXTURE_DOES_NOT_EXIST'
    },
    food: {
        notFound: 'FOOD_NOT_FOUND',
        alreadyExists: 'FOOD_ALREADY_EXISTS'
    },
    authentication: {
        missingLoginDetails: 'MISSING_LOGIN_DETAILS',
        userNotFound: 'USER_NOT_FOUND',
        incorrectCredentials: 'INCORRECT_CREDENTIALS'
    },
    register: {
        usernameTaken: 'USERNAME_TAKEN',
        emailAlreadyRegistered: 'EMAIL_ALREADY_REGISTERED',
        usernameTooLong: 'USERNAME_TOO_LONG',
        emailInvalidStructure: 'EMAIL_INVALID_STRUCTURE'
    }
}