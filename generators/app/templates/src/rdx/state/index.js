/*
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! DO NOT MODIFY THIS FILE !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 */
import { combineReducers } from 'redux'
import auth from './auth'
// ::IMPORT::

export default combineReducers({
  auth,
  // ::DEFAULT_EXPORT::
})

export * from './auth'
// ::EXPORT::
