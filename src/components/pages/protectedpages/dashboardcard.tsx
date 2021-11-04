import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

interface DCardProps {
  to?: string;
  imgSrc: string;
  imgAlt: string;
  cardTitle: string;
  cardDescription: string;
  className?: string;
  onClick?: () => any;
}

export default function DashboardCard(props: DCardProps) {
  const lTo = props.to === undefined ? "/" : props.to;
  return (
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
