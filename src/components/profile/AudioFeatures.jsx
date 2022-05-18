import React from 'react';
import { Typography, Box, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

function AudioFeatures(props) {
    const { averageAudioFeatures, profile } = props;

    const [chartData, setChartData] = useState([]);
    const [tempo, setTempo] = useState();

    const data = {
        labels: chartData ? Object.keys(chartData) : "",
        // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
        datasets: [
            {
              label: 'Percentage',
              data: chartData ? Object.values(chartData) : "",
              // you can set indiviual colors for each bar
              backgroundColor: [
                '#ff0000',
                '#ff6400',
                '#ffc900',
                '#d1ff00'
              ],
              borderWidth: 3,
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
                }
            },
            x: {
                ticks:{
                    font: {
                        size: '14px'
                    },
                    color: 'lightgray'
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

        data ? console.log(Object.values(data)) : console.log();

        setChartData(data);
    }, [averageAudioFeatures])

    return(
        <div style={{marginTop: '10px'}}>
            {chartData && averageAudioFeatures ? <div>
            <Typography variant='h5'>Audio Features:</Typography>
            <Box
                sx={{
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                        backgroundColor: '#282c40'
                    }
                }}
            >
                 
                <Paper elevation={3} sx={{padding: '10px', color: 'white'}}>
                    
                    <Bar
                        style={{border: '2px solid black'}}
                        data={data}
                        options={options}
                    />
                    <Typography variant='subtitle' sx={{p: '10px', mb: '10px'}}>Average Tempo: {tempo} BPM</Typography>
                </Paper>
            </Box>
            </div>
            : ""}
        </div>
    );
}

export default AudioFeatures;