import { Button, Typography, Box } from '@mui/material';
import React from 'react';
import {ReactComponent as SpotifyLogo} from '../resources/spotify-logo.svg';
import './LoginPage.css';

function LoginPage(props) {
    const {login} = props;

    document.title = "Login | Spotilyzer :)";

    return (
        <Box>
            <Box sx={{height: 'calc(100vh - 60px)',
                display: 'flex',
                flexFlow: 'column',
                alignItems: 'center',
                justifyContent: 'center'}}>
                <Typography variant='h3'>Please Login to Spotify</Typography>
                <Button sx={{mt: 3, width: '300px', height: '80px', fontSize: '30px'}} variant="outlined" color="success" onClick={login} endIcon={<SpotifyLogo height='50px' width='50px' />}>Login</Button>
            </Box>
        </Box>
    );
}

export default LoginPage;