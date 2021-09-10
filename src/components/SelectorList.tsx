import React, { useEffect, useState } from "react";

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { InputAdornment } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      minWidth: 120,
      
    },
    selectEmpty: {
      marginTop: theme.spacing(5),
    }
  }),
);

interface SelectorProps {
    id: string;
    inputLabel: string;
    fullWidth?: boolean;
    value?: string;
    onChange: Function;
}

export const SelectorList = (props: SelectorProps) => {

  const classes = useStyles();
  
  const [value, setValue] = useState("");

  const onValueChange = (event:any) => {
    setValue(event.target.value)
    props.onChange(event)
  }

  return (
    <div>
      <FormControl fullWidth={props.fullWidth} variant="outlined" className={classes.formControl}>
        <InputLabel shrink>{props.inputLabel}</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id={props.id}
          value={value}
          onChange={(event) => onValueChange(event)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};
