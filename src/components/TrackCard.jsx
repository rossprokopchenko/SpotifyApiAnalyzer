import React from 'react';
import { Avatar, Box, Paper, Typography, IconButton, Modal, Backdrop, Button, Accordion, AccordionSummary, AccordionDetails, Toolbar, Tooltip, Link } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HelpIcon from '@mui/icons-material/Help';
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

    const artistString = (artists) => {
        let artistString = "";

        for (let i = 0; i < artists.length; i++) {
            let separator = i !== artists.length-1 ? ", " : "";
            artistString += artists[i].name + separator;
        }

        return artistString;
    }

    const percentage = (num) => {
        return num.toFixed(1) + "%";
    }

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
                    <div style={{marginTop: '10px', display: 'flex', flexDirection: 'row'}}>
                        {track.explicit ? <Avatar sx={{height: '20px', width: '20px', mr: 1}} src={explicit} variant="rounded" /> : ""}
                        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ color: 'lightgray' }}>
                            {track.name}
                        </Typography>
                    </div>
                    <Typography id="modal-modal-description" sx={{ color: 'lightgray' }}>
                        Artist: {artistString(track.artists)} <br />
                        Album: {track.album.name} <br />
                        Release Date: {track.album.release_date} <br />
                        Duration: {handleDurationLabelFormal(track.duration_ms)} <br />
                        Popularity: {track.popularity} <br />
                    </Typography>
                    <Accordion square={false} sx={{mt: '10px', backgroundColor: '#171717'}}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon stroke='white'/>}>
                            <Typography id="modal-modal-description" sx={{ color: 'lightgray', fontWeight: 'bold'}}>
                                Audio Features
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography id="modal-modal-description" sx={{ color: 'lightgray' }}>
                                
                                <b>Danceability:</b> {percentage(trackInfo.danceability * 100)} <br />
                                <b>Energy:</b> {percentage(trackInfo.energy * 100)} <br />
                                <b>Valence:</b> {percentage(trackInfo.valence * 100)} <br />
                                <b>Acousticness:</b> {percentage(trackInfo.acousticness * 100)} <br />
                                <b>Tempo:</b> {Math.round(trackInfo.tempo)} BPM <br />
                                Instrumentalness: {percentage(trackInfo.instrumentalness * 100)} <br />
                                Liveness: {percentage(trackInfo.liveness * 100)} <br />
                                Loudness: {Math.round(trackInfo.loudness)} dB <br />
                                {/*Mode: {trackInfo.mode} <br />*/}
                                Speechiness: {percentage(trackInfo.speechiness * 100)} <br />
                                {/*Time Signature: {trackInfo.time_signature} <br />*/}
                            </Typography>
                            
                                <Link href="https://medium.com/@boplantinga/what-do-spotifys-audio-features-tell-us-about-this-year-s-eurovision-song-contest-66ad188e112a#:~:text=Values%20typical%20range%20between%20-60,to%201.0%20the%20attribute%20value." target="_blank">
                                <Tooltip title="Features Description"><HelpIcon color='info' sx={{mb: '10px', float: 'right'}}/></Tooltip>
                                </Link>
                                
                            
                        </AccordionDetails>
                    </Accordion>
                    <Button sx={{ mt: "10px" }} color="success" variant="outlined" href={track.external_urls.spotify} target="_blank">
                            Open in Spotify</Button>
                </Box>
            </Modal>
        </div>
        );
}

export default TrackCard;