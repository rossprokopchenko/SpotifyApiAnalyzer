import React from 'react';
import { Typography } from '@mui/material';
import TrackCard from '../TrackCard';

function CurrentTrack(props) {
    const { currentTrack, getTrackInfo } = props;

    return (
        <div style={{width: '497px'}}>
            <Typography variant="h5">Currently Listening To: </Typography>

            <TrackCard id={currentTrack.id} track={currentTrack} getTrackInfo={getTrackInfo} />
        </div>
    );
}

export default CurrentTrack;