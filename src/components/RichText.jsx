import React from "react";
import ReactQuill from "react-quill"; 
import "react-quill/dist/quill.snow.css"; 

const RichText = ({ value, onChange }) => {
  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      className="w-full p-2 border border-gray-300 rounded"
    />
  );
};

export default RichText;
