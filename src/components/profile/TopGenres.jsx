import React from 'react';
import { useEffect, useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { PieChart } from 'react-minimal-pie-chart';

function TopGenres(props) {
    const { genres } = props;

    const [chartData, setChartData] = useState([]);
    const [hovered, setHovered] = useState();
    const [totalValue, setTotalValue] = useState();

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

    return (
        <div>
            <Typography variant="h5">Top genres:</Typography>
                <Box
                    sx={{
                        flexWrap: 'wrap',
                        height: '300px',
                        '& > :not(style)': {
                            backgroundColor: '#282c40'
                        }
                    }}
                >
                    <Paper elevation={3}>
                        <Box sx={{display: 'flow-root', flexDirection: 'row'}}>
                            <Box sx={{float: 'left', margin: '10px', border: '1px solid black', borderRadius: '3px'}}>
                                <PieChart
                                    animate
                                    animationDuration={500}
                                    animationEasing="ease-out"
                                    style={{height: '250px', width: '250px'}}
                                    data={data} 
                                    lineWidth={50} 
                                    paddingAngle={2}
                                    segmentsShift={(index) => {
                                        return index === hovered
                                          ? 5
                                          : 0;
                                      }}
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
                                />
                            </Box>
                            <Box sx={{padding: '10px'}}>
                                    {chartData.map(genre => 
                                    <div style={{}}>
                                        <Typography variant='h6' sx={{color: genre.color}}>{Math.round((genre.value / totalValue) * 100)}% - {genre.title}</Typography>
                                    </div>
                                    
                                    )}
                            </Box>
                        </Box>
                        
                    </Paper>
                </Box>
        </div>
    );
}

export default TopGenres;