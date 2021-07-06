import './App.css';
import Navbar from './components/Navbar/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import MainContent from './components/MainContent';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path='/'>
          <MainContent />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
