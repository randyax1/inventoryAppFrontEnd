import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import TitleLabel from '../../components/TitleLabel';
import { ProductTable } from '../ProductContainer/ProductTable';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    titleAndButton: {
      padding: theme.spacing(4, 2, 1, 2),
    },
    productTable: {
      padding: theme.spacing(1, 2, 2, 2),
    },
  }),
);

export const HomeContainer = () => {

    const classes = useStyles();

    return (
        <>
        <div className={classes.titleAndButton}>
            <TitleLabel titleLabel="Inventario" />
        </div>

        <div className={classes.productTable}>
          <ProductTable />
        </div>

        
        
        </>
    )
}
