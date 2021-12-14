import { Button, Modal, Backdrop, Fade, Box, Typography, Alert } from "@mui/material";
import * as React from "react";
import { makeAnOrder } from "../services/OrderServices";
import ChartItemsList from "./ChartItemsList";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface Props { 
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ChartModal({ open, setOpen }: Props): JSX.Element {
  const [isOrderButtonDisabled, setIsOrderButtonDisabled] = React.useState(false);
  const [orderMessage, setOrderMessage] = React.useState<string>();
  const handleClose = () => {
    setOpen(false);
    setOrderMessage("");
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Chart
            </Typography>

            <Box sx={{ mt: 2 }}>
              <ChartItemsList/>
              {
                orderMessage && <Alert severity={orderMessage === "Order was successfully" ? "success" : "error"}>{orderMessage}</Alert> 
              }
              <Button 
                sx={{ mt: 2 }}
                disabled={isOrderButtonDisabled}
                variant="contained"
                onClick={async (e) => {
                  e.preventDefault();
                  setIsOrderButtonDisabled(true);
                  const res = await makeAnOrder();
                  setOrderMessage(res ? "Order was successfully" : "Order failed");
                  setIsOrderButtonDisabled(false);
                }}>Order</Button>
            </Box>
           
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}