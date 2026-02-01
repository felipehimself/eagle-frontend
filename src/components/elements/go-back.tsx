import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const GoBack = (props: { disabled?: boolean }) => {
  const navigate = useNavigate();

  return (
    <Stack direction='row' spacing={1} alignItems='center' mb={2}>
      <Button
        disabled={props.disabled}
        onClick={() => navigate(-1)}
        variant='text'
      >
        <ArrowBackIcon fontSize='small' />
        <Typography sx={{ textTransform: 'none !important', marginLeft: 2 }}>
          Voltar
        </Typography>
      </Button>
    </Stack>
  );
};
