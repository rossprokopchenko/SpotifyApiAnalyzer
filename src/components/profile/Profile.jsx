import React from 'react';
import { Typography, Slider } from '@mui/material';
import { useEffect, useState } from 'react';
import RecentTracks from './RecentTracks';
import TopArtists from './TopArtists';
import TopTracks from './TopTracks';
import CurrentTrack from './CurrentTrack';
import './Profile.css'

function Profile(props) {
    const { profile, artists, tracks, recentTracks, currentTrack, getArtists, getTracks, getTrackInfo } = props;

    return (
        <div className="Profile">
            <div className="Profile-content">
                <Typography variant="h4" sx={{ textAlign: "center", fontFamily: 'Calibri', fontWeight: 'bold'}}>Profile info for {profile.display_name}</Typography>
                {currentTrack ? <CurrentTrack currentTrack={currentTrack} /> : ""}
            </div>
            <div className="Profile-content-2">
                <div style={{display: 'flex', flexDirection: 'row', float: 'left'}}>
                    <TopArtists artists={artists} getArtists={getArtists} />
                    <TopTracks tracks={tracks} getTracks={getTracks} />
                </div>
                
                <div style={{float: 'right'}}>
                    <RecentTracks recentTracks={recentTracks} getTrackInfo={getTrackInfo} />
                </div>
            </div>
        </div>
    );
}

export default Profile;