import React from 'react'
import { Redirect, Route } from 'react-router-dom'

export const PublicRoute = ({
    isAutenticated,
    component: Component,
    ...rest
}) => {

    return (
        <Route {...rest}
            component={(props => (
                (!isAutenticated)
                    ? <Component {...props} />
                    : <Redirect to="/" />
            ))}
        />
    )
}
