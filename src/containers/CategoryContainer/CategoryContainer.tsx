import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import AddSharpIcon from '@material-ui/icons/AddSharp';

import TitleLabel from "../../components/TitleLabel";
import { ButtonLoading } from "../../components/ButtonLoading";
import { CategoryModal } from "./CategoryModal";
import CategoryTable from "./CategoryTable";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    titleAndButton: {
      padding: theme.spacing(4, 2, 1, 2),

    },
    categoryTable: {
      padding: theme.spacing(2)
    }
    
  })
);

export const CategoryContainer = () => {

  const classes = useStyles();

  const [OpenCategoryModal, setOpenCategoryModal] = useState(false);

  const handleClose = () => {
    setOpenCategoryModal(false);
  };

  return (
    <>
      <Grid
        container
        direction="row"
        alignItems="baseline"
        justifyContent="space-between"
        className={classes.titleAndButton}
      >

        <TitleLabel titleLabel="Categorias" />

        <ButtonLoading
          icon={<AddSharpIcon/>}
          isLoading={false}
          label={"Categoria"}
          onClick={() => {
            setOpenCategoryModal(true);
          }}
        />

      </Grid>
      
      <div className={classes.categoryTable}>
      <CategoryTable />
      </div>

      <CategoryModal
        in
        onClose={handleClose}
        title="Agregar Categoria"
        open={OpenCategoryModal}
        onSuccess={() => window.location.reload()}
      />
    </>
  );
};
