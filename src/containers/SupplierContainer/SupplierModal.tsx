import React, { useState } from "react";
import Fade from "@material-ui/core/Fade";
import Backdrop from "@material-ui/core/Backdrop";
import { Grid, Modal, Typography } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import EmailRoundedIcon from '@material-ui/icons/EmailRounded';
import CallRoundedIcon from '@material-ui/icons/CallRounded';
import LocationCityRoundedIcon from '@material-ui/icons/LocationCityRounded';
import LocationOnRoundedIcon from '@material-ui/icons/LocationOnRounded';
import SaveRoundedIcon from "@material-ui/icons/SaveRounded";

import { InputText } from "../../components/InputText";
import { InputNumber } from "../../components/InputNumber";
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
      height: "50%",
      padding: theme.spacing(4, 4, 5, 4),
      width: "80%",

      [theme.breakpoints.down("md")]: {
        height: "65%",
        width: "90%",
        padding: theme.spacing(2, 2, 1, 2),
        overflow: "scroll",
        overflowX: "hidden",
      },

      [theme.breakpoints.down("sm")]: {
        height: "80%",
        width: "90%",
        padding: theme.spacing(2, 2, 1, 2),
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

interface SupplierModalProps {
  title: string;
  open: boolean;
  onClose?: {
    bivarianceHack(event: {}, reason: "backdropClick" | "escapeKeyDown"): void;
  }["bivarianceHack"];
  in: boolean;
}

export const SupplierModal = (props: SupplierModalProps) => {
  const classes = useStyles();
  // eslint-disable-next-line
  const [SupplierName, setSupplierName] = useState("");

  const handleSupplierName = (event: any) => {
    setSupplierName(event.target.value);
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
                onChange={handleSupplierName}
                label="Nombre del Producto"
                id="name-product"
                icon={<PersonRoundedIcon />}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4}>
              <InputText
                autoFocus={true}
                onChange={handleSupplierName}
                label="Correo Electronico"
                id="email"
                icon={<EmailRoundedIcon />}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4}>
              <InputNumber
                fullWidth={true}
                label="Número de Contacto"
                id="contact-number"
                icon={<CallRoundedIcon />}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4}>
              <InputText
                label="Estado"
                onChange={handleSupplierName}
                id="state"
                icon={<LocationOnRoundedIcon />}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4}>
              <InputText
                onChange={handleSupplierName}
                label="Ciudad"
                id="city"
                icon={<LocationCityRoundedIcon />}
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
