import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
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
import FormControlLabel from '@mui/material/FormControlLabel';

export function FilterAccordion(props) {
    const { getTrackRecommendations, availableGenres } = props;

    const [genresString, setGenresString] = useState("hip-hop, pop");
    const [popularityValue, setPopularityValue] = useState([0, 100]);
    const [energyValue, setEnergyValue] = useState([0, 1]);
    const [speechinessValue, setSpeechinessValue] = useState([0, 100]);
    const [durationValue, setDurationValue] = useState([0, 900000]);
    const [limitValue, setLimitValue] = useState(20); 
    const [sortCheck, setSortCheck] = useState(false);

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

    const handleSpeechinessChange = (event) => {
      setSpeechinessValue(event.target.value);
    };

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

    const handleSortChange = (event) => {
      setSortCheck(event.target.checked);
    }

    const handleFilter = () => {
      getTrackRecommendations(genresString, popularityValue, energyValue, speechinessValue, durationValue, limitValue, sortCheck);
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
            <Typography>Popularity</Typography>
            <Slider
                getAriaLabel={() => 'Popularity range'}
                value={popularityValue}
                onChange={handlePopularityChange}
                valueLabelDisplay="auto"
              />
          </Box>
          <Box sx={{ml: '40px', width: '175px', display: 'flex', flexDirection: 'column'}}>
            <Typography>Energy</Typography>
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
            <Typography>Speechiness</Typography>
            <Slider
                getAriaLabel={() => 'Speechiness range'}
                value={speechinessValue}
                step={0.001}
                max={1}
                onChange={handleSpeechinessChange}
                valueLabelDisplay="auto"
              />
          </Box>
          <Box sx={{ml: '40px', width: '175px', display: 'flex', flexDirection: 'column'}}>
            <Typography>Duration</Typography>
            <Slider
                getAriaLabel={() => 'Duration range'}
                value={durationValue}
                max={900000}
                onChange={handleDurationChange}
                valueLabelFormat={handleDurationLabel}
                valueLabelDisplay="auto"
              />
          </Box>
          <Box sx={{width: '175px', display: 'flex', flexDirection: 'column'}}>
            <Typography>Limit</Typography>
            <Slider
                getAriaLabel={() => 'Limit range'}
                min={1}
                value={limitValue}
                onChange={handleLimitChange}
                valueLabelDisplay="auto"
              />
          </Box>
          <Box sx={{mt: '10px', ml: '30px', width: '600px', display: 'flex', flexDirection: 'column'}}>
            <FormControlLabel control={<Checkbox checked={sortCheck} onChange={handleSortChange}/>} label="Sort by Popularity" ></FormControlLabel>
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