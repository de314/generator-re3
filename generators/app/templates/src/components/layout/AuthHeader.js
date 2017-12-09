import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

const AuthHeader = ({ user, startLogout }) => {
  return (
    <div className="AuthHeader">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link to="/" className="navbar-brand">
          <%= title %>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="navbar-nav mr-auto">
            <Link to="/" className="nav-item nav-link">
              Home
            </Link>
            <Link to="/about" className="nav-item nav-link">
              About
            </Link>
          </div>
          <div className="navbar-nav ml-auto">
            <Link to="/profile" className="nav-item nav-link">
              Profile
            </Link>
            <Link to="/login" className="nav-item nav-link" onClick={() => startLogout()}>
              Logout
            </Link>
          </div>
        </div>
      </nav>
    </div>
  )
}

AuthHeader.propTypes = {
  startLogout: PropTypes.func.isRequired,
  user: PropTypes.object,
}

export default AuthHeader
