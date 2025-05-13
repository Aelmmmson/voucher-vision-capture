
import React from 'react';

interface InfoFieldProps {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  required?: boolean;
  placeholder?: string;
}

const InfoField: React.FC<InfoFieldProps> = ({ 
  label, 
  value, 
  onChange, 
  readOnly = true,
  required = false,
  placeholder = ""
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-scanner-text mb-1">
        {label}{required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type="text"
        readOnly={readOnly}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        placeholder={placeholder}
        className={`w-full p-2 border border-scanner-lightgray rounded-md ${readOnly ? 'bg-white' : 'bg-background'} text-scanner-text`}
      />
    </div>
  );
};

export default InfoField;
