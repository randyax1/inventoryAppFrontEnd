import React, { useState } from "react";
import { Grid, Tooltip } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

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
      padding: theme.spacing(1, 2, 2, 2),
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
        <Tooltip title={<h2>Agregar producto</h2>}>
          <div>
            <ButtonLoading
              icon={null}
              isLoading={false}
              label={"agregar"}
              onClick={() => {
                setOpenProductModal(true);
              }}
            />
          </div>
        </Tooltip>
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
