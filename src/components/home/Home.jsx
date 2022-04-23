import * as React from 'react';
import { useEffect, useState } from 'react';
import AlbumShop from './AlbumShop';
import './Home.css';

function Home(props) {
    const { savedAlbums, savedAlbumsIds, recommendedAlbums, recommendedTracks, getTrackRecommendations, availableGenres, getTrackInfo } = props;

    useEffect(() => {
    },[]);

    return (
        <div>
            <AlbumShop savedAlbums={savedAlbums} savedAlbumsIds={savedAlbumsIds} recommendedAlbums={recommendedAlbums} recommendedTracks={recommendedTracks} getTrackRecommendations={getTrackRecommendations} availableGenres={availableGenres} getTrackInfo={getTrackInfo} />
        </div>
    );
    
}

export default Home;
