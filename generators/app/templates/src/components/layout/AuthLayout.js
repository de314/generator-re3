import React from 'react'

import AuthHeader from './AuthHeader'
import AuthRoutes from 'routes/AuthRoutes'

const AuthLayout = () => {
  return (
    <div className="AuthLayout container-fluid">
      <AuthHeader />
      <AuthRoutes />
    </div>
  )
}

export const RawAuthLayout = AuthLayout

export default AuthLayout
