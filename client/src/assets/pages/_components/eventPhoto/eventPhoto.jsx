import "./eventPhoto.css";
import img from "../../../img/event.png";
const Event = () => {
  return (
    <div className="eventContainer">
      <div className="eventPhoto">
        <img src={img} alt="Plate"></img>
        <p>Plated Sit Down Packages</p>
      </div>
      <div className="eventAnnotation">
        <p>
          Our range of sit-down packages have been tailored to suit any occasion
          or setting.
        </p>
        <p>
          The menu has been carefully crafted to ensure it can be executed in
          your office, home, at your venue of choice or on your yacht, with no
          limit to where we can cater. Simply choose from one of our packages
          and let us know where and when you would like to indulge.
        </p>
        <p>
          Each package includes our standard beverage package, a team of skilled
          waitstaff and all the equipment required to create a seamless event.
        </p>
        <p>
          Get in touch with us to find out how we can help you create the
          perfect event.
        </p>
      </div>
    </div>
  );
};

export default Event;
