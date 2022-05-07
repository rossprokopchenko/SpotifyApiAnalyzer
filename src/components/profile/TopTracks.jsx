import React from 'react';
import { Box, Paper, Typography, Slider, Avatar } from '@mui/material';
import './TopTracks.css';

function TopTracks(props) {
    const { tracks, getTracks } = props;

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

        getTracks(sliderValue);
    }

    return (
        <div style={{ marginLeft: '10px' }}>
            <Typography variant="h5">Top tracks:</Typography>
            <Box
                sx={{
                    flexWrap: 'wrap',
                    width: '250px',
                    '& > :not(style)': {
                        backgroundColor: '#282c40'
                    }
                }}
            >
                <Paper elevation={3} sx={{paddingTop: '10px'}}>
                    <div className='TopTracks' style={{ 
                        marginLeft: '10px', 
                        color: 'lightgray', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        height: '180px', 
                        overflowY: 'auto'}}>
                        {tracks.map(track =>
                            <div key={track.id} style={{display: 'flex', flexDirection: 'row', whiteSpace: 'nowrap'}}>
                                <Typography variant="subtitle1">{tracks.indexOf(track) + 1} </Typography>
                                <Avatar sx={{ml: 1, height: '30px', width: '30px'}} src={track.album.images[0].url} />
                                <Typography sx={{
                                    ml: 1, 
                                    mb: 1,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    paddingRight: '10px'
                                    }} variant="subtitle1">{track.name}</Typography>
                            </div>)}
                    </div>

                    <Slider
                        aria-label="Term"
                        defaultValue={1}
                        valueLabelDisplay="auto"
                        valueLabelFormat={setSliderValue}
                        step={1}
                        marks
                        min={0}
                        max={2}
                        onChangeCommitted={sliderChange}
                        sx={{ width: '200px', marginLeft: '25px' }}
                    />
                </Paper>
            </Box>
        </div>
    );
}

export default TopTracks;