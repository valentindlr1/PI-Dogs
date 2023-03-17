import './App.css';
import { Switch, Route, useLocation } from 'react-router-dom'
import Welcome from './Components/Welcome/Welcome';
import Home from './Components/Home/Home';
import NavBar from './Components/Navbar/NavBar';
import Detail from './Components/Detail/Detail';
import Form from './Components/Form/Form';

function App() {

  const location = useLocation()
  
  return (
    <div className="App">
      <div>
        {location.pathname !== '/' && <NavBar />}
      </div>
      
       <Switch>
        <Route path='/detail/:id' >{<Detail />}</Route>
        <Route path='/form' >{<Form />}</Route>
        <Route path='/home' >{<Home />}</Route>
        <Route path='/' >{<Welcome />}</Route>
        
      </Switch> 
    </div>
  );
}

export default App;
