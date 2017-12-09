import React from 'react'
<% if (proptypes) { -%>
import PropTypes from 'prop-types'
<% } -%>
<% if (redux) { -%>
import { } from 'rdx/selectors'
import { } from 'rdx/actions'
<% } -%>

import { compose } from 'recompose'
<% if (redux) { -%>
import { connect } from 'react-redux'
<% } -%>
<% if (auth) { -%>
import withAuth from 'hoc/withAuth'
<% } -%>
<% if (router) { -%>
import { withRouter } from 'react-router-dom'
<% } -%>

const <%= compName -%> = ({}) => {
  return (
    <div className="<%= compName -%>">
      <h1>Hello, World!</h1>
    </div>
  )
}
<% if (proptypes) { -%>

<%= compName -%>.propTypes = {}
<% } -%>
<% if (enhanced) { -%>

export const Raw<%= compName %> = <%= compName %>
<% } -%>

export default compose(
<% if (router) { -%>
  withRouter,
<% } -%>
<% if (auth) { -%>
  withAuth,
<% } -%>
<% if(redux) { -%>
  connect(
    state => ({}),
    dispatch => ({}),
  ),
<% } -%>
)(<%= compName -%>)
