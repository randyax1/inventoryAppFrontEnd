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

import {
  inventoryAppDeleteCategoryById,
  inventoryAppGetCategories,
} from "../../lib/inventoryAppBackendClient";
import { CategoryInterface } from "../../types/inventoryAppBaseTypes";
import { QuestionModal } from "../../components/QuestionModal";
import { CategoryModal } from "./CategoryModal";
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
      color:'#011228',
      MozUserSelect: "none",
      msUserSelect: "none",
      userSelect: "none",
      WebkitUserSelect: "none",
    },
    tableBody: {
        color:'#011228'
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
    label: "Nombre de la Categoria",
  },
  {
    label: "Editar",
  },
  {
    label: "Eliminar",
  },
];

const CategoryTable = () => {

  const classes = useStyles();

  const [filter, setFilter] = useState("");

  const onFilterInputChange = (event: any) => {
    setFilter(event.target.value);
  };

  const [categories, setCategories] = useState([] as any[]);

  const [categoryToEdit, setCategoryToEdit] = useState<CategoryInterface>();
  const [categoryIdToEdit, setCategoryIdToEdit] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openAlert, setopenAlert] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [deleteCategoryModalOpen, setDeleteCategoryModalOpen] = useState(false);
  const [categoryToBeDelete, setCategoryToBeDelete] = useState("");

  const fetchCategories = async () => {
    let inventoryAppResponse = await inventoryAppGetCategories();
    setCategories(inventoryAppResponse.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryModalClose = () => {
    setCategoryModalOpen(false);
  };

  const handleAlertClose = () => {
    setopenAlert(false);
  };

  const onCategoryModalAcceptClick = async () => {
    await fetchCategories();
  };

  const onEditCategoryButtonClick = (category: CategoryInterface) => {
    setCategoryToEdit(category);
    setCategoryIdToEdit(category._id);
    setCategoryModalOpen(true);
  };

  const onDeleteCategoryIconClick = (category: CategoryInterface) => {
    setDeleteCategoryModalOpen(true);
    setCategoryToBeDelete(category._id);
  };

  const onCategoryDeleted = async () => {
    setDeleteCategoryModalOpen(false);
    await inventoryAppDeleteCategoryById(categoryToBeDelete);
    setopenAlert(true);
    await fetchCategories();
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
          <caption>Categorias creadas para los productos.</caption>
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
              categories.filter(item => {
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
                        <IconButton
                          onClick={() => onEditCategoryButtonClick(item)}
                        >
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell align="left">
                        &nbsp;&nbsp;&nbsp;
                        <IconButton
                          onClick={() => onDeleteCategoryIconClick(item)}
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
          rowsPerPageOptions={[5, 10, 25, {label: 'Todos', value: -1}]}
          component="div"
          count={categories.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <CategoryModal
        in
        category={categoryToEdit}
        title="Edición de Categoria"
        open={categoryModalOpen}
        onClose={handleCategoryModalClose}
        categoryId={categoryIdToEdit}
        isUpdatingCategory={true}
        onSuccess={onCategoryModalAcceptClick}
      />

      <QuestionModal
        open={deleteCategoryModalOpen}
        setOpen={setDeleteCategoryModalOpen}
        onCancel={() => setDeleteCategoryModalOpen(false)}
        onConfirm={() => onCategoryDeleted()}
        title={"Eliminar Categoria"}
        body={"¿Estás seguro que deseas eliminar esta categoria?"}
      />

      <Snackbar
        open={openAlert}
        autoHideDuration={7000}
        onClose={handleAlertClose}
      >
        <Alert onClose={handleAlertClose} severity="success">
          La Categoria a sido eliminada.
        </Alert>
      </Snackbar>
    </>
  );
};

export default CategoryTable;
