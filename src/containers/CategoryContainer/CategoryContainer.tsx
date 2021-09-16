import React, { useState } from 'react';
import { Grid } from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import TitleLabel from '../../components/TitleLabel';
import { ButtonLoading } from '../../components/ButtonLoading';
import { CategoryModal } from './CategoryModal';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
      titleAndButton:{
        padding: theme.spacing(3)      
    }
  }),
);

export const CategoryContainer = () => {

    const classes = useStyles();

    const [OpenCategoryModal, setOpenCategoryModal] = useState(false);

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
            
            <TitleLabel titleLabel="Categorias" />
            
            <ButtonLoading 
            isLoading={false}
            label={'Crear Categoria'}
            onClick={() => { setOpenCategoryModal(true) }}
            />

        </Grid>

        <CategoryModal
        in
        title="Agregar Categoria"
        open={OpenCategoryModal}
        onClose={() => setOpenCategoryModal(false)}
        />
        </>
    )
}