import React from 'react'
import { selectAuthUserState } from 'rdx/selectors'
import { setLoggingIn, setAuthUser } from 'rdx/actions'

import { connect } from 'react-redux'
import { branch, compose, renderComponent } from 'recompose'

import AnonHeader from './AnonHeader'
import AuthHeader from './AuthHeader'

const HeaderImpl = branch(({ user }) => !!user, renderComponent(AuthHeader))(AnonHeader)

const Header = props => (
  <div className="Header">
    <HeaderImpl {...props} />
  </div>
)

export default compose(
  connect(
    state => ({ ...selectAuthUserState(state) }),
    dispatch => ({
      startLogin: () => {
        dispatch(setLoggingIn(true))
        setTimeout(() => dispatch(setAuthUser({ username: 'de314' })), 1500)
      },
      startLogout: () => dispatch(setAuthUser(null)),
    })
  )
)(Header)
