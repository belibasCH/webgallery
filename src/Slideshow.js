import React, { useEffect, useState } from 'react';
import Form from './Form';
import Image from './Image';
import { storage } from './firebase';
import './App.css';
import { getStorage, ref, list, getDownloadURL } from "firebase/storage";

function Slideshow() {
const defaultimage = {_location: {path: "sp/1"}}
  const [imageList, setImageList] = useState([defaultimage]);
  console.log(imageList);

const [currentimage, setCurrentImage] = useState(0);

  useEffect(() => {
    const storageRef = ref(storage, 'sp/');
    list(storageRef).then((res) => {
      setImageList(res.items);
    })
    const interval = setInterval(() => {
        const storageRef = ref(storage, 'sp/');
    list(storageRef).then((res) => {
      setImageList(res.items);
    })
      }, 600000);
      return () => clearInterval(interval);
    
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
        setCurrentImage((currentimage) => (currentimage === imageList.length - 1 ? 0 : currentimage + 1));
      }, 5000);
      return () => clearInterval(interval);
}, [imageList])

  return (
      <div className="image-list">
        {
          imageList.map((img, index) => (
            <Image key={index} src={img} active= {currentimage == index ? true : false}/>
          ))
        }
      </div>
  );
}
export default Slideshow;
