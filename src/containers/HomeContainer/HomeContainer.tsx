import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import TitleLabel from '../../components/TitleLabel';
import { ButtonLoading } from '../../components/ButtonLoading';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
      titleAndButton:{
        padding: theme.spacing(3)      
    }
  }),
);

export const HomeContainer = () => {

    const classes = useStyles();

    const skd = () => {}

    return (
        <>
        <div className={classes.titleAndButton}>
            <TitleLabel titleLabel="Inventario" />
        </div>
        </>
    )
}
