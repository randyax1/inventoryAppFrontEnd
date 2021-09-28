import React, { useEffect, useState } from "react";

import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
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
  Snackbar,
  Paper,
  Typography,
} from "@material-ui/core";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';

import { SupplierInterface } from "../../types/inventoryAppBaseTypes";
import { QuestionModal } from "../../components/QuestionModal";
import { inventoryAppDeleteSupplierById, inventoryAppGetSuppliers } from "../../lib/inventoryAppBackendClient";
import { SupplierModal } from "./SupplierModal";
import { InputText } from "../../components/InputText";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "@global": {
        "*::-webkit-scrollbar": {
          width: "0px",
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
      }

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
      width:"25vw",
      
      [theme.breakpoints.down("md")]: {
        width: "25vw",
      },
  
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      }

    }

  })
);

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const columns = [
  {
    label: "Nombre del Proveedor",
  },
  {
    label: "Correo Electronico",
  },
  {
    label: "Numero de Contacto",
  },
  {
    label: "Estado",
  },
  {
    label: "Ciudad",
  },
  {
    label: "Editar",
  },
  {
    label: "Eliminar",
  },
];

export const SupplierTable = () => {
  
  const classes = useStyles();

  const [filter, setFilter] = useState("");

  const onFilterInputChange = (event: any) => {
    setFilter(event.target.value);
  };

  const [suppliers, setSuppliers] = useState([] as any[]);

  const [supplierToEdit, setSupplierToEdit] = useState<SupplierInterface>();
  const [supplierIdToEdit, setSupplierIdToEdit] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openAlert, setopenAlert] = useState(false);
  const [supplierModalOpen, setSupplierModalOpen] = useState(false);
  const [deleteSupplierModalOpen, setDeleteSupplierModalOpen] = useState(false);
  // eslint-disable-next-line
  const [supplierToBeDelete, setSupplierToBeDelete] = useState("");

  const fetchSuppliers = async () => {
    let inventoryAppResponse = await inventoryAppGetSuppliers();
    setSuppliers(inventoryAppResponse.data);
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleSupplierModalClose = () => {
    setSupplierModalOpen(false);
  };

  const handleAlertClose = () => {
    setopenAlert(false);
  };

  const onSupplierModalAcceptClick = async () => {
    await fetchSuppliers();
  };

  const onEditSupplierButtonClick = (supplier: SupplierInterface) => {
    setSupplierToEdit(supplier);
    setSupplierIdToEdit(supplier._id);
    setSupplierModalOpen(true);
  };

  const onDeleteSupplierIconClick = (supplier: SupplierInterface) => {
    setDeleteSupplierModalOpen(true);
    setSupplierToBeDelete(supplier._id);
  };

  const onSupplierDeleted = async () => {
    setDeleteSupplierModalOpen(false);
    await inventoryAppDeleteSupplierById(supplierToBeDelete);
    setopenAlert(true);
    await fetchSuppliers();
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
            <caption>***N/P = No proporcionado***</caption>
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
              suppliers.filter(item => {
              //eslint-disable-next-line
                if (filter == "") {
                  return item;
                } else if (item.name.toLowerCase().includes(filter.toLowerCase() )) {
                  return item;
                }
              })
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, index) => {
                  return (
                    <TableRow hover role="checkbox" key={index}>
                      <TableCell align="left">
                        <Typography
                          variant="subtitle1"
                          className={classes.tableBody}
                        >
                          {item.name}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography
                          variant="subtitle1" style={{textTransform: "none"}}
                          className={classes.tableBody}
                        >
                          {item.email}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography
                          variant="subtitle1"
                          className={classes.tableBody}
                        >
                          {item.contactNumber}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography
                          variant="subtitle1"
                          className={classes.tableBody}
                        >
                          {item.state}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography
                          variant="subtitle1"
                          className={classes.tableBody}
                        >
                          {item.city}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <IconButton
                          onClick={() => onEditSupplierButtonClick(item)}
                        >
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell align="left">
                        &nbsp;&nbsp;&nbsp;
                        <IconButton
                          onClick={() => onDeleteSupplierIconClick(item)}
                        >
                          <DeleteIcon />
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
          rowsPerPageOptions={[5, 10, 25, { label: "Todos", value: -1 }]}
          component="div"
          count={suppliers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <SupplierModal
        in
        supplier={supplierToEdit}
        title="Edición de Proveedor"
        open={supplierModalOpen}
        onClose={handleSupplierModalClose}
        supplierId={supplierIdToEdit}
        isUpdatingSupplier={true}
        onSuccess={onSupplierModalAcceptClick}
      />

      <QuestionModal
        open={deleteSupplierModalOpen}
        setOpen={setDeleteSupplierModalOpen}
        onCancel={() => setDeleteSupplierModalOpen(false)}
        onConfirm={() => onSupplierDeleted()}
        title={"Eliminar Proveedor"}
        body={"¿Estás seguro que deseas eliminar este proveedor?"}
      />

      <Snackbar
        open={openAlert}
        autoHideDuration={7000}
        onClose={handleAlertClose}
      >
        <Alert onClose={handleAlertClose} severity="success">
          El proveedor a sido eliminado.
        </Alert>
      </Snackbar>
    </>
  );
};
