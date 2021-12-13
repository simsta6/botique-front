import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Alert, Avatar, Divider, Grid, IconButton, ListItem, ListItemAvatar, ListItemText, Rating } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { BasicUserData, User } from "../interfaces/UserInterfaces";
import { deleteReview } from "../services/ReviewsServices";
import { getUser } from "../services/UserServices";
import "../styles/Item.scss";

interface Props {
  user: User | undefined;
  itemId: string;
  reviewId: string;
  userId: string;
  comment: string;
  rating: number;
}

export default function Review({ user, itemId, reviewId, userId, comment, rating }: Props): JSX.Element {

  const navigate = useNavigate();
  const [basicUser, setBasicUser] = React.useState<BasicUserData>();
  const [deleteMessage, setDeleteMessage] = React.useState<string>();

  React.useEffect(() => {
    if(!basicUser) {
      userId && getUser(userId).then(res => typeof res.data !== "string" && setBasicUser(res.data));
    }
  }, []);

  const deleteOnClick = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, itemId: string, reviewId: string) => {
    event.preventDefault();
    const res = await deleteReview(itemId, reviewId);
    setDeleteMessage(res ? "Delete was successfully" : "Delete failed");
  };

  const editOnClick = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, itemId: string, reviewId: string) => {
    event.preventDefault();
    navigate(`/items/${itemId}/reviews/${reviewId}`);
  };

  return ( <>
    {
      deleteMessage && <Alert severity={deleteMessage === "Delete was successfully" ? "success" : "error"}>{deleteMessage}</Alert> 
    }
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt={basicUser?.first_name}>{basicUser?.first_name.charAt(0)}</Avatar>
      </ListItemAvatar>
      <Grid 
        container 
        direction="row"
        justifyContent="space-between"
        spacing={2}
      >
        <Grid item xs={8}>
          <ListItemText
            primary={comment}
            secondary={
              <Rating name="read-only" value={rating} readOnly />
            }
          />
        </Grid>
        <Grid item xs={1} sx={{marginTop: 1}}>
          <Grid container spacing={2}>
            { user && userId === user._id && (
              <>
                <IconButton aria-label="delete" onClick={e => deleteOnClick(e, itemId, reviewId)}>
                  <DeleteIcon />
                </IconButton>
                <IconButton aria-label="edit" onClick={e => editOnClick(e, itemId, reviewId)}>
                  <EditIcon />
                </IconButton>
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
    </ListItem>
    <Divider variant="inset" component="li" />
  </>
  );
}