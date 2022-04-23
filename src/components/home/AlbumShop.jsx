import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import './AlbumShop.css';
import AlbumCard from '../AlbumCard';
import TrackCard from '../TrackCard';
import { useEffect, useState } from 'react';
import { FilterAccordion } from './FilterAccordion';

function AlbumShop(props) {
    const { savedAlbums, savedAlbumsIds, recommendedAlbums, recommendedTracks, getTrackRecommendations, availableGenres, getTrackInfo } = props;

    const [albumsDisplay, setAlbumsDisplay] = useState([]);
    const [using, setUsing] = useState();
    const [selectedIndex, setSelectedIndex] = useState(0);

    // this will execute on component update
    useEffect(() => {
        if (savedAlbums && !using) {
            setAlbumsDisplay(savedAlbums);
        }
    });

    // this will execute on component initialization
    useEffect(() => {
    }, []);

    const handleSaved = () => {
        setUsing('saved');
        setAlbumsDisplay({ ...[] });
        setSelectedIndex(0);

        const timer = setTimeout(() => {
            setAlbumsDisplay(savedAlbums);
        }, 50);
        return () => clearTimeout(timer);
    }

    const handleRecommended = () => {
        setUsing('recommended');
        setAlbumsDisplay({ ...[] });
        setSelectedIndex(1);

        const timer = setTimeout(() => {
            setAlbumsDisplay(recommendedAlbums)
        }, 50);
        return () => clearTimeout(timer);
    }

    const handleTracks = () => {
        setUsing('tracks');
        setAlbumsDisplay({ ...[] });
        setSelectedIndex(2);
    }

    return (
        <div className="AlbumShop-Grid">
            <div className="AlbumShop-col1">
                <Typography variant="h4" sx={{fontFamily: 'Garamond', fontWeight: 'bold'}}>Analyzer</Typography>
                <Divider />
                <List>
                    <ListItem disablePadding>
                        <ListItemButton selected={selectedIndex === 0} component="a" onClick={handleSaved}>
                            <ListItemText primary="Saved Albums" />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem disablePadding>
                        <ListItemButton selected={selectedIndex === 1} component="a" onClick={handleRecommended}>
                            <ListItemText primary="Album Generator" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton selected={selectedIndex === 2} component="a" onClick={handleTracks}>
                            <ListItemText primary="Tracks Generator" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </div>

            <div className="AlbumShop-col2">
                <div className="AlbumShop-col2-row1">
                    <Paper
                        sx={{ height: 40}}
                    >

                    </Paper>
                    
                </div>
                <div className="AlbumShop-col2-row2">
                    {using == 'tracks' ? 
                    <div>
                        <Box sx={{ml: '10px', mr: '10px'}}>
                            <FilterAccordion getTrackRecommendations={getTrackRecommendations} availableGenres={availableGenres}/> 
                    
                            {recommendedTracks ? recommendedTracks.map(track => <TrackCard key={track.id} track={track} getTrackInfo={getTrackInfo} />) : ""}
                        </Box>
                        
                    </div>
                    : <div className="AlbumShop-cards">
                        {albumsDisplay.length > 0 ? albumsDisplay.map(album => <AlbumCard key={album.id} album={album} savedAlbumsIds={savedAlbumsIds} using={using}/>) : ""}
                    </div>}
                </div>
            </div>
        </div>
    );
    

}

export default AlbumShop;
