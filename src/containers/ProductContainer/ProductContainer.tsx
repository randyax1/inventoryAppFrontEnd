import React, { useState } from 'react';
import { Divider, Grid } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import TitleLabel from '../../components/TitleLabel';
import { ButtonLoading } from '../../components/ButtonLoading';
import { ProductModal } from './ProductModal';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
      titleAndButton:{
        padding: theme.spacing(3)      
    }
  }),
);

export const ProductContainer = () => {

    const classes = useStyles();

    const [openProductModal, setOpenProductModal] = useState(false);

    const skd = () => {}

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
            isLoading={false} 
            label={'Registrar Producto'} 
            onClick={() => { setOpenProductModal(true) }} 
            />

        </Grid>

        <ProductModal 
        in
        title="Agregar Producto"
        open={openProductModal} 
        onClose={(event) => setOpenProductModal(false)} 
      />
        </>
    )
}
