import { LinearProgress, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const Confirm = () => {
  const [msg, setMsg] = useState('Aguarde enquanto confirmamos seu e-mail');
  const [searchParams] = useSearchParams();

  const codigo = searchParams.get('codigo');
  const userId = searchParams.get('userId');

  console.log('codigo', codigo);
  console.log('userId', userId);

  // chamar API
  // se api der OK, mudar mensagem (setMsg) para, "Conta confirmada, estamos redirecionando", pequeno setTimeout navigate para tela login
  // se a api falhar, mostrar erro e navegar para tela de signup

  return (
    <Stack
      spacing={2}
      alignItems='center'
      justifyContent='center'
      width={{ xs: '100%', sm: '60%', md: '25rem' }}
      margin='auto'
      height='100dvh'
      paddingInline={2}
    >
      <Typography sx={{ textAlign: 'center' }}>{msg}</Typography>
      <Stack sx={{ padding: 1, width: '100%' }}>
        <LinearProgress sx={{ width: '100%' }} />
      </Stack>
    </Stack>
  );
};
