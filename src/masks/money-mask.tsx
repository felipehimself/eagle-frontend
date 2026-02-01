import { forwardRef } from 'react';
import { IMaskInput } from 'react-imask';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MoneyMask = forwardRef<HTMLInputElement, any>(function MoneyMask(
  props,
  ref
) {
  const { onChange, ...other } = props;

  return (
    <IMaskInput
      {...other}
      mask={Number} // Use Number mask type
      scale={2} // Decimal places
      thousandsSeparator='.'
      radix=','
      // normalizeZeros
      // padFractionalZeros
      // mapToRadix={[',']} // Map dot to radix for Brazilian format
      unmask={true} // Returns unmasked value
      inputRef={ref}
      onAccept={(value) => {
        onChange?.({ target: { name: props.name, value } });
      }}
      // overwrite
    />
  );
});
