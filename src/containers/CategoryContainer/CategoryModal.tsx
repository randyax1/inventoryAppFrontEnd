import React, { useState } from "react";
import Fade from "@material-ui/core/Fade";
import Backdrop from "@material-ui/core/Backdrop";
import { Grid, Modal, Typography } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import CategoryRoundedIcon from '@material-ui/icons/CategoryRounded';
import SaveRoundedIcon from "@material-ui/icons/SaveRounded";

import { InputText } from "../../components/InputText";
import { ButtonLoading } from "../../components/ButtonLoading";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      alignItems: "center",
      display: "flex",
      justifyContent: "center",

    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      borderRadius: 5,
      boxShadow: theme.shadows[5],
      height: "30%",
      padding: theme.spacing(3, 4, 5, 4),
      width: "70%",

      [theme.breakpoints.down("md")]: {
        height: "25%",
        width: "75%",
        padding: theme.spacing(2, 2, 1, 2),
        overflow: "scroll",
        overflowX: "hidden",
      },

      [theme.breakpoints.down("sm")]: {
        height: "40%",
        width: "90%",
        padding: theme.spacing(1, 2, 0, 2),
      },

      "@media (min-width: 0px) and (max-width: 820px) and (orientation: landscape)":
        {
          height: "95%",
          width: "85%",
          overflow: "scroll",
          overflowX: "hidden",
          padding: theme.spacing(2, 3, 1, 3),
        },
    },
    title: {
      color: "#011228",

      MozUserSelect: "none",
      msUserSelect: "none",
      userSelect: "none",
      WebkitUserSelect: "none",
    },
  })
);

interface CategoryModalProps {
  title: string;
  open: boolean;
  onClose?: {
    bivarianceHack(event: {}, reason: "backdropClick" | "escapeKeyDown"): void;
  }["bivarianceHack"];
  in: boolean;
}

export const CategoryModal = (props: CategoryModalProps) => {
  
  const classes = useStyles();

  const [CategoryName, setCategoryName] = useState("");

  const handleProductName = (event: any) => {
    setCategoryName(event.target.value);
  };

  const onAcceptPress = () => {};

  return (
    <>
      <Modal
        className={classes.modal}
        open={props.open}
        onClose={props.onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <Grid className={classes.paper} container spacing={4}>
            <Grid item xs={12}>
              <Typography className={classes.title} variant="h5">
                {props.title}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={12} md={4}>
              <InputText
                autoFocus={true}
                onChange={handleProductName}
                label="Nombre de la Categoria"
                id="name-category"  
                icon={<CategoryRoundedIcon />}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <ButtonLoading
                fullWidth={true}
                isLoading={false}
                onClick={onAcceptPress}
                label="&nbsp;Guardar"
                icon={<SaveRoundedIcon />}
              />
            </Grid>
          </Grid>
        </Fade>
      </Modal>
    </>
  );
};
