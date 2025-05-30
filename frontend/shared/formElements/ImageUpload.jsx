import React, { useState, useRef } from "react";

const ImageUpload = ({ name, id, placeholder, onImageSelect, previewUrl }) => {
  const [imagePreview, setImagePreview] = useState(previewUrl || null);
  const inputRef = useRef();

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      onImageSelect(file);
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
        accept="image/*"
        ref={inputRef}
        onChange={handleImage}
        className="hidden"
      />

      <div
        onClick={handleClick}
        className="w-full h-48 flex items-center justify-center border-2 border-dashed border-base-300 rounded-lg cursor-pointer bg-base-200 hover:border-primary transition duration-200 overflow-hidden"
      >
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="Preview"
            className="object-cover w-full h-full"
          />
        ) : (
          <span className="text-gray-500 text-sm text-center px-2">
            {placeholder || "Click to upload image"}
          </span>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
