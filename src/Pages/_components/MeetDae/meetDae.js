import React, { Component } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import "./meet-dae.css";
import firstGirl from "../../../assets/img/First-girl.png";
import secondGirl from "../../../assets/img/Second-girl.png";

class MeetDae extends Component {
  render() {
    const { annotation, description } = this.props;

    return (
      <Card
        className="meet-dae"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          boxShadow: 3,
          height: { xs: "auto", md: "100vh" },
          overflow: "hidden",
        }}
      >
        <CardMedia
          component="img"
          image={firstGirl}
          alt="First girl"
          className="first-girl"
          sx={{
            width: { xs: "100%", md: "50%" },
            objectFit: "cover",
          }}
        />
        <CardContent sx={{ padding: 3, flex: 1 }}>
          <Typography
            variant="h4"
            data-i18="meetDae"
            sx={{ marginBottom: 2, fontWeight: "bold" }}
            className="Dae-line"
          >
            {annotation}
          </Typography>
          <Typography
            variant="body1"
            data-i18="textDae"
            sx={{ marginBottom: 2 }}
            className="Dae-text"
          >
            {description}
          </Typography>
          <Button
            variant="outlined"
            data-i18="learnMore"
            className="Learn-more open-modal"
            sx={{
              color: "primary.main",
              borderColor: "primary.main",
              "&:hover": { backgroundColor: "primary.light" },
            }}
          >
            Read More
          </Button>
        </CardContent>
      </Card>
    );
  }
}

export default MeetDae;
