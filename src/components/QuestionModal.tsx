import React from "react";
import { Modal, Button, Grid } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
    },
    grid: {
      display: "flex",
      width: "450px",
      height: "220px",
      margin: "auto",
      backgroundColor: theme.palette.background.paper,
      borderRadius: "8px",
    },
    topRow: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "32%",
    },
    middleRow: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: "solid #EBEBEB",
      borderWidth: "thin 0px",
      height: "36%",
    },
    bottomRow: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "32%",
    },
    textFont: {
      fontFamily: "sans-serif",
      fontSize: "20px",
      fontWeight: "bold",
    },
    textFontSecondary: {
      fontFamily: "sans-serif",
      fontSize: "14px",
    },
    buttonCancel: {
      height: "70%",
    },
    buttonAcept: {
      color:'white',
      backgroundColor:'#011228',
      height: "70%",

      "&:hover": {
        backgroundColor: '#red',
      },

    },
  })
);

interface QuestionModalProps {
  open: boolean;
  setOpen: Function;
  title: string;
  body: string;
  onConfirm: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onCancel?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const QuestionModal = (props: QuestionModalProps) => {
  const classes = useStyles();

  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <Modal open={props.open} className={classes.modal}>
      <Grid container className={classes.grid}>
        <Grid item xs={12} className={classes.topRow}>
          <label htmlFor="text" className={classes.textFont}>
            {props.title}
          </label>
        </Grid>

        <Grid item xs={12} className={classes.middleRow}>
          <label htmlFor="text" className={classes.textFontSecondary}>
            {props.body}
          </label>
        </Grid>

        <Grid item xs={6} className={classes.bottomRow}>
          <Button onClick={handleClose} className={classes.buttonCancel}>
            Cancelar
          </Button>
        </Grid>
        <Grid item xs={6} className={classes.bottomRow}>
          <Button
            className={classes.buttonAcept}
            variant="contained"
            onClick={props.onConfirm}
          >
            {" "}
            Confirmar
          </Button>
        </Grid>
      </Grid>
    </Modal>
  );
};
