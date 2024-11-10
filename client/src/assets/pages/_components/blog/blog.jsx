import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid2 from "@mui/material/Grid2";
import React from "react";
import "./blog.css";
import blog1 from "../../../img/blog/blog1.png";
import blog2 from "../../../img/blog/blog2.png";
import blog3 from "../../../img/blog/blog3.png";

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

const Blog = () => {
  const blogs = [
    { image: blog1, text: "How Much Does Catering for a Party Cost?" },
    {
      image: blog2,
      text: "What is a Grazing Platter & Why Are They Trending?",
    },
    { image: blog3, text: "Spread Joy at the Workplace: Finger Platters" },
  ];
  return (
    <div className="blogContainer">
      {" "}
      <p className="blogs">Blog posts</p>
      <Grid2
        container
        spacing={{ xs: 1, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {blogs.map((item, index) => (
          <Grid2 key={index} size={{ xs: 2, sm: 4, md: 4 }}>
            <Item>
              <img
                className="collectionPhoto"
                src={item.image}
                alt="none"
                style={{ width: "100%", borderRadius: "8px" }}
              />
              <p className="description">{item.text}</p>
            </Item>
          </Grid2>
        ))}
      </Grid2>
    </div>
  );
};

export default Blog;
