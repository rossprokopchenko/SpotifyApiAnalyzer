import React from 'react';
import { useEffect, useState } from 'react';
import { Box, Paper, Typography, Slider } from '@mui/material';
import { PieChart } from 'react-minimal-pie-chart';

function TopGenres(props) {
    const { genres, getGenres } = props;

    const [chartData, setChartData] = useState([]);
    const [hovered, setHovered] = useState();
    const [totalValue, setTotalValue] = useState();
    const [sliderValue, setSliderValue] = useState(1);

    const fontStyle = {
        fontSize: '6px',
        fontWeight: 'bold'
    }

    const data = chartData.map((entry, i) => {
        if (hovered === i) {
          return {
            ...entry
          };
        }

        return entry;
      });

    useEffect(() => {
        if(typeof genres !== undefined){
            var data = [];
            let total = 0;

            for (const [key, value] of genres.entries()) {
                if(data.length < 5) {
                    let color = '';

                    switch(data.length) {
                        case 0:
                            color = '#ff0000';
                            break;
                        case 1:
                            color = '#ff6400';
                            break;
                        case 2:
                            color = '#ffc900';
                            break;
                        case 3:
                            color = '#d1ff00';
                            break;
                        case 4:
                            color = '#6cff00';
                            break;
                        default: 
                            break;
                    }

                    data.push({title: key, value: value, color: color});
                    total += value;
                }
                
            }
            setTotalValue(total);
            setChartData(data);
        }

    }, [genres]);

    const setSliderLabel = (index) => {
        if (index === 0) {
            return '1 month';
        } else if (index === 1) {
            return '6 months';
        } else if (index === 2) {
            return 'several years';
        }
    }

    const sliderChange = (event, value) => {
        let range = '';
        if((sliderValue === 0 && value === 0)
        || (sliderValue === 1 && value === 1)
        || (sliderValue === 2 && value === 2)) return;

        if (value === 0) {
            setSliderValue(0);
            range = 'short_term';
        } else if (value === 1) {
            setSliderValue(1);
            range = 'medium_term';
        } else if (value === 2) {
            setSliderValue(2);
            range = 'long_term';
        }

        getGenres(range);
    }

    return (
        <div>
            <Typography variant="h5">Top genres:</Typography>
                <Box
                    sx={{
                        flexWrap: 'wrap',
                        '& > :not(style)': {
                            backgroundColor: '#282c40'
                        }
                    }}
                >
                    <Paper elevation={3}>
                        <Box sx={{display: 'flex', flexDirection: 'row'}}>
                            <Box sx={{float: 'left', margin: '10px', border: '2px solid black', borderRadius: '3px'}}>
                                <PieChart
                                    style={{height: '250px', width: '250px'}}
                                    data={data} 
                                    lineWidth={45} 
                                    paddingAngle={2}
                                    segmentsShift={(index) => {
                                        return index === hovered
                                          ? 5
                                          : 0;
                                      }}
                                    segmentsStyle={{border: '1px solid black'}}
                                    viewBoxSize={[120, 120]}
                                    center={[60, 60]}
                                    /*label={({ dataEntry }) => `${Math.round(dataEntry.percentage)}%`}*/
                                    labelPosition={75} 
                                    labelStyle={({index}) => fontStyle(index)}
                                    onMouseOver={(_, index) => {
                                        setHovered(index);
                                    }}
                                    onMouseOut={(_, index) => {
                                        setHovered(undefined);
                                    }}
                                    startAngle={0}
                                    animate
                                />
                            </Box>
                            <Box sx={{display: 'flex', flexDirection: 'column', margin: '10px', height: '250px'}}>
                                    {chartData.map(genre => 
                                    <div>
                                        <Typography variant='h6' sx={{color: genre.color}}><b>{Math.round((genre.value / totalValue) * 100)}%</b> {genre.title}</Typography>
                                    </div>
                                    
                                    )}
                                    <Slider
                                aria-label="Term"
                                defaultValue={1}
                                valueLabelDisplay="auto"
                                valueLabelFormat={setSliderLabel}
                                step={1}
                                marks
                                min={0}
                                max={2}
                                onChangeCommitted={sliderChange}
                                sx={{width: '180px', ml: '15px', mt: 'auto'}}
                                />
                            </Box>
                            
                        </Box>
                        
                    </Paper>
                </Box>
        </div>
    );
}

export default TopGenres;