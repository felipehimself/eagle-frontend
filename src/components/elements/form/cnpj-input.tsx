import { CNPJMask } from '@/masks/cnpj-mask';
import { TInput } from '@/types';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Controller, FieldValues } from 'react-hook-form';
export const CNPJInput = <TFieldValues extends FieldValues>(
  props: TInput<TFieldValues>,
) => {
  const { label = 'CNPJ' } = props;

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
          placeholder='XX.XXX.XXX/XXXX-XX'
          // helperText={fieldState.error?.message}
          error={!!fieldState.error}
          slotProps={{
            input: {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              inputComponent: CNPJMask as any,
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
          required={props.required}
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
