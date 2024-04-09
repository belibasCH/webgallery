import React, { useEffect, useState } from 'react';
import Image from '../components/Image';
import { db } from '../config/firebase';
import '../css/App.css';
import { getDocs, collection } from "firebase/firestore";



function Slideshow() {
  const defaultimage = { _location: { path: "fab/1" } }
  const [imageList, setImageList] = useState([]);
  const [currentimage, setCurrentImage] = useState(0);

  async function fetchdata() {
      const newImages = [];
      const querySnapshot = await getDocs(collection(db, "fab"));
      querySnapshot.forEach((doc) => {
        newImages.push(doc.data());
      });
      setImageList(newImages);
  }

  useEffect(() =>{
    if (imageList.length === 0) {
      fetchdata();
    }
    if (currentimage === imageList.length - 1){
    fetchdata();
    }
  }, [currentimage])

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentimage === imageList.length - 1){
        fetchdata(setImageList);
      }
      setCurrentImage((currentimage) => (currentimage === imageList.length - 1 ? 0 : currentimage + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [imageList])

  return (
    <div className="image-list">
      {
        imageList.map((element, index) => (
          <div className={['imageContainer', index === currentimage ? 'active' : 'disable'].join(' ')} key={index} >
          <img key={index} src={element.url} />
          <h2 className='description'>{element.description}</h2>
          </div>
        ))
      }
    </div>
  );
}
export default Slideshow;

