import React, { useEffect, useState } from 'react';
import Form from './Form';
import Image from './Image';
import { storage } from './firebase';
import './App.css';
import { getStorage, ref, list, getDownloadURL } from "firebase/storage";

function Download() {


  return (
        <h1>Download</h1>

  );
}
export default Download;
