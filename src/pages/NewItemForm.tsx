import EditIcon from "@mui/icons-material/Edit";
import { Alert, Avatar, Box, Button, Container, CssBaseline, TextField, Typography } from "@mui/material";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { NewItem } from "../interfaces/ItemsInterfaces";
import { itemSchema } from "../schemas/ItemSchema";
import { postItem } from "../services/ItemServices";

const getFormattedData = (data: FormData): NewItem | undefined => {
  const brand = data.get("brand")?.toString();
  const color = data.get("color")?.toString();
  const count = Number(data.get("count"));
  const size = Number(data.get("size"));
  const price = Number(data.get("price"));
  const imageUrl = data.get("imageUrl")?.toString();

  const isDataValid = brand && color && count && size && price && imageUrl;

  return isDataValid ? { brand, color, count, size, price, imageUrl } : undefined;
};


export default function NewItemForm(): JSX.Element {
  
  const navigate = useNavigate();
  const [isRequestSent, setIsRequestSent] = React.useState(false);
  const [responseMessage, setResponseMessage] = React.useState<string>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = getFormattedData(new FormData(event.currentTarget));
    itemSchema.validate(data)
      .then(async data => {
        setIsRequestSent(true);
        const response = await postItem(data);
        if (response) {
          navigate("/seller");
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
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <EditIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add new review
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="brand"
            label="Brand"
            name="brand"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="color"
            label="Color"
            id="color"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="count"
            label="Count"
            type="number"
            id="color"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="size"
            label="Size"
            type="number"
            id="size"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="price"
            label="Price"
            type="number"
            id="price"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="imageUrl"
            label="Image Url"
            id="imageUrl"
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