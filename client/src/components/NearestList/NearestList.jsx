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

// From https://stackoverflow.com/a/56460731
const truncate = (str, max = 10) => {
    const array = str.trim().split(' ');
    const ellipsis = array.length > max ? '...' : '';

    return array.slice(0, max).join(' ') + ellipsis;
};

const decimalToPercent = (decimal) => Math.floor(decimal * 100);

function NearestList() {
    return (
        <List style={{'maxWidth': '10%'}}>
            {
                nearestList.map(location => (
                    <ListItem alignItems="flex-start">
                        <ListItemText
                            primary={location.name}
                            secondary={
                                <Fragment>
                                    <Typography component="div" variant="body2" color="textPrimary">"{truncate(location.reviews[0].description)}"</Typography>
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
                                </Fragment>
                            }
                        />
                    </ListItem>
                ))
            }
        </List>
    );
}

export default NearestList;