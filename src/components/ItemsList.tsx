import { Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Item } from "../interfaces/ItemsInterfaces";
import { User } from "../interfaces/UserInterfaces";
import { addItemToChart } from "../services/ChartServices";
import { getAllItems } from "../services/ItemServices";

interface Props {
  user: User | undefined;
}

const ItemsList = ({user}: Props): JSX.Element => {
  const navigate = useNavigate();
  const [items, setItems] = React.useState<Item[]>([]);
  const [isAddToChartButtonDisabled, setIsAddToChartButtonDisabled] = React.useState(false);

  React.useEffect(() => {
    if(!items.length) {
      getAllItems().then(res => res.data instanceof Array && setItems(res.data));
    }
  }, []);

  const handleOnClick = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, itemId: string) => {
    event.preventDefault();
    setIsAddToChartButtonDisabled(true);
    await addItemToChart(itemId);
    setIsAddToChartButtonDisabled(false);
  };

  return (
    <Container component="main" style={{maxHeight: 500, overflow: "auto"}}>
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
              <CardActions>
                <Button 
                  onClick={e => handleOnClick(e, item._id)} 
                  sx={{ cursor: "pointer" }}
                  size="small"
                  disabled={!user || isAddToChartButtonDisabled}
                >Add to cart</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ItemsList;