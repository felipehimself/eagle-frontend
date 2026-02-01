import { MoneyMask } from '@/masks/money-mask';
import { TInput } from '@/types';
// import { Formatter } from '@/utils/common';
import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { Controller, FieldValues } from 'react-hook-form';

// const f = new Formatter();

export const MoneyInput = <TFieldValues extends FieldValues>(
  props: TInput<TFieldValues>
) => {
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field, fieldState }) => (
        <FormControl fullWidth error={!!fieldState.error}>
          <InputLabel htmlFor={`money-input-${props.name}`}>
            {props.label}
          </InputLabel>
          <OutlinedInput
            {...field}
            label={props.label}
            value={field.value || ''}
            disabled={props.disabled}
            id={`money-input-${props.name}`}
            startAdornment={
              <InputAdornment position='start'>R$</InputAdornment>
            }
            inputComponent={MoneyMask}
            // onChange={(e) => {
            //   const value = e.target.value;
            //   const formatted = f.formatMoney(value);
            //   // props.setValue(props.name, formatted);
            //   field.onChange(formatted);
            // }}
          />

          {/* <FormHelperText error></FormHelperText> */}
        </FormControl>
      )}
    />
  );
};
