import { Fragment } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import Box from '@material-ui/core/Box';
import { green } from '@material-ui/core/colors';
import { red } from '@material-ui/core/colors';

import { computeDistanceBetween } from 'spherical-geometry-js';
import { Paper } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

const nearestList = [
    {
        name: 'McDonalds',
        address: '9638 160 St, Surrey, BC',
        distance: 0.14,
        score: 0.49,
        reviews: [
            {
                description: 'nothing special, usually clean',
                recommend: true
            }
        ]
    },
    {
        name: 'Chevron',
        address: '9610 160 St, Surrey, BC',
        distance: 0.1,
        score: 0.85,
        reviews: [
            {
                description: 'usually cleaner than the mcdonalds next door',
                recommend: true
            }
        ]
    },
    {
        name: 'North Surrey Community Park',
        address: '15898 97a Ave, Surrey, BC',
        distance: 1.4,
        score: 0.8,
        reviews: [
            {
                description: 'not maintained very often',
                recommend: false
            }
        ]
    },
    {
        name: 'Simon Fraser University - Surrey Campus',
        address: '13450 102 Ave #250, Surrey, BC',
        distance: 5.3,
        score: 0.9,
        reviews: [
            {
                description: 'Use the secluded ones on the main galleria, nestled in the hallways by the theatre',
                recommend: true
            }
        ]
    }
]

const decimalToPercent = (decimal: number) => Math.floor(decimal * 100);

function NearestList() {
    return (
        <Box mr={2} style={{ 'maxWidth': '30%', 'width': '30%' }}>
            <Paper variant='outlined'>
                <Box p={1}>
                    <Typography variant='h5'>Nearest washrooms</Typography>
                </Box>
                <List style={{ 'minWidth': '20%' }}>
                    {
                        nearestList.map((location, index) => (
                            <Fragment>
                                <ListItem alignItems="flex-start">
                                    <ListItemText
                                        primary={location.name}
                                        secondary={
                                            <Box component='div' display='flex' flexDirection='row' justifyContent='space-between' alignItems='center'>
                                                <span>{location.distance} km</span>
                                                <div style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    flexWrap: 'wrap',
                                                }}>
                                                    <span>{decimalToPercent(location.score)}%</span>
                                                    {location.score > 0.5 ? <ThumbUpIcon fontSize='small' style={{ color: green[500] }}/> : <ThumbDownIcon fontSize='small' style={{ color: red[500] }}/>}
                                                </div>
                                            </Box>
                                        }
                                    />
                                </ListItem>
                                {/* Only place dividers between list items */}
                                {(index + 1 === nearestList.length) ? null : <Divider />}
                            </Fragment>
                        ))
                    }
                </List>
            </Paper>
        </Box>
    );
}

export default NearestList;