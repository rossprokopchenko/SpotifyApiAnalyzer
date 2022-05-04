import React from 'react';
import { Typography } from '@mui/material';
import TrackCard from '../TrackCard';

function CurrentTrack(props) {
    const { currentTrack } = props;

    return (
        <div>
            <Typography variant="h5">Currently Listening To: </Typography>

            <TrackCard id={currentTrack.id} track={currentTrack} />
        </div>
    );
}

export default CurrentTrack;