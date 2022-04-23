import { Button, Typography } from '@mui/material';
import React from 'react';
import {ReactComponent as SpotifyLogo} from '../resources/spotify-logo.svg';
import './LoginPage.css';

function LoginPage(props) {
    const {login} = props;

    return (
        <div className="Login">
            <div className="Login-content">
                <Typography variant='h3'>Please Login to Spotify</Typography>
                <Button sx={{mt: 3, width: '300px', height: '80px', fontSize: '30px'}} variant="outlined" color="success" onClick={login} endIcon={<SpotifyLogo />}>Login</Button>
            </div>
        </div>
        
    );
}

export default LoginPage;