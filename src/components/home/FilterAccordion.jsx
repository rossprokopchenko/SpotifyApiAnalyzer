import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';

export function FilterAccordion(props) {
    const { getTrackRecommendations, availableGenres } = props;

    const defaultSortCheckboxes = {
      energy: false,
      valence: false,
      danceability: false,
      acousticness: false,
      tempo: false,
      popularity: false,
      duration: false
    }

    const [genresString, setGenresString] = useState("hip-hop, pop");
    const [popularityValue, setPopularityValue] = useState([0, 100]);
    const [energyValue, setEnergyValue] = useState([0, 1]);
    const [danceabilityValue, setDanceabilityValue] = useState([0, 1]);
    const [valenceValue, setValenceValue] = useState([0, 1]);
    const [acousticnessValue, setAcousticnessValue] = useState([0, 1]);
    const [tempoValue, setTempoValue] = useState([0, 500]);
    const [durationValue, setDurationValue] = useState([0, 10000000]);
    const [limitValue, setLimitValue] = useState(20); 
    const [sortCheck, setSortCheck] = useState(defaultSortCheckboxes);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 900,
      height: 600,
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'wrap',
      bgcolor: 'black',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
  };

    const handleGenresChange = (event) => {
      setGenresString(event.target.value);
    };

    const handlePopularityChange = (event) => {
      setPopularityValue(event.target.value);
    };
    
    const handleEnergyChange = (event) => {
      setEnergyValue(event.target.value);
    };

    const handleValenceChange = (event) => {
      setValenceValue(event.target.value);
    }

    const handleDanceabilityChange = (event) => {
      setDanceabilityValue(event.target.value);
    }

    const handleAcousticnessChange = (event) => {
      setAcousticnessValue(event.target.value);
    }

    const handleTempoChange = (event) => {
      setTempoValue(event.target.value);
    }

    const handleDurationChange = (event) => {
      setDurationValue(event.target.value);
    };

    const handleDurationLabel = (millis) => {
      var minutes = Math.floor(millis / 60000);
      var seconds = ((millis % 60000) / 1000).toFixed(0);
      return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    };

    const handleLimitChange = (event) => {
      setLimitValue(event.target.value);
    };

    const handleEnergyCheck = (event) => {
      setSortCheck(defaultSortCheckboxes);
      setSortCheck(prevState => ({
        ...prevState,
        energy: event.target.checked
      }));
    }

    const handleValenceCheck = (event) => {
      setSortCheck(prevState => ({
        ...prevState,
        valence: event.target.checked
      }));
    }

    const handleDanceabilityCheck = (event) => {
      setSortCheck(prevState => ({
        ...prevState,
        danceability: event.target.checked
      }));
    }

    const handleAcousticnessCheck = (event) => {
      setSortCheck(prevState => ({
        ...prevState,
        acousticness: event.target.checked
      }));
    }

    const handleTempoCheck = (event) => {
      setSortCheck(prevState => ({
        ...prevState,
        tempo: event.target.checked
      }));
    }

    const handlePopularityCheck = (event) => {
      setSortCheck(prevState => ({
        ...prevState,
        popularity: event.target.checked
      }));
    }

    const handleDurationCheck = (event) => {
      setSortCheck(prevState => ({
        ...prevState,
        duration: event.target.checked
      }));
    }

    const handleFilter = () => {
      getTrackRecommendations(genresString, energyValue, valenceValue, danceabilityValue, acousticnessValue, tempoValue, popularityValue, durationValue, limitValue, sortCheck);
    }
    
    return (
      <div>
        <Accordion sx={{backgroundColor: '#FEC260'}}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{fontWeight: 'bold'}}>Filter</Typography>
          </AccordionSummary>
        <AccordionDetails sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
          <Box sx={{width: '400px', display: 'flex', flexDirection: 'column'}}>
            <Typography>Genres</Typography>
            <Paper
              component="form"
              sx={{ display: 'flex', mt: '5px', mb: '20px', height: 40, width: '400px'}}
            >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="genre,genre,genre"
                defaultValue=""
                onChange={handleGenresChange}
            />
            </Paper>
            
          </Box>
          <Box sx={{width: '400px', display: 'flex', flexDirection: 'column'}}>
            <Button sx={{mt: '29px', ml: 2, width: '210px', height: '40px'}} color="success" variant="outlined" onClick={handleOpen}>See Available Genres</Button>
          </Box>
          <Box sx={{width: '175px', display: 'flex', flexDirection: 'column'}}>
            <Box sx={{display: 'flex', flexDirection: 'row'}}>
              <Typography sx={{width: '50px'}}>Energy</Typography>
              <Tooltip title='Sort by Energy'>
                <Checkbox sx={{ml: 'auto', height: '25px', width: '0px'}} value={sortCheck.energy} onChange={handleEnergyCheck}></Checkbox>
              </Tooltip>
            </Box>
            <Slider
                getAriaLabel={() => 'Energy range'}
                value={energyValue}
                step={0.001}
                max={1}
                onChange={handleEnergyChange}
                valueLabelDisplay="auto"
              />
          </Box>
          <Box sx={{ml: '40px', width: '175px', display: 'flex', flexDirection: 'column'}}>
            <Box sx={{display: 'flex', flexDirection: 'row'}}>
              <Typography sx={{width: '50px'}}>Valence</Typography>
              <Tooltip title='Sort by Valence'>
                <Checkbox sx={{ml: 'auto', height: '25px', width: '0px'}} value={sortCheck.valence} onChange={handleValenceCheck}></Checkbox>
              </Tooltip>
            </Box>
            <Slider
                getAriaLabel={() => 'Valence range'}
                value={valenceValue}
                step={0.001}
                max={1}
                onChange={handleValenceChange}
                valueLabelDisplay="auto"
              />
          </Box>
          <Box sx={{ml: '40px', width: '175px', display: 'flex', flexDirection: 'column'}}>
            <Box sx={{display: 'flex', flexDirection: 'row'}}>
              <Typography sx={{width: '50px'}}>Danceability</Typography>
              <Tooltip title='Sort by Danceability'>
                <Checkbox sx={{ml: 'auto', height: '25px', width: '0px'}} value={sortCheck.danceability} onChange={handleDanceabilityCheck}></Checkbox>
              </Tooltip>
            </Box>
            <Slider
                getAriaLabel={() => 'Danceability range'}
                value={danceabilityValue}
                step={0.001}
                max={1}
                onChange={handleDanceabilityChange}
                valueLabelDisplay="auto"
              />
          </Box>
          <Box sx={{ml: '40px', width: '175px', display: 'flex', flexDirection: 'column'}}>
            <Box sx={{display: 'flex', flexDirection: 'row'}}>
              <Typography sx={{width: '50px'}}>Acousticness</Typography>
              <Tooltip title='Sort by Acousticness'>
                <Checkbox sx={{ml: 'auto', height: '25px', width: '0px'}} value={sortCheck.acousticness} onChange={handleAcousticnessCheck}></Checkbox>
              </Tooltip>
            </Box>
            <Slider
                getAriaLabel={() => 'Acousticness range'}
                value={acousticnessValue}
                step={0.001}
                max={1}
                onChange={handleAcousticnessChange}
                valueLabelDisplay="auto"
              />
          </Box>
          <Box sx={{width: '175px', display: 'flex', flexDirection: 'column'}}>
            <Box sx={{display: 'flex', flexDirection: 'row'}}>
              <Typography sx={{width: '50px'}}>Tempo</Typography>
              <Tooltip title='Sort by Tempo'>
                <Checkbox sx={{ml: 'auto', height: '25px', width: '0px'}} value={sortCheck.tempo} onChange={handleTempoCheck}></Checkbox>
              </Tooltip>
            </Box>
            <Slider
                getAriaLabel={() => 'Tempo range'}
                value={tempoValue}
                max={tempoValue[1]}
                onChange={handleTempoChange}
                valueLabelDisplay="auto"
              />
          </Box>
          <Box sx={{ml: '40px', width: '175px', display: 'flex', flexDirection: 'column'}}>
            <Box sx={{display: 'flex', flexDirection: 'row'}}>
              <Typography sx={{width: '50px'}}>Popularity</Typography>
              <Tooltip title='Sort by Popularity'>
                <Checkbox sx={{ml: 'auto', height: '25px', width: '0px'}} value={sortCheck.popularity} onChange={handlePopularityCheck}></Checkbox>
              </Tooltip>
            </Box>
            <Slider
                getAriaLabel={() => 'Popularity range'}
                value={popularityValue}
                onChange={handlePopularityChange}
                valueLabelDisplay="auto"
              />
          </Box>
          <Box sx={{ml: '40px', width: '175px', display: 'flex', flexDirection: 'column'}}>
            <Box sx={{display: 'flex', flexDirection: 'row'}}>
              <Typography sx={{width: '50px'}}>Duration</Typography>
              <Tooltip title='Sort by Duration'>
                <Checkbox sx={{ml: 'auto', height: '25px', width: '0px'}} value={sortCheck.duration} onChange={handleDurationCheck}></Checkbox>
              </Tooltip>
            </Box>
            <Slider
                getAriaLabel={() => 'Duration range'}
                value={durationValue}
                max={900000}
                onChange={handleDurationChange}
                valueLabelFormat={handleDurationLabel}
                valueLabelDisplay="auto"
              />
          </Box>
          <Box sx={{ml: '40px', width: '175px', display: 'flex', flexDirection: 'column'}}>
            <Typography>Limit</Typography>
            <Slider
                getAriaLabel={() => 'Limit range'}
                min={1}
                value={limitValue}
                onChange={handleLimitChange}
                valueLabelDisplay="auto"
              />
          </Box>
          <Button sx={{mt: 3, height: '40px'}} color="success" variant="contained" onClick={handleFilter}>Apply</Button>
        </AccordionDetails>
      </Accordion>

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
          {availableGenres.map(genre => <Typography color='lightgray'>• {genre}</Typography>)}
        </Box>

      </Modal>
      </div>
    );
}