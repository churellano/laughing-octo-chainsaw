import { Container } from "@material-ui/core";
import Map from '../Map';
import NearestList from '../NearestList';
import Box from '@material-ui/core/Box';

function MainContent() {
    return (
        <Box display='flex' flexDirection='row' justifyContent='center' alignItems='flex-start' mt={5}>
            <NearestList />
            <Map />
        </Box>
    )
}

export default MainContent;