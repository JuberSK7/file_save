import React, { useState, useEffect } from "react";
import axios from "axios";
import Upload from "./Upload";
import VideoUpload from "./VideoUpload";

const Home = () => {
  const [file, setFile] = useState([]);
  const [fileForm, setFileForm] = useState(true);

  const fetchFiles = () => {
    axios
      .get("http://localhost:8080/api/v1/upload/getuploadedimage")
      .then((response) => {
        setFile(response.data.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const images = file.filter(
    (fil) =>
      fil.imageUrl?.substr(fil.imageUrl.length - 3) == "jpg" ||
      fil.imageUrl?.substr(fil.imageUrl.length - 3) == "png" ||
      fil.imageUrl?.substr(fil.imageUrl.length - 3) == "jpeg"
  );
  const videos = file.filter(
    (fil) =>
      fil.imageUrl?.substr(fil.imageUrl.length - 3) == "mp4" ||
      fil.imageUrl?.substr(fil.imageUrl.length - 3) == "mov"
  );

  const openFileForm = () => {
    setFileForm(!fileForm);
  };



  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <>
    <div className="home_container">
    <div className="form_container">
    <button onClick={openFileForm} className="uploadimg_btn">Upload Image <i class="fa fa-picture-o" aria-hidden="true"></i></button>
      <button onClick={openFileForm} className="uploadvid_btn">Upload Video</button>
      {fileForm ? <Upload /> : <VideoUpload/>}

    </div>
    
      
      <div className="files_container">
        <div className="files_here">
          <div className="images_here">
            <h3>Your Images</h3>
            {images.map((image) => (
              <img src={image.imageUrl} width="400" height="320" alt="imgUrl" />
            ))}
          </div>

          <div className="vidos_here">
            <h3>Your Videos</h3>
            {videos.map((video) => (
              <video
                src={video.imageUrl}
                width="400"
                height="320"
                controls
              ></video>
            ))}
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Home;
