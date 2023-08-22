import React, { useEffect, useState } from 'react';
import Form from '../pages/Form';
import { storage } from '../config/firebase';
import { ref,  getDownloadURL } from "firebase/storage";

const Image = ({key, src, active}) => {
 const [url, setUrl] = useState("https://bbkmf.ch/wp-content/plugins/embed-any-document/images/loading.svg");

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
