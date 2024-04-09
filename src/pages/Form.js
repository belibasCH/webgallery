import { useEffect, useState } from "react";
import { storage, db} from '../config/firebase';
import '../css/Form.css';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore"; 

const Form = () => {
  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);
  const [formstate, setFormstate] = useState("chooseImage");
  

  //new
  //chooseImage - bild wählen
  // upload - show progress bar
  //description  beschreibung hinzufügen und senden
  //success - bild anzeigen und buttons - galerie gehen der neuen bild hochladen
 
  const [description, setDescription] = useState("");


  const uploadImage = (selectedFile) => {
    setFormstate("upload");
    const storageRef = ref(storage, `fab/${selectedFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);

    uploadTask.on("state_changed",
      (snapshot) => {
        const progress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL)
          setFormstate("description")
        });
      }
    );
  }
  const selectfile = (e) => {
    setFormstate("upload");
    uploadImage(e.target.files[0]);
  }
  const goback = () => {
    setFormstate("chooseImage");
    setImgUrl(null);
    setProgresspercent(0);
  }

  const changeDescription = e => {
    setDescription(e.target.value)
  }
  const upload = async event => {
    event.preventDefault()
    try {
      const dateTime = new Date()
      const docRef = await addDoc(collection(db, "fab"), {
        url: imgUrl,
        description: description,
        date: dateTime
    });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    console.log('Wird gesendet...')
    console.log(imgUrl)
    console.log(description)
    setFormstate("done")

  }

  return (
    <div className="upload-form">
      <form onSubmit={upload} className='form'>
        <div className='form-circle'>
          {formstate == "chooseImage" &&
            <>
              <div className='circle-content'>
                <div className='circle-icon'></div>
                <h2>Datei <br></br>auswählen</h2>
              </div>
              <input onChange={selectfile} type='file' />

            </>
          }
          {formstate == "upload" &&
            <div className="progressbar"><h2>{progresspercent}%</h2></div>
          }
          {formstate == "description" &&
          <>
          <div className="done" style={{ backgroundImage: `url(${imgUrl})` }}><div className="done-icon"></div></div>
          <div style={{height: "20px"}}></div>
          
          </>
          }
        </div>
        {formstate == "description" &&
        <input type="text" id="description" placeholder="Grussbotschaft, Beschreibung etc." value={description} onChange={changeDescription}></input>
      } 
      
      {formstate == "description" &&
      <button type='submit' className="hochladen">In Diashow einfügen</button>
        }
        </form>
      {formstate == "done" &&

        <button onClick={goback}>Neues Foto hochladen</button>
      }
    </div>
  );
}
export default Form;