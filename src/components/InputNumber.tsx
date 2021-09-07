import React from 'react';

//Materia-UI
import { createStyles, InputAdornment, makeStyles, TextField, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({

    InputAdornment: {
      color: 'gray',
    },

}),
);

interface InputNumberProps {
    id: string;
    label: string;
    fullWidth?: boolean;
    defaultValue?: number;
    InputProps?: {};
    icon: React.ReactNode;   
}


export const InputNumber = (props: InputNumberProps) => {

    const classes = useStyles();

    return (
        <div>
            <TextField
            fullWidth={props.fullWidth}
            required={true}
            id={props.id}
            label={props.label}
            defaultValue={props.defaultValue}
            type="number"
            variant="outlined"
            InputLabelProps={{
                shrink: true,
            }}
            InputProps={{
                startAdornment: (
                <InputAdornment className={classes.InputAdornment} position="start">
                    {props.icon}
                </InputAdornment>
                ),
                inputProps: { min: 1 }
            }}
            />
        </div>
    )
}