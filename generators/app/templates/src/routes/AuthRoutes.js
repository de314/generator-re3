import React from 'react'

import { Route, Switch } from 'react-router-dom'
import Page404 from 'routes/common/Page404'
// ::IMPORT_COMMON::
// ::IMPORT_AUTH::

const AuthRoutes = () => (
  <div className="AuthRoutes">
    <Switch>
      {/* ::ROUTE_AUTH:: */}
      {/* ::ROUTE_COMMON:: */}
      <Route component={Page404} />
    </Switch>
  </div>
)

export default AuthRoutes
