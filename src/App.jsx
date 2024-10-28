import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Register , Login, Dashboard, NewTask} from "./pages/index";

function App() {
  return (
    <BrowserRouter>
      <Routes> 
        <Route path='/' element={<Register />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/newtask' element={<NewTask/>}></Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
