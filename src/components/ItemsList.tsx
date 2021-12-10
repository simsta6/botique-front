import * as React from "react";
import { Avatar, ListItemAvatar, ListItemText, ListItem, List, Container } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import { getAllItems } from "../services/ItemServices";
import { Item } from "../interfaces/ItemsInterfaces";

const ItemsList = (): JSX.Element => {
  const [items, setItems] = React.useState<Item[]>([]);
  React.useEffect(() => {
    if(!items.length) {
      getAllItems().then(res => res.data instanceof Array && setItems(res.data));
    }
  }, []);

  return (
    <Container component="main">
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <ImageIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Photos" secondary="Jan 9, 2014" />
        </ListItem>
      </List>
    </Container>
  );
};

export default ItemsList;