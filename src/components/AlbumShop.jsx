import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Typography } from '@mui/material';
import { Inbox, Drafts } from '@mui/icons-material';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import './AlbumShop.css';
import AlbumCard from './AlbumCard';
import { useEffect, useState } from 'react';

function AlbumShop(props) {
    const { savedAlbums, savedAlbumsIds, recommendedAlbums } = props;

    const [albumsDisplay, setAlbumsDisplay] = useState([]);
    const [using, setUsing] = useState();

    // this will execute on component update
    React.useEffect(() => {
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

        const timer = setTimeout(() => {
            setAlbumsDisplay(savedAlbums);
            
        }, 50);
        return () => clearTimeout(timer);
    }

    const handleRecommended = () => {
        setUsing('recommended');
        setAlbumsDisplay({ ...[] });

        const timer = setTimeout(() => {
            setAlbumsDisplay(recommendedAlbums)
            
        }, 50);
        return () => clearTimeout(timer);
    }

    return (
        <div className="AlbumShop-Grid">
            <div className="AlbumShop-col1">
                <Typography variant="h4">Album Gallery</Typography>
                <Divider />
                <List>
                    <ListItem disablePadding>
                        <ListItemButton component="a" onClick={handleSaved}>
                            <ListItemText primary="Saved Albums" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component="a" onClick={handleRecommended}>
                            <ListItemText primary="Recommended Albums" />
                        </ListItemButton>
                    </ListItem>
                    
                </List>
            </div>

            <div className="AlbumShop-col2">
                <div className="AlbumShop-col2-row1">
                    <Paper
                        component="form"
                        sx={{ display: 'flex', height: 40, width: '25%', mt: '5px', ml: 'auto'}}
                    >
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Search"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                </div>
                <div className="AlbumShop-col2-row2">
                    <div className="AlbumShop-cards">
                        {albumsDisplay.length > 0 ? albumsDisplay.map(album => <AlbumCard key={album.id} album={album} savedAlbumsIds={savedAlbumsIds} using={using}/>) : ""}
                    </div>
                </div>
            </div>
        </div>
    );

}

export default AlbumShop;

/*
 * 
 *
 * 
 *
 * <nav aria-label="main mailbox folders">
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Inbox />
                                </ListItemIcon>
                                <ListItemText primary="Inbox" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Drafts />
                                </ListItemIcon>
                                <ListItemText primary="Drafts" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </nav>
                <Divider />
                <nav aria-label="secondary mailbox folders">
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemText primary="Trash" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component="a" href="">
                                <ListItemText primary="Spam" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </nav>
            
                */