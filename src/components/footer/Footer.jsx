import React from 'react';
import { ReactComponent as GithubLogo } from '../../resources/github.svg';
import { ReactComponent as LinkedInLogo } from '../../resources/linkedin.svg';
import { ReactComponent as InstagramLogo } from '../../resources/instagram.svg';
import { Typography, Box, IconButton } from '@mui/material';

function Footer(props) {

    return (
        <Box sx={{padding: '30px 60px',
            background: 'black',
            width: '100%',
            textAlign: 'center'}}>
            <Typography variant='h3' sx={{color: 'white'}}>Spotilyzer</Typography>
            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                <Box sx={{flexDirection: 'column', mt: '10px'}}>
                    <Typography variant='overline'>all data fetched from <a href="https://developer.spotify.com/documentation/web-api/reference/#/" target="_blank">Spotify Web API</a></Typography>
                </Box>
            </Box>
            <hr></hr>
            <Typography variant='subtitle1'>Made by Ross Prokopchenko</Typography>
            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '5px'}}>
                <IconButton href='https://www.linkedin.com/in/ross-prokopchenko-4802a2127/' target='_blank' sx={{height: '30px', width: '30px', padding: '0px'}}>
                    <LinkedInLogo width='30px' height='30px' />
                </IconButton>
                <IconButton href='https://github.com/rossprokopchenko' target='_blank' sx={{marginLeft: '4px', height: '30px', width: '30px', padding: '0px'}}>
                    <GithubLogo width='30px' height='30px' />
                </IconButton>
                <IconButton href='https://www.instagram.com/rostiku_/' target='_blank' sx={{marginLeft: '4px', height: '30px', width: '30px', padding: '0px'}}>
                    <InstagramLogo width='30px' height='30px' />
                </IconButton>
                
            </Box>
        </Box>
    );
}

export default Footer; 