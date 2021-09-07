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
import { InputText } from "../../components/InputText";
import { InputNumber } from "../../components/InputNumber";
import { ButtonLoading } from "../../components/ButtonLoading";

import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import MonetizationOnRoundedIcon from "@material-ui/icons/MonetizationOnRounded";

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

export const AddProductForm = () => {
  const classes = useStyles();
  // eslint-disable-next-line
  const [productName, setProductName] = useState("");
  // eslint-disable-next-line
  const [isLoading, setIsLoading] = useState(false);

  const handleProductName = (event: any) => {
    setProductName(event.target.value);
  };

  const onAcceptPress = async () => {};

  return (
    <div className={classes.root}>
      <CssBaseline />
      <div className={classes.form}>
        <Typography variant="h5" className={classes.informationTitle}>
          {"Registrar Producto"}
        </Typography>
        <Divider />

        <Grid container spacing={4} style={{ marginTop: "12px" }}>
          <Grid item xs={12} md={4}>
            <InputText
              autoFocus={true}
              onChange={handleProductName}
              label="Nombre del Producto"
              id="name-product"
              icon={<ShoppingCartIcon />}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <InputText
              onChange={handleProductName}
              label="Nombre del Producto"
              id="name-product"
              icon={null}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <InputText
              onChange={handleProductName}
              label="Nombre del Producto"
              id="name-product"
              icon={null}
            />
          </Grid>

          <Grid item xs={6} md={4}>
            <InputNumber
              fullWidth={true}
              label="Stock"
              id="stock"
              icon={<AddCircleRoundedIcon />}
            />
          </Grid>

          <Grid item xs={6} md={4}>
            <InputNumber
              fullWidth={true}
              label="Precio"
              id="price"
              icon={<MonetizationOnRoundedIcon />}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <ButtonLoading
              fullWidth={true}
              isLoading={isLoading}
              onClick={onAcceptPress}
              label="Guardar"
              icon={null}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
