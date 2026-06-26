import { useState } from 'react'
import './App.css'
import Header from './Header'
import Carousel from './Carousel'
import Aboutus from './Aboutus'

function App() {
  return (
    <div className="App">
    <Header/>
    <Carousel/>
    <Aboutus/>
    </div>
  )
}

export default App
