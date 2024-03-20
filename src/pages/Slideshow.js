import React, { useEffect, useState } from 'react';
import Image from '../components/Image';
import { db } from '../config/firebase';
import '../css/App.css';
import { getDocs, collection } from "firebase/firestore";

function Slideshow() {
  const defaultimage = { _location: { path: "js/1" } }
  const [imageList, setImageList] = useState([]);
  const [currentimage, setCurrentImage] = useState(0);

  useEffect(() =>{
    async function fetchData() {
      const newImages = [];
      const querySnapshot = await getDocs(collection(db, "js"));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().description}`);
        newImages.push(doc.data());
      });
      setImageList(newImages);
    }
    fetchData();
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
