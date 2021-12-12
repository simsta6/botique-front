import { List, Typography } from "@mui/material";
import * as React from "react";
import { Review } from "../interfaces/ReviewsInterfaces";
import { getAllReviews } from "../services/ReviewsServices";
import ReviewComponent from "./Review";

interface Props {
  itemId: string
}

const ReviewsList = ({ itemId }: Props): JSX.Element => {

  const [reviews, setReviews] = React.useState<Review[]>([]);

  React.useEffect(() => {
    if(!reviews.length) {
      getAllReviews(itemId).then(res => res.data instanceof Array && setReviews(res.data));
    }
  }, []);

  return (
    <>
      <Typography variant="h4" sx={{marginTop: 4}}>
        Reviews
      </Typography>
      <List sx={{ width: "100%", maxWidth: 1080, bgcolor: "background.paper" }}>
        {reviews.map(x => {
          return (
            <ReviewComponent userId={x.user} comment={x.comment} rating={x.rating} />
          );
        })}
      
      </List>
    </>
  );
};

export default ReviewsList;