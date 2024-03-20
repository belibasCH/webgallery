import React, { useEffect, useState } from 'react';
import Image from '../components/Image';
import { storage, db } from '../config/firebase';
import '../css/App.css';
import { getStorage, ref, list, getDownloadURL, getBlob } from "firebase/storage";
import { Link } from 'react-router-dom';
import { collection, getDocs } from "firebase/firestore"; 



function Start() {
  const [imageList, setImageList] = useState([]);
  console.log(imageList);

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

  async function download() {
    const urls = [];

    await imageList.forEach(img => {
      try {
        const storageRef = ref(storage, img._location.path_);
        getBlob(storageRef).then((blobImage) => {
          const href = URL.createObjectURL(blobImage);

          const anchorElement = document.createElement('a');
          anchorElement.href = href;
          anchorElement.download = 'WebGalery';

          document.body.appendChild(anchorElement);
          anchorElement.click();

          document.body.removeChild(anchorElement);
          window.URL.revokeObjectURL(href);
        });
      } catch (error) {
        console.log(error);
      }
    })

  }
  return (
    <>
      <div className="image-galery">
        {
          imageList.map((element, index) => (
            <div key={index}>
            <img src={element.url}></img>
            <p>{element.description}</p>
            </div>
          ))
        }

      </div>
      <div className='button-container'>

        <Link to="/upload" className='button'>
          <div className='upload icon'></div>
        </Link>
        <Link to="/slideshow" className='button'><div className='fullscreen icon'></div></Link>
        <div className='button' onClick={download}><div className='download icon'></div></div>

      </div>

    </>
  );
}
export default Start;
