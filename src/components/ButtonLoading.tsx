import React from 'react';

//Material-UI Import's
import CircularProgress from '@material-ui/core/CircularProgress';
import { yellow } from '@material-ui/core/colors';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        buttonProgress: {
          color: yellow[600],
          position: 'absolute',
          top: '50%',
          left: '50%',
          marginTop: -12,
          marginLeft: -12,
        },
        blank :{
          opacity: 0
        }
    }),
);

//Datos necesarios para el button con Loading
interface InputLoadingButtonProps {
    className?: string;
    disabled?: boolean;
    label: string;
    isLoading: boolean;
    icon?: React.ReactNode;
    onClick: (e:  React.MouseEvent<HTMLButtonElement>) => void;
    fullWidth?: boolean;
    size?: string;
}

export const ButtonLoading = ( props: InputLoadingButtonProps ) => {

    const classes = useStyles();

    return (
        <>
          <Button
            style={{backgroundColor:'#011936'}}
            size="large"
            fullWidth={props.fullWidth}
            type="submit"
            variant="contained"
            color="primary"
            className={props.className}
            disabled={props.isLoading || props.disabled}
            onClick={props.onClick}
          >
            {props.isLoading ? <SaveIcon className={classes.blank}/> : <>{ props.icon  }{ props.label }</>}
            {props.isLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </Button>
        </>
    )
}