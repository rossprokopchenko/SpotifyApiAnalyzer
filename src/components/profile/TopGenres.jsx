import React from 'react';
import { useEffect, useState } from 'react';
import { Box, Paper, Typography, Slider } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

function TopGenres(props) {
    const { genres, getGenres } = props;

    const [chartData, setChartData] = useState([]);
    const [totalValue, setTotalValue] = useState();
    const [sliderValue, setSliderValue] = useState(1);

    const data = {
        labels: chartData.map(a => a.title),
          datasets: [{
            data: chartData.map(a => (a.value / totalValue * 100).toFixed(0)),
            backgroundColor: chartData.map(a => a.color),
            hoverOffset: 20,
            hoverBorderRadius: 3
          }]
    }

    const options = {
        plugins: {
            legend: {
                display: false
            }
        },
        layout: {
            padding: 15
        }
        
    }

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
                            <Box sx={{height: '250px', width: '250px', float: 'left', margin: '10px', border: '2px solid black', borderRadius: '3px'}}>
                                <Doughnut data={data} options={options} width={"30%"} />
                            </Box>
                            <Box sx={{display: 'flex', flexDirection: 'column', margin: '10px', height: '250px'}}>
                                    {chartData.map(genre => 
                                    <div key={genre.value}>
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