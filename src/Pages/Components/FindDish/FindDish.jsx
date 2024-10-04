import React, { useState } from "react";
import { Container } from "@mui/material";
import { Autocomplete } from "@mui/material";
import { TextField } from "@mui/material";
export default function FindDish() {
  const dishes = [
    {
      label: "Dish 1",
      id: 1,
      description: "Description of Dish 1",
      image:
        "https://www.bahroma1.ru/templates/bahroma1/img/slider/2300x1500_61b11ccbd3b30.jpg",
    },
    {
      label: "Dish 2",
      id: 2,
      description: "Description of Dish 2",
      image:
        "https://hip2go.ru/api2/images/IikoProducts26/c1c668e7c6-1_500x353.jpg",
    },
  ];
  const [selectedDish, setSelectedDish] = useState(null);
  return (
    <Container>
      <div>Find your favourite dish</div>
      <Autocomplete
        disablePortal
        options={dishes}
        getOptionLabel={(option) => option.label}
        onChange={(event, newValue) => {
          setSelectedDish(newValue);
        }}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Dish" />}
      />
      {selectedDish && (
        <div style={{ marginTop: 20 }}>
          <h3>{selectedDish.label}</h3>
          <img
            src={selectedDish.image}
            alt={selectedDish.label}
            style={{ width: 150, height: 150 }}
          />
          <p>{selectedDish.description}</p>
        </div>
      )}
    </Container>
  );
}
