import { Avatar, Divider, ListItem, ListItemAvatar, ListItemText, Rating } from "@mui/material";
import React from "react";
import { BasicUserData } from "../interfaces/UserInterfaces";
import { getUser } from "../services/UserServices";
import "../styles/Item.scss";

interface Props {
  userId: string;
  comment: string;
  rating: number;
}

export default function Review({ userId, comment, rating }: Props): JSX.Element {
  const [user, setUser] = React.useState<BasicUserData>();

  React.useEffect(() => {
    if(!user) {
      userId && getUser(userId).then(res => typeof res.data !== "string" && setUser(res.data));
    }
  }, []);

  return ( <>
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt={user?.first_name}>{user?.first_name.charAt(0)}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={comment}
        secondary={
          <Rating name="read-only" value={rating} readOnly />
        }
      />
    </ListItem>
    <Divider variant="inset" component="li" />
  </>
  );
}