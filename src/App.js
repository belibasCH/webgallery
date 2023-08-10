import React, { useEffect, useState } from 'react';
import Form from './Form';
import Image from './Image';
import { storage } from './firebase';
import { getStorage, ref, list, getDownloadURL } from "firebase/storage";

function App() {
 const [imageList, setImageList] = useState(null);
console.log(imageList);


useEffect(() => {
  const storageRef = ref(storage, 'sp/');
  list(storageRef).then((res) => {
    setImageList(res.items);
  })
}, [])

  
  return (
    <div className="App">
      <Form />
      <div className="image-list">
        {
          imageList?.map((img, index) => (
           <Image key={index} src={img} />
          ))
        }
        </div>
    </div>
  );
}
export default App;
