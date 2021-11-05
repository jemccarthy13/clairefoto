// External Utilities
import { Link } from "react-router-dom";

// MUI Library
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

/**
 * Interface for props of the media card
 *
 * @member {string} imgSrc - source for the card image
 * @member {string} imgAlt - alt text for the card image
 * @member {string} cardTitle - the title for the media card
 * @member {string} cardDescription - description text for the media card
 * @member {string} to - (optional) link to navigate to on card click
 * @member {string} className - (optional) style for the image
 * @member {function} onClick - action that happens when card clicked
 */
interface DCardProps {
  imgSrc: string;
  imgAlt: string;
  cardTitle: string;
  cardDescription: string;
  to?: string;
  className?: string;
  onClick?: () => any;
}

/**
 * Component to render the Dashboard UI
 *
 * @param props Media Card properties
 * @returns JSX.Element to render dashboard UI
 */
export default function DashboardCard(props: DCardProps) {
  // make link self-referring ("/" = home/dashboard)
  const lTo = props.to === undefined ? "/" : props.to;
  return (
    // Card boilerplate for MUI
    <Grid item xs={6}>
      <Card sx={{ maxWidth: 345, margin: "auto" }}>
        <CardActionArea component={Link} to={lTo} onClick={props.onClick}>
          <CardMedia
            className={props.className}
            component="img"
            height="140"
            image={props.imgSrc}
            alt={props.imgAlt}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {props.cardTitle}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {props.cardDescription}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
