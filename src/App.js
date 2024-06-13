
import { useState } from 'react';
import './App.css';
import About from './components/About';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';


function App() {
  // whether dark is enabled for not
  const [Mode, setMode] = useState('light');
  const toggleMode = () => {
    if (Mode === 'light')
    {
      setMode('dark');
      document.body.style.backgroundColor = 'black'
    }
    else {
      setMode('light');
      document.body.style.backgroundColor = 'white'

    }
  }
  return (
    <>
      <Navbar title="TextUtlities" text="Home" mode={Mode} toggleMode = {toggleMode} />
      <div className="container my-3">
        
        <TextForm heading="Enter the text" mode={Mode} />
        <About/>
        
      </div>
      
    </>
  );
}

export default App;
