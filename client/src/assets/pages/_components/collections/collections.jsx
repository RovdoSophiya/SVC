import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid2 from "@mui/material/Grid2";
import React from "react";
import { Link } from "react-router-dom";
import "./collections.css";
import collection1 from "../../../img/collection/collection1.png";
import collection2 from "../../../img/collection/collection2.png";
import collection3 from "../../../img/collection/collection3.png";
import collection4 from "../../../img/collection/collection4.png";
import collection5 from "../../../img/collection/collection5.png";
import collection6 from "../../../img/collection/collection6.png";
import collection7 from "../../../img/collection/collection7.png";
import collection8 from "../../../img/collection/collection8.png";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
    height: "300px",
    width: "200px",
  }),
}));

const Collections = () => {
  const collections = [
    { image: collection1, text: "New & Refreshed", link: "/dishes" },
    { image: collection7, text: "Grazing Food", link: "/dishes" },
    { image: collection3, text: "Finger Food", link: "/dishes" },
    { image: collection4, text: "Hot Food", link: "/dishes" },
    { image: collection5, text: "Kids Party", link: "/dishes" },
    { image: collection6, text: "Sandwich", link: "/dishes" },
    { image: collection2, text: "Last Minute Orders", link: "/dishes" },
    { image: collection8, text: "Corporate Platters", link: "/dishes" },
  ];
  return (
    <div className="collectionsContainer">
      {" "}
      <p className="collections">OUR COLLECTIONS</p>
      <Grid2
        container
        spacing={{ xs: 2, md: 4 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {collections.map((item, index) => (
          <Grid2 key={index} size={{ xs: 2, sm: 4, md: 4 }}>
            <Item>
              <Link
                to={item.link}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <img
                  className="collectionPhoto"
                  src={item.image}
                  alt="none"
                  style={{ width: "100%", borderRadius: "8px" }}
                />
                <p className="description">{item.text}</p>
              </Link>
            </Item>
          </Grid2>
        ))}
      </Grid2>
    </div>
  );
};

export default Collections;
