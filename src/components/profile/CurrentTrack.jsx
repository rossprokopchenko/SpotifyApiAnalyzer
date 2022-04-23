import React from 'react';
import { Typography } from '@mui/material';
import TrackCard from '../TrackCard';

function CurrentTrack(props) {
    const { currentTrack } = props;

    return (
        <div style={{marginRight: '10px'}}>
            <Typography variant="h5">Currently Listening To: </Typography>

            <TrackCard id={currentTrack.id} track={currentTrack} />
        </div>
    );
}

export default CurrentTrack;