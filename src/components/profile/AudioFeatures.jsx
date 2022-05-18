import React from 'react';
import { Typography, Box, Paper, Slider } from '@mui/material';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

function AudioFeatures(props) {
    const { averageAudioFeatures, getAudioFeatures } = props;

    const [chartData, setChartData] = useState([]);
    const [tempo, setTempo] = useState();
    const [sliderValue, setSliderValue] = useState(1);

    const data = {
        labels: chartData ? Object.keys(chartData) : "",
        // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
        datasets: [
            {
              label: ' Avg. Percentage',
              data: chartData ? Object.values(chartData) : "",
              // you can set indiviual colors for each bar
              borderColor: 'white',
              backgroundColor: [
                '#ff0000',
                '#ff6400',
                '#ffc900',
                '#d1ff00'
              ],
              borderWidth: 2,
              borderRadius: 3,
              hoverBorderRadius: 0
            }
        ]
    }

    const options = {
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                color: 'lightgray',
                text: 'Average Top Track Audio Features',
                font: {
                    size: 15,
                    weight: 'normal'
                }
            }
        },
        scales: {
            y: {
                suggestedMin: 0,
                suggestedMax: 100,
                ticks: {
                    color: 'lightgray',
                    callback: function(value, index, ticks) {
                        return value + '%';
                    }
                },
                grid: {
                    drawBorder: false,
                    color: function(context) {
                      if (context.tick.value > 0) {
                        return 'gray';
                      } else if (context.tick.value < 0) {
                        return 'red';
                      }
          
                      return '#000000';
                    }
                }
            },
            x: {
                ticks:{
                    font: {
                        size: '14px'
                    },
                    color: 'lightgray'
                },
                grid: {
                    drawBorder: false,
                    color: '#4c4c4c'
                }
            }
        }
    }

    useEffect(() => {
        if(averageAudioFeatures) {
            setTempo(averageAudioFeatures["Tempo"]);
            delete averageAudioFeatures["Tempo"];
        }

        const data = averageAudioFeatures;

        setChartData(data);
    }, [averageAudioFeatures])

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

        getAudioFeatures(range);
    }

    return(
        <div style={{marginTop: '10px'}}>
            <Typography variant='h5'>Audio Features:</Typography>
            <Box
                sx={{
                    width: '550px',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                        backgroundColor: '#282c40'
                    }
                }}
            >
                 
                <Paper elevation={3} sx={{p: '15px', color: 'white'}}>
                    <Bar
                        style={{border: '2px solid black'}}
                        data={data}
                        options={options}
                    />
                    <Box sx={{display: 'flex', flexDirection: 'row'}}>
                        <Typography variant='subtitle' sx={{pt: '10px' }}>Average Tempo: {tempo} BPM</Typography>
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
                            sx={{width: '180px', ml: 'auto', mr: '30px', mt: '8px'}}
                        />
                    </Box>
                    
                    
                </Paper>
            </Box>
        </div>
    );
}

export default AudioFeatures;