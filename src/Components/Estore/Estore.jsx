import React from 'react'
import { useMode } from '../../Providers/ModeContext';
import VendorEstore from './VendorEstore';
import ClientEstore from './ClientEstore';
import User from '../../Pages/UserLayout/User';
function Estore() {
  const { mode } = useMode()
  return (
    <div>
      {mode === 'Vendor' ? (
        <><User /><VendorEstore /></>
      ) : (
        <><User /><ClientEstore /></>
      )}
    </div>
  )
}

export default Estore