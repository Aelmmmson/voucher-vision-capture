
import React from 'react';

interface ImageDisplayProps {
  label: string;
  imageData: string | null;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ label, imageData }) => {
  return (
    <div className="border border-scanner-lightgray rounded-md p-4 mb-4">
      <h3 className="font-medium text-scanner-text mb-2">{label}</h3>
      <div className="bg-white border border-scanner-lightgray rounded-md h-64 flex items-center justify-center">
        {imageData ? (
          <img 
            src={`data:image/jpeg;base64,${imageData}`} 
            alt={`${label} of voucher`}
            className="max-w-full max-h-full object-contain"
          />
        ) : (
          <span className="text-gray-400">No image available</span>
        )}
      </div>
    </div>
  );
};

export default ImageDisplay;
