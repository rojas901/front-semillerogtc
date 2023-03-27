import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import AuthRouter from './Routers/AuthRouter'
import UserRouter from './Routers/UserRouter'

function App() {

  const [auth, setAuth] = useState(localStorage.getItem('Authorization') !== null)

  

  return (
    <BrowserRouter>
      <Navbar auth={auth}/>
      <main>
        {
          auth ?
          <UserRouter/>
          :
          <AuthRouter/>
        }
      </main>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
