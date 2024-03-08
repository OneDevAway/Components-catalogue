import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom'
import './App.css';
import Catalogue from './components/Catalogue';
import Login from './components/Login';

function App() {

  return (
  <Router>
    <Routes>
    <Route path='/' element={ <Login />} />
    <Route path='/catalogue' element={ <Catalogue/> } />
    </Routes>

  
  </Router>


  );
}

export default App;
