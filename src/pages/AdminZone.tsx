import DeleteIcon from "@mui/icons-material/Delete";
import { Alert, Avatar, Button, Container, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { AdminGottenUser } from "../interfaces/UserInterfaces";
import { deleteUser, getUsers } from "../services/UserServices";

export default function AdminZone(): JSX.Element {

  const navigate = useNavigate();
  const [deleteMessage, setDeleteMessage] = React.useState<string>();
  const [items, setItems] = React.useState<AdminGottenUser[]>([]);

  React.useEffect(() => {
    if(!items.length) {
      getUsers().then(res => res.data instanceof Array && setItems(res.data));
    }
  }, []);

  const deleteOnClick = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, userId: string) => {
    event.preventDefault();
    const res = await deleteUser(userId);
    setDeleteMessage(res ? "Delete was successfully" : "Delete failed");
  };


  return (
    <Container component="main">
      <Button 
        variant="contained"
        sx={{marginY: 2}}
        onClick={e => {
          e.preventDefault();
          navigate("/post-seller");
        }}>Add Seller</Button>
      <Container style={{maxHeight: 512, overflow: "auto"}}>
        <List sx={{ bgcolor: "background.paper" }}>
          {items.map((user) => {
            return (
              <>
                {
                  deleteMessage && <Alert onClose={e => {
                    e.preventDefault();
                    setDeleteMessage("");
                  }} 
                  severity={deleteMessage === "Delete was successfully" ? "success" : "error"}>{deleteMessage}</Alert> 
                }
                <ListItem 
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={e => deleteOnClick(e, user._id)}>
                      <DeleteIcon />
                    </IconButton>
                  }>
                  <ListItemAvatar>
                    <Avatar sx={{width: 80, height: 80, marginY: 2}} >{user.first_name.charAt(0).toUpperCase()}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    sx={{ margin: 2}}
                    primary={user.first_name.toUpperCase()}
                    secondary={user.last_name.toUpperCase()}
                  />
                  <ListItemText
                    sx={{ margin: 2, textAlign: "right"}}
                    primary={user.role.toUpperCase()}
                  />                
                </ListItem>
                <Divider variant="inset" component="li" />
              </>
            );
          })}
        </List>
      </Container>
    </Container>
  );
}
