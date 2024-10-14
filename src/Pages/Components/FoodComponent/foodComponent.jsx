import React from "react";
import Food from "../../../assets/img/food.jpg";
import "./foodComponent.css";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";

export default function FoodComponent() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;
  return (
    <div className="foodComponent">
      <div className="foodComponent-annotation">
        <p className="first">We make food from heart</p>
        <p>
          {" "}
          We have been in the catering business for 10 years, providing
          exceptional services to our clients. Our passion for food and
          commitment to quality have helped us grow and thrive in this
          competitive industry. As we look to the future, we are dedicated to
          further expanding our offerings and enhancing our services to meet
          your needs. Your satisfaction is our priority, and we are excited to
          continue this journey with you!
        </p>
        <Button
          className="learn_more"
          variant="contained"
          endIcon={<SendIcon />}
          aria-describedby={id}
          type="button"
          onClick={handleClick}
        >
          Learn more
        </Button>
        <Popper id={id} open={open} anchorEl={anchorEl}>
          <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>
            Sorry, we dont complete our site.
          </Box>
        </Popper>
      </div>
      <div className="foodComponent-photo">
        <img src={Food} alt="Food"></img>
      </div>
    </div>
  );
}
