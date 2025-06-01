import React, { useState, useRef, useEffect } from "react";
import { isVideo } from "../../../utils/isVideo";

const FileUpload = ({ name, id, placeholder, onFileSelect, previewUrl }) => {
  const [filePreview, setFilePreview] = useState(null);
  const inputRef = useRef();

  useEffect(() => {
    if (previewUrl) {
      setFilePreview(previewUrl);
    }
  }, [previewUrl]);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setFilePreview(fileUrl);
      onFileSelect(file);
    }
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  return (
    <div className="form-control w-half max-w-xs mx-auto">
      <input
        type="file"
        name={name}
        id={id}
        accept="image/*, video/*"
        ref={inputRef}
        onChange={handleFile}
        className="hidden"
      />

      <div
        onClick={handleClick}
        className="w-full h-48 flex items-center justify-center border-2 border-dashed border-base-300 rounded-lg cursor-pointer bg-base-200 hover:border-primary transition duration-200 overflow-hidden"
      >
        {filePreview ? (
          isVideo(filePreview) ? (
            <video
              src={filePreview}
              controls
              className="object-cover w-full h-full"
            />
          ) : (
            <img
              src={filePreview}
              alt="Preview"
              className="object-cover w-full h-full"
            />
          )
        ) : (
          <span className="text-gray-500 text-sm text-center px-2">
            {placeholder || "Click to upload image or video"}
          </span>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
