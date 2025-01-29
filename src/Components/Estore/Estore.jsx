import React from 'react'
import { useMode } from '../../Providers/ModeContext';
import VendorEstore from './VendorEstore';
import ClientEstore from './ClientEstore';
function Estore() {
  const { mode } = useMode()
  return (
    <div>
      {mode === 'Vendor' ? (
        <VendorEstore />
      ) : (
        <ClientEstore />
      )}
    </div>
  )
}

export default Estore