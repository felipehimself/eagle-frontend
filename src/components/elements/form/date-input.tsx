import { TInput } from '@/types';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { format, parseISO } from 'date-fns';
import { Controller, FieldValues } from 'react-hook-form';

export const DateInput = <TFieldValues extends FieldValues>(
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
          value={field.value ? parseISO(field.value.split('T')[0]) : null}
          onChange={(date: Date | null) => {
            field.onChange(date ? format(date, 'yyyy-MM-dd') : null);
          }}
          localeText={{
            fieldDayPlaceholder: () => 'DD',
            fieldMonthPlaceholder: () => 'MM',
            fieldYearPlaceholder: () => 'AAAA',
          }}
          slotProps={{
            textField: {
              fullWidth: true,
              error: !!fieldState.error,
              size: 'small',

              // helperText: fieldState.error?.message,
            },
          }}
        />
      )}
    />
  );
};
