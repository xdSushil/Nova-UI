import React from 'react';
import { useMode } from '../../Providers/ModeContext'; // Path to your context file

const Switches = () => {
  const { mode, setMode } = useMode();

  const handleCheckboxChange = () => {
    setMode((prevMode) => (prevMode === 'Vendor' ? 'Client' : 'Vendor'));
  };

  return (
    <label className="themeSwitcherTwo relative inline-flex cursor-pointer select-none items-center">
      <input
        type="checkbox"
        checked={mode === 'Client'}
        onChange={handleCheckboxChange}
        className="sr-only"
      />
      <span className="label flex items-center text-sm font-medium text-white">
        Vendor
      </span>
      <span
        className={`slider mx-4 flex h-8 w-[60px] items-center rounded-full p-1 duration-200 ${
          mode === 'Client' ? 'bg-[#31a3a3]' : 'bg-[#CCCCCE]'
        }`}
      >
        <span
          className={`dot h-6 w-6 rounded-full bg-white duration-200 ${
            mode === 'Client' ? 'translate-x-[28px]' : ''
          }`}
        ></span>
      </span>
      <span className="label flex items-center text-sm font-medium text-white">
        Client
      </span>
    </label>
  );
};

export default Switches;
