import './App.css'
import Header from './Header'
import Carousel from './Carousel'
import Aboutus from './Aboutus'
import Services from './Services'
import Footer from './Footer'
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Signup from './Signup'
import Dashboard from './Dashboard'

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/*' element={
            <>
              <Header />
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/aboutus' element={<Aboutus />} />
                <Route path='/services' element={<Services />} />
              </Routes>
            </>
          } />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App