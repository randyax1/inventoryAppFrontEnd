import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import TitleLabel from '../../components/TitleLabel';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
      titleAndButton:{
        padding: theme.spacing(3)      
    }
  }),
);

export const HomeContainer = () => {

    const classes = useStyles();

    return (
        <>
        <div className={classes.titleAndButton}>
            <TitleLabel titleLabel="Inventario" />
        </div>
        </>
    )
}
