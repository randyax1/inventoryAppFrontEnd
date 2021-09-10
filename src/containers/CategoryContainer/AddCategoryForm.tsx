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
import { ButtonLoading } from "../../components/ButtonLoading";

import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import CategoryRoundedIcon from '@material-ui/icons/CategoryRounded';

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

export const AddCategoryForm = () => {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);

  const handleMock = () => {};

  const onAcceptPress = () => {};

  return (
    <div className={classes.root}>
      <CssBaseline />
      <div className={classes.form}>
        <Typography variant="h5" className={classes.informationTitle}>
          {"Registrar Categoria"}
        </Typography>
        <Divider />

        <Grid container justifyContent="space-between"
 spacing={4} style={{ marginTop: "12px" }}>
          <Grid item xs={12} md={4}>
            <InputText
              autoFocus={true}
              onChange={handleMock}
              label="Nombre de Categoria"
              id="name-category"
              icon={<CategoryRoundedIcon />}
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
