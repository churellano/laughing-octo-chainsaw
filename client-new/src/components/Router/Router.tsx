import { Route, Switch } from 'react-router-dom';
import LoginOrSignup from '../LoginOrSignup';
import MainContent from '../MainContent';

function Router() {
    return (
        <Switch>
            <Route path='/login'>
                <LoginOrSignup initialIndex={0} />
            </Route>
            <Route path='/signup'>
                <LoginOrSignup initialIndex={1} />
            </Route>
            <Route path='/'>
                <MainContent />
            </Route>
        </Switch>
    )
}

export default Router;