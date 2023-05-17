import React, { useState, useEffect } from 'react';
import { storage } from '../../firebase'

interface ImageComponentProps {
    filename: string;
  }

const ImageComponent: React.FC<ImageComponentProps> = ({ filename }) => {
  const [imageUrl, setImageUrl] = useState(' ');

  useEffect(() => {
    const fetchImage = async () => {
      try {
        // Get a reference to the image file
        const imageRef = storage.ref().child(filename);

        // Get the download URL of the image
        const url = await imageRef.getDownloadURL();

        // Set the image URL in state
        setImageUrl(url);
      } catch (error) {
        console.error('Error retrieving image:', error);
      }
    };

    fetchImage();
  }, [filename]);

  return (
    <div>
      {imageUrl ? (
        <img src={imageUrl} alt="Image" />
      ) : (
        <span>Loading image...</span>
      )}
    </div>
  );
};

export default ImageComponent;