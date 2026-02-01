import { TFormComponent } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Skeleton,
  Stack,
  TextField,
} from '@mui/material';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { regionSchema, TRegionSchema } from '../types/regions.type';

export const RegionFormComponent = forwardRef(
  (props: TFormComponent<TRegionSchema>, ref) => {
    const navigate = useNavigate();

    const {
      handleSubmit,
      formState: { errors },
      control,
      reset,
      setValue,
    } = useForm<TRegionSchema>({
      resolver: zodResolver(regionSchema),
      defaultValues: {
        ativo: true,
      },
    });

    useImperativeHandle(ref, () => ({
      resetForm: () => {
        reset(props.initialData);
      },
    }));

    const onSubmit = (data: TRegionSchema) => {
      props.onSubmit(data);
    };

    useEffect(() => {
      if (props.initialData) {
        reset(props.initialData);
      }
    }, [props.initialData, reset]);

    if (props.isLoading) {
      return (
        <Paper sx={{ px: 4 }}>
          <Skeleton height={60} />
          <Skeleton height={60} />
          <Skeleton height={60} />
        </Paper>
      );
    }

    return (
      <Stack spacing={6}>
        <Paper
          component='form'
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 6 }}
        >
          <Controller
            name='nome'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label='Região/Base'
                error={!!errors?.nome}
                slotProps={{ inputLabel: { shrink: Boolean(field.value) } }}
                disabled={props.isSubmitting || props.shouldDisable}
                value={field.value || ''}
              />
            )}
          />
          <FormControl fullWidth error={!!errors?.ativo}>
            <InputLabel>Ativo</InputLabel>
            <Controller
              name='ativo'
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  value={field.value || false}
                  label='Ativo'
                  disabled={props.isSubmitting || props.shouldDisable}
                  onChange={(e) => {
                    setValue('ativo', JSON.parse(e.target.value as string));
                  }}
                >
                  {[
                    { nome: 'Sim', val: true },
                    { nome: 'Não', val: false },
                  ]?.map(({ nome, val }) => (
                    <MenuItem key={nome} value={String(val)}>
                      {nome}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
          <Stack direction='row' spacing={2} justifyContent='flex-end'>
            <Button
              variant='contained'
              color='error'
              type='button'
              onClick={() => navigate(-1)}
              disabled={props.isSubmitting || props.shouldDisable}
            >
              Cancelar
            </Button>
            <Button
              variant='contained'
              type='submit'
              disabled={props.isSubmitting || props.shouldDisable}
            >
              Salvar
            </Button>
          </Stack>
        </Paper>
      </Stack>
    );
  },
);
