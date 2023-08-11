import React, { useEffect, useState } from 'react';
import Form from './Form';
import Image from './Image';
import { storage } from './firebase';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Slideshow from './Slideshow';
import Download from './Download';


const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Slideshow />}/>
          <Route path="upload" element={<Form />} />
          <Route path="download" element={<Download />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
