
import React from 'react';

interface InfoFieldProps {
  label: string;
  value: string;
}

const InfoField: React.FC<InfoFieldProps> = ({ label, value }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-scanner-text mb-1">
        {label}
      </label>
      <input
        type="text"
        readOnly
        value={value}
        className="w-full p-2 border border-scanner-lightgray rounded-md bg-white text-scanner-text"
      />
    </div>
  );
};

export default InfoField;
