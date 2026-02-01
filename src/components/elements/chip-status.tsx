import { Chip } from '@mui/material';

type TChipStatusProps = {
  status?: boolean;
};

export const ChipStatus = (props: TChipStatusProps) => {
  const status = props.status;
  const color = status ? 'success' : 'error';
  const label = status ? 'Sim' : 'Não';
  return <Chip sx={{ width: 90 }} size='small' label={label} color={color} />;
};
