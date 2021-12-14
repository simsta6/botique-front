import { Avatar, Container, Divider, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import * as React from "react";
import { ChartItem } from "../interfaces/ChartInterfaces";
import { getAllItemsInChart } from "../services/ChartServices";

export default function ChartItemsList(): JSX.Element {

  const [items, setItems] = React.useState<ChartItem[]>([]);

  React.useEffect(() => {
    if(!items.length) {
      getAllItemsInChart().then(res => res.data instanceof Array && setItems(res.data));
    }
  }, []);

  return (
    <Container component="main" style={{maxHeight: 256, overflow: "auto"}}>
      <List sx={{ bgcolor: "background.paper" }}>
        {items.map(({item, count}) => {
          return (
            <>
              <ListItem>
                <ListItemAvatar>
                  <Avatar alt={item.brand} src={item.imageUrl} sx={{width: 80, height: 80, marginY: 2}} />
                </ListItemAvatar>
                <ListItemText
                  sx={{ margin: 2}}
                  primary={item.brand.toUpperCase()}
                  secondary={`Item count ${count}`}
                />
                <ListItemText
                  sx={{ margin: 2, textAlign: "right"}}
                  primary={`Total price: $${item.price * count}`}
                />                
              </ListItem>
              <Divider variant="inset" component="li" />
            </>
          );
        })}
      </List>
    </Container>
  );
}