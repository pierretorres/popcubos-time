import React from 'react'
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Main from './pages/main'
import Movies from './pages/movies'

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Main}/>
            <Route path="/movies/:id" component={Movies}/>
        </Switch>
    </BrowserRouter>
)

export default Routes;