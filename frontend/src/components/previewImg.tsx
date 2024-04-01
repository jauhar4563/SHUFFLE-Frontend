import React, { useState, useEffect } from "react";

interface PreviewImageProps {
  files: string[];
}

const PreviewImage: React.FC<PreviewImageProps> = ({ files }) => {
  const [previews, setPreviews] = useState([...files]);

  // useEffect(() => {
  //   const newPreviews: (string | ArrayBuffer | null)[] = [];

  //   const readAndPreview = (file: File) => {
  //     const reader = new FileReader();

  //     reader.onload = () => {
  //       if (typeof reader.result === "string") {
  //         newPreviews.push(reader.result);
  //         setPreviews([...newPreviews]);
  //       }
  //     };

  //     reader.readAsDataURL(file);
  //   };

  //   files.forEach((file) => {
  //     readAndPreview(file);
  //   });
  // }, [files]);

  return (
    <div className="flex  gap-4">
      {previews.map((preview, index) => (
        <div key={index}>
          {preview && (
            <img
              style={{  borderRadius: "10px" }}
              src={preview.toString()}
              alt={`Preview ${index + 1}`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default PreviewImage;
