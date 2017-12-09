import React from 'react'

import { Route, Switch } from 'react-router-dom'
import Page404 from 'routes/common/Page404'
// ::IMPORT_COMMON::
// ::IMPORT_ANON::

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
