import { Typography, Box } from '@mui/material';
import React from 'react';

function Footer(props) {

    return (
        <Box sx={{padding: '20px 60px',
            background: 'black',
            width: '100%',
            textAlign: 'center'}}>
            <Typography variant='h3'>Spotilyze</Typography>
            
        </Box>
    );
}

export default Footer; 