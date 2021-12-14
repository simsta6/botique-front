import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import { Alert, Box, Button, Container, Divider, FormControl, IconButton, InputLabel, List, ListItem, ListItemText, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { OrderForSeller, OrderStateEnum, OrderStateType } from "../interfaces/OrdersInterfaces";
import { changeOrderState, getAllOrders } from "../services/OrderServices";

export default function SellerZone(): JSX.Element {

  const [stateChangeMessage, setStateChangeMessage] = React.useState<string>();
  const navigate = useNavigate();
  const [orders, setOrders] = React.useState<OrderForSeller[]>([]);
  const [orderState, setOrderState] = React.useState<OrderStateType>();
  const [isRequestSent, setIsRequestSent] = React.useState(false);

  const handleChange = (event: SelectChangeEvent) => {
    setOrderState(event.target.value as OrderStateType);
  };

  React.useEffect(() => {
    if(!orders.length) {
      getAllOrders().then(res => res.data instanceof Array && setOrders(res.data));
    }
  }, []);

  return (
    <Container component="main">
      <Button 
        variant="contained"
        sx={{marginY: 2}}
        onClick={e => {
          e.preventDefault();
          navigate("/items");
        }}>Add Item</Button>
      <Container style={{maxHeight: 512, overflow: "auto"}}>
        <List sx={{ bgcolor: "background.paper" }}>
          {orders.map(order => {
            return (
              <React.Fragment key={order._id}>
                {
                  stateChangeMessage && <Alert onClose={e => {
                    e.preventDefault();
                    setStateChangeMessage("");
                  }} 
                  severity={stateChangeMessage === "State change was successfully" ? "success" : "error"}>{stateChangeMessage}</Alert> 
                }
                <ListItem 
                  secondaryAction={
                    <IconButton 
                      disabled={isRequestSent} 
                      edge="end" 
                      aria-label="change"
                      onClick={async e => {
                        e.preventDefault();
                        setIsRequestSent(true);
                        const response = orderState && (await changeOrderState({state: orderState }, order._id)
                          .catch(err => err.errors && setStateChangeMessage (err.errors.join())));
                        if (response) {
                          navigate("/seller");        
                          setStateChangeMessage("State change was successfully"); 
                        }
                        setIsRequestSent(false);
                      }}
                    >
                      <ChangeCircleIcon />
                    </IconButton>
                  }>
                  <ListItemText
                    sx={{ margin: 2}}
                    primary={order._id.toUpperCase()}
                  />
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">State</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="state_select"
                        name="state_select"
                        defaultValue={order.state.toUpperCase()}
                        label="State"
                        onChange={handleChange}
                      >
                        {
                          Object.keys(OrderStateEnum).map(orderStateV => {
                            return (
                              <MenuItem key={orderStateV} value={orderStateV}>{orderStateV.toUpperCase()}</MenuItem>
                            );
                          })
                        }
                      </Select>
                    </FormControl>
                  </Box>               
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            );
          })}
        </List>
      </Container>
    </Container>
  );
}
