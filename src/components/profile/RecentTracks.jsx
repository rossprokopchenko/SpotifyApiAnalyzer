import React from 'react';
import { Typography } from '@mui/material';
import TrackCard from '../TrackCard';

function RecentTracks(props) {
    const { recentTracks, getTrackInfo} = props;

    return (
        <div>
            <Typography variant="h5">Recent Tracks: </Typography>

            {recentTracks ? recentTracks.map(track =>
                <TrackCard id={track.id} track={track} getTrackInfo={getTrackInfo} />
            ) : ""}
        </div>
    );
}

export default RecentTracks;