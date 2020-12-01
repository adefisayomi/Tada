import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import Login from './components/account/Login'
import Signup from './components/account/Signup'
import ResetPassword from './components/account/ResetPassword'
import EditAccount from './components/account/EditAccount'
import Index from './components/Index'
import StateProvider from './components/context/StateProvider'
import EditNote from './components/note/EditNote'
import './App.css';

function App() {
  return (
    
    <Router>
      <StateProvider>
      <div className="App">
        <Switch>
          <Route exact path= '/' component= {Index} />
          <Route exact path= '/edit/:id' component= {EditNote} />
          <Route exact path= '/edit/:id/:version' component= {EditNote} />
          <Route exact path= '/edit' component= {EditNote} />
          <Route exact path= '/account/signup' component= {Signup} />
          <Route exact path= '/account/login' component= {Login} />
          <Route exact path= '/account/password/reset' component= {ResetPassword} />
          <Route exact path= '/account/edit' component= {EditAccount} />
        </Switch>
      </div>
      </StateProvider>
    </Router>
  );
}

export default App;
