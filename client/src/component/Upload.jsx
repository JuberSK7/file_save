import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Upload = () => {
  const [files, setFiles] = useState({
    name: '',
    email: '',
    tags: '',
    imageFile: null
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFiles(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFiles({
      ...files,
      imageUrl: e.target.files[0].name,
      imageFile: e.target.files[0],
    });
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    const formData = new FormData();
    formData.append("name", files.name);
    formData.append("email", files.email);
    formData.append("tags", files.tags);
    formData.append("imageFile", files.imageFile); 

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/upload/imageUpload",
        formData
      );
      toast.success("File Uploaded Successfully !");
      setFiles({
        name: "",
        email: "",
        tags: "",
        imageFile: null || ""
      });
      setSelectedFile(null);
      setTimeout(() => {
        window.location.reload()
      }, 6000)
   
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }finally{
      setIsUploading(false)
    }
  
  };

  return (
    <>
    <div className="fileform_container">
      <h1 className="form_heading">Image Upload</h1>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="file_form"
      >
        <input
          type="text"
          name="name"
          value={files.name} 
          placeholder="Enter your name"
          onChange={handleInputChange}
        />
        <br></br>
        <input
          type="email"
          name="email"
          value={files.email} 
          placeholder="Enter Your Email"
          onChange={handleInputChange}
        />
        <br></br>
        <input
          type="text"
          name="tags"
          value={files.tags} 
          placeholder="add a tags"
          onChange={handleInputChange}
        />
        <br></br>
        <div>
          <label htmlFor="file" className="file-label">
            {selectedFile ? (
              <span className="selectdfile_name">
                {truncateFilename(selectedFile.name)}
              </span>
            ) : (
              <span>
                <img
                  src="https://cdn1.iconfinder.com/data/icons/hawcons/32/698394-icon-130-cloud-upload-512.png"
                  alt="Upload Icon"
                />
              </span>
            )}
          </label>
          <input
            type="file"
            id="file"
            accept="video/*|image/*"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit"  className={isUploading ? 'uploading_btn' : 'submitimg_btn' } disabled={isUploading}>
          {
            isUploading ? "Uploading..." : "Upload Image File"
          }
          
        </button>
      </form>
      </div>
    </>
  );

  function truncateFilename(filename) {
    if (filename.length > 35) {
      return filename.slice(0, 35) + "...";
    }
    return filename;
  }
};

export default Upload;
