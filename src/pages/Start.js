import React, { useEffect, useState } from 'react';
import Image from '../components/Image';
import { storage, db } from '../config/firebase';
import '../css/App.css';
import { getStorage, ref, list, getDownloadURL, getBlob } from "firebase/storage";
import { Link } from 'react-router-dom';
import { collection, getDocs } from "firebase/firestore"; 
import JSZip from 'jszip';



function Start() {
  const [imageList, setImageList] = useState([]);
  console.log(imageList);

  useEffect(() =>{
    async function fetchData() {
      const newImages = [];
      const querySnapshot = await getDocs(collection(db, "fab"));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().description}`);
        newImages.push(doc.data());
      });
      setImageList(newImages);
    }
    fetchData();
  }, [])
  async function downloadAndZipImages() {
    const zip = new JSZip();
  
    // Iterate over each image data object
    for (const imageData of imageList) {
      try {
        // Fetch the image
        const response = await fetch(imageData.url);
        const blob = await response.blob();
  
        // Add the image to the zip file
        zip.file(`${imageData.description || 'image'}.jpeg`, blob, { binary: true });
      } catch (error) {
        console.error('Error downloading image:', error);
      }
    }
  
    // Generate the zip file
    const content = await zip.generateAsync({ type: 'blob' });
  
    // Create a temporary link to download the zip file
    const link = document.createElement('a');
    link.href = URL.createObjectURL(content);
    link.download = 'HochzeitsFotos.zip';
  
    // Programmatically click the link to trigger the download
    link.click();
  
    // Clean up
    URL.revokeObjectURL(link.href);
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
        <div className='button' onClick={downloadAndZipImages}><div className='download icon'></div></div>

      </div>

    </>
  );
}
export default Start;
