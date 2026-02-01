import { TInput } from '@/types';
import { Formatter } from '@/utils';
import { TextField } from '@mui/material';
import { Controller, FieldValues } from 'react-hook-form';

const f = new Formatter();

export const DateInputBackup = <TFieldValues extends FieldValues>(
  props: TInput<TFieldValues>,
) => {
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          value={field.value || ''}
          disabled={props.disabled}
          fullWidth
          label={props.label}
          placeholder='DD/MM/AAAA'
          error={!!fieldState.error}
          onChange={(e) => {
            const value = e.target.value;
            const formatted = f.formatDate(value);
            field.onChange(formatted);
          }}
        />
      )}
    />
  );
};
