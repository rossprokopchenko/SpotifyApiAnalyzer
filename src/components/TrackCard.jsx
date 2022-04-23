import React from 'react';
import { Avatar, Box, Paper, Typography, IconButton, Modal, Backdrop, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import explicit from '../resources/explicit.png';

function TrackCard(props) {
    const { track, getTrackInfo } = props;

    const [trackInfo, setTrackInfo] = useState([]);
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        
    }, []);

    const handleDurationLabel = (millis) => {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    };

    const handleDurationLabelFormal = (millis) => {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + (minutes > 1 ? " minutes " : " minute ") + seconds + (seconds == 1 ? " second" : " seconds");
    };

    const handleOpen = () => {
        async function checkData() {
            const data = await getTrackInfo(track.id);
            setTrackInfo(data.data);
        }
        checkData();
        setOpen(true);
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'black',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <div>
            <IconButton onClick={handleOpen} disableRipple={true} sx={{marginTop: '3px', height: '50px', width: '100%'}}>
                <Box
                    sx={{'& > :not(style)': {
                        backgroundColor: '#282c40'
                    },
                    
                    width: '100%'}}
                >
                    <Paper elevation={3} sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        
                    }}>
                        <Avatar
                            src={track.album.images ? track.album.images[0].url : ""}
                            sx={{
                                height: '50px',
                                width: '50px',
                                float: 'left'
                            }}
                            alt={track.album.artists[0].name}
                            variant="rounded"
                        />
                        <Box sx={{display: 'flex', flexDirection: 'column', width: '80%'}}>
                            <Typography
                                variant="body1"
                                sx={{
                                    fontSize: '15px',
                                    fontWeight: 'bold',
                                    color: 'lightgray',
                                    textAlign: 'center',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    paddingLeft: '10px',
                                    paddingRight: '10px'
                                }}
                            >
                                {track.name}
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    fontSize: '13px',
                                    color: 'lightgray',
                                    textAlign: 'center'
                                }}
                            >
                                {track.artists[0].name}
                            </Typography>
                        </Box>
                        
                        <Box sx={{display: 'flex', flexDirection: 'row', ml: 'auto', mr: '10px', mt: 'auto', mb: 'auto'}}>
                            <Typography sx={{textAlign: 'right', color: 'lightgray', fontStyle: 'italic'}}>{handleDurationLabel(track.duration_ms)}</Typography>  
                        </Box>
                        
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
                        src={track.album.images[0].url}
                        sx={{
                            height: '128px',
                            width: '128px',
                            marginLeft: 'auto',
                            marginRight: 'auto'
                        }}
                        alt={track.album.artists[0].name}
                        variant="rounded"
                    />
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        {track.explicit ? <Avatar sx={{height: '20px', width: '20px', mr: 1}} src={explicit} variant="rounded" /> : ""}
                        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ color: 'lightgray' }}>
                            {track.name}
                        </Typography>
                    </div>
                    <Typography id="modal-modal-description" sx={{ color: 'lightgray' }}>
                        Artist: {track.artists.map(artist => artist.name + " ")} <br />
                        Album: {track.album.name} <br />
                        Release Date: {track.album.release_date} <br />
                        Duration: {handleDurationLabelFormal(track.duration_ms)} <br />
                        Popularity: {track.popularity} <br />
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 1, color: 'lightgray', fontWeight: 'bold'}}>
                        Audio Features
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ color: 'lightgray' }}>
                        Acousticness: {trackInfo.acousticness} <br />
                        Danceability: {trackInfo.danceability} <br />
                        Energy: {trackInfo.energy} <br />
                        Instrumentalness: {trackInfo.instrumentalness} <br />
                        Key: {trackInfo.key} <br />
                        Liveness: {trackInfo.liveness} <br />
                        Loudness: {trackInfo.loudness} <br />
                        {/*Mode: {trackInfo.mode} <br />*/}
                        Speechiness: {trackInfo.speechiness} <br />
                        Tempo: {trackInfo.tempo} <br />
                        {/*Time Signature: {trackInfo.time_signature} <br />*/}
                    </Typography>
                    <Button sx={{ mt: 1 }} color="success" variant="outlined" href={track.external_urls.spotify} target="_blank">
                            Open in Spotify</Button>
                </Box>
            </Modal>
        </div>
        );
}

export default TrackCard;