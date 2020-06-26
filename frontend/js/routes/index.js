import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from '../pages/Home';
import Signup from '../pages/Signup';
import Signin from '../pages/Signin';
import Checkout from '../pages/Checkout'

const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route path='/' exact={true} component={Home} />
            <Route path='/sign-up' exact={true} component={Signup} /> 
            <Route path='/sign-in' exact={true} component={Signin} />
            <Route path='/checkout' exact={true} component={Checkout} />
        </Switch>
    </BrowserRouter>
);

export default Router;