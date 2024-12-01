import ReviewForm from "../_components/reviewForm/reviewForm";
import ReviewPhoto from "../_components/reviewPhoto/reviewPhoto";
import Description from "../_components/description/description";

const ReviewPage = () => {
  return (
    <div>
      <ReviewPhoto />
      <ReviewForm />
      <Description />
    </div>
  );
};

export default ReviewPage;
