import * as React from 'react';
import { useEffect } from 'react';
import AlbumShop from './AlbumShop';
import './Home.css';
import Box from '@mui/material/Box';

function Home(props) {
    const { savedAlbums, savedAlbumsIds, recommendedAlbums, recommendedTracks, getTrackRecommendations, availableGenres, getTrackInfo } = props;

    useEffect(() => {
    },[]);

    return (
        <Box sx={{height: '100vh', padding: '30px'}}>
            <AlbumShop savedAlbums={savedAlbums} savedAlbumsIds={savedAlbumsIds} recommendedAlbums={recommendedAlbums} recommendedTracks={recommendedTracks} getTrackRecommendations={getTrackRecommendations} availableGenres={availableGenres} getTrackInfo={getTrackInfo} />
        </Box>
    );
    
}

export default Home;
