import React from 'react'
import { Redirect } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

const Resolver = (props) => {
  const { authenticated, component} = props
  const { isPrivate } = component
  let redirect

  if (authenticated && !isPrivate) {
    redirect = '/'
  }

  if (!authenticated && isPrivate) {
    redirect = '/signin'
  }
  
  const Component = component
  return redirect ? <Redirect to={redirect} /> : <Component {...props} />
}

const Injected = inject(stores => ({
    authenticated: stores.session.authenticated
}))(observer(Resolver))

const Auth = (Comp) => props => {
  return <Injected {...props} component={Comp} />
}

export default Auth