import React, { useState } from "react";
import {
  createStyles,
  Grid,
  makeStyles,
  Theme,
  CssBaseline,
  Typography,
  Divider,
} from "@material-ui/core";

import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import EmailRoundedIcon from '@material-ui/icons/EmailRounded';
import CallRoundedIcon from '@material-ui/icons/CallRounded';
import LocationCityRoundedIcon from '@material-ui/icons/LocationCityRounded';

import { InputText } from "../../components/InputText";
import { ButtonLoading } from "../../components/ButtonLoading";
import LocationOnRoundedIcon from '@material-ui/icons/LocationOnRounded';
import { InputNumber } from "../../components/InputNumber";

import SaveRoundedIcon from '@material-ui/icons/SaveRounded';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
    },
    form: {
      backgroundColor: "white",
      border: "1px solid #E2E3E5",
      borderRadius: theme.spacing(2),
      height: "60%",
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(2),
      padding: theme.spacing(2, 3, 2),
      width: "95%",
      msUserSelect: "none",
      userSelect: "none",
      WebkitUserSelect: "none",
      MozUserSelect: "none",
    },
    informationTitle: {
      margin: 10,
    },
  })
);

export const AddSupplierForm = () => {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);

  const handleMock = () => {};

  const onAcceptPress = () => {};

  return (
    <div className={classes.root}>
      <CssBaseline />
      <div className={classes.form}>
        <Typography variant="h5" className={classes.informationTitle}>
          {"Registrar Proveedor"}
        </Typography>
        <Divider />

        <Grid container spacing={4} style={{ marginTop: "12px" }}>
          <Grid item xs={12} md={4}>
            <InputText
              autoFocus={true}
              onChange={handleMock}
              label="Nombre del Proveedor"
              id="name-supplier"
              icon={<PersonRoundedIcon />}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <InputText
              autoFocus={true}
              onChange={handleMock}
              label="Correo Electronico"
              id="email"
              icon={<EmailRoundedIcon />}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <InputNumber
              fullWidth={true}
              label="Número de Contacto"
              id="contact-number"
              icon={<CallRoundedIcon />}
            />
          </Grid>

          <Grid item xs={6} md={4}>
            <InputText
              onChange={handleMock}
              label="Estado"
              id="state"
              icon={<LocationOnRoundedIcon />}
            />
          </Grid>

          <Grid item xs={6} md={4}>
            <InputText
              onChange={handleMock}
              label="Ciudad"
              id="city"
              icon={<LocationCityRoundedIcon />}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <ButtonLoading
              fullWidth={true}
              isLoading={isLoading}
              onClick={onAcceptPress}
              label="&nbsp;Guardar"
              icon={<SaveRoundedIcon />}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
