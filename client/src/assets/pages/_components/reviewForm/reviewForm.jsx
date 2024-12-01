import React, { useEffect, useState } from "react";
import { getReviews } from "../../../api/reviewApi/reviewApi";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import StarRateIcon from "@mui/icons-material/StarRate";
import "./reviewForm.css";
import Previous from "../../../img/icons/previous.png";
import Next from "../../../img/icons/next.png";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(3);

  useEffect(() => {
    const fetchReviews = async (page) => {
      setLoading(true);
      try {
        const data = await getReviews(page, limit);
        setReviews(data.reviews);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews(currentPage);
  }, [currentPage, limit]); // Зависимости: currentPage и limit

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600) {
        setLimit(1);
      } else if (window.innerWidth < 900) {
        setLimit(2);
      } else {
        setLimit(3);
      }
    };

    handleResize(); // Установка начального значения
    window.addEventListener("resize", handleResize); //обработчик событий

    return () => {
      window.removeEventListener("resize", handleResize); // Удаление обработчика при размонтировании
    };
  }, []);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="reviewsContainer">
      <h2
        style={{
          textAlign: "center",
          color: "#806044",
          marginBottom: "25px",
        }}
      >
        Reviews
      </h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="reviewsWrapper">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            <img src={Previous} alt="Previous"></img>
          </button>
          <Grid container spacing={3} className="reviewsGrid">
            {reviews.map((review) => (
              <Grid item xs={12} sm={6} md={4} key={review.id}>
                <Card className="reviewCard">
                  <CardContent sx={{ color: "#806044" }}>
                    <Typography variant="h6">
                      {`${review.Client.name} ${review.Client.lastname}`}
                    </Typography>
                    <Typography variant="body2">{review.comment}</Typography>
                    <div className="rating">
                      {Array.from({ length: review.rating }, (_, index) => (
                        <StarRateIcon key={index} sx={{ color: "#FFD700" }} />
                      ))}
                    </div>
                    <Typography variant="caption">
                      {new Date(review.addtime).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <img src={Next} alt="Previous"></img>
          </button>
        </div>
      )}
    </div>
  );
};

export default Reviews;
