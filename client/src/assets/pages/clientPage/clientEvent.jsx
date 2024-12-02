import Description from "../_components/description/description";
import Event from "../_components/clientEvent/clientEvent";
import EventPhoto from "../_components/eventPhoto/eventPhoto";

const CartPage = () => {
  return (
    <div>
      <EventPhoto />
      <Event />
      <Description />
    </div>
  );
};

export default CartPage;
