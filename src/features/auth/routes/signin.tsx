import { useUserSession } from '@/hooks/use-user-session';
import { zodResolver } from '@hookform/resolvers/zod';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSignin } from '../api/post-signin';
import { AuthFormContainer } from '../components';
import { TSigninSchema, signinSchema } from '../types';

export const Signin = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const [remindEmail, setRemindEmail] = useState(
    !!localStorage.getItem('eagle_email'),
  );
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSigninSchema>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: localStorage.getItem('eagle_email') || undefined,
    },
  });

  const { mutateAsync: postSinginAsync, isLoading: isLoadingSigning } =
    useSignin();

  const { setSession } = useUserSession();

  const onSubmit = async (data: TSigninSchema) => {
    const res = await postSinginAsync(data);
    if (remindEmail) {
      localStorage.setItem('eagle_email', data.email);
    }
    setSession(res);
    navigate('/app/home');
  };

  const handleNavigateToSignup = () => navigate('/auth/signup');

  const handleRemindEmail = (value: boolean): void => {
    setRemindEmail(value);
    if (!value) {
      localStorage.removeItem('eagle_email');
    }
  };

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
          label='E-mail'
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
          fullWidth
          margin='normal'
          size='small'
          disabled={isLoadingSigning}
        />

        <TextField
          label='Senha'
          size='small'
          id='outlined-adornment-password'
          type={showPassword ? 'text' : 'password'}
          {...register('senha')}
          error={!!errors.senha}
          helperText={errors.senha?.message}
          disabled={isLoadingSigning}
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

        <FormControlLabel
          control={
            <Checkbox
              checked={remindEmail}
              onChange={(e) => handleRemindEmail(e.target.checked)}
            />
          }
          label='Lembrar e-mail'
        />

        <Button disabled={isLoadingSigning} type='submit' variant='contained'>
          Entrar
        </Button>
      </Stack>
      <Typography sx={{ mt: 6, textAlign: 'center' }} variant='body2'>
        ou
      </Typography>
      <Button
        sx={{ width: '100%', mt: 6 }}
        type='button'
        variant='outlined'
        onClick={handleNavigateToSignup}
      >
        Cadastrar
      </Button>
    </AuthFormContainer>
  );
};
