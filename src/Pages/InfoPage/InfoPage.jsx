import React, { useState, useEffect } from 'react';
import InfoDialog from '../../Components/InfoDialog/InfoDialog';

function InfoPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    // Automatically open the dialog when the page loads
    setIsDialogOpen(true);
  }, []);

  return (
    <InfoDialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
  );
}

export default InfoPage;
