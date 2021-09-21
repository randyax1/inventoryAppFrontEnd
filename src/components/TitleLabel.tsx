import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({

    title: {
        color: '#011228',
        
        MozUserSelect: 'none',
        msUserSelect: 'none',
        userSelect: 'none',
        WebkitUserSelect: 'none',

        [theme.breakpoints.down('xs')]: {
            fontSize: '1.5rem'
        },
    }
  }),
);

interface TitleLabelProp {
    titleLabel: string;
}

const TitleLabel = ( props: TitleLabelProp ) => {

    const classes = useStyles();

    return (
        <>
        <Typography className={classes.title} variant="h4">
            {props.titleLabel}
        </Typography>  
        </>
    )
}

export default TitleLabel
