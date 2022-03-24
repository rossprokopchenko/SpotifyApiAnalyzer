import * as React from 'react';
import AlbumCard from './AlbumCard';
import AlbumShop from './AlbumShop';
import './Home.css';

function Home(props) {
    const { savedAlbums, savedAlbumsIds, recommendedAlbums } = props;

    return (
        <div>
            <AlbumShop savedAlbums={savedAlbums} savedAlbumsIds={savedAlbumsIds} recommendedAlbums={recommendedAlbums}/>
        </div>
    );
    
}

export default Home;
