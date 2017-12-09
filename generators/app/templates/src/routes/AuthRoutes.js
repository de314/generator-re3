import React from 'react'

import { Route, Switch } from 'react-router-dom'
// ::IMPORT_AUTH::
import Page404 from 'routes/common/Page404'
// ::IMPORT_COMMON::


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
