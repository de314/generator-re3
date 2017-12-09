import React from 'react'
import _ from 'lodash'

import withAuth from 'hoc/withAuth'
import { branch, renderComponent } from 'recompose'

import AnonLayout from './AnonLayout'
import AuthLayout from './AuthLayout'

const LayoutImpl = branch(({ user }) => !_.isNil(user), renderComponent(AuthLayout))(AnonLayout)

const Layout = props => (
  <div className="Layout">
    <LayoutImpl {...props} />
  </div>
)

export default withAuth(Layout)
