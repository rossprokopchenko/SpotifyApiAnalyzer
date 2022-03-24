import React from 'react';
import { Avatar, Box, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

function TrackCard(props) {
    const { track } = props;

    useEffect(() => {
    }, []);

    return (
        <div>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginLeft: '10px',
                    marginTop: '3px',
                    height: '50px',
                    width: '400px',
                    '& > :not(style)': {
                        backgroundColor: '#282c40'
                    }
                }}
            >
                <Paper elevation={2}>
                    <Avatar
                        src={track.album.images[0].url}
                        sx={{
                            height: '50px',
                            width: '50px',
                            float: 'left'
                        }}
                        alt={track.album.artists[0].name}
                        variant="rounded"
                    />
                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: '15px',
                            fontWeight: 'bold',
                            color: 'lightgray',
                            textAlign: 'center'
                        }}
                    >
                        {track.name}
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: '13px',
                            color: 'lightgray',
                            textAlign: 'center'
                        }}
                    >
                        {track.artists[0].name}
                    </Typography>
                </Paper>

            </Box>
        </div>
        );
}

export default TrackCard;