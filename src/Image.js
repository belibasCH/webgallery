import React, { useEffect, useState } from 'react';
import Form from './Form';
import { storage } from './firebase';
import { ref,  getDownloadURL } from "firebase/storage";

const Image = ({key, src, active}) => {
 const [url, setUrl] = useState("");

useEffect(() => {
  try {
  const storageRef = ref(storage, src._location.path_);
  getDownloadURL(storageRef).then((downloadURL) => {
    setUrl(downloadURL)
  });
} catch (error) {
  console.log(error);
}
}, [])

  return (
    <img src={url} className={active ? "active" :  "disable"}/>
  );
}
export default Image;
