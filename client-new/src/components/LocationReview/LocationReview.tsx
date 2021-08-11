import { ListItem, ListItemAvatar, Avatar, ListItemText, Typography } from "@material-ui/core";
import { Fragment } from "react";
import { ILocationReview } from "../../interfaces/ILocationReview";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

interface ILocationReviewProps {
    locationReview: ILocationReview;
};

function LocationReview({ locationReview }: ILocationReviewProps) {
    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar>{locationReview.user.username.split('')[0]}</Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={locationReview.user.username}
                secondary={
                    <Fragment>
                        <Typography component="div" variant="body2" color="textSecondary">{dayjs().to(locationReview.postedDate)}</Typography>
                        <Typography component="div" variant="body2" color="textPrimary">{locationReview.description}</Typography>
                    </Fragment>
                }>
            </ListItemText>
        </ListItem>
    );
}

export default LocationReview;