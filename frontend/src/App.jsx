import './app.css'
import {Route, Routes} from 'react-router-dom'
import Signin from './pages/signin'
import Signup from './pages/signup'
import Payment from './pages/payment'
import Dashboard from './pages/dashboard'
import Authz from './pages/auth'


function App() {

  return (
    <>
      <Routes>
        <Route path ='/' element={< Signin />} />
        <Route path ='/signup' element={< Signup />} />
        <Route element={< Authz />}>
          <Route path ='/dashboard' element={< Dashboard />} />
          <Route path ='/payment' element={< Payment />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
