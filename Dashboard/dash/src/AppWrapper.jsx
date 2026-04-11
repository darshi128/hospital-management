import { Context } from './Context.jsx';
import { useState } from 'react'
import App from './App.jsx'

const AppWrapper =()=>{
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user , setUser] = useState(false);

  return (
    <Context.Provider value={{isAuthenticated, setIsAuthenticated, user, setUser}}>
      <App />
    </Context.Provider>
  )
}
export default AppWrapper