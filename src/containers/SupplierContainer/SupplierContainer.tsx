import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import AddSharpIcon from '@material-ui/icons/AddSharp';

import TitleLabel from '../../components/TitleLabel';
import { ButtonLoading } from '../../components/ButtonLoading';
import { SupplierModal } from './SupplierModal';
import { SupplierTable } from './SupplierTable';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
      titleAndButton:{
        padding: theme.spacing(4, 2, 1, 2),
      },
      supplierTable: {
        padding: theme.spacing(2)
      }
  }),
);

export const SupplierContainer = () => {

    const classes = useStyles();
    
    const [OpenSupplierModal, setOpenSupplierModal] = useState(false);

    const handleClose = () => {
      setOpenSupplierModal(false)
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

            <TitleLabel titleLabel="Proveedores" />

            <ButtonLoading
            icon={<AddSharpIcon/>}
            label={'proveedor'} 
            isLoading={false} 
            onClick={() => { setOpenSupplierModal(true) }}
            />

        </Grid>

        

        <div className={classes.supplierTable}>
          <SupplierTable />
        </div>

        <SupplierModal 
        in
        onClose={handleClose}
        title="Agregar Proveedor"
        open={OpenSupplierModal}
        onSuccess={() => window.location.reload()}
        />
        
        </>
    )
}
