import React, { useEffect, useState } from "react";
import Fade from "@material-ui/core/Fade";
import Backdrop from "@material-ui/core/Backdrop";
import { FormHelperText, Grid, Modal, Snackbar, Typography } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import SaveRoundedIcon from "@material-ui/icons/SaveRounded";
import AttachMoneyRoundedIcon from '@material-ui/icons/AttachMoneyRounded';
import AppsRoundedIcon from '@material-ui/icons/AppsRounded';

import { InputText } from "../../components/InputText";
import { ProductInterface } from '../../types/inventoryAppBaseTypes';
import { ButtonLoading } from "../../components/ButtonLoading";
import { inventoryAppCreateProduct, inventoryAppGetCategories, inventoryAppGetSuppliers, inventoryAppUpdateProduct } from "../../lib/inventoryAppBackendClient";

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
    formControl: {
        minWidth: 120,
        
      },
      selectEmpty: {
        marginTop: theme.spacing(5),
      }

  })
);

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface ProductModalProps {
  title: string;
  product?: ProductInterface;
  isUpdatingProduct?: boolean;
  productId?: string;
  open: boolean;
  onClose?: any;
  onSuccess: Function;
  in: boolean;
}

export const ProductModal = (props: ProductModalProps) => {

  const { product = {
    _id: '',
    name: '',
    supplier: '',
    category: '',
    quantity: '',
    unitPrice: ''
  } } = props

  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const [productName, setProductName] = useState("");
  const [productNameError, setProductNameError] = useState(false);
  const [productNameHelperText, setProductNameHelperText] = useState('');

  const [supply, setSupply] = useState([] as any[]);
  const [selectedSupply, setSelectedSupply] = useState("");
  const [supplyError, setSupplyError] = useState(false);
  const [supplyHelperText, setSupplyHelperText] = useState('');

  const [category, setCategory] = useState([] as any[]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryError, setCategoryError] = useState(false);
  const [categoryHelperText, setCategoryHelperText] = useState('');
  
  const [quantity, setQuantity] = useState("");
  const [quantityError, setQuantityError] = useState(false);
  const [quantityHelperText, setQuantityHelperText] = useState('');
  
  const [unitPrice, setUnitPrice] = useState("");
  const [unitPriceError, setUnitPriceError] = useState(false);
  const [unitPriceHelperText, setUnitPriceHelperText] = useState('');

  const fetchSuppliers = async () => {
    let inventoryAppResponse = await inventoryAppGetSuppliers();
    setSupply(inventoryAppResponse.data);
  };

  const fetchCategory = async () => {
    let inventoryAppResponse = await inventoryAppGetCategories();
    setCategory(inventoryAppResponse.data);
  };

  useEffect(() => {
    fetchSuppliers();
    fetchCategory();
  }, []);

  useEffect(() => {
    setProductName(props.product ? product.name: "");
    setSelectedSupply(props.product ? product.supplier: "");
    setSelectedCategory(props.product ? product.category: "");
    setQuantity(props.product ? product.quantity.toString() : "");
    setUnitPrice(props.product ? product.unitPrice.toString() : "");
    
    setProductNameError(false);
    setQuantityError(false);
    setUnitPriceError(false);

    // eslint-disable-next-line
  }, [props.open]);

  const handleAlertClose = () => {
    setOpenAlert(false);
  }
  
  const handleProductName = (event: any) => {
    setProductName(event.target.value);
  };

  const handleSupply = (event: any) => {
    setSelectedSupply(event.target.value);
  };

  const handleCategory = (event: any) => {
    setSelectedCategory(event.target.value);
  };

  const handleQuantity = (event: any) => {
    setQuantity(event.target.value);
  };

  const handleUnitPrice = (event: any) => {
    setUnitPrice(event.target.value);
  };

  const onAcceptPress = async () => {

    if(productName === "") {
      setProductNameError(true);
      setProductNameHelperText('El nombre del producto es requerido.')
    } else {
      setProductNameError(false);
      setProductNameHelperText("");
    }

    if(selectedSupply === "") {
      setSupplyError(true);
      setSupplyHelperText('Seleccione un proveedor para el producto.')
    } else {
      setSupplyError(false);
      setSupplyHelperText("");
    }

    if(selectedCategory === "") {
      setCategoryError(true);
      setCategoryHelperText('Seleccione una categoria para el producto.')
    } else {
      setCategoryError(false);
      setCategoryHelperText("");
    }

    if(quantity === "") {
      setQuantityError(true);
      setQuantityHelperText('La cantidad en stock no puede quedar vacia.')
    } else {
      setQuantityError(false);
      setQuantityHelperText("");
    }

    if(unitPrice === "") {
      setUnitPriceError(true);
      setUnitPriceHelperText('El precio del producto no puede quedar vacio.');
    } else {
      setUnitPriceError(false);
      setUnitPriceHelperText("");
    }


    if(productName && selectedSupply && selectedCategory && quantity && unitPrice) {
      setIsLoading(true);

      if(props.isUpdatingProduct) {
        await inventoryAppUpdateProduct(product._id, productName, selectedSupply, selectedCategory, parseInt(quantity), parseInt(unitPrice))
      }

      if(!props.isUpdatingProduct) {
        await inventoryAppCreateProduct(productName,selectedSupply,selectedCategory,parseInt(quantity),parseInt(unitPrice) )
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
                capitalize
                defaultValue={props.product ? product.name: ""}
                error={productNameError}
                helperText={productNameHelperText}
                id="name-product"
                icon={<ShoppingCartIcon />}
                label="Nombre del Producto"
                onChange={handleProductName}
                required
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4}>
              <FormControl
                error={supplyError}
                required
                variant="outlined"
                className={classes.formControl}
                fullWidth
              >
                <InputLabel shrink style={{backgroundColor:'white'}}>&nbsp;Proveedor&nbsp;</InputLabel>
                <Select
                  labelId="supplier-select"
                  id="supplier"
                  defaultValue={props.product ? product.supplier: ""}
                  value={selectedSupply}
                  onChange={handleSupply}
                  >
                    {
                        supply && supply.map(item => (
                            <MenuItem key={item._id} value={item.name}>
                              <span style={{textTransform:'capitalize'}}>{item.name}</span>
                            </MenuItem>
                        )
                        )
                    }
                </Select>
              </FormControl>
              <FormHelperText style={{color:'red'}}>{supplyHelperText}</FormHelperText>
            </Grid>

            <Grid item xs={12} sm={12} md={4}>
              <FormControl
                error={categoryError}
                required
                variant="outlined"
                className={classes.formControl}
                fullWidth
              >
                <InputLabel shrink style={{backgroundColor:'white'}}>&nbsp;Categoria&nbsp;</InputLabel>
                <Select
                  labelId="category-select"
                  id="category"
                  defaultValue={props.product ? product.category: ""}
                  value={selectedCategory}
                  onChange={handleCategory}
                >
                    {
                        category && category.map(item => (
                            <MenuItem key={item._id} value={item.name}>
                              <span style={{textTransform:'capitalize'}}>{item.name}</span>
                            </MenuItem>
                        )
                        )
                    }
                </Select>
                <FormHelperText style={{color:'red'}}>{categoryHelperText}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} md={4}>
              <InputText
                required
                defaultValue={props.product ? product.quantity.toString() : ""}
                error={quantityError}
                helperText={quantityHelperText}
                type="number"
                onChange={handleQuantity}
                label="Cantidad de Stock"
                id="stock"
                disabled={props.isUpdatingProduct}
                icon={<AppsRoundedIcon />}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4}>
              <InputText
                required
                defaultValue={props.product ? product.unitPrice.toString() : ""}
                error={unitPriceError}
                helperText={unitPriceHelperText}
                type="number"
                onChange={handleUnitPrice}
                label="Precio Unitario"
                id="unit-price"
                icon={<AttachMoneyRoundedIcon />}
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
          {props.isUpdatingProduct || !props.isUpdatingProduct ? "El producto a sido actualizado" : "Producto creado exitosamente"}
        </Alert>
      </Snackbar>
    </>
  );
};
