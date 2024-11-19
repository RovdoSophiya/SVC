import Description from "../_components/description/description";
import EventPhoto from "../_components/eventPhoto/eventPhoto";
import EventForm from "../_components/eventForm/eventForm";

const EventPage = () => {
  return (
    <div>
      <EventPhoto />
      <EventForm />
      <Description />
    </div>
  );
};

export default EventPage;
