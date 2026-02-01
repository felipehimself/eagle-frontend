import { forwardRef } from 'react';
import { IMaskInput } from 'react-imask';

interface CPFMaskProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  value?: string;
}

export const CPFMask = forwardRef<HTMLInputElement, CPFMaskProps>(
  function CPFMask(props, ref) {
    const { onChange, ...other } = props;

    return (
      <IMaskInput
        {...other}
        mask='000.000.000-00'
        definitions={{
          0: /[0-9]/,
        }}
        inputRef={ref}
        onAccept={(value: string) => {
          const digitsOnly = value.replace(/\D/g, '');
          onChange?.({ target: { name: props.name, value: digitsOnly } });
        }}
        overwrite
      />
    );
  }
);
