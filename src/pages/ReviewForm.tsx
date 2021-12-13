import { Alert, Box, Button, Container, CssBaseline, TextField, Typography } from "@mui/material";
import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReviewData } from "../interfaces/ReviewsInterfaces";
import { commentSchema } from "../schemas/ReviewSchema";
import { editReview, getReview, postReview } from "../services/ReviewsServices";

const getFormattedData = (data: FormData): ReviewData | undefined => {
  const rating = Number(data.get("rating"));
  const comment = data.get("comment")?.toString();

  return { rating, comment: comment ?? "" };
};


export default function ReviewForm(): JSX.Element {
  
  const navigate = useNavigate();
  const { id, reviewId } = useParams();
  const [isRequestSent, setIsRequestSent] = React.useState(false);
  const [responseMessage, setResponseMessage] = React.useState<string>();
  const [oldReview, setOldReview] = React.useState<ReviewData>();

  React.useEffect(() => {
    if(!oldReview) {
      id && reviewId && getReview(id, reviewId).then(res => typeof res.data !== "string" && setOldReview(res.data));
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = getFormattedData(new FormData(event.currentTarget));
    commentSchema.validate(data)
      .then(async data => {
        if (!id)
          return;

        setIsRequestSent(true);
        const response = await (data && reviewId ? editReview(id, data, reviewId) : postReview(id, data));
        if (response.status === "Failed" && typeof response.data === "string") {
          setResponseMessage(response.data);
        } else if (response.status === "Success" && typeof response.data !== "string") {
          navigate(`/items/${id}`);
        }
        setIsRequestSent(false);
      })
      .catch(err => err.errors && setResponseMessage (err.errors.join()));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Add new review
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            id="comment"
            label="Comment"
            name="comment"
            autoFocus
            defaultValue={oldReview?.comment}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="rating"
            label="Rating"
            type="number"
            id="rating"
            defaultValue={oldReview?.rating}
            onChange = {(e) =>{
              e.target.value = Math.min(Math.max(0, parseInt(e.target.value)), 5).toString();
            }}
          />
          {
            responseMessage && 
            <Alert severity="error" onClose={() => {
              setResponseMessage("");
            }}>{ responseMessage }</Alert>
          }
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isRequestSent}
          >
            Post a review
          </Button>
        </Box>
      </Box>
    </Container>
  );
}