import React, { useEffect, useState } from "react";
import Fade from "@material-ui/core/Fade";
import Backdrop from "@material-ui/core/Backdrop";
import { Grid, Modal, Snackbar, Typography } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

import CategoryRoundedIcon from '@material-ui/icons/CategoryRounded';
import SaveRoundedIcon from "@material-ui/icons/SaveRounded";

import { InputText } from "../../components/InputText";
import { ButtonLoading } from "../../components/ButtonLoading";
import { CategoryInterface } from "../../types/inventoryAppBaseTypes";
import { inventoryAppCreateCategory, inventoryAppUpdateCategory } from "../../lib/inventoryAppBackendClient";

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
        height: "30%",
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

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface CategoryModalProps {
    open: boolean;
    onClose?: any;
    onSuccess: Function,
    category?: CategoryInterface;
    categoryId?: string;
    isUpdatingCategory?: boolean;
    title: string;
    in: boolean;
}

export const CategoryModal = (props: CategoryModalProps) => {
  
  const { category = {
    _id: '',
    name: ''
} } = props
  
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const [categoryName, setCategoryName] = useState("");

  const [categoryNameError, setCategoryNameError] = useState(false);
  const [categoryHelperText, setCategoryHelperText] = useState('');

  useEffect(() => {
    setCategoryName(props.category ? category.name : "");
    setCategoryNameError(false);
    // eslint-disable-next-line
  }, [props.open]);

  const onCategoryNameInputChange = (event: any) => {
    setCategoryName(event.target.value);
  };

  const handleAlertClose = () => {
    setOpenAlert(false);
  }

  const onAcceptPress = async () => {

    if(categoryName === "") {
      setCategoryNameError(true)
      setCategoryHelperText('Este campo es necesario.');
    }

    if(categoryName) {
      setIsLoading(true);

      if(props.isUpdatingCategory) {
        await inventoryAppUpdateCategory( category._id, categoryName )
      }

      if(!props.isUpdatingCategory) {
        await inventoryAppCreateCategory(categoryName);
      }

      setIsLoading(false);
      setOpenAlert(true);
      props.onClose({}, 'escapeKeyDown');
      props.onSuccess();
    }

  };

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
                required
                autoFocus={true}
                capitalize
                helperText={categoryHelperText}
                error={categoryNameError}
                defaultValue={props.category ? category.name : ""}
                onChange={onCategoryNameInputChange}
                label="Nombre de la Categoria"
                id="name-category"  
                icon={<CategoryRoundedIcon />}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <ButtonLoading
                disabled={isLoading}
                fullWidth={true}
                isLoading={isLoading}
                onClick={onAcceptPress}
                label="&nbsp;Guardar"
                icon={<SaveRoundedIcon />}
              />
            </Grid>
          </Grid>
        </Fade>
      </Modal>
      <Snackbar open={openAlert} autoHideDuration={7000} onClose={handleAlertClose}>
                <Alert onClose={handleAlertClose} severity="success">
                {props.isUpdatingCategory || !props.isUpdatingCategory ? "La categoria a sido actualizada" : "Categoria creada exitosamente"}
                </Alert>
      </Snackbar>
    </>
  );
};
