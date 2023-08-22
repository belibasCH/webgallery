import React, { useEffect, useState } from 'react';
import Image from './Image';
import { storage } from './firebase';
import './App.css';
import { getStorage, ref, list, getDownloadURL, getBlob } from "firebase/storage";
import { Link } from 'react-router-dom';

function Start() {
  const [imageList, setImageList] = useState([]);

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

  async function download() {
    const urls = [];

    await imageList.forEach(img => {
      try {
        const storageRef = ref(storage, img._location.path_);
        getBlob(storageRef).then((blobImage) => {
          const href = URL.createObjectURL(blobImage);

          const anchorElement = document.createElement('a');
          anchorElement.href = href;
          anchorElement.download = 'SiriUndPascal';

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
          imageList.map((img, index) => (
            <Image key={index} src={img} active={true} />
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
