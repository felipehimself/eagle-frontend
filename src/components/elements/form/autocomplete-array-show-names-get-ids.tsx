import { TInput } from '@/types';
import { Autocomplete, TextField } from '@mui/material';
import { Controller, FieldValues } from 'react-hook-form';

type TDataToRender<T> = {
  id: keyof T;
  nome: keyof T;
};

export const AutocompleteArrayShowNamesGetIds = <
  TFieldValues extends FieldValues,
  T,
>(
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
          // Convert array of IDs to array of selected objects
          value={
            props.data?.filter((option) =>
              Array.isArray(field.value)
                ? field.value.includes(option.id)
                : false,
            ) || []
          }
          multiple
          noOptionsText='Não encontrado'
          size='small'
          onChange={(_, newValue) => {
            // Extract just the IDs from selected objects
            field.onChange(newValue.map((item) => item.id));
          }}
          options={props.data || []}
          getOptionLabel={(option) => (option.nome as string) || ''}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderInput={(params) => (
            <TextField
              {...params}
              label={props.label}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
      )}
    />
  );
};
