import React, { useEffect, useState } from 'react';
import Form from './Form';
import Image from './Image';
import { storage } from './firebase';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Slideshow from './Slideshow';
import Start from './Start';


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
