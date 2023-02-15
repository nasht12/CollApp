import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import Layout from "../components/Layout";

const DialogCards: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState<number | null>(null);

  const handleClickOpen = (index: number) => {
    setSelectedCard(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCard(null);
  };

  return (
    <Layout>
      <div style={{ display: "flex", flexGrow: 1, margin: "2rem" }}>
        <Grid container spacing={3}>
          {Array.from({ length: 6 }, (_, i) => (
            <Grid item xs={3} key={i}>
              <Card
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
                onClick={() => handleClickOpen(i)}
              >
                <CardContent
                  style={{
                    flexGrow: 1,
                  }}
                >
                  <Typography variant="h5">Card {i + 1}</Typography>
                  <Typography>Click to open dialog</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="dialog-title"
        >
          <DialogTitle id="dialog-title">Card {selectedCard}</DialogTitle>
          <DialogContent>
            <Typography>
              This is the content of card {selectedCard}. You can add any
              additional information or form inputs here.
            </Typography>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default DialogCards;
