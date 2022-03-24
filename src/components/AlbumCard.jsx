import * as React from 'react';
import './AlbumCard.css';
import PropTypes from 'prop-types';
import { Avatar, Box, Paper, Typography, IconButton, Modal, Button, Backdrop } from '@mui/material';

function AlbumCard(props) {
    const { savedAlbumsIds, using, album } = props;

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'black',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const boxStyle = () => {
        switch (using) {
            case 'recommended' && !savedAlbumsIds.includes(album.id):
                return {
                    '& > :not(style)': {
                        backgroundColor: '#282c00',
                        width: '132px',
                        height: '180px',
                        marginLeft: '',
                        marginTop: '10px'
                    },

                    "& > :hover": {
                        backgroundColor: '#282c60'
                    }
                }
                break;
            default:
                return {
                    '& > :not(style)': {
                        backgroundColor: '#282c40',
                        width: '132px',
                        height: '180px',
                        marginLeft: '',
                        marginTop: '10px',
                        overflow: 'hidden'
                    },

                    "& > :hover": {
                        backgroundColor: '#282c60'
                    }
                }
                break;
        }
    }

    return (
        <div className="Album-card">
            <IconButton onClick={handleOpen} disableRipple={true}>
                <Box
                    sx={boxStyle()}
                >
                    <Paper elevation={4}>
                        <Avatar
                            src={album.images[0].url}
                            sx={{
                                height: '126px',
                                width: '126px',
                                display: 'flex',
                                marginLeft: 'auto',
                                marginRight: 'auto'
                            }}
                            alt={album.artists[0].name}
                            variant="rounded"
                        />
                        <Typography
                            variant="body1"
                            sx={{ fontSize: '13px', fontWeight: 'bold', color: 'lightgray', padding: '2px' }}
                        >
                            {album.name}
                        </Typography>
                    </Paper>

                </Box>
            </IconButton>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Box sx={style}>
                    <Avatar
                        src={album.images[0].url}
                        sx={{
                            height: '128px',
                            width: '128px',
                            display: 'flex',
                            marginLeft: 'auto',
                            marginRight: 'auto'
                        }}
                        alt={album.artists[0].name}
                        variant="rounded"
                    />
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ color: 'lightgray' }}>
                        {album.name}
                        
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ color: 'lightgray' }}>
                        Artist: {album.artists.map(artist => artist.name + " ")} <br />
                        Tracks: {album.total_tracks} <br />
                        Release Date: {album.release_date}
                    </Typography>
                    <Button sx={{ mt: 1 }} color="success" variant="outlined" href={album.external_urls.spotify} target="_blank">
                        Open in Spotify</Button>
                    
                </Box>
            </Modal>
        </div>
    );
}

export default AlbumCard;
