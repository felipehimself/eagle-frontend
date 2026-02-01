import { TInput } from '@/types';
import { Autocomplete, TextField } from '@mui/material';
import { Controller, FieldValues } from 'react-hook-form';

type TDataToRender<T> = {
  id: keyof T;
  nome: keyof T;
};

export const AutocompleteShowNameGetId = <TFieldValues extends FieldValues, T>(
  props: TInput<TFieldValues> & {
    data: TDataToRender<T>[];
  },
) => {
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field, fieldState }) => (
        <Autocomplete
          {...field}
          disabled={props.disabled}
          value={
            props.data?.find(
              (option) => String(option.id) === String(field.value),
            ) || null
          }
          noOptionsText='Não encontrado'
          size='small'
          onChange={(_, newValue) => {
            field.onChange(newValue ? newValue.id : '');
          }}
          options={props.data || []}
          getOptionLabel={(option) => (option.nome as string) || ''}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderInput={(params) => (
            <TextField
              {...params}
              label={props.label}
              error={!!fieldState.error}
            />
          )}
        />
      )}
    />
  );
};
