import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import AddSharpIcon from "@material-ui/icons/AddSharp";

import TitleLabel from "../../components/TitleLabel";
import { ButtonLoading } from "../../components/ButtonLoading";
import { ProductModal } from "./ProductModal";
import { ProductTable } from "./ProductTable";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    titleAndButton: {
      padding: theme.spacing(4, 2, 1, 2),
    },
    categoryTable: {
      padding: theme.spacing(2),
    },
  })
);

export const ProductContainer = () => {

  const classes = useStyles();

  const [openProductModal, setOpenProductModal] = useState(false);

  const handleClose = () => {
    setOpenProductModal(false);
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

        <TitleLabel titleLabel="Productos" />

        <ButtonLoading
          icon={<AddSharpIcon />}
          isLoading={false}
          label={"Producto"}
          onClick={() => {
            setOpenProductModal(true);
          }}
        />
      </Grid>

      <div className={classes.categoryTable}>
          <ProductTable />
      </div>

      <ProductModal
        in
        title="Agregar Producto"
        open={openProductModal}
        onClose={handleClose}
        onSuccess={() => window.location.reload()}
      />
    </>
  );
};
