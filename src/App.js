import React, { useEffect, useState } from 'react';
import Form from './pages/Form';
import Image from './components/Image';
import { storage } from './config/firebase';
import './css/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Slideshow from './pages/Slideshow';
import Start from './pages/Start';


const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Start />}/>
          <Route path="upload" element={<Form />} />
          <Route path="slideshow" element={<Slideshow />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
