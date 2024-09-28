import React, { useState } from 'react';

interface ComboBoxProps {
  data: { label: string; value: string }[];
  onValueChange: (value: string) => void;
  value: string | null;
  placeholder?: string;
}

const ComboBox: React.FC<ComboBoxProps> = ({ data, onValueChange, value, placeholder = 'Select an option' }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleItemSelect = (item: { label: string; value: string }) => {
    onValueChange(item.value);
    setIsDropdownOpen(false);
  };

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <div
        style={{
          padding: '10px',
          border: '1px solid #ddd',
          borderRadius: '5px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
        }}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <span>{value ? data.find(item => item.value === value)?.label : placeholder}</span>
        <span>▼</span>
      </div>

      {isDropdownOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: 'white',
            border: '1px solid #ddd',
            borderRadius: '5px',
            zIndex: 1,
            maxHeight: '200px',
            overflowY: 'auto',
          }}
        >
          {data.map((item) => (
            <div
              key={item.value}
              style={{
                padding: '10px',
                borderBottom: '1px solid #ddd',
                cursor: 'pointer',
              }}
              onClick={() => handleItemSelect(item)}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ComboBox;
