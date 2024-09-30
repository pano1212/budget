import {BrowserRouter , Route, Routes } from 'react-router-dom'
import Home from './main/home'
import Groupmanage from './main/groupmanage'
import Navbar from './components/navbar'
import Departmanage from './main/departmentmanage'
function App() {

  return (
    
  <BrowserRouter>
      <Navbar/>
    <Routes>
      <Route path="/" element={ <Home/>}/>
    </Routes>
    <Routes>
      <Route path="/managegroup" element={<Groupmanage/>}/>
    </Routes>
    <Routes>
      <Route path="/managedepart" element={<Departmanage/>}/>
    </Routes>
  </BrowserRouter>
  )
}

export default App
