import AddIcon from "@mui/icons-material/Add";
import { Button, List, Typography } from "@mui/material";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Review } from "../interfaces/ReviewsInterfaces";
import { User } from "../interfaces/UserInterfaces";
import { getAllReviews } from "../services/ReviewsServices";
import ReviewComponent from "./Review";

interface Props {
  user: User | undefined;
  itemId: string;
}

const ReviewsList = ({ user, itemId }: Props): JSX.Element => {

  const navigate = useNavigate();
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
      {user && <Button 
        sx={{marginTop: 2}} 
        variant="contained" 
        startIcon={<AddIcon />}
        onClick={(e) => {
          e.preventDefault();
          navigate(`/items/${itemId}/reviews`);
        }}
      >
        Add Review
      </Button>}
      <List sx={{ width: "100%", maxWidth: 1080, bgcolor: "background.paper" }}>
        {reviews.map(x => {
          return (
            <ReviewComponent key={x._id} {...{
              user, itemId, reviewId: x._id, userId: x.user, comment: x.comment, rating: x.rating 
            }}/>
          );
        })}
      
      </List>
    </>
  );
};

export default ReviewsList;