import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import TitleLabel from '../../components/TitleLabel';
import { ButtonLoading } from '../../components/ButtonLoading';
import { SupplierModal } from './SupplierModal';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
      titleAndButton:{
        padding: theme.spacing(3)      
    }
  }),
);

export const SupplierContainer = () => {

    const [OpenSupplierModal, setOpenSupplierModal] = useState(false);

    const classes = useStyles();

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

            <TitleLabel titleLabel="Proveedores" />

            <ButtonLoading 
            label={'Registrar Proveedor'} 
            isLoading={false} 
            onClick={() => { setOpenSupplierModal(true) }}
            />

        </Grid>

        <SupplierModal 
        in
        title="Agregar Proveedor"
        open={OpenSupplierModal}
        onClose={() => setOpenSupplierModal(false)}
        />
        
        </>
    )
}
