import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Disease from './components/Disease'
import Header from './components/Header'
import Loginpage from './components/Loginpage'

function App() {
  
  return (
    <>
      <div className=''>

      </div>
      <Router>
        <Header/>

        <Routes>
          <Route path='/' element={<Disease/>} />
          <Route path='/Login' element={<Loginpage />} />
          <Route path="/about" element={<h1>About Page</h1>} />
        <Route path="/shop" element={<h1>Shop Page</h1>} />
        <Route path="/tips" element={<h1>Health Tips Page</h1>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
