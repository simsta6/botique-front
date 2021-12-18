import { Box, Button, Container, CssBaseline, Grid, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import ReviewsList from "../components/ReviewsList";
import { Item } from "../interfaces/ItemsInterfaces";
import { User } from "../interfaces/UserInterfaces";
import { getItem } from "../services/ItemServices";
import "../styles/Item.scss";

interface Props {
  user: User | undefined;
}

export default function ItemPage({user}: Props): JSX.Element {
  const { id } = useParams();
  const [item, setItem] = React.useState<Item>();

  React.useEffect(() => {
    if(!item) {
      id && getItem(id).then(res => res.data && setItem(res.data));
    }
  }, []);

  return (
    item ? (<Container component="main">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          maxWidth: 1080
        }}
      >
        <Grid container spacing={2}>
          <Grid item>
            <img className={"item-image"} src={item.imageUrl}/>
          </Grid>
          <Grid item xs={120} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1" component="div">
                  {item.brand.toUpperCase()}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {item.color.toUpperCase()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Size: {item.size}
                </Typography>
              </Grid>
              <Grid item>
                <Button variant="contained" disabled={!user}>Add to cart</Button>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="h6" component="div">
              ${item.price}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <ReviewsList user={user} itemId={id ? id : ""}></ReviewsList>
    </Container>) 
      : (<></>)
  );
}