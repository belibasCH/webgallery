import { useEffect, useState } from "react";
import { storage } from '../config/firebase';
import '../css/Form.css';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

const Form = () => {
  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);
  const [formstate, setFormstate] = useState("choose");
  //"choose", "ready", "upload", "done"
  const [selectedFile, setSelectedFile] = useState(null);


  const handleSubmit = (e) => {
    setFormstate("upload");
    e.preventDefault()
    if (!selectedFile) return;
    const storageRef = ref(storage, `public/${selectedFile.name}`);
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
        setFormstate("done");
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL)
        });
      }
    );
  }
  const selectfile = (e) => {
    setFormstate("ready");
    setSelectedFile(e.target.files[0]);
  }
  const goback = () => {
    setFormstate("choose");
    setImgUrl(null);
    setProgresspercent(0);
    setSelectedFile(null);
  }

  return (
    <div className="upload-form">
      <form onSubmit={handleSubmit} className='form'>
        <div className='form-circle'>
          {formstate == "choose" &&
            <>
              <div className='circle-content'>
                <div className='circle-icon'></div>
                <h2>Datei <br></br>auswählen</h2>
              </div>
              <input onChange={selectfile} type='file' />
            </>
          }
          {formstate == "ready" &&
            <div className='info'>
              <h2 className="filename">{selectedFile.name}</h2>
            </div>
          }

          {formstate == "upload" &&
            <div className="progressbar"><h2>{progresspercent}%</h2></div>
          }
          {formstate == "done" &&
            <div className="done" style={{ backgroundImage: `url(${imgUrl})` }}><div className="done-icon"></div></div>
          }


        </div>
        {formstate == "ready" &&
          <button type='submit' className="hochladen"> Hochladen</button>
        }

      </form>
      {formstate == "done" &&
        <button onClick={goback}>Neues Foto hochladen</button>
      }

    </div>
  );
}
export default Form;