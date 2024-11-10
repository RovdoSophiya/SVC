import React from "react";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import Delivery from "../../../img/icons/delivery.png";
import Plant from "../../../img/icons/plant.png";
import Talk from "../../../img/icons/talk.png";
import Heart from "../../../img/icons/heart.png";

const descriptions = [
  {
    image: Delivery,
    title: "NEXT DAY DELIVERY",
    text: "Scheduling made easy and stress-free. Available up until 3pm daily.",
  },
  {
    image: Plant,
    title: "FRESH SEASONAL INGREDIENTS",
    text: "Every day, we source and cook the finest market-fresh produce.",
  },
  {
    image: Talk,
    title: "UNCOMPROMISING SERVICE",
    text: "For us, it's all in the detail. We take care of all of the finer points, so you don't have to.",
  },
  {
    image: Heart,
    title: "EXQUISITE CULINARY BITES",
    text: "Flavour and texture that consistently impress, whether it's for 5 or 5,000+.",
  },
];

const Description = () => {
  return (
    <div className="descriptionContainer">
      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        flexWrap="wrap"
        justifyContent="space-around"
        gap={2} // Используем gap для отступов между карточками
      >
        {descriptions.map((item, index) => (
          <Card
            key={index}
            sx={{
              width: { xs: "100%", sm: "45%", md: "22%" }, // Ширина карточки
              display: "flex",
              boxShadow: "none", // Убираем обводку
              backgroundColor: "white", // Белый фон
              borderRadius: "8px", // Закругление углов
            }}
          >
            <CardMedia
              component="img"
              height="30" // Фиксированная высота
              image={item.image}
              alt={item.title}
              sx={{ width: "30px", height: "30px", margin: "15px" }}
            />
            <CardContent sx={{ padding: "5px" }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ fontSize: "14px", color: "rgba(128, 96, 68, 1)" }}
              >
                {item.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: "13px",
                  color: "rgba(128, 96, 68, 1)",
                }}
              >
                {item.text}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </div>
  );
};

export default Description;
