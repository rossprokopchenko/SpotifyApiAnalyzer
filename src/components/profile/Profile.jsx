import React from 'react';
import {useState} from 'react';
import { Typography } from '@mui/material';
import RecentTracks from './RecentTracks';
import TopArtists from './TopArtists';
import TopTracks from './TopTracks';
import TopGenres from './TopGenres';
import CurrentTrack from './CurrentTrack';
import './Profile.css'
import { InView } from 'react-intersection-observer';

function Profile(props) {
    const { profile, artists, tracks, recentTracks, currentTrack, topGenres, getArtists, getTracks, getTrackInfo } = props;
    const [pieInView, setPieInView] = useState(false);

    return (
        <div className="Profile">
            <div className="Profile-content">
                <Typography variant="h4" sx={{ textAlign: "center", fontFamily: 'Calibri', fontWeight: 'bold'}}>Profile info for {profile.display_name}</Typography>
                {currentTrack ? <CurrentTrack currentTrack={currentTrack} /> : ""}
            </div>
            <div className="Profile-content-2" style={{
                display: 'flow-root',
                flexDirection: 'column',
                paddingLeft: '10px',
                paddingRight: '10px'}}>
                <div style={{float: 'right'}}>
                    <TopGenres inView={pieInView} genres={topGenres}/>
                </div>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <TopArtists artists={artists} getArtists={getArtists} />
                    <TopTracks tracks={tracks} getTracks={getTracks} />
                </div>
                <div style={{marginTop: '20px'}}>
                    <RecentTracks recentTracks={recentTracks} getTrackInfo={getTrackInfo} />
                </div>
                
            </div>
        </div>
    );
}

export default Profile;