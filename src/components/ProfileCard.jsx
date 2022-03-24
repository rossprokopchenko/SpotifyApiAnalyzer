import React from 'react';
import { Avatar, Box, Paper, Typography, Slider } from '@mui/material';


function ProfileCard(props) {
    const { profile, artists, tracks, getArtists, getTracks } = props;

    function setSliderValue(index) {
        if (index === 0) {
            return '1 month';
        } else if (index === 1) {
            return '6 months';
        } else if (index === 2) {
            return 'several years';
        }
    }

    function sliderChange(event, value, thumb) {
        let sliderValue = '';

        if (value === 0) {
            sliderValue = 'short_term';
        } else if (value === 1) {
            sliderValue = 'medium_term';
        } else if (value === 2) {
            sliderValue = 'long_term';
        }

        getArtists(sliderValue);
        getTracks(sliderValue);
    }

    return (
        <Box
            sx={{
                display: 'inline-block',
                flexWrap: 'wrap',
                margin: '10px',
                width: '800px',
                '& > :not(style)': {
                    backgroundColor: '#282c40'
                }
            }}
        >
            <Paper elevation={5}>
                <div style={{ margin: '10px', color: 'lightgray', display: 'flex', flexDirection: 'row' }}>
                    {profile.images ? <Avatar src={profile.images[0].url} sx={{ height: '250px', width: '250px' }} /> : ""}

                    <div style={{margin: '10px', float: 'left'}}>
                        <Typography variant="h5">Top 5 artists:</Typography>

                        {artists.map(artist =>
                            <div key={artist.id}>
                                <Typography variant="subtitle1">{artists.indexOf(artist) + 1} - {artist.name}</Typography>
                            </div>)}
                    </div>

                    <div style={{ margin: '10px', float: 'right' }}>
                        <Typography variant="h5">Top 5 tracks:</Typography>

                        {tracks.map(track =>
                            <div key={track.id}>
                                <Typography variant="subtitle1">{tracks.indexOf(track) + 1} - {track.name}</Typography>
                            </div>)}
                    </div>
                </div>

                <Slider
                    aria-label="Temperature"
                    defaultValue={1}
                    valueLabelDisplay="auto"
                    valueLabelFormat={setSliderValue}
                    step={1}
                    marks
                    min={0}
                    max={2}
                    onChangeCommitted={sliderChange}
                    sx={{ width: '200px', marginLeft: '30px' }}
                />
            </Paper>
        </Box>
    );
}

export default ProfileCard;

/*

 */