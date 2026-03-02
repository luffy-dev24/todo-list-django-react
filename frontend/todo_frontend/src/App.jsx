import { useState } from 'react'
import Header from './Components/Header'
import MainComponent from './Components/MainComponent'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { createContext } from "react";


export const mycontext = createContext();

function App() {
  const [isLoggedIn, setLogin] = useState(false);

  return (
    <>
      <mycontext.Provider value={[ isLoggedIn, setLogin ]}>
        <BrowserRouter>
          <div>
            {isLoggedIn && <Header />}
            <MainComponent />
          </div>
        </BrowserRouter>
      </mycontext.Provider>
    </>
  );
}

export default App;