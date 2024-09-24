import GreenMenu from "../_components/GreenMenu/greenMenu";
import MeetDae from "../_components/MeetDae/meetDae";
import ShopNow from "../_components/ShopNow/ShopNow";
import Modal from "../_components/Modal/Modal";
import { useState } from "react";
const Main = () => {

  return (
    <div>
      <ShopNow text="SHOP NOW" />
      <GreenMenu />
      <MeetDae
        annotation="Meet Dae"
        description="We’re a haircare line based in sunny Arizona. Our products are made up of the many things that make our home special, including the scent of orange blossoms in the air, colors of majestic sunsets and nourishing ingredients derived from desert botanicals. We believe haircare doesn’t have to be complicated and aimed to make a line that is simple and effective. We hope that dae plays a special role in your everyday hair routine from sunrise to sunset and allows you to feel the warmth of the desert wherever you are."
      />
      
    </div>
  );
};

export default Main;
