import React from 'react'

import { Route, Switch } from 'react-router-dom'
// ::IMPORT_ANON::
import Page404 from 'routes/common/Page404'
// ::IMPORT_COMMON::


const AnonRoutes = () => (
  <div className="AnonRoutes">
    <Switch>
      {/* ::ROUTE_ANON:: */}
      {/* ::ROUTE_COMMON:: */}
      <Route component={Page404} />
    </Switch>
  </div>
)

export default AnonRoutes
