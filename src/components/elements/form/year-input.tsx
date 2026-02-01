import { TInput } from '@/types';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller, FieldValues } from 'react-hook-form';

export const YearInput = <TFieldValues extends FieldValues>(
  props: TInput<TFieldValues>,
) => {
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field, fieldState }) => (
        <DatePicker
          label={props.label}
          disabled={props.disabled}
          views={['year']}
          openTo='year'
          value={field.value ? new Date(Number(field.value), 0, 1) : null}
          onChange={(date: Date | null) => {
            field.onChange(date ? date.getFullYear() : null);
          }}
          localeText={{
            fieldYearPlaceholder: () => 'AAAA',
          }}
          slotProps={{
            textField: {
              fullWidth: true,
              size: 'small',
              error: !!fieldState.error,
              // helperText: fieldState.error?.message,
            },
          }}
        />
      )}
    />
  );
};
