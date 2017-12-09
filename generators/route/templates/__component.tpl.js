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

const <%= name -%> = ({}) => {
  return (
    <div className="<%= name -%>">
      <h1>Hello, World!</h1>
    </div>
  )
}
<% if (proptypes) { -%>

<%= name -%>.propTypes = {}
<% } -%>
<% if (enhanced) { -%>

export const Raw<%= name %> = <%= name %>
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
)(<%= name -%>)
