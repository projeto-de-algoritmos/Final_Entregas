import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Armazem from './pages/Armazem'

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Armazem} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes
