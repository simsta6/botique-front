import { Box, Container, CssBaseline, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { Item } from "../interfaces/ItemsInterfaces";
import { User } from "../interfaces/UserInterfaces";
import { getItem } from "../services/ItemServices";

interface Props {
  user: User | undefined;
}

export default function ItemPage({user}: Props): JSX.Element {
  user && "";
  const { id } = useParams();
  const [item, setItem] = React.useState<Item>();

  React.useEffect(() => {
    if(!item) {
      id && getItem(id).then(res => res.data && setItem(res.data));
    }
  }, []);

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
          {item?.brand.toUpperCase()}
        </Typography>
      </Box>
    </Container>
  );
}