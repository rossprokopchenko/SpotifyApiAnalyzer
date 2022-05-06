import React from 'react';
import { Typography } from '@mui/material';
import TrackCard from '../TrackCard';
import './RecentTracks.css';

function RecentTracks(props) {
    const { recentTracks, getTrackInfo} = props;

    return (
        <div>
            {recentTracks ? 
            <div><Typography variant="h5">Recent tracks: </Typography>
                <div className='RecentTracks' style={{
                    width: '512px',
                    height: '275px', 
                    overflowY: 'auto'}}>
                {recentTracks.map((track, index) =>
                    <TrackCard key={index} track={track} getTrackInfo={getTrackInfo} />
                )}</div>
            </div> : ""}
        </div>
        
    );
}

export default RecentTracks;