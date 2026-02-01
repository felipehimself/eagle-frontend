import { forwardRef } from 'react';
import { IMaskInput } from 'react-imask';

interface CNPJMaskProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  value?: string;
}

export const CNPJMask = forwardRef<HTMLInputElement, CNPJMaskProps>(
  function CNPJMask(props, ref) {
    const { onChange, ...other } = props;

    return (
      <IMaskInput
        {...other}
        mask='00.000.000/0000-00'
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
