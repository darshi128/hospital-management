import React from 'react'
import { useState } from 'react'
import App from './App.jsx'
import { Context } from './Context.jsx';

function AppWrapper() {
  const[isAuthenticated,setIsAuthenticated] = useState(false);
  const [user,setUser] = useState({});
  return(
    <Context.Provider value={{isAuthenticated,setIsAuthenticated,user,setUser}}>
      <App />
    </Context.Provider>
  )
}

export default AppWrapper;