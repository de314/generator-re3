import actionCreator from './creator'

export const SET_LOGGING_IN = 'SET_LOGGING_IN'
export const setLoggingIn = actionCreator(SET_LOGGING_IN, 'loggingIn')

export const SET_AUTH_USER = 'SET_AUTH_USER'
export const setAuthUser = actionCreator(SET_AUTH_USER, 'user')
