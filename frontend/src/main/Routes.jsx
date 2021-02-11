import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Home from '../components/home/Home'

export default props =>
    <Switch>
        <Route exact path='/' component={Home} />
    </Switch>
