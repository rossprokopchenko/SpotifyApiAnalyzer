import * as React from 'react';
import './AlbumCard.css';
import { Avatar, Box, Paper, Typography, IconButton, Modal, Button, Backdrop } from '@mui/material';

function AlbumCard(props) {
    const { using, album } = props;

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
        return {
            '& > :not(style)': {
                backgroundColor: '#282c40',
                width: '132px',
                height: '180px',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
            },

            "& > :hover": {
                backgroundColor: '#282c60',
                transition: '200ms ease-in'
            }
        }
    }

    function albumInfoBox() {
        switch(using) {
            case 'recommended':
                return (
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
                        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mt: 1, color: 'lightgray' }}>
                            {album.name}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ color: 'lightgray' }}>
                            Artist: {album.artists.map(artist => artist.name + " ")} <br />
                            Tracks: {album.total_tracks} <br />
                            Release Date: {album.release_date}
                        </Typography>
                        <Button sx={{ mt: 1, height: '35px' }} color="success" variant="outlined" href={album.external_urls.spotify} target="_blank">
                            Open in Spotify</Button>
                        
                    </Box>
                );
            default:
                return(
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
                        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mt: 1, color: 'lightgray', fontWeight: 'bold'}}>
                            {album.name}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ color: 'lightgray' }}>
                            Artist: {album.artists.map(artist => artist.name + " ")} <br />
                            Label: {album.label} <br />
                            Tracks: {album.total_tracks} <br />
                            Popularity: {album.popularity} <br />
                            Release Date: {album.release_date}
                        </Typography>
                        <Button sx={{ mt: 1, height: '35px'}} color="success" variant="outlined" href={album.external_urls.spotify} target="_blank">
                            Open in Spotify</Button>
                    </Box>
                );
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
                            sx={{ fontSize: '13px', fontWeight: 'bold', color: 'lightgray', marginTop: '3px'}}
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
            {albumInfoBox()}
            </Modal>
        </div>
    );
}

export default AlbumCard;
