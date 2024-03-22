
import React, { useState, useEffect } from "react";

interface PreviewImageProps {
  file: any; 
}

const PreviewImage: React.FC<PreviewImageProps> = ({ file }) => {
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null); 

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setPreview(reader.result); 
        }
      };
    } else {
      setPreview(null); 
    }
  }, [file]);

  return (
    <div>
      {preview && <img  style={{  height:'250px',borderRadius:'10px'}} src={preview.toString()} alt="" />} 
    </div>
  );
};

export default PreviewImage;
