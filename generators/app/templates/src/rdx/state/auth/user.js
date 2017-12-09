import _ from 'lodash'
import { SET_LOGGING_IN, SET_AUTH_USER } from 'rdx/actions'

const selectSlice = state => _.get(state, 'auth.user')

export const selectAuthUserState = state => selectSlice(state)
export const selectAuthUser = state => selectSlice(state).user
export const selectLoggingIn = state => selectSlice(state).loggingIn

const defaultState = {
  user: null,
  loggingIn: false,
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_LOGGING_IN: {
      return {
        ...state,
        loggingIn: action.loggingIn,
      }
    }

    case SET_AUTH_USER: {
      return {
        ...state,
        user: action.user,
        loggingIn: false,
      }
    }

    default:
  }
  return state
}
