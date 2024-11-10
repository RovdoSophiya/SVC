import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Collapse,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./about.css";

const About = ({ title, description, moreInfo }) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="aboutContainer">
      <Typography
        variant="h6"
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          fontSize: "30px",
          color: "rgba(128, 96, 68, 1)",
          "@media(max-width:500px)": {
            fontSize: "20px",
          },
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          width: "85%",
          margin: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          lineHeight: "2",
          textAlign: "center",
          "@media(max-width:500px)": {
            width: "95%",
          },
        }}
      >
        {description}
      </Typography>
      <Accordion expanded={expanded} onChange={handleChange}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            width: "200px",
            margin: "auto",
            color: "rgb(249, 196, 151)",
          }}
        >
          <Typography>
            {expanded ? "Less Information" : "More Information"}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Typography
              sx={{
                width: "85%",
                margin: "auto",
                display: "flex",
                color: "rgba(128, 96, 68, 1) ",
                justifyContent: "center",
                alignItems: "center",
                lineHeight: "2",
                textAlign: "center",
                opacity: expanded ? 1 : 0,
                transition: "opacity 0.7s ease-in-out", // Плавный переход
                "@media(max-width:500px)": {
                  width: "95%",
                },
              }}
            >
              {moreInfo}
            </Typography>
          </Collapse>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default About;
