import React, { useEffect, useState } from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  TableContainer,
  Table,
  TablePagination,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Paper,
  Typography,
} from "@material-ui/core";

import EditIcon from "@material-ui/icons/Edit";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";

import { ProductInterface } from '../../types/inventoryAppBaseTypes';
import { inventoryAppGetProducts } from "../../lib/inventoryAppBackendClient";
import { InputText } from "../../components/InputText";
import InventoryModal from "./InventoryModal";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "@global": {
        "*::-webkit-scrollbar": {
          height:"10px",
          width: "10px",
        },
        "*::-webkit-scrollbar-thumb": {
          backgroundColor:'gray'
        },
      },

      "& td": {
        textTransform: "capitalize",
      },

      display: "table",
      tableLayout: "fixed",
      width: "100%",
    },
    container: {
      [theme.breakpoints.up("sm")]: {
        height: "54vh",
      },

      [theme.breakpoints.down("xs")]: {
        height: "60vh",
      },
    },
    tableHead: {
      backgroundColor: "white",
      color: "#011228",
      MozUserSelect: "none",
      msUserSelect: "none",
      userSelect: "none",
      WebkitUserSelect: "none",
    },
    tableBody: {
      color: "#011228",
    },
    searchArea: {
      marginBottom: theme.spacing(2),
      width: "25vw",

      [theme.breakpoints.down("md")]: {
        width: "25vw",
      },

      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
    },
    
  })
);
  
  const columns = [
    {
      label: "Nombre del Producto",
    },
    {
      label: "Proveedor"
    },
    {
      label: "Cantidad"
    },
    {
      label: "Editar",
    }
  ];

const InventoryTable = () => {
    const classes = useStyles();

    const [filter, setFilter] = useState("");

    const onFilterInputChange = (event: any) => {
        setFilter(event.target.value);
    };

    const [products, setProducts] = useState([] as any[]);

    const [productToEdit, setProductToEdit] = useState<ProductInterface>();
    const [productIdToEdit, setProductIdToEdit] = useState("");

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [productModalOpen, setProductModalOpen] = useState(false);

    const fetchProducts = async () => {
        let inventoryAppResponse = await inventoryAppGetProducts();
        setProducts(inventoryAppResponse.data);
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleProductModalClose = () => {
        setProductModalOpen(false);
    };
    
    const onProductModalAcceptClick = async () => {
        await fetchProducts();
    };

    const onEditProductButtonClick = (product: ProductInterface) => {
        setProductToEdit(product);
        setProductIdToEdit(product._id);
        setProductModalOpen(true);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };

    return (
        <>
        <Paper className={classes.searchArea}>
        <InputText
        icon={<SearchRoundedIcon/>}
        id="filter"
        onChange={ onFilterInputChange }
        label="¿Que estas buscando?"
        />
        </Paper>

        <Paper elevation={5} variant="outlined" className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell
                    className={classes.tableHead}
                    key={index}
                    align={"left"}
                  >
                    <Typography variant="h6">{column.label}</Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              
              {
              //eslint-disable-next-line
              products.filter(item => {
              //eslint-disable-next-line
                if (filter == "") {
                  return item;
                } else if (item.name.toLowerCase().includes(filter.toLowerCase())) {
                  return item;
                }

              })
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, index) => {
                  return (
                    <TableRow hover role="checkbox" key={index}>

                      <TableCell align="left">
                        <Typography variant="subtitle1" className={classes.tableBody}>{item.name}</Typography>
                      </TableCell>

                      <TableCell align="left">
                        <Typography variant="subtitle1" className={classes.tableBody}>{item.supplier}</Typography>
                      </TableCell>

                      <TableCell align="left">
                        <Typography variant="subtitle1" className={classes.tableBody}>{item.quantity}</Typography>
                      </TableCell>

                      <TableCell align="left">
                        <IconButton
                          onClick={() => onEditProductButtonClick(item)}
                        >
                          <EditIcon />
                        </IconButton>
                      </TableCell>

                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          labelRowsPerPage={"Filas por Página"}
          backIconButtonText={"Página Anterior"}
          nextIconButtonText={"Siguiente Página"}
          rowsPerPageOptions={[5, 10, 25, {label: 'Todos', value: -1}]}
          component="div"
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </Paper>

        <InventoryModal
        in
        product={productToEdit}
        title="Edición de Stock"
        open={productModalOpen}
        onClose={handleProductModalClose}
        productId={productIdToEdit}
        isUpdatingProduct={true}
        onSuccess={onProductModalAcceptClick}
        />
            
        </>
    )
}

export default InventoryTable
