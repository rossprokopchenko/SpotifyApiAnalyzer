import * as React from 'react';
import ProfileCard from './ProfileCard';
import { Typography, Slider } from '@mui/material';
import TrackCard from './TrackCard';
import './Profile.css'

function Profile(props) {
    const { profile, artists, tracks, recentTracks, getArtists, getTracks } = props;

    return (
        <div className="Profile">
            <Typography variant="h4" sx={{ textAlign: "center" }}>Profile info for {profile.display_name}</Typography>

            <div className="Profile-content">
                <ProfileCard profile={profile} artists={artists} tracks={tracks} recentTracks={recentTracks} getArtists={getArtists} getTracks={getTracks} />

                <div className="Profile-tracks">
                    
                    {recentTracks ? recentTracks.map(track =>
                        <TrackCard id={track.id} track={track} />
                    ) : ""}
                </div>
            </div>
        </div>
    );
}

export default Profile;

/*
 * NOTES
 *
    const searchArtists = async (e) => {
        e.preventDefault()
        const { data } = await axios.get("https://api.spotify.com/v1/search", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                q: searchKey,
                type: "artist",
                limit: 5
            }
        })

        setArtists(data.artists.items)
    }

    const renderArtists = () => {
        return artists.map(artist => (
            <div key={artist.id}>
                <h2>{artist.name}</h2>
                {artist.images.length ? <img width={"50%"} src={artist.images[0].url} alt="" /> : <div>No Image</div>}
            </div>
        ))
    }*/
