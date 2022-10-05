import { Button, Typography, Box, Link } from '@mui/material';
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
                <Typography variant='subtitle1' sx={{fontSize: '15px', color: 'darkgray', fontStyle: 'italic', mt: 2}}>If you are not added to a list of users with access - email rprokopchenko@gmail.com</Typography>
                <Typography variant='subtitle1' sx={{fontSize: '15px', color: 'darkgray', fontStyle: 'italic'}}>If you do not have a Spotify account or want a demo <a href="https://www.youtube.com/watch?v=Ctl-6Y6hpVk" target="_blank">click here</a></Typography>
            </Box>
        </Box>
    );
}

export default LoginPage;