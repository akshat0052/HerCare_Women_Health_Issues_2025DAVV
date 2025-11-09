import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Disease from './components/Disease'
import Header from './components/Header'
import Loginpage from './components/Loginpage'
import Chatbot from './components/chatbot'
import DetailPage from './components/detailpage'
import Home from './components/home'

function App() {
  
  return (
    <>
      <div className=''>

      </div>
      <Router>
        <Header/>

        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/Login' element={<Loginpage />} />
          <Route path="/about" element={<h1><Chatbot/></h1>} />
        <Route path="/Disease" element={<Disease/>} />
        <Route path="/tips" element={<h1>Health Tips Page</h1>} />
         <Route path="/detailpage/:slug" element={<DetailPage/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
