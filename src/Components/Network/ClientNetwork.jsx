import { Box, Container } from '@mui/material'
import React from 'react'
import ConnectionCard from '../ConnectionCard/ConnectionCard'

function ClientNetwork() {
    return (
        <Box sx={{
            position:"absolute",
            left:"12%",
            padding: "30px",
            display: "flex",
            flexDirection: "column",
            gap: 4,
            width:"80%",
            marginTop:"83px"
            
        }}>


            <ConnectionCard />
            <ConnectionCard />
            <ConnectionCard />
            <ConnectionCard />
            
        </Box>
    )
}

export default ClientNetwork