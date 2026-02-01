import { CPFMask } from '@/masks/cpf-mask';
import { TInput } from '@/types';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, InputAdornment, TextField } from '@mui/material';

import { Controller, FieldValues } from 'react-hook-form';

export const CPFInput = <TFieldValues extends FieldValues>(
  props: TInput<TFieldValues>,
) => {
  const { label = 'CPF' } = props;
  return (
    <Controller
      control={props.control}
      name={props.name}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          value={field.value || ''}
          disabled={props.disabled}
          fullWidth
          label={label}
          placeholder='XXX.XXX.XXX-XX'
          error={!!fieldState.error}
          required={props.required}
          slotProps={{
            input: {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              inputComponent: CPFMask as any,
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    disabled={props.disabled}
                    edge='end'
                    onClick={props.onClickButton}
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
          onChange={(e) => {
            field.onChange(e.target.value);
            const value = e.target.value;
            const currentValue = field.value;
            const isDifferent = value !== currentValue;
            if (props.clearField && isDifferent) {
              props.clearField();
            }
          }}
        />
      )}
    />
  );
};
