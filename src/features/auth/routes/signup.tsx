import { zodResolver } from '@hookform/resolvers/zod';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSignup } from '../api/post-signup';
import { AuthFormContainer } from '../components';
import { TSignupSchema, signupSchema } from '../types';

export const Signup = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignupSchema>({
    resolver: zodResolver(signupSchema),
  });

  const {
    mutateAsync: postSignupAsync,
    isLoading: isLoadingSigningup,
    error: signupError,
  } = useSignup();

  const onSubmit = async (data: TSignupSchema) => {
    await postSignupAsync(data);

    if (signupError) return;

    navigate('/auth/signin');
  };

  const handleGoBack = () => navigate('/auth/signin');

  return (
    <AuthFormContainer>
      <Stack
        direction='row'
        justifyContent='center'
        alignItems='center'
        spacing={2}
        sx={{ marginBottom: 12 }}
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
            color: theme.palette.primary.main,
          }}
        >
          Eagle Transportes
        </Typography>
      </Stack>
      <Stack
        spacing={8}
        component='form'
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <TextField
          label='Nome'
          {...register('nome')}
          error={!!errors.nome}
          helperText={errors.nome?.message}
          fullWidth
          margin='normal'
          size='small'
          disabled={isLoadingSigningup}
        />

        <TextField
          label='E-mail'
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
          fullWidth
          margin='normal'
          size='small'
          disabled={isLoadingSigningup}
        />

        <TextField
          label='Senha'
          size='small'
          id='outlined-adornment-password'
          type={showPassword ? 'text' : 'password'}
          {...register('senha')}
          error={!!errors.senha}
          helperText={errors.senha?.message}
          disabled={isLoadingSigningup}
          slotProps={{
            input: {
              endAdornment: (
                <IconButton
                  aria-label={showPassword ? 'mostrar senha' : 'esconder senha'}
                  onClick={() => setShowPassword(!showPassword)}
                  edge='end'
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              ),
            },
          }}
        />

        <Button disabled={isLoadingSigningup} type='submit' variant='contained'>
          Registrar
        </Button>
      </Stack>

      <Button
        sx={{ width: '100%', mt: 6 }}
        type='button'
        variant='outlined'
        color='info'
        onClick={handleGoBack}
        disabled={isLoadingSigningup}
      >
        Voltar
      </Button>
    </AuthFormContainer>
  );
};
