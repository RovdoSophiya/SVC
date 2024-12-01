import "./reviewPhoto.css";
import img from "../../../img/reviews.png";

const ReviewPhoto = () => {
  return (
    <div className="reviewContainer">
      <div className="reviewPhoto">
        <img src={img} alt="Review"></img>
        <p>What our customers say about us</p>
      </div>
    </div>
  );
};

export default ReviewPhoto;
