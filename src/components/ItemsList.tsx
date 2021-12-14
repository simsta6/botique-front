import { Card, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Item } from "../interfaces/ItemsInterfaces";
import { getAllItems } from "../services/ItemServices";

const ItemsList = (): JSX.Element => {
  const navigate = useNavigate();
  const [items, setItems] = React.useState<Item[]>([]);

  React.useEffect(() => {
    if(!items.length) {
      getAllItems().then(res => res.data instanceof Array && setItems(res.data));
    }
  }, []);

  return (
    <Container component="main" style={{maxHeight: 700, overflow: "auto", cursor: "pointer"}}>
      <Grid
        container={true}
        spacing={2}
        mt={2}
        direction="row"
        alignItems="flex-start"
      >
        {items.map(item => (
          <Grid item xs={12} sm={6} md={3} key={item._id}>
            <Card onClick={() => navigate(`/items/${item._id}`)}>
              <CardMedia
                component="img"
                height="140"
                image={item.imageUrl}
                alt={item.brand}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {item.brand.toUpperCase()}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {item.price}$
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ItemsList;