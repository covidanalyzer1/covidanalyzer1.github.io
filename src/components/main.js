import React from 'react'
import State from './state'
import {Route, Switch} from 'react-router-dom'
import District from './district'
import Country from './country'

const Main = () =>(<React.Fragment>
    <Switch>
    <Route path="/world" component={Country} />    
    <Route path="/:id" exact component={District} />
    <Route path="/" exact component={State} />
   </Switch>
</React.Fragment>
    
)

export default Main