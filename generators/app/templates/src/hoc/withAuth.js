import { selectAuthUserState } from 'rdx/selectors'
import { setLoggingIn, setAuthUser } from 'rdx/actions'

import { connect } from 'react-redux'

export default Component =>
  connect(
    state => ({ ...selectAuthUserState(state) }),
    dispatch => ({
      startLogin: () => {
        dispatch(setLoggingIn(true))
        setTimeout(() => dispatch(setAuthUser({ username: 'de314' })), 1500)
      },
      startLogout: () => dispatch(setAuthUser(null)),
    })
  )(Component)
