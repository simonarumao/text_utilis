
import { useState } from 'react';
import './App.css';
import About from './components/About';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import Alert from './components/Alert';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


function App() {
  // whether dark is enabled for not
  const [Mode, setMode] = useState('light');
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type : type
    })

    setTimeout(() => {
      setAlert(null)
    }, 1000);
    
  }


  const toggleMode = () => {
    if (Mode === 'light')
    {
      setMode('dark');
      document.body.style.backgroundColor = 'black'
      showAlert("Dark mode has been enabled", "Success")
      document.title = 'TextUlitties- Dark Mode'
    }
    else {
      setMode('light');
      document.body.style.backgroundColor = 'white'
      showAlert("Light mode has been enabled", "Success")
      document.title = 'TextUlitties- light Mode'



    }
  }
  return (
    <>
      <Router>
      <Navbar title="TextUtlities"  mode={Mode} toggleMode={toggleMode} />
      <Alert alert={alert} />
      <div className="container my-3">
          <Routes>
            {/* exact is used so that react does exact matching and no partially matching is done */}
          <Route exact path='/about' element={ <About/>}/>
          <Route exact path='/' element = {<TextForm heading="Enter the text" mode={Mode} showAlert={showAlert} /> } />
        </Routes>
      </div>
        </Router>
      
    </>
  );
}

export default App;
