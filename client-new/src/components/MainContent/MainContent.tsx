import { Container } from "@material-ui/core";
import MapContainer from '../MapContainer';
import NearestList from '../NearestList';
import Box from '@material-ui/core/Box';
import LocationDetails from '../LocationDetails';

function MainContent() {
    return (
        <Container>
            <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='flex-start' mt={5} style={{ 'height': '85vh'}}>
                <NearestList />
                <MapContainer />
                <LocationDetails />
            </Box>
        </Container>
    );
}

export default MainContent;