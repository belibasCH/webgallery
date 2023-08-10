import React, { useEffect, useState } from 'react';
import Form from './Form';
import { storage } from './firebase';
import { ref,  getDownloadURL } from "firebase/storage";

const Image = ({key, src}) => {
 const [url, setUrl] = useState("");

useEffect(() => {
  const storageRef = ref(storage, src._location.path_);
  getDownloadURL(storageRef).then((downloadURL) => {
    setUrl(downloadURL)
  });

}, [])
  return (
    <img src={url}/>
  );
}
export default Image;
