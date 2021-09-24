import { useEffect, useState } from "react";
import {
  createStyles,
  InputAdornment,
  makeStyles,
  TextField,
  Theme,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    TextField: {
      msUserSelect: "none",
      userSelect: "none",
      WebkitUserSelect: "none",
      MozUserSelect: "none",
      width: "100%",
    },
    TextFieldCapitalize: {
      "& input": {
        textTransform: "capitalize",
      },
    },
    InputAdornment: {
      color: "gray",
    },
  })
);

interface InputTextProps {
  label: string;
  id: string;
  defaultValue?: string;
  autoFocus?: boolean;
  icon: React.ReactNode;
  disabled?: boolean;
  type?: string;
  fullWidth?: boolean;
  onChange: Function;
  error?: boolean;
  helperText?: string;
  value?: string;
  capitalize?: boolean;
  required?: boolean;
}

export const InputText = (props: InputTextProps) => {
  const classes = useStyles();
  const [value, setValue] = useState(props.defaultValue);

  useEffect(() => {
    setValue(props.value);
  }, [props.value])

  const onValueChange = (event:any) => {
    setValue(event.target.value)
    props.onChange(event)
  }

  return (
    <div>
      <TextField
        autoComplete="off"
        error={props.error}
        helperText={props.helperText}
        fullWidth={props.fullWidth}
        required={props.required}
        className={`
        ${classes.TextField} 
        ${props.capitalize && classes.TextFieldCapitalize}
        `}
        id={props.id}
        autoFocus={props.autoFocus}
        label={props.label}
        defaultValue={props.defaultValue}
        type={props.type}
        variant="outlined"
        onChange={(event) => onValueChange(event)}
        value={value}
        InputProps={{
          startAdornment: (
            <InputAdornment className={classes.InputAdornment} position="start">
              {props.icon}
            </InputAdornment>
          ),
        }}
        disabled={props.disabled}
      />
    </div>
  )
}

InputText.defaultProps = {
    capitalize: false
}
