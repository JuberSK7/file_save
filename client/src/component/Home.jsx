import React, { useState, useEffect } from "react";
import axios from "axios";
import Upload from "./Upload";
import VideoUpload from "./VideoUpload";
import { toast } from "react-toastify";

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

  const handleDeleteFile = (fileId) => {
    axios
      .delete(`http://localhost:8080/api/v1/upload/deleteFileondb/${fileId}`)
      .then(() => {
        console.log("Image File Delete !");
        toast.success("File Deleted Successfully !");
        setTimeout(() => {
          window.location.reload();
        }, 6000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchFiles();
  }, []);
  console.log("images", images);
  return (
    <>
      <div className="home_container">
        <div className="form_container">
          <button onClick={openFileForm} className="uploadimg_btn">
            Upload Image <i class="fa-regular fa-image"></i>
          </button>
          <button onClick={openFileForm} className="uploadvid_btn">
            Upload Video <i class="fa-solid fa-video"></i>
          </button>
          {fileForm ? <Upload /> : <VideoUpload />}
        </div>

        <div className="files_container">
          <div className="files_here">
            <div className="images_here">
              <h3 className="file_category">Your Images</h3>
              {images.length <= 0 ? (
                <p>No Image Available</p>
              ) : (
                images.map((image) => (
                  <div className="image_box">
                    <img
                      src={image.imageUrl}
                      width="300"
                      height="220"
                      alt="imgUrl"
                    />
                    <p
                      className="delet_icon"
                      onClick={() => handleDeleteFile(image._id)}
                    >
                      <i class="fa-solid fa-trash"></i>
                    </p>
                    {/* <a href={image.imageUrl} download={image.imageUrl}>Download</a> */}
                  </div>
                ))
              )}
            </div>

            <div className="vidos_here">
              <h3 className="file_category">Your Videos</h3>
              {videos.length <= 0 ? (
                <p>No Videos Available</p>
              ) : (
                videos.map((video) => (
                  <div className="video_box">
                    <video
                      src={video.imageUrl}
                      width="300"
                      height="220"
                      controls
                    ></video>
                    <p
                      className="delet_icon_video"
                      onClick={() => handleDeleteFile(video._id)}
                    >
                      <i class="fa-solid fa-trash"></i>
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
