import { useNotification } from '@/hooks/use-notification';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useMemo, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useConfirmAuth } from '../api/post-confirm-auth';
export const Confirm = () => {
  const [values, setValues] = useState(['', '', '', '']);
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();
  const toaster = useNotification();

  const userId = searchParams.get('userId');
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return; // só números

    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);

    if (value && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent) => {
    if (event.key === 'Backspace' && !values[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const {
    mutateAsync: postConfirmAuthAsync,
    isLoading: isLoadingConfirmAuthAsync,
    isError: isErrorConfirmAuthAsync,
  } = useConfirmAuth();

  const handleConfirmAuth = async () => {
    if (!userId || values.some((value) => !value)) return;

    await postConfirmAuthAsync({
      usuarioId: userId!,
      codConfirmacao: values.join(''),
    });

    if (!isErrorConfirmAuthAsync) {
      toaster.addNotification('Conta confirmada, estamos redirecionando', {
        variant: 'success',
      });

      setTimeout(() => {
        navigate('/auth/signin');
      }, 3000);
    }
  };

  const disable = useMemo(() => {
    return values.some((value) => !value) || isLoadingConfirmAuthAsync;
  }, [values, isLoadingConfirmAuthAsync]);

  // chamar API
  // se api der OK, mudar mensagem (setMsg) para, "Conta confirmada, estamos redirecionando", pequeno setTimeout navigate para tela login
  // se a api falhar, mostrar erro e navegar para tela de signup

  return (
    <Stack
      spacing={2}
      justifyContent='center'
      width={{ xs: '100%', sm: '60%', md: '30rem' }}
      margin='auto'
      height='100dvh'
      paddingInline={2}
    >
      <Stack
        direction='column'
        spacing={4}
        sx={{
          backgroundColor: (theme) => theme.palette.background.paper,
          p: 8,
          borderRadius: 2,
        }}
      >
        <Stack
          direction='row'
          justifyContent='left'
          alignItems='center'
          spacing={2}
          sx={{ marginBottom: 4 }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(12, 97, 222, 0.1)',
              padding: 2,
              borderRadius: '50%',
            }}
          >
            <LocalShippingIcon fontSize='small' color='primary' />
          </Box>
          <Typography
            variant='h3'
            sx={{
              textAlign: 'center',
              mb: 8,
              color: (theme) => theme.palette.primary.main,
            }}
          >
            Eagle Transportes
          </Typography>
        </Stack>

        <Typography
          sx={{
            color: (theme) => theme.palette.gray[600],
            fontSize: (theme) => theme.typography.pxToRem(24),
          }}
        >
          Confirmar conta
        </Typography>

        <Typography
          sx={{
            color: (theme) => theme.palette.gray[500],
            fontSize: (theme) => theme.typography.pxToRem(16),
          }}
        >
          Informe o código de confirmação enviado para seu e-mail e clique em
          enviar.
        </Typography>

        <Stack spacing={6}>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            {values.map((value, index) => (
              <TextField
                disabled={isLoadingConfirmAuthAsync}
                key={index}
                autoFocus={index === 0}
                inputRef={(el) => (inputsRef.current[index] = el)}
                value={value}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                slotProps={{
                  htmlInput: {
                    style: { textAlign: 'center', fontSize: '1.5rem' },
                    maxLength: 1,
                  },
                }}
                sx={{ width: 56 }}
              />
            ))}
          </Box>
          <Button
            variant='contained'
            color='primary'
            fullWidth
            size='large'
            type='submit'
            disabled={disable}
            onClick={handleConfirmAuth}
            typeof='button'
          >
            Enviar
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
