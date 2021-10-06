import React, { useEffect, useState } from "react";
import Fade from "@material-ui/core/Fade";
import Backdrop from "@material-ui/core/Backdrop";
import { Grid, Modal, Snackbar, Typography } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import EmailRoundedIcon from '@material-ui/icons/EmailRounded';
import CallRoundedIcon from '@material-ui/icons/CallRounded';
import LocationCityRoundedIcon from '@material-ui/icons/LocationCityRounded';
import LocationOnRoundedIcon from '@material-ui/icons/LocationOnRounded';
import SaveRoundedIcon from "@material-ui/icons/SaveRounded";

import { InputText } from "../../components/InputText";
import { ButtonLoading } from "../../components/ButtonLoading";
import { SupplierInterface } from "../../types/inventoryAppBaseTypes";
import { inventoryAppCreateSupplier, inventoryAppUpdateSupplier } from "../../lib/inventoryAppBackendClient";

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

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface SupplierModalProps {
  open: boolean;
  onClose?: any;
  onSuccess: Function;
  supplier?: SupplierInterface;
  supplierId?: string;
  isUpdatingSupplier?: boolean;
  title: string;
  in: boolean;
}

export const SupplierModal = (props: SupplierModalProps) => {

  const { supplier = {
    _id: '',
    name: '',
    email: '',
    contactNumber: '',
    state: '',
    city: ''
  } } = props

  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  
  const [supplierName, setSupplierName] = useState("");
  const [supplierEmail, setSupplierEmail] = useState("");
  const [supplierContactNumb, setSupplierContactNumb] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const [supplierNameError, setSupplierNameError] = useState(false);
  const [supplierNameHelperText, setSupplierNameHelperText] = useState('');

  useEffect(() => {
    setSupplierName(props.supplier ? supplier.name : "");
    setSupplierNameError(false);

    setSupplierEmail(props.supplier ? supplier.email : "");
    setSupplierContactNumb(props.supplier ? supplier.name : "");
    setState(props.supplier ? supplier.state : "");
    setCity(props.supplier ? supplier.city : "");

    // eslint-disable-next-line
  }, [props.open]);

  const onSupplierNameInputChange = (event: any) => { 
    setSupplierName(event.target.value); 
  };

  const onSupplierEmailInputChange = (event: any) => { 
    setSupplierEmail(event.target.value); 
  };

  const onSupplierContactNumbInputChange = (event: any) => { 
    setSupplierContactNumb(event.target.value); 
  };

  const onSupplierStateInputChange = (event: any) => { 
    setState(event.target.value); 
  };

  const onSupplierCityInputChange = (event: any) => { 
    setCity(event.target.value); 
  };

  const handleAlertClose = () => {
    setOpenAlert(false);
  }

  const onAcceptPress = async () => {

    if(supplierName === "") {
      setSupplierNameError(true);
      setSupplierNameHelperText('El nombre del proveedor es requerido.');
    }

    if(supplierName) {
      setIsLoading(true);

      if(props.isUpdatingSupplier) {
        await inventoryAppUpdateSupplier(supplier._id, supplierName, supplierEmail, parseInt(supplierContactNumb), state, city)
      }

      if(!props.isUpdatingSupplier) {
        await inventoryAppCreateSupplier(supplierName, supplierEmail, parseInt(supplierContactNumb), state, city);
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
                autoFocus={true}
                defaultValue={props.supplier ? supplier.name: ""}
                required
                capitalize
                error={supplierNameError}
                helperText={supplierNameHelperText}
                onChange={onSupplierNameInputChange}
                label="Nombre del Proveedor"
                id="name-supplier"
                icon={<PersonRoundedIcon />}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4}>
              <InputText
                defaultValue={props.supplier ? supplier.email: ""}
                type="email"
                onChange={onSupplierEmailInputChange}
                label="Correo Electronico"
                id="email"
                icon={<EmailRoundedIcon />}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4}>
              <InputText
                defaultValue={props.supplier ? supplier.contactNumber.toString() : ""}
                type="number"
                onChange={onSupplierContactNumbInputChange}
                fullWidth={true}
                label="Número de Contacto"
                id="contact-number"
                icon={<CallRoundedIcon />}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4}>
              <InputText
                defaultValue={props.supplier ? supplier.state: ""}
                capitalize
                label="Estado"
                onChange={onSupplierStateInputChange}
                id="state"
                icon={<LocationOnRoundedIcon />}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4}>
              <InputText
                defaultValue={props.supplier ? supplier.city: ""}
                capitalize
                onChange={onSupplierCityInputChange}
                label="Ciudad"
                id="city"
                icon={<LocationCityRoundedIcon />}
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
                {props.isUpdatingSupplier || !props.isUpdatingSupplier ? "El proveedor a sido actualizado" : "Proveedor creado exitosamente"}
                </Alert>
      </Snackbar>
    </>
  );
};
