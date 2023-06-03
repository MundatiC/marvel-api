import React from 'react';
import { Home } from './Components/Home';
import './Components/style.css';
import {Routes,Route} from 'react-router-dom'
import { Specific } from './Components/Specific';

function App() {
  return (
    <>
     <Routes>
       <Route path='/'element={<Home/>}/>
       <Route path="/:category/:id" element={<Specific />} />
     </Routes>
    </>
  )
}

export default App;